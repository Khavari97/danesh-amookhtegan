import React, {useState} from 'react';
import {Container, Grid, Typography} from "@material-ui/core";
import QuestionIcon from "../../../assets/images/icons/QuestionIcon";
import DangerButton from "../../../components/customs/DangerButton/DangerButton";
import ValidationModal from "../../../components/customs/ValidationModal/ValidationModal";
import {apiClient} from "../../../api/_api";
import Snackbar from "../../../components/material-ui/Snackbar/SnackbarUtils";
import {useSelector} from "react-redux";
import {IRootState} from "../../../redux/RootReducer";
import {useHistory} from "react-router-dom"
import { DashboardRoutesEnum } from '../../../navigation/RoutesEnum';

const RemoveProject = () => {
    const status = useSelector((store: IRootState) => store.project.status?.status.code)
    const slug = useSelector((store: IRootState) => store.project.slug)
    const history =useHistory()

    const [removeModal, setRemoveModal] = useState(false)
    const removeProject = () => {
        apiClient.patch(`dashboard/projects/${slug}/`, {
            data: {
                status: "DELETED"
            }
        })
            .then(() => {
                history.push(DashboardRoutesEnum.DESK_PROJECTS)
               
            }).catch(() => {
            Snackbar.error("درخواست حذف پروژه ناموفق بود")
        })
    }

    return (
        <>
            {
                status === "DELETED" || status === "ENDED" ?
                    <Typography component={"p"} variant={"body1"} style={{marginRight: 5, fontWeight: 100}}>
                        برای پروژه ای که حذف و یا پایان یافته این امکان وجود ندارد.
                    </Typography> :
                    <Container>
                        <ValidationModal title={"حذف پروژه"}
                                         description={"آیا از حذف پروژه اطمینان دارید؟ امکان بازگشت موجود نمی باشد"}
                                         open={removeModal}
                                         handleClose={() => {
                                             setRemoveModal(false)
                                         }}
                                         acceptHandler={removeProject}
                        />
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <span><QuestionIcon width={"1.2rem"}/></span>
                                    <Typography component={"p"} variant={"body1"}
                                                style={{marginRight: 5, fontWeight: 100}}>
                                        آیا مایل به حذف پروژه هستید ؟
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <DangerButton size={"small"} label={"حذف پروژه"} onClick={() => setRemoveModal(true)}/>
                            </Grid>
                        </Grid>
                    </Container>
            }
        </>
    )
}

export default RemoveProject;