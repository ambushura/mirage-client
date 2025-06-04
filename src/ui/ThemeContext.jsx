import {createContext, useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {createTheme, MenuItem, styled} from "@mui/material"
import {useFullScreen} from "../hooks/interface/useFullScreen.js"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'

const ThemeContext = createContext()

export const ThemeBlackWhite = ({children}) => {

    const uid_user = useSelector(state => state.auth.uid)
    const is_full_screen = useFullScreen()
    const pre_oder = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const current_page = useSelector(state => state.interface.current_page)

    const [uiState, setUiState] = useState({
        authorized: false,
        is_full_screen: false,
        is_mobile: false,
        show_order: false,
        top_menu: false,
    })

    useEffect(() => {
        document.documentElement.setAttribute('authorized', uiState.authorized)
        document.documentElement.setAttribute('full-screen', String(uiState.is_full_screen))
        document.documentElement.setAttribute('mobile', String(uiState.is_mobile))
        document.documentElement.setAttribute('show-order', String(uiState.show_order))
        document.documentElement.setAttribute('top-menu', String(uiState.top_menu))
    }, [uiState])

    useEffect(() => {
        setUiState(preValue => ({
            ...preValue,
            authorized: uid_user !== null
        }))
    }, [uid_user])

    useEffect(() => {
        setUiState(preValue => ({
            ...preValue,
            is_full_screen: is_full_screen
        }))
    }, [is_full_screen])

    useEffect(() => {
        const handleResize = () => {
            setUiState(preValue => ({
                ...preValue,
                is_mobile: window.innerWidth <= 768
            }))
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setUiState(preValue => ({
            ...preValue,
            show_order: (pre_oder.in_base || horder.in_base) && uid_user !== null && !['kitchen', 'admin/zbooks', 'admin/operations', 'admin/halls', 'admin/equipment', 'admin/egais', 'admin/staff'].includes(current_page),
        }))
    }, [pre_oder, horder, uid_user, current_page])

    useEffect(() => {
        setUiState(preValue => ({
            ...preValue,
            top_menu: uid_user !== null || current_page !== 'seance'
        }))

    }, [current_page])

    return (
        <ThemeContext.Provider value={{uiState, setUiState}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const Theme = createTheme({
    palette: {
        primary: {
            main: '#E3000B',
        },
        secondary: {
            main: '#2E3239',
        },
        success: {
            main: '#45B97C',
        },
        grey: {
            main: '#e3e3e3',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    textTransform: 'none',
                    height: '60px',
                },
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    height: '60px',
                    borderRadius: '12px'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    '&::-webkit-scrollbar': {
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'transparent'
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--bgr-scroll)',
                        borderRadius: '12px',
                    },
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--bgr-scroll) transparent',
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2E3239'
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    "&.Mui-selected": {
                        color: '#E3000B',
                        fontWeight: 'bold',
                    },
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    fontSize: '18px',
                }
            }
        },
        MuiCheckbox: {
            defaultProps: {
                icon: <RadioButtonUncheckedIcon/>,
                checkedIcon: <RadioButtonCheckedIcon/>,
            },
        }
    },
})

export const EMPTY_TABLE_STYLE = {
    // Убираем фон строки при наведении
    '& .MuiDataGrid-row:hover': {
        backgroundColor: 'inherit !important',
    },
    // Убираем фон выбранной строки
    '& .MuiDataGrid-row.Mui-selected': {
        backgroundColor: 'inherit !important',
    },
    '& .MuiDataGrid-row.Mui-selected:hover': {
        backgroundColor: 'inherit !important',
    },
    // Убираем фокус (рамку) ячейки
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
        outline: 'none',
    },
    // Убираем фокус (рамку) заголовка
    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
        outline: 'none',
    },
    // Запрещаем выделение текста мышкой
    '& .MuiDataGrid-cell': {
        userSelect: 'none',
    },
    // Убираем выделение текста даже при drag (в некоторых браузерах)
    '& .MuiDataGrid-root': {
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
    }
}

export const WhiteMenuItem = styled(MenuItem)({
    color: 'white',
    fontWeight: 'bold'
})