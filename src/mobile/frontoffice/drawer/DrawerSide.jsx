import { Box, Drawer } from '@mui/material'
import { logout } from '../../../redux/desktop/frontoffice/authReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DRAWER_MENU } from '../../../redux/mobile/frontoffice/frontMobileSlice.js'
import { DRAWER_MENU_ICONS } from '../../../ui/ThemeContext.jsx'
import './drawer.css'

const DrawerSide = ({ drawerOpened, setDrawerOpened, surface, current_page }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { city, filial } = useSelector((state) => state.front_mobile)

    const pages = DRAWER_MENU.find((el) => el.surface === surface)?.pages || []

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
                {pages
                    .find((el) => el.name.includes(current_page))
                    ?.menu?.map((section, sIndex) => (
                        <Box key={sIndex} sx={{ mb: 3 }}>
                            {section.title && <Box className="mobile-drawer-section">{section.title}</Box>}
                            {section.items.map((item) => (
                                <Box
                                    className="mobile-drawer-section-button"
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
                                            case 'stop-list':
                                                if (city !== null && filial !== null)
                                                    navigate(`/mobile/${city.code}/${filial.eais}/waiter/stop-list`)
                                                return
                                            default:
                                                return
                                        }
                                    }}
                                >
                                    <Box className="mobile-drawer-section-button-icon">{DRAWER_MENU_ICONS[item.icon]}</Box>
                                    <Box className="mobile-drawer-section-button-text">{item.text}</Box>
                                </Box>
                            ))}
                        </Box>
                    ))}
            </Box>
        </Drawer>
    )
}

export default DrawerSide
