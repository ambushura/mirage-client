import { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTheme, MenuItem, styled } from '@mui/material'
import { useFullScreen } from './hooks/useFullScreen.js'
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
import WeekendIcon from '@mui/icons-material/Weekend'
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff'
import { MOBILE_WIDTH, setMobile } from '../redux/desktop/frontoffice/interfaceReducer.js'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewStreamIcon from '@mui/icons-material/ViewStream'
import FrontHandIcon from '@mui/icons-material/FrontHand'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PrintIcon from '@mui/icons-material/Print'
import ReceiptIcon from '@mui/icons-material/Receipt'
import BlockIcon from '@mui/icons-material/Block'

const ThemeContext = createContext()

export const ThemeBlackWhite = ({ children }) => {
    const dispatch = useDispatch()

    const uid_user = useSelector((state) => state.auth.uid)
    const is_full_screen = useFullScreen()
    const { pre_order, horder } = useSelector((state) => state.orders)
    const { current_page, kiosk } = useSelector((state) => state.interface)

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
        set_ui_state((preValue) => ({
            ...preValue,
            authorized: uid_user !== null,
        }))
    }, [uid_user])

    useEffect(() => {
        set_ui_state((preValue) => ({
            ...preValue,
            is_full_screen: is_full_screen,
        }))
    }, [is_full_screen])

    useEffect(() => {
        const handleResize = () => {
            dispatch(setMobile(window.innerWidth <= MOBILE_WIDTH))
            set_ui_state((preValue) => ({
                ...preValue,
                is_mobile: window.innerWidth <= MOBILE_WIDTH,
            }))
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [dispatch])

    useEffect(() => {
        set_ui_state((preValue) => ({
            ...preValue,
            show_order:
                (pre_order.in_base || horder.in_base) &&
                uid_user !== null &&
                ![
                    'kitchen',
                    'admin/zbooks',
                    'admin/operations',
                    'admin/halls',
                    'admin/scheme',
                    'admin/egais',
                    'admin/staff',
                    'admin/acquiring',
                ].includes(current_page),
        }))
    }, [pre_order, horder, uid_user, current_page])

    useEffect(() => {
        set_ui_state((preValue) => ({
            ...preValue,
            second_screen: current_page === 'second_screen',
        }))
    }, [current_page, uid_user])

    useEffect(() => {
        set_ui_state((preValue) => ({
            ...preValue,
            kiosk: kiosk,
        }))
    }, [kiosk])

    return <ThemeContext.Provider value={{ uiState: ui_state, setUiState: set_ui_state }}>{children}</ThemeContext.Provider>
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
        },
    },
    typography: {
        fontFamily: 'Mirage, serif',
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
                defaultProps: {
                    disableRipple: true,
                    disableTouchRipple: true,
                },
            },
            variants: [
                {
                    props: { variant: '_1c', color: 'secondary' },
                    style: {
                        backgroundColor: '#F6D601',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#dfc727',
                        },
                    },
                },
                {
                    props: { variant: 'save' },
                    style: {
                        backgroundColor: '#E6F4EA',
                        color: '#1B5E20',
                        '&:hover': {
                            backgroundColor: '#D7ECD9',
                        },
                    },
                },
                {
                    props: { variant: 'copy' },
                    style: {
                        backgroundColor: '#E8F0FE',
                        color: '#1A3E72',
                        '&:hover': {
                            backgroundColor: '#DCE7FD',
                        },
                    },
                },
                {
                    props: { variant: 'delete' },
                    style: {
                        backgroundColor: '#FDECEC',
                        color: '#7A1C1C',
                        '&:hover': {
                            backgroundColor: '#FADADA',
                        },
                    },
                },
                {
                    props: { variant: 'menu' },
                    style: {
                        backgroundColor: '#DEE2E6',
                        color: '#343A40',
                        '&:hover': {
                            backgroundColor: '#CED4DA',
                        },
                    },
                },
                {
                    props: { variant: 'tb_add' },
                    style: {
                        backgroundColor: '#E8F0FE',
                        color: '#1A3E72',
                        '&:hover': {
                            backgroundColor: '#DCE7FD',
                        },
                        height: '50%',
                    },
                },
                {
                    props: { variant: 'tb_delete' },
                    style: {
                        backgroundColor: '#FDECEC',
                        color: '#7A1C1C',
                        '&:hover': {
                            backgroundColor: '#FADADA',
                        },
                        height: '50%',
                    },
                },
            ],
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    height: '60px',
                    borderRadius: '12px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2E3239',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    '&.Mui-selected': {
                        color: '#E3000B',
                        fontWeight: 'bold',
                    },
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    fontSize: '18px',
                },
            },
        },
        MuiCheckbox: {
            defaultProps: {
                icon: <RadioButtonUncheckedIcon />,
                checkedIcon: <CheckCircleIcon />,
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    '& .MuiTab-root': {
                        color: '#919191',
                    },
                    '& .MuiTab-root.Mui-selected': {
                        color: '#171717',
                    },
                },
            },
        },
        MuiTabPanel: {
            styleOverrides: {
                root: {
                    padding: 0,
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 'none',
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'inherit !important',
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: 'inherit !important',
                    },
                    '& .MuiDataGrid-row.Mui-selected:hover': {
                        backgroundColor: 'inherit !important',
                    },
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        userSelect: 'none',
                    },
                    '& .MuiDataGrid-root': {
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                        userSelect: 'none',
                    },
                    '& .MuiDataGrid-treeDataGroupingCell .MuiIconButton-root': {
                        width: 18,
                        height: 18,
                    },
                    '& .MuiDataGrid-treeDataGroupingCell .MuiSvgIcon-root': {
                        fontSize: 14,
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        fontSize: '12px',
                        fontWeight: 600,
                        backgroundColor: '#f0f0f0',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        whiteSpace: 'normal',
                        lineHeight: 1.2,
                    },
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                    },
                    '& .MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within': {
                        outline: 'none',
                        boxShadow: 'none',
                    },
                    '& .MuiDataGrid-cell--editing': {
                        boxShadow: 'none !important',
                    },
                    '& .MuiDataGrid-scrollbar--horizontal': {
                        position: 'relative',
                    },
                },
                cell: {
                    '&.MuiDataGrid-cell--editing': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
    },
})

export const ScrollStyles = () => (
    <style>
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
      },
    `}
    </style>
)

export const WhiteMenuItem = styled(MenuItem)({
    color: 'white',
    fontWeight: 'bold',
})

export const tooltip_error = {
    sx: {
        bgcolor: 'error.main',
        color: '#fff',
        fontSize: 13,
        boxShadow: 3,
        '& .MuiTooltip-arrow': { color: 'error.main' },
    },
}

export const center_menu_icons = [
    <MenuIcon key="0" />,
    <MovieIcon key="1" />,
    <FastfoodIcon key="2" />,
    <AssessmentIcon key="3" />,
    <FolderIcon key="4" />,
    <ArticleIcon key="5" />,
    <CircleIcon key="6" />,
    <DashboardIcon key="7" />,
    <WeekendIcon key="8" />,
    <DataSaverOffIcon key="9" />,
]

// region МОБИЛЬНАЯ ВЕРСИЯ

export const DRAWER_MENU_ICONS = [
    <ViewStreamIcon key="0" />,
    <ViewListIcon key="1" />,
    <FrontHandIcon key="2" />,
    <SettingsIcon key="3" />,
    <LogoutIcon key="4" />,
]

export const BOTTOM_MENU_ICONS = [
    <AddIcon key="0" />,
    <ArrowBackIcon key="1" />,
    <ExpandMoreIcon key="2" />,
    <PrintIcon key="3" />,
    <ReceiptIcon key="4" />,
    <BlockIcon key="5" />,
]

// endregion
