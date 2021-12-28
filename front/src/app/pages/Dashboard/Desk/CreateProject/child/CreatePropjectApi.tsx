import {apiClient} from "../../../../../api/_api";
import Snackbar from "./../../../../../components/material-ui/Snackbar/SnackbarUtils";

import axios from "axios";

async function getPurpose() {
    const token =
        "Bearer " +
        (localStorage.getItem("access") == null
            ? ""
            : localStorage.getItem("access"));

    return axios({
        method: "get",
        url: "list/skills",
        baseURL: "http://localhost:8000/",
        headers: {"Content-Type": "application/json", Authorization: token},
    });
}

async function getSkills(id: string) {
    const token =
        "Bearer " +
        (localStorage.getItem("access") == null
            ? ""
            : localStorage.getItem("access"));

    return axios({
        method: "get",
        url: `list/skills/?skill=${id}`,
        baseURL: "http://localhost:8000/",
        headers: {"Content-Type": "application/json", Authorization: token},
    });
}

async function createProject(params: object) {
  apiClient
    .post("dashboard/projects/", {
      data: params,
    })
    .then((res) => {
      window.location.href = res.url
      console.log(res)
      Snackbar.success("پروژه با موفقیت ایجاد شد");
    })
    .catch((error) => {
      console.log(error)
      Snackbar.error("نام پروژه نباید تکراری باشد");
    });
}

export {getPurpose, getSkills, createProject};
