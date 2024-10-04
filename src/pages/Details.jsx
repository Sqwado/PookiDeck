
import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useParams } from 'react-router-dom';
import TypeBox from '../components/TypeBox';
import BackBtn from '../components/BackBtn';

const Details = () => {

    const { pokemon, getPokemon } = usePokemon();
    const { name } = useParams();

    const selectedPokemon = getPokemon(name);

    if (!selectedPokemon) {
        return (
            <div className="p-4">
                <BackBtn />
                <div className="flex justify-center items-center">
                    <h1 className="text-3xl font-semibold text-black dark:text-white">Pokemon introuvable</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <BackBtn />
            <div className="flex justify-center items-center">
                <h1 className="text-3xl font-semibold text-black dark:text-white">{selectedPokemon.names.en}</h1>
            </div>
            <div className="flex justify-center">
                <img src={selectedPokemon.image} alt={selectedPokemon.names.en} className="w-40 h-40" />
            </div>
            <div className="flex justify-center w-full">
                {selectedPokemon.types.map((type, index) => (
                    <TypeBox key={index} type={type} />
                ))}
            </div>
        </div>
    );
}

export default Details;
