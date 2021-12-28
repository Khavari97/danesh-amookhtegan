import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        popover: {
            pointerEvents: 'none',
        },
        paper: {
            padding: theme.spacing(1),
        },
    }),
);

interface IProps {
    title: string
    children: any
}

const MouseOverPopover = (props: IProps) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (window.innerWidth > 1024) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handlePopoverClose = () => {
        if (window.innerWidth > 1024) {
            setAnchorEl(null);
        }
    };
    const open = Boolean(anchorEl);

    const children = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            onMouseEnter: handlePopoverOpen,
            onMouseLeave: handlePopoverClose
        });
    });
    return (
        <div>
            {children}
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>{props.title}</Typography>
            </Popover>
        </div>
    );
}
export default MouseOverPopover
