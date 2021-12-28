import React from "react";
import {Box, CircularProgress, Grid} from "@material-ui/core";


const Loading = () => {
    return (
        <Grid container alignItems={"center"} justify={"center"}>
            <Box mt={5}>
                <CircularProgress/>
            </Box>
        </Grid>
    )
}

export default Loading;