
import React from 'react';
import TypeBox from '../TypeBox';
import LazyImage from '../../utils/LazyImage';
import PokeBall from '../../assets/pokeball.gif';
import { Link } from 'react-router-dom';

const PokeCard = ({ pokemon }) => {

    return (
        <Link to={`/details/${pokemon.names.en}`} className="w-full">
            <div className="bg-white dark:bg-stone-800 rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 
        cursor-pointer hover:shadow-lg flex flex-col items-center justify-center space-y-2" key={pokemon.id}>
                <p className="text-gray-500 dark:text-gray-400 w-full text-right">#{pokemon.id}</p>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{pokemon.names.en}</h2>
                <div className="flex justify-center">
                    <LazyImage
                        placeholderSrc={PokeBall}
                        placeholderClassName="w-40 h-40"
                        src={pokemon.image}
                        alt={pokemon.names.en}
                        className="w-40 h-40"
                    />
                </div>
                <div className="flex justify-center w-full">
                    {pokemon.types.map((type, index) => (
                        <TypeBox key={index} type={type} />
                    ))}
                </div>
            </div>
        </Link>
    );
}

export default PokeCard;

