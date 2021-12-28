import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Avatar, Grid, MenuItem, Select, Typography} from '@material-ui/core';
import DangerButton from "../../../../components/customs/DangerButton/DangerButton";
import {apiClient} from "../../../../api/_api";
import Snackbar from "../../../../components/material-ui/Snackbar/SnackbarUtils";
import {useSelector} from "react-redux";
import {IRootState} from "../../../../redux/RootReducer";
import {Link} from "react-router-dom";

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


export const ProjectMemberCard = (props: any) => {
    const slug = useSelector((state: IRootState) => state.project.slug)
    const status = useSelector((state: IRootState) => state.project.status?.status.code)

    const classes = useStyles();
    const [role, setRole] = React.useState(props.role === "ادمین" ? "ADMIN" : "ACCEPTED")

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>, username: string) => {
        setRole(event.target.value as string);
        apiClient.patch(`dashboard/projects/${slug}/members/${username}/`, {
            data: {
                status: event.target.value,
                user: username,
                project: ""
            },
            notifyMessage: true
        }).then(() => {
                Snackbar.success("تغییر سطح دسترسی با موفقیت تغییر یافت.");
                window.location.reload()
            }
        ).catch(() => {
            Snackbar.error("تغییر سطح دسترسی ناموفق بود.");
        })
    };


    const [deletedBtnLoading, setDeletedBtnLoading] = React.useState(false);

    const deleteMember = (username: string) => {
        setDeletedBtnLoading(true);
        apiClient.patch(`dashboard/projects/${slug}/members/${username}/`, {
            data: {
                status: 'DELETED',
                user: username,
                project: ""
            },
            notifyMessage: true
        }).then(() => {
                Snackbar.success("قبول درخواست با موفقیت انجام شد.");
                window.location.reload()
            }
        ).catch(() => {
            Snackbar.error("حذف فرد ناموفق بود.");
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
                                {props.role}
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
                        <Link to={props.url} style={{color: "white"}} data-test='Link'>مشاهده رزومه</Link>
                    </Button>
                    {
                        status !== "ENDED" && status !== "DELETED" ?
                            props.adminStatus && (props.role !== "ادمین" || props.userRole === "CREATOR") && props.role !== "سازنده" ?
                                <>
                                    <DangerButton size="small" color={"secondary"} label={"حذف فرد"}
                                                  disabled={deletedBtnLoading}
                                                  onClick={() => deleteMember(props.username)}/>
                                    <Select
                                        value={role}
                                        onChange={(event) => handleChange(event, props.username)}
                                        displayEmpty
                                    >
                                        <MenuItem value="ACCEPTED" data-test='MenuItem0'>عضو تیم</MenuItem>
                                        <MenuItem value="ADMIN" data-test='MenuItem1'>ادمین</MenuItem>
                                    </Select>
                                </> : null : null
                    }
                </CardActions>
            </Card>
        </div>

    );
}

export default ProjectMemberCard;