import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Avatar, Grid, Link, Typography} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        padding: "0 10px",
        maxWidth: "400px",
    },
    flexGrid: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 5
    },
    avatar: {
        width: 90,
    }
});

export interface IMemberCardProps {
    avatar: string,
    firstName: string,
    lastName: string
    city: string,
    province: string,
    description: string,
    url: string
}

export const MemberCard = (props: IMemberCardProps) => {
    const classes = useStyles();

    return (
        <div>
            <Card>
                <CardContent className={classes.root}>
                    <Grid container>
                        <Grid item xs={12} className={classes.flexGrid}>
                            <Avatar variant={"circle"} src={props.avatar} style={{width: 100, height: 100}}/>
                        </Grid>
                        <Grid data-test='name' item xs={12} className={classes.flexGrid}>
                            <Typography  variant={"body1"}
                                        component={"p"}>{props.firstName + " " + props.lastName}</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.flexGrid}>

                            <Typography  data-test='city' variant={"body1"} component={"p"}>
                                {
                                    props.city && props.province ?
                                        props.city + " , " + props.province : "شهر و استان ثبت نشده"
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{direction: "rtl", textAlign: "right"}}>
                            <Typography  data-test='desc' style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}
                                        variant={"body1"} component={"p"}>
                                {props.description ?
                                    props.description : "توضیحاتی موجود نیست"
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions style={{justifyContent: "center", alignItems: "center"}}>
                    <Button size="small" color={"secondary"} variant={"contained"}>
                        <Link href={props.url} style={{color: "white", textDecoration: "none"}}>مشاهده رزومه</Link>
                    </Button>
                </CardActions>
            </Card>
        </div>

    );
}

export default MemberCard;