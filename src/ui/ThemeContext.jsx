import {createContext, useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {createTheme, MenuItem, styled} from "@mui/material"
import {useFullScreen} from "../frontend/hooks/interface/useFullScreen.js"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MovieIcon from '@mui/icons-material/Movie'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import MenuIcon from '@mui/icons-material/Menu'
import AssessmentIcon from '@mui/icons-material/Assessment'
import FolderIcon from '@mui/icons-material/Folder'
import ArticleIcon from '@mui/icons-material/Article'
import CircleIcon from '@mui/icons-material/Circle'
import DashboardIcon from '@mui/icons-material/Dashboard'

const ThemeContext = createContext()

export const ThemeBlackWhite = ({children}) => {

    const uid_user = useSelector(state => state.auth.uid)
    const is_full_screen = useFullScreen()
    const pre_oder = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const current_page = useSelector(state => state.interface.current_page)
    const kiosk = useSelector(state => state.interface.kiosk)

    const [ui_state, set_ui_state] = useState({
        authorized: false,
        is_full_screen: false,
        is_mobile: false,
        show_order: false,
        second_screen: false,
        kiosk: false,
    })

    useEffect(() => {
        document.documentElement.setAttribute('kiosk', ui_state.kiosk)
        document.documentElement.setAttribute('authorized', ui_state.authorized)
        document.documentElement.setAttribute('full-screen', String(ui_state.is_full_screen))
        document.documentElement.setAttribute('mobile', String(ui_state.is_mobile))
        document.documentElement.setAttribute('show-order', String(ui_state.show_order))
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
            show_order: (pre_oder.in_base || horder.in_base) && uid_user !== null && !['kitchen', 'admin/zbooks', 'admin/operations', 'admin/halls', 'admin/scheme', 'admin/egais', 'admin/staff', 'admin/acquiring'].includes(current_page),
        }))
    }, [pre_oder, horder, uid_user, current_page])

    useEffect(() => {
        set_ui_state(preValue => ({
            ...preValue, second_screen: current_page === 'second_screen',
        }))

    }, [current_page, uid_user])

    useEffect(() => {
        set_ui_state(preValue => ({
            ...preValue, kiosk: kiosk,
        }))
    }, [kiosk])

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

    }, typography: {
        fontFamily: 'Mirage, serif',
    }, components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold', borderRadius: '12px', textTransform: 'none', height: '60px',
                },
            }, variants: [{
                props: {variant: '_1c', color: 'secondary'}, style: {
                    backgroundColor: '#F6D601', color: '#000', '&:hover': {
                        backgroundColor: '#dfc727',
                    },
                },
            }, {
                props: {variant: 'save'}, style: {
                    backgroundColor: '#E6F4EA', color: '#1B5E20', '&:hover': {
                        backgroundColor: '#D7ECD9',
                    },
                },
            }, {
                props: {variant: 'reread'}, style: {
                    backgroundColor: '#E8F0FE', color: '#1A3E72', '&:hover': {
                        backgroundColor: '#DCE7FD',
                    },
                },
            }, {
                props: {variant: 'delete'}, style: {
                    backgroundColor: '#FDECEC', color: '#7A1C1C', '&:hover': {
                        backgroundColor: '#FADADA',
                    },
                },
            },],
        }, MuiButtonGroup: {
            styleOverrides: {
                root: {
                    height: '60px', borderRadius: '12px'
                }
            }
        }, MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '8px'
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
        }, MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                }
            }
        },
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

export const ScrollStyles = () => <style>
    {`
      .MuiDataGrid-scrollbar {
        background-color: transparent !important;
      }
      .MuiDataGrid-scrollbarContent {
        background-color: transparent !important;
        border-radius: 12px;
      }
      .MuiDataGrid-scrollbarContent:hover {
        background-color: #53af16 !important;
      }
      .MuiDataGrid-scrollbar--vertical {
        width: 12px !important;
        min-width: 12px !important;
      }
      .MuiDataGrid-scrollbar--horizontal {
        height: 12px !important;
        min-height: 12px !important;
      }
      .MuiDataGrid-scrollbar--vertical::-webkit-scrollbar {
        background-color: transparent !important;
      }
      .MuiDataGrid-scrollbar--horizontal::-webkit-scrollbar {
        background-color: transparent !important;
      }
    `}
</style>

export const WhiteMenuItem = styled(MenuItem)({
    color: 'white', fontWeight: 'bold'
})

export const tooltip_error = {
    sx: {
        bgcolor: 'error.main', color: '#fff', fontSize: 13, boxShadow: 3, '& .MuiTooltip-arrow': {color: 'error.main'}
    }
}

export const center_menu_icons = [<MenuIcon key='1'/>, <MovieIcon key='2'/>, <FastfoodIcon key='2'/>,
    <AssessmentIcon key='3'/>, <FolderIcon key='4'/>, <ArticleIcon key='5'/>, <CircleIcon key='6'/>,
    <DashboardIcon key='7'/>]

export const sxTable = {
    width: "100%", height: "inherit", border: 0, borderRadius: 0, "& .store-delta-positive": {
        backgroundColor: "#fff5f5"
    }, "& .store-delta-negative": {
        backgroundColor: "#f0fff4"
    }, '& .MuiDataGrid-cell': {
        userSelect: 'text'
    }, '& .MuiDataGrid-treeDataGroupingCell .MuiIconButton-root': {
        width: 18, height: 18,
    }, '& .MuiDataGrid-treeDataGroupingCell .MuiSvgIcon-root': {
        fontSize: 16
    }, '& .MuiDataGrid-columnHeaders': {
        fontSize: '12px', fontWeight: 600, backgroundColor: '#f0f0f0'
    }, '& .MuiDataGrid-columnHeaderTitle': {
        whiteSpace: 'normal', lineHeight: 1.2
    }
}