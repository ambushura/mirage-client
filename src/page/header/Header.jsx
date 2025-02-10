import {useDispatch, useSelector} from "react-redux"
import {Box, Button, ButtonGroup, Fade, Modal} from "@mui/material"
import PlaceIcon from "@mui/icons-material/Place"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import TopSlider from "./TopSlider.jsx"
import Auth from "../../components/auth/Auth.jsx"
import { useState }  from "react"
import { useRef } from "react"
import {ANIMATION_SPEED, HEADER_HEIGHT, login, MOBILE_WIDTH, setAuthOpened} from "../../redux/interfaceReducer.js"
import {NavLink} from "react-router-dom"
import List from "../../ui/List.jsx"
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const Header = () => {

    const dispatch = useDispatch()

    const authenticated = useSelector(state => state.interface.authenticated)
    const top_menu = useSelector(state => state.interface.top_menu)
    const cities = useSelector(state => state.data.cities)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

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
        <header id="header" style={{minHeight: `${HEADER_HEIGHT[authenticated]}px`}}>
            <Fade key='1' in={app_width > MOBILE_WIDTH} timeout={ANIMATION_SPEED}>
                <Box id="header-desktop">
                    {authenticated ? <></> : <TopSlider/>}
                    <div id="header-menu">
                        <ButtonGroup id="header-menu-list" variant="contained">
                            {top_menu[authenticated].map(el => {
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
                                list={cities}
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
                                list={city !== undefined ? [{uid: undefined}, ...Array.from(city.filials)] : []}
                                endIcon={<KeyboardArrowDownIcon/>}
                                type='filials'
                            />
                            {authenticated === 0 ? <Button key='auth'
                                                           onClick={() => dispatch(setAuthOpened(true))}><AccountCircleIcon/></Button> :
                                <Button key='auth'
                                        onClick={() => dispatch(login(0))}><ExitToAppIcon/></Button>}
                        </ButtonGroup>
                        <Modal open={auth_opened}
                               onClose={() => dispatch(setAuthOpened(false))}
                               aria-labelledby="Страница авторизации"
                               aria-describedby="Введите пароль">
                            <Box id="auth">
                                <Auth setAuthOpened={setAuthOpened}/>
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