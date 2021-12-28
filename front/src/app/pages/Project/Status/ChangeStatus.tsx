import React, {useState} from "react"
import {Button} from "@material-ui/core";
import {useSelector} from "react-redux";
import {IRootState} from "../../../redux/RootReducer";
import {apiClient} from "../../../api/_api";
import Snackbar from "../../../components/material-ui/Snackbar/SnackbarUtils";
import ValidationModal from "../../../components/customs/ValidationModal/ValidationModal";


const ChangeStatus = () => {
    const status = useSelector((store: IRootState) => store.project.status?.status.code)
    const slug = useSelector((store: IRootState) => store.project.slug)

    const startProject = () => {
        apiClient.patch(`dashboard/projects/${slug}/`, {
            data: {
                status: "STARTED"
            }
        }).then(() => {
            Snackbar.success("درخواست شروع پروژه با موفقیت انجام شد")
            window.location.reload()
        }).catch(() => {
            Snackbar.error("درخواست شروع پروژه ناموفق بود")
        })
    }

    const endProject = () => {
        apiClient.patch(`dashboard/projects/${slug}/`, {
            data: {
                status: "ENDED"
            }
        }).then(() => {
            Snackbar.success("درخواست پایان پروژه با موفقیت انجام شد")
            window.location.reload()
        }).catch(() => {
            Snackbar.error("درخواست پایان پروژه ناموفق بود")
        })
    }

    const [startModal, setStartModal] = useState(false)
    const [endModal, setEndModal] = useState(false)

    return (
        <>
            <ValidationModal title={"شروع پروژه"}
                             description={"آیا از شروع پروژه اطمینان دارید؟ امکان بازگشت موجود نمی باشد"}
                             open={startModal}
                             handleClose={() => {
                                 setStartModal(false)
                             }}
                             acceptHandler={startProject}
            />
            <ValidationModal title={"پایان پروژه"}
                             description={"آیا از پایان دادن پروژه اطمینان دارید؟ امکان بازگشت موجود نمی باشد"}
                             open={endModal}
                             handleClose={() => {
                                 setEndModal(false)
                             }}
                             acceptHandler={endProject}
            />
            {
                status === "WAITING" ?
                    <Button color={"primary"} size={"small"} variant={"contained"} onClick={() => setStartModal(true)}>برای
                        شروع پروژه کلیک
                        کنید</Button> : null
            }
            {
                status === "STARTED" ? <Button size={"small"} variant={"contained"} color={"secondary"}
                                               onClick={() => setEndModal(true)}>پایان پروژه</Button> : null
            }

        </>
    )
}

export default ChangeStatus