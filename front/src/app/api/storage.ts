import axios from "axios"

const refresh = () => {
    axios({
        method: "post",
        url: "http://localhost:8000/api/token/refresh/",

    }).then(res => console.log(res)).catch(e => console.log({...e}))
};//backend is crazy please solve problems broths


const isAuthenticated = (): Boolean => {
    return (localStorage.getItem("access") !== null)
};

const handleSignOut = () => {
    localStorage.removeItem("access");
};

export {refresh, isAuthenticated, handleSignOut};
