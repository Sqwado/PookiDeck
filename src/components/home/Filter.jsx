
import React, { useState, useEffect } from 'react';
import FilterDial from '../FilterDial';
import { Button } from '@chakra-ui/react';
import { CiFilter } from 'react-icons/ci';
import { CloseIcon } from '@chakra-ui/icons';
import { FormControl, Stack, Typography, Switch } from '@mui/material';
import Foldable from '../Foldable';
import { usePokemon } from '../../context/PokemonContext';
import { useTranslation } from 'react-i18next';


const Filter = () => {
    const { t } = useTranslation();

    const DialogContent = (props) => {
        props = props.props;

        const { filterTypes, setFilterTypes, someEveryType, setSomeEveryType, types } = usePokemon();
        const listTypes = Object.keys(types).map((key) => { return { id: key, ...types[key] } });

        const [searchTypes, setSearchTypes] = useState(listTypes);

        useEffect(() => {
            setSearchTypes(listTypes);
        }, [types]);

        const [typeOpen, setTypeonentOpen] = useState(false);
        const [typesSearch, setTypesSearch] = useState('');

        const [filteredTypes, setFilteredTypes] = useState([]);

        const [localSomeEveryType, setLocalSomeEveryType] = useState(true);

        useEffect(() => {
            setFilteredTypes(filterTypes);
            setLocalSomeEveryType(someEveryType);
        }, []);

        useEffect(() => {
            setFilteredTypes(filterTypes);
            setLocalSomeEveryType(someEveryType);
        }, [filterTypes, someEveryType]);

        const handleCancel = () => {
            setTypeonentOpen(false);
            props.handleClose();
        }

        const handleReset = () => {
            setFilterTypes([]);
            setTypeonentOpen(false);
            setSomeEveryType(true);
            props.handleClose();
        }

        const handleApply = () => {
            setFilterTypes(filteredTypes);
            setSomeEveryType(localSomeEveryType);
            props.handleClose();
        }

        useEffect(() => {
            if (typesSearch === '') {
                setSearchTypes(listTypes);
                return;
            }
            setSearchTypes(listTypes.filter((type) => {
                return Object.values(type.translations).some(name =>
                    name.toLowerCase().includes(typesSearch.toLowerCase())
                );
            }));
        }, [typesSearch]);

        return (
            <div className="flex flex-col items-center justify-between shadow-lg p-6 space-y-4 border-2 border-black dark:border-white rounded-lg bg-opacity-20 backdrop-blur-sm bg-interactive w-screen lg:w-[30rem] h-screen overflow-y-scroll">
                <div className="flex flex-col items-center justify-between w-full">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-xl font-semibold text-black dark:text-white bg-white dark:bg-black rounded-lg shadow-md p-2 text-center"> {t('filter.title')} </h1>
                        <Button className=" bg-red-500 text-white rounded-lg shadow-md m-2 p-2 text-center hover:bg-red-600"
                            onClick={handleCancel}>
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full bg-white dark:bg-black rounded-lg shadow-md border-2 border-black dark:border-white">
                        <FormControl sx={{ borderRadius: '12px', width: '100%', minWidth: '15rem' }}>
                            <Stack direction="row" spacing={1} alignItems="center" className="bg-white dark:bg-black px-2 py-1 rounded-lg">
                                <Typography className="text-black dark:text-white">{t('filter.some')}</Typography>
                                <Switch sx={{ color: 'white', backgroundColor: 'transparent', borderRadius: '12px' }}
                                    onChange={(e) => setLocalSomeEveryType(e.target.checked)}
                                    checked={localSomeEveryType} />
                                <Typography className="text-black dark:text-white">{t('filter.every')}</Typography>
                            </Stack>

                            <Foldable displayName={t('filter.types')} open={typeOpen} setOpen={setTypeonentOpen} showSearch={true} search={typesSearch} setSearch={setTypesSearch}
                                items={searchTypes} selectMultiple={true} multipleSelectedItems={filteredTypes} setSelectedItems={setFilteredTypes} underline={false} />
                        </FormControl>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <Button className="bg-red-500 text-white rounded-lg shadow-md m-2 p-2 text-center hover:bg-red-600"
                        onClick={handleReset}>
                        {t('filter.reset')}
                    </Button>
                    <Button className="bg-green-500 text-white rounded-lg shadow-md m-2 p-2 text-center hover:bg-green-600"
                        onClick={handleApply}>
                        {t('filter.apply')}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <FilterDial OpenButton={() =>
            <Button className="bg-white dark:bg-black rounded-lg shadow-md p-2 text-center hover:bg-gray-200 dark:hover:bg-gray-800 border-0">
                <CiFilter className="inline-block sm:mr-2 text-black dark:text-white" />
                <p className="hidden sm:block text-black dark:text-white">{t('filter.button')}</p>
            </Button>}
            DialogContent={(props) => (
                <DialogContent props={props} />
            )}
            canBeOpened={true} />
    )
}

export default Filter;
