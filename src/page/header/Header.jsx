import {useDispatch, useSelector} from "react-redux"
import {Box, Button, ButtonGroup, Fade, Modal} from "@mui/material"
import PlaceIcon from "@mui/icons-material/Place"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import TopSlider from "./TopSlider.jsx"
import Auth from "../../components/modal/Auth.jsx"
import {useEffect, useState} from "react"
import { useRef } from "react"
import {ANIMATION_SPEED, HEADER_HEIGHT, MOBILE_WIDTH, setAuthOpened} from "../../redux/interfaceReducer.js"
import {NavLink} from "react-router-dom"
import List from "../../ui/List.jsx"
import {logout} from "../../redux/authReducer.js"
import dayjs from "dayjs"
import {addNotification} from "../../redux/notifierReducer.js"
import AppsIcon from '@mui/icons-material/Apps'

const Header = () => {

    const dispatch = useDispatch()

    const permissions = useSelector(state => state.auth.permissions)
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

    const name_user = useSelector(state => state.auth.name)
    const uid_user = useSelector(state => state.auth.uid)

    const timeRef = useRef(dayjs())
    const [, forceUpdate] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            timeRef.current = dayjs()
            forceUpdate(v => v + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const user_panel = () => {
        const up = []
        if (uid_user !== null) {
            up.push(<Button
                key='3'>{timeRef.current.format('HH:mm')}</Button>)
            up.push(<Button key='2'>{name_user}</Button>)
            up.push(<Button key='1' onClick={() => dispatch(logout())} startIcon={<ExitToAppIcon/>}>Выход</Button>)
        } else {
            up.push(<Button size='large' key='4'
                            onClick={() => {
                                if (filial !== undefined) {
                                    dispatch(setAuthOpened(true))
                                } else {
                                    dispatch(addNotification({
                                        message: 'для начала выберите филиал аутентификации',
                                        severity: 'error',
                                        autoHide: true
                                    }))
                                }
                            }}
                            startIcon={<AccountCircleIcon/>}>Вход</Button>)
        }
        return up
    }

    const admin_list_id = "admin-menu"
    const admin_ref = useRef(null)
    const [admin_opened, set_admin_open] = useState(false)
    const prev_admin_open = useRef(Boolean(admin_opened))

    return (
        <header id="header" style={{minHeight: `${uid_user === null ? HEADER_HEIGHT[0] : HEADER_HEIGHT[1]}px`}}>
            <Fade key='1' in={app_width > MOBILE_WIDTH} timeout={ANIMATION_SPEED}>
                <Box id="header-desktop">
                    {permissions.includes(0) ? <></> : <TopSlider/>}
                    <Box id="header-menu">
                        <ButtonGroup id="header-menu-list" variant="contained" size='small'>
                            {uid_user === null ?
                                top_menu[0].map(el => {
                                    return <NavLink key={el.id} className='link' to={el.path}>
                                        <Button style={{height: '100%'}}>{el.name}</Button>
                                    </NavLink>
                                }) :
                                top_menu[1].map(el => {
                                    if (el.id !== 'admin') {
                                        return <NavLink key={el.id} className='link' to={el.path}>
                                            <Button style={{height: '100%'}}>{el.name}</Button>
                                        </NavLink>
                                    } else {
                                        return <List
                                            key={el.id}
                                            size='small'
                                            open={admin_opened}
                                            anchor={admin_ref}
                                            prev_open={prev_admin_open}
                                            id={admin_list_id}
                                            setOpen={set_admin_open}
                                            button_text={'Кинокомплекс'}
                                            list={el.path}
                                            startIcon={<AppsIcon/>}
                                            endIcon={<KeyboardArrowDownIcon/>}
                                            type="admin"
                                        />
                                    }
                                })
                            }
                        </ButtonGroup>
                        <ButtonGroup id="top-menu-left" variant="contained" size='small' sx={{marginLeft: '5px'}}>
                            <List
                                size='small'
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
                                size='small'
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
                        </ButtonGroup>
                        <Box sx={{display: 'flex', alignItems: 'center', marginLeft: '5px'}}>
                            <ButtonGroup size="small" variant='contained' color='secondary' id="header-time-username">
                                {user_panel()}
                            </ButtonGroup>
                            <Modal open={auth_opened}
                                   keepMounted
                                   onClose={() => dispatch(setAuthOpened(false))}
                                   aria-labelledby="Страница авторизации"
                                   aria-describedby="Введите пароль">
                                <Box id="modal">
                                    <Auth/>
                                </Box>
                            </Modal>
                        </Box>
                    </Box>
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