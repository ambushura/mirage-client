import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {ThemeProvider} from '@mui/material'
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ru'

import './css/index.css'
import './css/cinema.css'
import './css/components.css'
import './css/orders.css'
import './css/horeca.css'
import './css/modal.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './App.jsx'
import store from './redux/index.js'
import Notifier from './components/Notifier.jsx'
import {Theme, ThemeBlackWhite} from './ui/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <ThemeBlackWhite>
                    <ThemeProvider theme={Theme}>
                        <App/>
                        <Notifier/>
                    </ThemeProvider>
                </ThemeBlackWhite>
            </LocalizationProvider>
        </Provider>
    </BrowserRouter>
)