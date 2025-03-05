import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import './css/index.css'
import './css/cinema.css'
import './css/components.css'
import './css/orders.css'
import './css/horeca.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import "dayjs/locale/ru"
import App from './App.jsx'
import store from "./redux/index.js"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {theme} from "./ui/ui.js"
import {Provider} from "react-redux"
import {LocalizationProvider} from "@mui/x-date-pickers"
import {ThemeProvider} from "@mui/material"
import {BrowserRouter} from "react-router-dom"
import Notifier from "./components/Notifier.jsx"
import {ThemeBlackWhite} from "./ui/ThemeContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                    <ThemeBlackWhite>
                        <ThemeProvider theme={theme}>
                            <App/>
                            <Notifier/>
                        </ThemeProvider>
                    </ThemeBlackWhite>
                </LocalizationProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>
)