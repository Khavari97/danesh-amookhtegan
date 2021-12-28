import React from "react";
import "./App.scss";
import AppRouter from "./navigation/AppRouter";
import {SnackbarProvider} from 'notistack';
import {SnackbarUtils} from "./components/material-ui/Snackbar/SnackbarUtils";
import ThemeProvider from "./assets/styles/material/material";

export interface AppProps {
}

export interface AppState {
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <SnackbarProvider maxSnack={3} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                <SnackbarUtils/>
                <ThemeProvider>
                    <AppRouter/>
                </ThemeProvider>
            </SnackbarProvider>
        );
    }
}

export default App;
