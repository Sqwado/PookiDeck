
import React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const TransitionUp = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionDown = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const TransitionLeft = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const TransitionRight = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const Transition = {
    up: TransitionUp,
    down: TransitionDown,
    left: TransitionLeft,
    right: TransitionRight,
}

const PopUpDial = ({ OpenButton, DialogContent, canBeOpened = true, direction = "up" }) => {
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

            <Dialog
                sx={{ "& .MuiDialog-paper": { margin: 0, padding: 0, maxHeight: '100%', maxWidth: '100%' } }}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
                open={open}
                TransitionComponent={Transition[direction]}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogContent handleClose={handleClose} open={open} />
            </Dialog>
        </>
    );
}

export default PopUpDial;
