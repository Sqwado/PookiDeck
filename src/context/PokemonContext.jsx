
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { NormalizeString } from '../utils/normalizeString';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {

    const PAGES_TO_LOAD = 3;
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [pokemonLoaded, setPokemonLoaded] = useState(false);
    const [typesLoaded, setTypesLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16);
    const [visiblePages, setVisiblePages] = useState([1]);

    const observer = useRef();
    const topObserver = useRef();
    const [showScrollTopButton, setShowScrollTopButton] = useState(false); // New state for button visibility

    const fetchPokemon = async () => {
        setPokemonLoaded(false);
        try {
            const response = await axios.get('https://pokedex-jgabriele.vercel.app/pokemons.json');
            setPokemon(response.data);
            setFilteredPokemon(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setPokemonLoaded(true);
        }
    }

    const fetchTypes = async () => {
        setTypesLoaded(false);
        try {
            const response = await axios.get('https://pokedex-jgabriele.vercel.app/types.json');
            setTypes(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setTypesLoaded(true);
        }
    }

    useEffect(() => {
        if (pokemonLoaded && typesLoaded) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [pokemonLoaded, typesLoaded]);

    const searchPokemon = (search) => {
        const filteredPokemon = pokemon.filter(pokemon => {
            return NormalizeString(pokemon.names.en).includes(NormalizeString(search));
        });
        setFilteredPokemon(filteredPokemon);
        setCurrentPage(1); // Reset to first page on new search
        setVisiblePages([1]); // Reset visible pages
    }

    const clearSearch = () => {
        setFilteredPokemon(pokemon);
        setSearch('');
        setCurrentPage(1); // Reset to first page on clear search
        setVisiblePages([1]); // Reset visible pages
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
        searchPokemon(e.target.value);
    }

    const getType = (name) => {
        return types[name];
    }

    const getPokemon = (name) => {
        return pokemon.find(pokemon => pokemon.names.en === name);
    }

    useEffect(() => {
        const savedPage = sessionStorage.getItem('currentPage');
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');

        if (savedPage) {
            setCurrentPage(parseInt(savedPage, 10));
        }

        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
            sessionStorage.removeItem('scrollPosition'); // Supprime la position après l'avoir utilisée
        }

        fetchPokemon();
        fetchTypes();
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);

    const loadMorePages = useCallback(() => {
        setVisiblePages(prevPages => {
            const nextPage = Math.max(...prevPages) + 1;
            if (nextPage <= Math.ceil(filteredPokemon.length / itemsPerPage)) {
                return [...prevPages, nextPage].slice(-PAGES_TO_LOAD); // Keep only the last PAGES_TO_LOAD pages
            }
            return prevPages;
        });
    }, [filteredPokemon.length, itemsPerPage]);

    const loadPreviousPages = useCallback(() => {
        setVisiblePages(prevPages => {
            const prevPage = Math.min(...prevPages) - 1;
            // Check if the previous page is greater than 0 before loading
            if (prevPage > 0) {
                return [prevPage, ...prevPages].slice(0, PAGES_TO_LOAD); // Keep only the first PAGES_TO_LOAD pages
            }
            return prevPages; // Do nothing if already on the first page
        });
    }, []);

    const firstItemRef = useCallback(node => {
        if (loading || visiblePages.includes(1)) return; // Don't observe if already on the first page

        if (topObserver.current) topObserver.current.disconnect();

        // Root margin added to trigger earlier during scroll
        topObserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadPreviousPages(); // Load previous pages when scrolling up
            }
        }, { rootMargin: '200px' }); // Adjust this margin if needed

        if (node) topObserver.current.observe(node);
    }, [loading, visiblePages, loadPreviousPages]);


    const lastItemRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMorePages();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, loadMorePages]);

    // Show or hide "scroll to top" button depending on scroll position
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScrollTopButton(true);
        } else {
            setShowScrollTopButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        const scrollDuration = 400; // Durée en millisecondes (1000ms = 1 seconde)
        const scrollStep = -window.scrollY / (scrollDuration / 15); // Calcul du pas de défilement

        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15); // Appelle la fonction toutes les 15 millisecondes
    };

    const handleNavigation = () => {
        // Enregistre la page actuelle et la position de défilement
        sessionStorage.setItem('currentPage', currentPage);
        sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    const paginatedItems = visiblePages.flatMap(page => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredPokemon.slice(start, end);
    });

    return (
        <PokemonContext.Provider value={{
            pokemon: paginatedItems,
            types,
            clearSearch,
            handleChange,
            search,
            getType,
            getPokemon,
            currentPage,
            itemsPerPage,
            totalItems: filteredPokemon.length,
            paginate: loadMorePages,
            firstItemRef,
            lastItemRef,
            handleNavigation
        }}>
            {children}

            {showScrollTopButton && (
                <button
                    onClick={scrollToTop}
                    className='fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg border-none cursor-pointer 
                    hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800'>
                    ↑ Back to Top
                </button>
            )}

        </PokemonContext.Provider>
    );
}

export const usePokemon = () => useContext(PokemonContext);
