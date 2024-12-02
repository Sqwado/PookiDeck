
import React, { useEffect, useCallback, useMemo } from 'react';
import { Button, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { ListItemText, Collapse, List, ListItem, ListItemButton, Checkbox } from '@mui/material';
import { CloseIcon } from '@chakra-ui/icons';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Item = React.memo(({ item, underline = true, selected = false, selectMultiple, multipleSelectedItems, handleChange = () => { }, clickHandler }) => {
    if (!item) return null;

    const { i18n } = useTranslation();

    return (
        <div className='border-2 border-black dark:border-white rounded-lg m-1'>
            <ListItem
                sx={{
                    borderRadius: '7px',
                    backgroundColor: selected ? 'rgb(0 0 44)' : item.backgroundColor || 'black',
                    color: 'white',
                    cursor: 'pointer',
                    '&:hover': { opacity: '0.8' },
                    // ...(underline ? { '&:not(:last-child)': { borderBottom: '1px solid rgb(59 130 246)' } } : {})
                }}
                onClick={() => selectMultiple ? clickHandler(item.id) : handleChange(item)}>
                {selectMultiple && (
                    <Checkbox
                        checked={multipleSelectedItems.includes(item.id)}
                        value={item.id}
                        sx={{ color: 'white', '&.Mui-checked': { color: 'rgb(0 0 0)' } }} />
                )}
                <p className='text-black dark:text-white font-bold text-lg'>
                    {item.translations[i18n.language] || item.name}
                </p>
            </ListItem>
        </div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.item === nextProps.item &&
        prevProps.selected === nextProps.selected &&
        prevProps.multipleSelectedItems === nextProps.multipleSelectedItems
    );
});

const Foldable = ({
    displayName = "",
    selectMultiple = false,
    open,
    setOpen,
    items,
    selectedItem = null,
    multipleSelectedItems = [],
    handleChange,
    setSelectedItems = () => { },
    showSearch = false,
    colapseable = true,
    search = '',
    setSearch = () => { }
}) => {

    useEffect(() => {
        setOpen(!colapseable);
    }, []);

    const handleToggleOpen = useCallback(() => {
        // Only toggle if colapseable is true and the menu isn't already open for the selected item
        if (colapseable) {
            setOpen((prev) => !prev);
        }
    }, [colapseable, open, selectedItem, setOpen]);

    const clickHandler = useCallback((id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
        );
    }, [setSelectedItems]);

    return (
        <div className="flex flex-col justify-center w-full border-2 border-black dark:border-white rounded-lg bg-white dark:bg-black shadow-lg
        min-w-[270px]">
            <ListItemButton
                onClick={handleToggleOpen}  // Only toggle when clicking the ListItemButton
                sx={{
                    color: 'white', borderRadius: '7px'
                }}>
                {displayName && <ListItemText className="text-black dark:text-white"
                    primary={displayName} />}
                <Item item={selectedItem} underline={false} selected={false} />
                {selectMultiple && (
                    <p className="text-md bg-black dark:bg-white
                     text-white dark:text-black rounded-lg shadow-md p-2 text-center">
                        {multipleSelectedItems.length}/{items.length}
                    </p>
                )}
                {colapseable && (open ? <ExpandLess className="text-black dark:text-white" /> : <ExpandMore className="text-black dark:text-white" />)}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit sx={{ maxHeight: '20rem', overflowY: 'auto' }}
                className="rounded-lg border-2 border-black dark:border-white shadow-lg">
                {showSearch && (
                    <ListItem key="search" className="flex items-center justify-between" sx={{ backgroundColor: 'transparent', color: 'white', cursor: 'pointer', paddingX: '1rem' }}>
                        <InputGroup>
                            <Input
                                autoComplete='off'
                                type="text"
                                placeholder="Rechercher"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                className="w-full h-10 px-3 rounded-lg shadow-md bg-white dark:bg-black text-black dark:text-white"
                                border={1} />
                            <InputRightElement h="100%" w="3.5rem">
                                <Button variant="ghost" onClick={() => setSearch('')}>
                                    <CloseIcon />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </ListItem>
                )}
                <List sx={{ padding: '0' }}>
                    {items.length === 0 && (
                        <ListItem sx={{ padding: '0.75rem' }}>
                            <ListItemText primary="Aucun élément trouvé" />
                        </ListItem>
                    )}
                    {items.map((item) => (
                        <Item key={item.id}
                            item={item}
                            selected={selectedItem?.id === item.id}
                            selectMultiple={selectMultiple}
                            multipleSelectedItems={multipleSelectedItems}
                            handleChange={handleChange}
                            clickHandler={clickHandler} />
                    ))}
                </List>
            </Collapse>
        </div>
    );
};

export default Foldable;
