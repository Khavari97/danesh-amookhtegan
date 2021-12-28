import React from 'react';
import {Container, Grid, Typography} from "@material-ui/core";
import QuestionIcon from "../../../assets/images/icons/QuestionIcon";
import DangerButton from "../../../components/customs/DangerButton/DangerButton";
import {useSelector} from "react-redux";
import {IRootState} from "../../../redux/RootReducer";
import {apiClient} from "../../../api/_api";
import Snackbar from "../../../components/material-ui/Snackbar/SnackbarUtils";

const CancelCooperation = () => {
    const slug = useSelector((state: IRootState) => state.project.slug)
    const username = useSelector((state: IRootState) => state.userProfile.briefprofile.username)

    const [cancelCooperationBtn, setCancelCooperationBtn] = React.useState(false);

    const cancel = () => {
        setCancelCooperationBtn(true);
        apiClient.patch(`dashboard/projects/${slug}/members/${username}/`, {
            data: {
                status: 'DELETED',
                project: ""
            },
        }).then(() => {
                Snackbar.success("لغو همکاری شما با موفقیت انجام شد.");
                window.location.reload()
            }
        )
            .catch(() => {
                setCancelCooperationBtn(false)
                Snackbar.error("درخواست با خطا رو به رو شد.");
            })
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span><QuestionIcon width={"1.2rem"}/></span>
                        <Typography component={"p"} variant={"body1"} style={{marginRight: 5, fontWeight: 100}} data-test='Typography'>
                            آیا مایل به لغو همکاری هستید ؟
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <DangerButton size={"small"} label={"درخواست لغو همکاری"} onClick={() => cancel()}
                                  disabled={cancelCooperationBtn} data-test='DangerButton'/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CancelCooperation;