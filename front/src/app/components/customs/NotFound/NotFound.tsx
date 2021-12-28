import React from "react"
import {Grid, Typography} from "@material-ui/core"

interface IProps {
    label: string
}

const NotFound = (props: IProps) => {
    return (
        <Grid container justify={"center"} alignItems={"center"} style={{marginTop: "50px"}}>
            <Typography style={{marginRight: "10px"}}>{props.label}</Typography>
        </Grid>

    )
}

export default NotFound;