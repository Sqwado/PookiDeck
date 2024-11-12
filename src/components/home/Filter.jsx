
import React from 'react';
import { FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import FilterDial from '../FilterDial';
import { Button, Icon } from '@chakra-ui/react';
import { CiFilter } from 'react-icons/ci';
import { CloseIcon } from '@chakra-ui/icons';
import { Stack, Typography, Switch } from '@mui/material';
import Foldable from '../Foldable';
import { usePokemon } from '../../context/PokemonContext';

const Filter = () => {

    const DialogContent = (props) => {
        props = props.props;

        const { filterTypes, setFilterTypes, someEveryType, setSomeEveryType, types } = usePokemon();
        const listTypes = Object.keys(types).map((key) => { return { id: key, ...types[key] } });

        const [typeOpen, setTypeonentOpen] = useState(false);
        const [typesSearch, setTypesSearch] = useState('');

        const [filteredTypes, setFilteredTypes] = useState([]);

        const [localSomeEveryType, setLocalSomeEveryType] = useState(someEveryType);

        useEffect(() => {
            setFilteredTypes(filterTypes);
        }, [filterTypes]);

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

        // const callTypes = async () => {
        //     let end = await getTypes({ search: typesSearch, addSuppliers: true }, axiosPrivate);
        //     if (end.status === 200) {
        //         setTypes(end.data);
        //     } else if (end.status === 404) {
        //         setTypes([]);
        //     }
        // }

        // useEffect(() => {
        //     callTypes();
        // }, []);

        // useEffect(() => {
        //     if (typeOpen) {
        //         callTypes();
        //     }
        // }, [typeOpen, typesSearch]);


        return (
            <div className="flex flex-col items-center justify-between shadow-lg p-6 space-y-4 border-2 border-blue-500 rounded-lg bg-opacity-20 backdrop-blur-sm bg-interactive w-screen lg:w-[30rem] h-screen overflow-y-scroll">
                <div className="flex flex-col items-center justify-between w-full">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-xl font-semibold text-black dark:text-white bg-white dark:bg-black rounded-lg shadow-md p-2 text-center">Filtrer les kits</h1>
                        <Button className=" bg-red-500 text-white rounded-lg shadow-md m-2 p-2 text-center hover:bg-red-600"
                            onClick={handleCancel}>
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4 w-full">
                        <FormControl sx={{ m: 1, border: '2px solid rgb(59 130 246)', borderRadius: '12px', width: '100%', minWidth: '15rem' }}>
                            <Stack direction="row" spacing={1} alignItems="center" className="bg-white dark:bg-black px-2 py-1 rounded-lg shadow-md">
                                <Typography className="text-black dark:text-white">Some</Typography>
                                <Switch sx={{ color: 'white', backgroundColor: 'transparent', borderRadius: '12px' }}
                                    onChange={(e) => setLocalSomeEveryType(e.target.checked)}
                                    checked={localSomeEveryType} />
                                <Typography className="text-black dark:text-white">Every</Typography>
                            </Stack>

                            <Foldable displayName="Types" open={typeOpen} setOpen={setTypeonentOpen} showSearch={true} search={typesSearch} setSearch={setTypesSearch}
                                items={listTypes} selectMultiple={true} multipleSelectedItems={filteredTypes} setSelectedItems={setFilteredTypes} />
                        </FormControl>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <Button className="bg-red-500 text-white rounded-lg shadow-md m-2 p-2 text-center hover:bg-red-600"
                        onClick={handleReset}>
                        Réinitialiser
                    </Button>
                    <Button className="bg-green-500 text-white rounded-lg shadow-md m-2 p-2 text-center hover:bg-green-600"
                        onClick={handleApply}>
                        Appliquer
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <FilterDial OpenButton={() =>
            <Button className="bg-blue-500 text-white rounded-lg shadow-md p-2 text-center hover:bg-blue-600">
                <Icon as={CiFilter} />
                <p className="hidden lg:block">Filtrer</p>
            </Button>}
            DialogContent={(props) => (
                <DialogContent props={props} />
            )}
            canBeOpened={true} />
    )
}

export default Filter;
