import { Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import './bottom-bar.css'
import { BOTTOM_MENU } from '../../../redux/mobile/frontoffice/frontMobileSlice.js'
import { BOTTOM_MENU_ICONS } from '../../../ui/ThemeContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function BottomBar({ setDrawerOpened, surface, current_page }) {
    const navigate = useNavigate()
    const { city, filial } = useSelector((state) => state.front_mobile)

    return (
        <Box className="mobile-bottom-wrapper">
            <Box className="mobile-bottom-bar">
                <Box className="mobile-bottom-scroll-clip">
                    <Box className="mobile-bottom-scroll">
                        {BOTTOM_MENU.find((el) => el.name === surface)
                            ?.pages.find((el) => el.name.includes(current_page))
                            ?.menu.map((item) => (
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
                                    <Box className="mobile-bottom-icon">
                                        {BOTTOM_MENU_ICONS[item.icon] !== undefined ? BOTTOM_MENU_ICONS[item.icon] : null}
                                    </Box>
                                    <Box className="mobile-bottom-text">{item.text}</Box>
                                </Button>
                            ))}
                    </Box>
                </Box>
                <Button className="mobile-bottom-home" onClick={() => setDrawerOpened(true)}>
                    <MenuIcon />
                    <Box className="mobile-bottom-text" />
                </Button>
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

        order: {
            back: ({ navigate }) => {
                navigate(-1)
            },
        },
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
