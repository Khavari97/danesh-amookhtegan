import React from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import QuestionIcon from "../../../assets/images/icons/QuestionIcon";
import { apiClient } from "../../../api/_api";
import Snackbar from "../../../components/material-ui/Snackbar/SnackbarUtils";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/RootReducer";

const MembershipRequest = () => {
  const slug = useSelector((state: IRootState) => state.project.slug);
  const username = useSelector(
    (state: IRootState) => state.userProfile.briefprofile.username
  );
  const status = useSelector(
    (state: IRootState) => state.project.status?.status.code
  );
  const role = useSelector(
    (state: IRootState) => state.project.status?.role.code
  );

  const [requestBtn, setRequestBtnLoading] = React.useState(false);

  const request = () => {
    setRequestBtnLoading(true);
    apiClient
      .post(`dashboard/projects/${slug}/members/`, {
        data: {
          status: "PENDING",
          user: username,
        },
      })
      .then(() => {
        Snackbar.success("درخواست عضویت شما با موفقیت ارسال شد.");
        window.location.reload();
      })
      .catch(() => {
        setRequestBtnLoading(false);
        Snackbar.error("درخواست با خطا رو به رو شد.");
      });
  };

  const showMessage = () => {
    switch (role) {
      case "DECLINED":
        return "درخواست شما برای این پروژه رد شده است";
      case "DELETED":
        return "شما از این پروژه حذف شده اید";
      default:
        return "امکان در خواست برای پروژه های پایان یافته و حذف شده موجود نمی‌باشد.";
    }
  };

  return (
    <Container>
      {status === "DELETED" ||
      status === "ENDED" ||
      role === "DECLINED" ||
      role === "DELETED" ? (
        <Typography
          component={"p"}
          variant={"body1"}
          style={{ marginRight: 5, fontWeight: 100 }}
        >
          {showMessage()}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>
                <QuestionIcon width={"1.2rem"} />
              </span>
              <Typography
                component={"p"}
                variant={"body1"}
                style={{ marginRight: 5, fontWeight: 100 }}
                data-test="Typography"
              >
                آیا مایل به همکاری در این پروژه هستید ؟
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            {role === "PENDING" ? (
              <Button
                size={"small"}
                color={"primary"}
                variant="contained"
                onClick={() => request()}
                disabled={true}
                data-test="button0"
              >
                در انتظار تایید
              </Button>
            ) : (
              <Button
                size={"small"}
                color={"primary"}
                variant="contained"
                onClick={() => request()}
                disabled={requestBtn}
                data-test="button1"
              >
                عضویت در پروژه
              </Button>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default MembershipRequest;
