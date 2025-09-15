import {createContext, useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {createTheme, MenuItem, styled} from "@mui/material"
import {useFullScreen} from "../hooks/interface/useFullScreen.js"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const ThemeContext = createContext()

export const ThemeBlackWhite = ({children}) => {

    const uid_user = useSelector(state => state.auth.uid)
    const is_full_screen = useFullScreen()
    const pre_oder = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const current_page = useSelector(state => state.interface.current_page)

    const [ui_state, set_ui_state] = useState({
        authorized: false,
        is_full_screen: false,
        is_mobile: false,
        show_order: false,
        top_menu: false,
        second_screen: false,
    })

    useEffect(() => {
        document.documentElement.setAttribute('authorized', ui_state.authorized)
        document.documentElement.setAttribute('full-screen', String(ui_state.is_full_screen))
        document.documentElement.setAttribute('mobile', String(ui_state.is_mobile))
        document.documentElement.setAttribute('show-order', String(ui_state.show_order))
        document.documentElement.setAttribute('top-menu', String(ui_state.top_menu))
        document.documentElement.setAttribute('second-screen', String(ui_state.second_screen))
    }, [ui_state])

    useEffect(() => {
        set_ui_state(preValue => ({
            ...preValue, authorized: uid_user !== null
        }))
    }, [uid_user])

    useEffect(() => {
        set_ui_state(preValue => ({
            ...preValue, is_full_screen: is_full_screen
        }))
    }, [is_full_screen])

    useEffect(() => {
        const handleResize = () => {
            set_ui_state(preValue => ({
                ...preValue, is_mobile: window.innerWidth <= 768
            }))
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        set_ui_state(preValue => ({
            ...preValue,
            show_order: (pre_oder.in_base || horder.in_base) && uid_user !== null && !['kitchen', 'admin/zbooks', 'admin/operations', 'admin/halls', 'admin/equipment', 'admin/egais', 'admin/staff', 'admin/acquiring'].includes(current_page),
        }))
    }, [pre_oder, horder, uid_user, current_page])

    useEffect(() => {
        set_ui_state(preValue => ({
            ...preValue,
            top_menu: uid_user !== null || current_page !== 'seance',
            second_screen: current_page === 'second_screen',
        }))

    }, [current_page, uid_user])

    return <ThemeContext.Provider value={{uiState: ui_state, setUiState: set_ui_state}}>
        {children}
    </ThemeContext.Provider>
}

export const Theme = createTheme({
    palette: {
        primary: {
            main: '#E3000B',
        }, secondary: {
            main: '#2E3239',
        }, success: {
            main: '#45B97C',
        }, grey: {
            main: '#e3e3e3',
        }
    }, components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold', borderRadius: '12px', textTransform: 'none', height: '60px',
                },
            }
        }, MuiButtonGroup: {
            styleOverrides: {
                root: {
                    height: '60px', borderRadius: '12px'
                }
            }
        }, MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px', '&::-webkit-scrollbar': {
                        width: '50px', height: '50px', backgroundColor: 'transparent'
                    }, '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    }, '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--bgr-scroll)', borderRadius: '12px',
                    }, scrollbarWidth: 'thin', scrollbarColor: 'var(--bgr-scroll) transparent',
                }
            }
        }, MuiList: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                }
            }
        }, MuiLinearProgress: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2E3239'
                }
            }
        }, MuiTab: {
            styleOverrides: {
                root: {
                    color: '#fff', fontWeight: 'bold', textTransform: 'capitalize', "&.Mui-selected": {
                        color: '#E3000B', fontWeight: 'bold',
                    },
                }
            }
        }, MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '12px', fontSize: '18px',
                }
            }
        }, MuiCheckbox: {
            defaultProps: {
                icon: <RadioButtonUncheckedIcon/>, checkedIcon: <CheckCircleIcon/>,
            },
        }
    },
})

export const EMPTY_TABLE_STYLE = {
    // Убираем фон строки при наведении
    '& .MuiDataGrid-row:hover': {
        backgroundColor: 'inherit !important',
    }, // Убираем фон выбранной строки
    '& .MuiDataGrid-row.Mui-selected': {
        backgroundColor: 'inherit !important',
    }, '& .MuiDataGrid-row.Mui-selected:hover': {
        backgroundColor: 'inherit !important',
    }, // Убираем фокус (рамку) ячейки
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
        outline: 'none',
    }, // Убираем фокус (рамку) заголовка
    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
        outline: 'none',
    }, // Запрещаем выделение текста мышкой
    '& .MuiDataGrid-cell': {
        userSelect: 'none',
    }, // Убираем выделение текста даже при drag (в некоторых браузерах)
    '& .MuiDataGrid-root': {
        WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', userSelect: 'none',
    }
}

export const WhiteMenuItem = styled(MenuItem)({
    color: 'white', fontWeight: 'bold'
})