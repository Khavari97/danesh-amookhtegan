import React from 'react';
import {Box, Card, Chip, Grid, Typography} from "@material-ui/core";
import style from "../ProjectCard/ProjectCard.module.scss";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
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

export const ProjectsCard = (props: IProps) => {
    return (
        <Card style={{background: '#65a0bb'}}>
            <Grid container style={{direction: "rtl", textAlign: "right"}} className={style.cardHeader}>
                <Grid item>
                    <Typography
                        data-test='name'
                        style={{width: "200px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}
                        component="h1" variant={"h6"}>
                        {props.name}
                    </Typography>
                </Grid>
                <Box ml={"auto"} mb={1}>
                    <Chip data-test='status' size={"small"} variant="outlined" label={props.status?.label} clickable
                          className={style.cardLabel}/>
                </Box>
            </Grid>
            <CardContent className={style.cardDescription}
                         style={{background: "white", textAlign: "right", direction: "rtl"}}>
                <Typography data-test='description' variant={"inherit"} style={{wordWrap: "break-word"}}>
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions className={style.cardFooter} style={{background: "#65a0bb"}}>
                <Button className={style.descriptionBtn} size="small">
                    <Link to={props.url} style={{color: "#65a0bb"}} data-test="url">جزئیات</Link>
                </Button>
            </CardActions>
        </Card>

    );

}
export default ProjectsCard;