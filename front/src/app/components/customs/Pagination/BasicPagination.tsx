import React,{Component} from "react";
import Grid from "@material-ui/core/Grid";
import Pagination from '@material-ui/lab/Pagination';

interface IProps{
    count:number,
    onChange:any,
    siblingCount?:number,
    boundaryCount?:number,
    page?:number
}

const BasicPagination =(props:IProps)=>{

         return(
        <Grid style={{margin:'0 auto' , display:'table' ,padding:'40px 0'}}>
            <Pagination
                color="primary" shape="rounded" variant="outlined" size={"large"}
                count={props.count}
                onChange={props.onChange}
                siblingCount={props.siblingCount}
                boundaryCount={props.boundaryCount}
                page={props.page}
                defaultPage={1}
                />
        </Grid>
    )


}

export default BasicPagination