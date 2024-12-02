
import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import Search from '../components/home/Search';
import PokeCard from '../components/home/PokeCard';
import DocumentTitle from '../utils/DocumentTitle';
import TopBar from '../components/TopBar';

const Home = () => {

    const { pokemon, loading, firstItemRef, lastItemRef } = usePokemon();

    DocumentTitle('PokideX - Accueil');

    return (
        <div>
            <TopBar />
            <Search />

            <div ref={firstItemRef}></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {loading &&
                    <p className="text-center text-2xl font-semibold">Chargement...</p>
                }
                {pokemon.map(pokemon => (
                    <PokeCard key={pokemon.id} pokemon={pokemon} />
                ))}

            </div>
            <div ref={lastItemRef}></div>
        </div>
    );
}

export default Home;
