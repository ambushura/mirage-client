import React, {useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Box, Button, ButtonGroup, Fade, Modal} from "@mui/material"
import List from "../../ui/List"
import PlaceIcon from "@mui/icons-material/Place"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {NavLink} from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {ANIMATION_SPEED, MOBILE_WIDTH, setAuthOpened} from "../../redux/interfaceReducer"
import TopSlider from "./TopSlider"
import Auth from "../../modal/Auth";
const Header = () => {

    const dispatch = useDispatch()

    // Главное меню
    const top_menu = useSelector(state => state.data.top_menu)
    const cities_menu = useSelector(state => state.data.cities_menu)
    const filials_menu = useSelector(state => state.data.filials_menu)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    // Интерфейс
    const cities_list_id = "cities-menu"
    const filials_list_id = "filials-menu"
    const cities_ref = useRef(null)
    const filials_ref = useRef(null)
    const [cities_open, set_cities_open] = useState(false)
    const [filials_open, set_filials_open] = useState(false)
    const prev_cities_open = useRef(Boolean(cities_open))
    const prev_filials_open = useRef(Boolean(filials_open))

    const app_width = useSelector(state => state.interface.app_width)
    const auth_opened = useSelector(state => state.interface.auth_opened)

    return (
        <header id="header">
            <Fade key='1' in={app_width > MOBILE_WIDTH} timeout={ANIMATION_SPEED}>
                <Box id="header-desktop">
                    <TopSlider/>
                    <div id="header-menu">
                        <ButtonGroup id="header-menu-list" variant="contained">
                            {top_menu.map(el => {
                                return <NavLink key={el.id} className='link' to={el.path}><Button
                                    style={{height: '100%'}}>{el.name}</Button></NavLink>
                            })}
                        </ButtonGroup>
                        <ButtonGroup id="top-menu-left" variant="contained">
                            <List
                                open={cities_open}
                                anchor={cities_ref}
                                prev_open={prev_cities_open}
                                id={cities_list_id}
                                setOpen={set_cities_open}
                                button_text={city !== undefined ? city.name : 'Все города'}
                                list={cities_menu}
                                startIcon={<PlaceIcon/>}
                                endIcon={<KeyboardArrowDownIcon/>}
                                type="cities"
                            />
                            <List
                                open={filials_open}
                                anchor={filials_ref}
                                prev_open={prev_filials_open}
                                id={filials_list_id}
                                setOpen={set_filials_open}
                                button_text={filial !== undefined ? filial.name : 'Кинотеатр'}
                                list={filials_menu}
                                endIcon={<KeyboardArrowDownIcon/>}
                                type='filials'
                            />
                            <Button key='auth' onClick={() => dispatch(setAuthOpened(true))}><AccountCircleIcon/></Button>
                        </ButtonGroup>
                        <Modal open={auth_opened}
                               onClose={() => dispatch(setAuthOpened(false))}
                               aria-labelledby="Страница авторизации"
                               aria-describedby="Введите пароль">
                            <Box>
                                <Auth/>
                            </Box>
                        </Modal>
                    </div>
                </Box>
            </Fade>
            <Fade key='2' in={app_width <= MOBILE_WIDTH} timeout={ANIMATION_SPEED}>
                <Box id="header-mobile">
                    <div>Мобильное меню</div>
                </Box>
            </Fade>
        </header>
    )
}
export default Header