import axios, {AxiosRequestConfig, AxiosResponse, Method} from "axios";
import {StatusCodeEnums} from "./StatusCodeEnums";
import Snackbar from "../components/material-ui/Snackbar/SnackbarUtils";
import {handleSignOut, isAuthenticated} from "./storage";
import {AuthRoutesEnum} from "../navigation/RoutesEnum";

export const baseUrl = 'http://localhost:8000/'
export const adminUrl = baseUrl + "admin"
const apiPath = ''

export const apiUrl = baseUrl + apiPath;
const token = "Bearer " + (localStorage.getItem("access") == null ? '' : localStorage.getItem("access"))

export interface ApiClientRequestConfig extends AxiosRequestConfig {
    notifyMessage?: boolean,
    consoleMessage?: boolean,
}

export const defaultConfig: ApiClientRequestConfig = {
    notifyMessage: false,
    consoleMessage: false,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': isAuthenticated() ? token : ""
    },
}

class ApiClient {
    get(url: string, config = defaultConfig) {
        return apiClientBaseRequest(url, config, 'get');
    }

    post(url: string, config = defaultConfig) {
        return apiClientBaseRequest(url, config, 'post');
    }

    patch(url: string, config = defaultConfig) {
        return apiClientBaseRequest(url, config, 'patch');
    }

    delete(url: string, config = defaultConfig) {
        return apiClientBaseRequest(url, config, 'delete');
    }
}


const apiClientBaseRequest = (url: string, config = defaultConfig, method: Method) => {
    return new Promise<any>((resolve, reject) => {
        axios({
            ...defaultConfig,
            method: method,
            url: apiUrl + url,
            ...config,
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error: any) => {
                if (error.response) {

                    HandleError(error.response, config.notifyMessage)
                    if (config.consoleMessage) console.log(error.response)
                    reject(error.response)
                } else {
                    Snackbar.warning("سرور به مشکل خورده است، دوباره امتحان کنید.")
                }
            })
    })
}

const HandleError = (error: AxiosResponse, notifyMessage: boolean | undefined) => {

    switch (error.status) {
        case StatusCodeEnums.ERROR:
            break;
        case StatusCodeEnums.INTERNAL_SERVER_ERROR:
            Snackbar.error("سرور به مشکل خورده است، دوباره امتحان کنید.")
            break;
        case StatusCodeEnums.PERMISSION_DENIED:
            Snackbar.error(error.data.detail)
            break
        case StatusCodeEnums.TOKEN_EXPIRED:
            handleSignOut()
            window.location.href = AuthRoutesEnum.SIGN_IN
            break;

    }
}


export const apiClient = new ApiClient();
