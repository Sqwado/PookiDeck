
import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useParams } from 'react-router-dom';
import TypeBox from '../components/TypeBox';
import BackBtn from '../components/BackBtn';
import { useTranslation } from 'react-i18next';
import DocumentTitle from '../utils/DocumentTitle';
import TextToSpeach from '../components/TextToSpeach';
import Moves from '../components/details/Moves';
import TopBar from '../components/TopBar';

const Details = () => {

    const { t, i18n } = useTranslation();

    const { pokemon, getById } = usePokemon();
    const { id } = useParams();

    const selectedPokemon = getById(id);

    return (
        <>
            <TopBar />
            <div className="p-4 space-y-4">
                <BackBtn />
                {!selectedPokemon ?
                    <div className="flex justify-center items-center">
                        <h1 className="text-3xl font-semibold text-black dark:text-white">Pokemon introuvable</h1>
                    </div> :
                    <>
                        {DocumentTitle("PokideX - " + selectedPokemon?.names[i18n.language])}
                        <div className="flex justify-center w-full">
                            <p className="text-gray-500 dark:text-gray-400">#{selectedPokemon.id}</p>
                        </div>
                        <div className="flex justify-center items-center space-x-4">
                            <h1 className="text-3xl font-semibold text-black dark:text-white">{selectedPokemon.names[i18n.language]}</h1>
                            <TextToSpeach text={selectedPokemon.names[i18n.language]} />
                        </div>
                        <div className="flex justify-center">
                            <img src={selectedPokemon.image} alt={selectedPokemon.names[i18n.language]} className="w-40 h-40" />
                        </div>
                        <div className="flex justify-center w-full">
                            <p className="text-gray-500 dark:text-gray-400">{t('details.size')}: {(selectedPokemon.height * 0.1).toFixed(2)}m</p>
                            <p className="text-gray-500 dark:text-gray-400 ml-4">{t('details.weight')}: {(selectedPokemon.weight * 0.1).toFixed(2)}kg</p>
                        </div>
                        <div className="flex justify-center w-full">
                            {selectedPokemon.types.map((type, index) => (
                                <TypeBox key={index} type={type} />
                            ))}
                        </div>
                        <div className="flex justify-center w-full">
                            <Moves moves={selectedPokemon.moves} />
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default Details;
