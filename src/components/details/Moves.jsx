
import React from 'react';
import PopUpDial from '../PopUpDial.jsx';
import { Button } from '@chakra-ui/react';
import { IoClose } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const Moves = ({ moves }) => {

    const { t } = useTranslation();

    moves = moves.sort();

    const DialogContent = ({ props }) => {

        const handleClose = () => {
            props.handleClose();
        }

        return (
            <div className="flex flex-col items-center shadow-lg sm:p-6 border-2 border-black dark:border-white rounded-lg 
            bg-white dark:bg-black
            space-y-4 w-screen h-screen sm:w-[100%] sm:h-[90%] overflow-y-scroll">
                <div className="flex justify-between w-full">
                    <h1 className="text-2xl font-semibold text-black dark:text-white">{t('details.moves')}</h1>
                    <Button onClick={handleClose} className="bg-red-500 p-2 rounded-xl">
                        <p className="text-white text-center text-xl font-semibold">{t('close')}</p>
                        <IoClose className="text-white text-2xl" />
                    </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                    {moves.map((move, index) => (
                        <div key={index} className="rounded-xl shadow-md border-2 border-black dark:border-white p-4">
                            <p className="text-black dark:text-white text-center text-lg font-semibold">{move}</p>
                        </div>
                    ))}
                </div>
            </div>
        );

    };

    return (
        <PopUpDial
            OpenButton={() => (
                <div className="rounded-xl shadow-md border-2 border-black dark:border-white flex justify-center items-center">
                    <Button
                        className='bg-white dark:bg-black
                         p-2 rounded-xl'>
                        <p className="text-black dark:text-white text-center text-xl font-semibold">{t('details.moves')}</p>
                    </Button>
                </div>
            )}
            DialogContent={(props) => (
                <DialogContent props={props} />
            )}
            direction='left' />
    );
};

export default Moves;

