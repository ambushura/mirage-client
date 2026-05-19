import { Box, Drawer } from '@mui/material'
import { logout } from '../../../redux/desktop/frontoffice/authReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DRAWER_MENU } from '../../../redux/mobile/frontoffice/frontMobileSlice.js'
import { DRAWER_MENU_ICONS } from '../../../ui/ThemeContext.jsx'

const DrawerSide = ({ drawerOpened, setDrawerOpened, surface }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { city, filial } = useSelector((state) => state.front_mobile)

    const menu = DRAWER_MENU.find((el) => el.surface === surface)?.menu || []

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
                {menu.map((section, sIndex) => (
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
                                    switch (item.id) {
                                        case 'logout':
                                            dispatch(logout())
                                            return
                                        case 'my-orders':
                                            if (city !== null && filial !== null)
                                                navigate(`/mobile/${city.code}/${filial.eais}/waiter/my-orders`)
                                            return
                                        case 'all-orders':
                                            if (city !== null && filial !== null)
                                                navigate(`/mobile/${city.code}/${filial.eais}/waiter/all-orders`)
                                            return
                                        case 'stop_lists':
                                            return
                                        default:
                                            return
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
                                    {DRAWER_MENU_ICONS[item.icon]}
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
