
import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import Search from '../components/home/Search';
import PokeCard from '../components/home/PokeCard';

const Home = () => {

    const { pokemon, loading, firstItemRef, lastItemRef } = usePokemon();

    return (
        <div>
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
