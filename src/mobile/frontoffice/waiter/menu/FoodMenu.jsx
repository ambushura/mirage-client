import { Box, Button } from '@mui/material'
import './menu.css'
import { useEffect, useState } from 'react'
import { horeca_menu_get } from '../../../../service/fetch_service.js'
import { useDispatch, useSelector } from 'react-redux'

const FoodMenu = () => {
    const dispatch = useDispatch()

    const { filial } = useSelector((state) => state.front_mobile)

    const [activeFolder, setActiveFolder] = useState('burger')
    const [uidFolder, setUidFolder] = useState('Меню')
    const [foodMenu, setFoodMenu] = useState()

    useEffect(() => {
        const fetch = async () => {
            const res = await dispatch(horeca_menu_get(filial, uidFolder))
            if (!res.loading && res.error === null && res.data !== null) {
                setFoodMenu(res.data)
            }
        }
        if (filial !== null) {
            fetch()
        }
    }, [dispatch, filial, uidFolder])

    return (
        <Box>
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
            <Box className="mobile-bottom-menu-section">
                <Box className="mobile-bottom-menu-title">Блюда</Box>

                <Box className="mobile-bottom-menu-scroll">
                    {foodMenu?.items
                        ?.filter((el) => !el.its_folder)
                        .map((item) => (
                            <Button key={item.uid} className="mobile-bottom-food-chip" onClick={() => {}}>
                                <Box className="mobile-bottom-food-name">{item.name}</Box>
                            </Button>
                        ))}
                </Box>
            </Box>
        </Box>
    )
}

export default FoodMenu
