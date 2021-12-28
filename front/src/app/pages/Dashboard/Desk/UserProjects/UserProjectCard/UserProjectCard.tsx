import React from 'react';
import {Box, Card, Chip, Grid, Typography} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import style from "./UserProjectCard.module.scss"
import {IProjectCard, ProjectsStatus} from "../../../../../redux/Dashboard/Desk/ActionTypes";
import {Link} from "react-router-dom";


export const UserProjectCard = (props: IProjectCard) => {

    return (
        <Card>
            <Grid container className={style.cardHeader}
                  style={{backgroundColor: projectStatusColor(props.status.code)}}>
                <Grid item>
                    <Typography component="h1" variant={"h6"} style={{
                        width: "150px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                    }}>
                        {props.name}
                    </Typography>
                </Grid>
                <Box ml={"auto"} mb={1}>
                    <Chip size={"small"} variant="outlined" label={props.role} clickable className={style.cardLabel}/>
                    <Chip size={"small"} variant="outlined" label={props.status.label} clickable
                          className={style.cardLabel}/>
                </Box>
            </Grid>
            <CardContent className={style.cardDescription}>
                <Typography variant={"inherit"} style={{wordWrap: "break-word"}}>
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions className={style.cardFooter} style={{backgroundColor: projectStatusColor(props.status.code)}}>
                <Button className={style.descriptionBtn} size="small">
                    <Link to={props.url} style={{color: projectStatusColor(props.status.code)}}>جزئیات</Link>
                </Button>
            </CardActions>
        </Card>
    );

}

const projectStatusColor = (projectStatus: ProjectsStatus) => {
    switch (projectStatus) {
        case ProjectsStatus.DELETED:
            return "#CA0000";
        case ProjectsStatus.ENDED:
            return "#0090D7";
        case ProjectsStatus.STARTED:
            return "#7DC02F";
        case ProjectsStatus.WAITING:
            return "#FFA010";
        default:
            return "#000000"
    }
}

export default UserProjectCard;