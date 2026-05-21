import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import App from './App.jsx'
import store from './redux/indexReducer.js'
import Notifier from './ui/Notifier.jsx'
import { Theme, ThemeBlackWhite } from './ui/ThemeContext.jsx'

import 'dayjs/locale/ru'

import { ruRU } from '@mui/x-date-pickers/locales'
import dayjs from 'dayjs'

dayjs.locale('ru')

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru"
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <ThemeBlackWhite>
                    <ThemeProvider theme={Theme}>
                        <App />
                        <Notifier />
                    </ThemeProvider>
                </ThemeBlackWhite>
            </LocalizationProvider>
        </Provider>
    </BrowserRouter>
)
