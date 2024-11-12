
import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const FilterDial = ({ OpenButton, DialogContent, canBeOpened = true }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (!canBeOpened) return;
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div onClick={handleClickOpen} className={`${canBeOpened ? 'opacity-100' : 'opacity-50'}`}>
                <OpenButton />
            </div>

            <SwipeableDrawer
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                    },
                }}
                open={open}
                anchor='right'
                keepMounted
                onClose={handleClose}
                onOpen={handleClickOpen}
                aria-describedby="alert-dialog-slide-description">
                <DialogContent handleClose={handleClose} open={open} />
            </SwipeableDrawer >
        </>
    );
}

export default FilterDial;
