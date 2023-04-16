import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from "./store";
import 'sweetalert2/dist/sweetalert2.css'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store} >
                <CssBaseline />
                <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);