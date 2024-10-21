
import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useParams } from 'react-router-dom';
import TypeBox from '../components/TypeBox';
import BackBtn from '../components/BackBtn';
import { useTranslation } from 'react-i18next';
import DocumentTitle from '../utils/DocumentTitle';

const Details = () => {

    const { t, i18n } = useTranslation();

    const { pokemon, getById } = usePokemon();
    const { id } = useParams();

    const selectedPokemon = getById(id);

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

    DocumentTitle("PokideX - " + selectedPokemon.names[i18n.language]);

    return (
        <div className="p-4">
            <BackBtn />
            <div className="flex justify-center items-center">
                <h1 className="text-3xl font-semibold text-black dark:text-white">{selectedPokemon.names[i18n.language]}</h1>
            </div>
            <div className="flex justify-center">
                <img src={selectedPokemon.image} alt={selectedPokemon.names[i18n.language]} className="w-40 h-40" />
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
