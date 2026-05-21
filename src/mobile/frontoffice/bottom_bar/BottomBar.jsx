import { Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import './bottom-bar.css'
import { BOTTOM_MENU } from '../../../redux/mobile/frontoffice/frontMobileSlice.js'
import { BOTTOM_MENU_ICONS } from '../../../ui/ThemeContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FoodMenu from '../waiter/menu/FoodMenu.jsx'

export default function BottomBar({ setDrawerOpened, surface, current_page }) {
    const navigate = useNavigate()

    const page = BOTTOM_MENU.find((el) => el.name === surface)?.pages.find((el) => el.name.includes(current_page))
    const { city, filial } = useSelector((state) => state.front_mobile)
    const [expandedMenu, setExpandedMenu] = useState(false)
    const menu = page?.menu || []

    useEffect(() => {
        setExpandedMenu(surface === 'waiter' && current_page === 'order')
    }, [surface, current_page])

    return (
        <Box className="mobile-bottom-wrapper">
            <Box className="mobile-bottom-bar liquid-glass">
                <Box className={`mobile-bottom-menu-panel ${expandedMenu ? 'open' : ''}`}>
                    <FoodMenu />
                </Box>
                <Box className="mobile-bottom-bottom-row">
                    <Box className="mobile-bottom-scroll-clip">
                        <Box className="mobile-bottom-scroll">
                            {menu.map((item) => (
                                <Button
                                    key={item.id}
                                    onClick={() =>
                                        runBottomBarAction({
                                            city,
                                            filial,
                                            navigate,
                                            surface,
                                            page: current_page,
                                            id: item.id,
                                        })
                                    }
                                    className="mobile-bottom-item"
                                >
                                    <Box className="mobile-bottom-icon">{BOTTOM_MENU_ICONS[item.icon] ?? null}</Box>
                                    <Box className="mobile-bottom-text">{item.text}</Box>
                                </Button>
                            ))}
                        </Box>
                    </Box>
                    {surface === 'waiter' && current_page === 'order' && (
                        <Button className="mobile-bottom-item" onClick={() => setExpandedMenu((v) => !v)}>
                            {expandedMenu ? (
                                <ExpandLessIcon
                                    style={{
                                        transform: 'rotate(180deg)',
                                    }}
                                />
                            ) : (
                                <ExpandLessIcon />
                            )}
                            <Box className="mobile-bottom-text">Меню</Box>
                        </Button>
                    )}
                    {['order'].includes(current_page) && (
                        <Button
                            className="mobile-bottom-item"
                            onClick={() => {
                                navigate(-1)
                            }}
                        >
                            <Box className="mobile-bottom-icon">
                                <ArrowBackIcon />
                            </Box>
                            <Box className="mobile-bottom-text">Назад</Box>
                        </Button>
                    )}
                    <Button className="mobile-bottom-home" onClick={() => setDrawerOpened(true)}>
                        <MenuIcon />
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

// region ФУНКЦИИ

// bottomBarActions.js

export const bottomBarActions = {
    waiter: {
        'all-orders': {
            order: ({ city, filial, navigate, surface }) => {
                navigate(`/mobile/${city.code}/${filial.eais}/${surface}/order`)
            },
        },
        'my-orders': {
            order: ({ city, filial, navigate, surface }) => {
                navigate(`/mobile/${city.code}/${filial.eais}/${surface}/order`)
            },
        },
        order: {},
    },
}

export function runBottomBarAction({ city, filial, navigate, surface, page, id }) {
    const action = bottomBarActions?.[surface]?.[page]?.[id]
    if (!action) return
    action({
        city,
        filial,
        navigate,
        surface,
        page,
        id,
    })
}

// endregion
