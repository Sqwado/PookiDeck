
import React, { createRef, useEffect } from 'react';

import { FormControl, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import CloseIcon from '@mui/icons-material/Close';
import { usePokemon } from '../../context/PokemonContext';

const Search = () => {

    const searchRef = createRef();

    const { search, handleChange, clearSearch } = usePokemon();

    useEffect(() => {
        searchRef.current.focus();
    }, []);

    return (
        <div className="px-4 pb-4">
            <FormControl className="flex justify-center w-full mx-auto bg-stone-200 dark:bg-stone-600 dark:text-white rounded-xl shadow-md" id="search">
                <InputGroup>
                    <Input type="text" placeholder="Rechercher" onChange={handleChange} ref={searchRef} autoComplete='off'
                        value={search} className="mt-0 w-full bg-transparent text-black dark:text-white p-2 rounded-xl" />
                    <InputRightElement h="100%" w="3rem">
                        <Button variant="ghost" className='bg-stone-200 bg-transparent w-full h-full shadow-xl'
                            onClick={clearSearch}>
                            <CloseIcon className='text-black dark:text-white' />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </div>
    );
}

export default Search;
