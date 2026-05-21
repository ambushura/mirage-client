import { Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import './bottom-bar.css'
import { BOTTOM_MENU } from '../../../redux/mobile/frontoffice/frontMobileSlice.js'
import { BOTTOM_MENU_ICONS } from '../../../ui/ThemeContext.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { horeca_menu_get } from '../../../service/fetch_service.js'

export default function BottomBar({ setDrawerOpened, surface, current_page }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { city, filial } = useSelector((state) => state.front_mobile)

    const [expandedMenu, setExpandedMenu] = useState(false)
    const [activeFolder, setActiveFolder] = useState('burger')

    const [uidFolder, setUidFolder] = useState('Меню')
    const [foodMenu, setFoodMenu] = useState()

    useEffect(() => {
        setExpandedMenu(surface === 'waiter' && current_page === 'order')
    }, [surface, current_page])

    useEffect(() => {
        const fetch = async () => {
            const res = await dispatch(horeca_menu_get(filial, uidFolder))
            if (res.loading) {
            } else if (res.error === null && res.data !== null) {
                setFoodMenu(res.data)
            }
        }
        if (filial !== null) {
            fetch()
        }
    }, [dispatch, filial, uidFolder])

    const page = BOTTOM_MENU.find((el) => el.name === surface)?.pages.find((el) => el.name.includes(current_page))

    const menu = page?.menu || []

    return (
        <Box className="mobile-bottom-wrapper">
            <Box className="mobile-bottom-bar">
                {expandedMenu && (
                    <Box className="mobile-bottom-menu-panel">
                        {/* FOLDERS */}
                        <Box className="mobile-bottom-menu-section">
                            <Box className="mobile-bottom-menu-title">Разделы</Box>

                            <Box className="mobile-bottom-menu-scroll">
                                {foodMenu?.items
                                    ?.filter((el) => el.its_folder)
                                    .map((folder) => (
                                        <Button
                                            key={folder.uid}
                                            onClick={() => {
                                                setUidFolder(folder.uid)
                                                setActiveFolder(folder.uid)
                                            }}
                                            className={`mobile-bottom-chip ${activeFolder === folder.uid ? 'active' : ''}`}
                                        >
                                            {folder.name}
                                        </Button>
                                    ))}
                            </Box>
                        </Box>

                        {/* FOODS */}
                        <Box className="mobile-bottom-menu-section">
                            <Box className="mobile-bottom-menu-title">Блюда</Box>

                            <Box className="mobile-bottom-menu-scroll">
                                {foodMenu?.items
                                    ?.filter((el) => !el.its_folder)
                                    .map((item) => (
                                        <Button
                                            key={item.uid}
                                            className="mobile-bottom-food-chip"
                                            onClick={() => {
                                                // тут можешь добавить действие добавления в заказ
                                                console.log(item)
                                            }}
                                        >
                                            <Box className="mobile-bottom-food-name">{item.name}</Box>
                                        </Button>
                                    ))}
                            </Box>
                        </Box>
                    </Box>
                )}
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
                        <Button className="mobile-bottom-home" onClick={() => setExpandedMenu((v) => !v)}>
                            {expandedMenu ? (
                                <ExpandLessIcon
                                    style={{
                                        transform: 'rotate(180deg)',
                                    }}
                                />
                            ) : (
                                <ExpandLessIcon />
                            )}
                            <Box className="mobile-bottom-text">{expandedMenu ? 'Скрыть меню' : 'Показать меню'}</Box>
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
