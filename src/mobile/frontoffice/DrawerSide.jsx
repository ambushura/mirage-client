import { Box, Drawer } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewStreamIcon from '@mui/icons-material/ViewStream'
import FrontHandIcon from '@mui/icons-material/FrontHand'
import { logout } from '../../redux/desktop/frontoffice/authReducer.js'
import { useDispatch } from 'react-redux'

const menuSections = [
    {
        title: 'Основное',
        items: [
            { id: 'all_orders', text: 'Все заказы', icon: <ViewListIcon />, accent: true },
            { id: 'my_orders', text: 'Мои заказы', icon: <ViewStreamIcon />, accent: true },
            { id: 'stop_lists', text: 'Стоп-листы', icon: <FrontHandIcon />, accent: true },
        ],
    },
    {
        title: 'Система',
        items: [
            { id: 'settings', text: 'Настройки', icon: <SettingsIcon />, accent: false },
            { id: 'logout', text: 'Выход', icon: <LogoutIcon />, accent: false },
        ],
    },
]

const DrawerSide = ({ drawerOpened, setDrawerOpened }) => {
    const dispatch = useDispatch()
    return (
        <Drawer
            open={drawerOpened}
            onClose={() => setDrawerOpened(false)}
            PaperProps={{
                sx: {
                    width: 290,
                    background: 'rgba(18, 20, 26, 0.65)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.65)',
                    color: '#eaeaea',
                    borderRadius: '0 18px 18px 0',
                },
            }}
        >
            <Box sx={{ width: 280, p: 1.5 }}>
                {menuSections.map((section, sIndex) => (
                    <Box key={sIndex} sx={{ mb: 3 }}>
                        {section.title && (
                            <Box
                                sx={{
                                    fontSize: 11,
                                    opacity: 0.5,
                                    px: 1,
                                    mb: 1,
                                    letterSpacing: 1.4,
                                    color: '#9aa4b2',
                                }}
                            >
                                {section.title}
                            </Box>
                        )}
                        {section.items.map((item) => (
                            <Box
                                key={item.text}
                                onClick={() => {
                                    setDrawerOpened(false)
                                    if (item.id === 'logout') {
                                        dispatch(logout())
                                    }
                                }}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    px: 1.5,
                                    py: 1.2,
                                    mb: 1,
                                    borderRadius: 4,
                                    border: '1px solid var(--mobile-card-border) !important',
                                    cursor: 'pointer',
                                    transition: '0.2s',
                                    background: 'rgba(255,255,255,0.04)',
                                    '&:hover': {
                                        background: 'rgba(120, 140, 255, 0.14)',
                                        transform: 'translateX(5px)',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.35)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        background: item.accent ? 'rgba(255, 23, 68, 0.12)' : 'rgba(255,255,255,0.04)',
                                        color: item.accent ? '#ff5f8f' : '#9aa4b2',
                                        transition: '0.2s',
                                        '& svg': {
                                            fontSize: 20,
                                        },
                                        '&:hover': item.accent
                                            ? {
                                                  background: 'rgba(255, 23, 68, 0.18)',
                                                  color: '#ff1744',
                                              }
                                            : {
                                                  background: 'rgba(255,255,255,0.08)',
                                                  color: '#eaeaea',
                                              },
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Box
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: '#eaeaea',
                                    }}
                                >
                                    {item.text}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        </Drawer>
    )
}

export default DrawerSide
