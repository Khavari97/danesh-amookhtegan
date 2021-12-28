import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Avatar, Grid, Link, Typography} from '@material-ui/core';
import DangerButton from "../../../../components/customs/DangerButton/DangerButton";
import {apiClient} from "../../../../api/_api";
import Snackbar from "../../../../components/material-ui/Snackbar/SnackbarUtils";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    flexGrid: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 5
    },
    avatar: {
        width: 90,
        height: 90
    }
});

export const ProjectRequestCard = (props: any) => {
    const classes = useStyles();
    const [acceptBtnLoading, setAcceptBtnLoading] = React.useState(false);
    const [declinedBtnLoading, setDeclinedBtnLoading] = React.useState(false);

    const acceptRequest = (slug: string, username: string, projectId: number) => {
        setAcceptBtnLoading(true);
        apiClient.patch(`dashboard/projects/${slug}/members/${username}/`, {
            data: {
                status: 'ACCEPTED',
                user: username,
                project: projectId
            },
            notifyMessage: true
        }).then(() => {
                Snackbar.success("قبول درخواست با موفقیت انجام شد.");
                window.location.reload()
            }
        )
            .finally(() => {
                setAcceptBtnLoading(false)
            })
    }

    const declineRequest = (slug: string, username: string, projectId: number) => {
        setDeclinedBtnLoading(true);
        apiClient.patch(`dashboard/projects/${slug}/members/${username}/`, {
            data: {
                status: 'DECLINED',
                user: username,
                project: projectId
            },
            notifyMessage: true
        }).then(() => {
                Snackbar.success("رد درخواست با موفقیت انجام شد.");
                window.location.reload()
            }
        )
            .finally(() => {
                setDeclinedBtnLoading(false)
            })
    }
    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} className={classes.flexGrid}>
                            <Avatar variant={"circular"} src={props.avatar} className={classes.avatar}/>
                        </Grid>
                        <Grid item xs={12} className={classes.flexGrid}>
                            <Typography variant={"body1"} component={"p"}>{props.name}</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.flexGrid}>
                            <Typography variant={"body1"} component={"p"}>
                                {
                                    props.city && props.province ?
                                        props.city + " , " + props.province : "شهر و استان ثبت نشده"
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body1"} component={"p"}>
                                {props.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions style={{justifyContent: "center", alignItems: "center"}}>
                    <Button size="small" color={"secondary"} variant={"contained"}>
                        <Link href={props.url} style={{color: "white", textDecoration: "none"}}>رزومه</Link>
                    </Button> {
                    props.adminStatus ?
                        <>
                            <Button variant={"contained"} size={"small"} color={"primary"}
                                    disabled={acceptBtnLoading}
                                    onClick={() => acceptRequest(props.slug, props.username, props.projectId)}>قبول</Button>
                            <DangerButton size="small" color={"secondary"} label={"رد درخواست"}
                                          disabled={declinedBtnLoading}
                                          onClick={() => declineRequest(props.slug, props.username, props.projectId)}/>
                        </> : null
                }
                </CardActions>
            </Card>
        </div>

    );
}

export default ProjectRequestCard;