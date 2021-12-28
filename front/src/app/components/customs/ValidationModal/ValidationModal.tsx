import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button} from "@material-ui/core";
import DangerButton from "../DangerButton/DangerButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

interface IProps {
    title: string,
    description: string,
    open: boolean,
    handleClose: any,
    acceptHandler: any
}

const ValidationModal = (props: IProps) => {
    const classes = useStyles();

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={() => props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title" style={{marginBottom: 10}} data-test='title' >{props.title}</h2>
                        <p id="transition-modal-description" data-test='description' >{props.description}</p>
                        <div style={{display: "flex", justifyContent: "center", textAlign: "center", marginTop: 20}}>
                            <Button data-test='button' color={"primary"} variant={"contained"} size={"small"}
                                    style={{marginLeft: 10}} onClick={() => props.acceptHandler()}>بله</Button>
                            <DangerButton color={"primary"} variant={"contained"} label={"بستن"} size={"small"}
                                          onClick={() => {
                                              props.handleClose()
                                          }}/>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    );
}


export default ValidationModal