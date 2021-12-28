import React from 'react';
import {Box, Card, Chip, Grid, Typography} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import style from "./RequestCard.module.scss"
import {IRequestedCard, RequestsStatus,} from "../../../../../redux/Dashboard/Desk/ActionTypes";
import {Link} from "react-router-dom";


export const RequestCard = (props: IRequestedCard) => {

    return (
        <Card>
            <Grid container className={style.cardHeader}
                  style={{backgroundColor: projectStatusColor(props.status.code)}}>
                <Grid item>
                    <Typography component="h1" variant={"h6"} data-test='TypographyName'>
                        {props.name}
                    </Typography>
                </Grid>
                <Box ml={"auto"} mb={1} >
                    <Chip size={"small"} variant="outlined" label={props.status.label} clickable
                          className={style.cardLabel} data-test='Box'/>
                </Box>
            </Grid>
            <CardContent className={style.cardDescription} >
                <Typography variant={"inherit"} style={{wordWrap: "break-word"}} data-test='TypographyDes'>
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions className={style.cardFooter}
                         style={{backgroundColor: projectStatusColor(props.status.code)}}>
                <Button className={style.descriptionBtn} size="small"
                        style={{color: projectStatusColor(props.status.code)}}>
                    <Link to={props.url} style={{color: projectStatusColor(props.status.code)}} data-test='Link'>جزئیات</Link>
                </Button>
            </CardActions>
        </Card>
    );

}

const projectStatusColor = (requestStatus: RequestsStatus) => {
    switch (requestStatus) {
        case RequestsStatus.PENDING:
            return "#707070";
        case RequestsStatus.DECLINED:
            return "#E3242B";
        default:
            return "#000000"
    }
}

export default RequestCard;