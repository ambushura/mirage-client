import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import './css/index.css'
import './css/cinema.css'
import './css/components.css'
import './css/orders.css'
import "dayjs/locale/ru"
import App from './App.jsx'
import store from "./redux/index.js"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {theme} from "./components/ui/ui.js"
import {Provider} from "react-redux"
import {LocalizationProvider} from "@mui/x-date-pickers"
import {ThemeProvider} from "@mui/material"
import {BrowserRouter} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </LocalizationProvider>
        </Provider>
        </BrowserRouter>
    </StrictMode>
)
