import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import { NormalizeString } from '../utils/NormalizeString';
import { useTranslation } from 'react-i18next';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const { t, i18n } = useTranslation();

    const PAGES_TO_LOAD = 3;
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [pokemonLoaded, setPokemonLoaded] = useState(false);
    const [typesLoaded, setTypesLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([]);
    const [filterTypes, setFilterTypes] = useState([]);
    const [someEveryType, setSomeEveryType] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16);
    const [visiblePages, setVisiblePages] = useState([1]);

    const observer = useRef();
    const topObserver = useRef();
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

    const fetchPokemon = useCallback(async () => {
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
    }, []);

    const fetchTypes = useCallback(async () => {
        setTypesLoaded(false);
        try {
            const response = await axios.get('https://pokedex-jgabriele.vercel.app/types.json');
            setTypes(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setTypesLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (pokemonLoaded && typesLoaded) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [pokemonLoaded, typesLoaded]);

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const searchPokemon = useCallback(debounce(() => {
        const filteredPokemon = pokemon.filter(pokemon => {
            return Object.values(pokemon.names).some(name =>
                NormalizeString(name).includes(NormalizeString(search))
            );
        }).filter(pokemon => {
            return filterTypes.length === 0 || someEveryType
                ? filterTypes.every(type => pokemon.types.includes(type))
                : filterTypes.some(type => pokemon.types.includes(type));
        });
        setFilteredPokemon(filteredPokemon);
        setCurrentPage(1);
        setVisiblePages([1]);
    }, 300), [pokemon, search, filterTypes, someEveryType]);

    useEffect(() => {
        searchPokemon();
    }, [pokemon, search, filterTypes, someEveryType]);

    const clearSearch = useCallback(() => {
        setFilteredPokemon(pokemon);
        setSearch('');
        setCurrentPage(1);
        setVisiblePages([1]);
    }, [pokemon]);

    const getType = useCallback((name) => {
        return types[name];
    }, [types]);

    const getPokemon = useCallback((name) => {
        return pokemon.find(pokemon => NormalizeString(pokemon.names.en) === NormalizeString(name));
    }, [pokemon]);

    const getById = useCallback((id) => {
        return pokemon.find(pokemon => pokemon.id === parseInt(id, 10));
    }, [pokemon]);

    useEffect(() => {
        const savedPage = sessionStorage.getItem('currentPage');
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');

        if (savedPage) {
            setCurrentPage(parseInt(savedPage, 10));
        }

        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
            sessionStorage.removeItem('scrollPosition');
        }

        fetchPokemon();
        fetchTypes();
    }, [fetchPokemon, fetchTypes]);

    const loadMorePages = useCallback(() => {
        setVisiblePages(prevPages => {
            const nextPage = Math.max(...prevPages) + 1;
            if (nextPage <= Math.ceil(filteredPokemon.length / itemsPerPage)) {
                return [...prevPages, nextPage].slice(-PAGES_TO_LOAD);
            }
            return prevPages;
        });
    }, [filteredPokemon.length, itemsPerPage]);

    const loadPreviousPages = useCallback(() => {
        setVisiblePages(prevPages => {
            const prevPage = Math.min(...prevPages) - 1;
            if (prevPage > 0) {
                return [prevPage, ...prevPages].slice(0, PAGES_TO_LOAD);
            }
            return prevPages;
        });
    }, []);

    const firstItemRef = useCallback(node => {
        if (loading || visiblePages.includes(1)) return;

        if (topObserver.current) topObserver.current.disconnect();

        topObserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadPreviousPages();
            }
        }, { rootMargin: '200px' });

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

    const handleScroll = useCallback(() => {
        if (window.scrollY > 300) {
            setShowScrollTopButton(true);
        } else {
            setShowScrollTopButton(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const scrollToTop = useCallback(() => {
        const scrollDuration = 400;
        const scrollStep = -window.scrollY / (scrollDuration / 15);

        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }, []);

    const handleNavigation = useCallback(() => {
        sessionStorage.setItem('currentPage', currentPage);
        sessionStorage.setItem('scrollPosition', window.scrollY);
    }, [currentPage]);

    const paginatedItems = useMemo(() => visiblePages.flatMap(page => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredPokemon.slice(start, end);
    }), [visiblePages, filteredPokemon, itemsPerPage]);

    return (
        <PokemonContext.Provider value={{
            pokemon: paginatedItems,
            types,
            clearSearch,
            // handleChange,
            search,
            setSearch,
            getType,
            getPokemon,
            getById,
            currentPage,
            itemsPerPage,
            totalItems: filteredPokemon.length,
            paginate: loadMorePages,
            firstItemRef,
            lastItemRef,
            handleNavigation,
            filterTypes,
            setFilterTypes,
            someEveryType,
            setSomeEveryType
        }}>
            {children}

            {showScrollTopButton && (
                <button
                    onClick={scrollToTop}
                    className='fixed bottom-16 md:bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg border-none cursor-pointer 
                    hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800'>
                    <span>↑</span>
                    <span className='hidden md:inline-block ml-2'>Back to Top</span>
                </button>
            )}
        </PokemonContext.Provider>
    );
}

export const usePokemon = () => useContext(PokemonContext);
