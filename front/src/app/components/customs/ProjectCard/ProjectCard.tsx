import React from 'react';
import {Box, Card, Chip, Grid, Typography} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import style from "./ProjectCard.module.scss"
import {Link} from "react-router-dom";

interface IProps {
    name: string,
    description: string,
    status: {
        code: string,
        label: string
    },
    url: string
}

export const ProjectCard = (props: IProps) => {

    return (
        <Card>
            <Grid container className={style.cardHeader}
                  style={{backgroundColor: projectStatusColor(props.status?.code)}}>
                <Grid item className={style.cardName}>
                    <Typography data-test='name' component="h1" variant={"h6"}
                                style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                        {props.name}
                    </Typography>
                </Grid>
                <Box ml={"auto"} mb={1}>
                    <Chip data-test='status' size={"small"} variant="outlined" label={props.status?.label} clickable
                          className={style.cardLabel}/>
                </Box>
            </Grid>
            <CardContent className={style.cardDescription}>
                <Typography data-test='description' variant={"inherit"} style={{wordWrap: "break-word"}}>
                    {props?.description}
                </Typography>
            </CardContent>
            <CardActions className={style.cardFooter} style={{backgroundColor: projectStatusColor(props.status?.code)}}>
                <Button className={style.descriptionBtn} size="small">
                    <Link to={props.url} style={{color: projectStatusColor(props.status?.code)}} data-test="url">جزئیات</Link>
                </Button>
            </CardActions>

        </Card>
    );

}

const projectStatusColor = (projectStatus: string) => {
    switch (projectStatus) {
        case "DELETED":
            return "#CA0000";
        case "ENDED":
            return "#0090D7";
        case "STARTED":
            return "#7DC02F";
        case "WAITING":
            return "#FFA010";
        default:
            return "#000000"
    }
}

export default ProjectCard;