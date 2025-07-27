import {useDispatch, useSelector} from "react-redux"
import {Box, Button, ButtonGroup, Modal} from "@mui/material"
import PlaceIcon from "@mui/icons-material/Place"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import TopSlider from "./TopSlider.jsx"
import Auth from "../../components/forms/Auth.jsx"
import {useEffect, useRef, useState} from "react"
import {MOBILE_WIDTH, setAuthOpened, TOP_MENU} from "../../redux/interfaceReducer.js"
import {NavLink} from "react-router-dom"
import List from "../../ui/List.jsx"
import {logout} from "../../redux/authReducer.js"
import dayjs from "dayjs"
import {addNotification} from "../../redux/notifierReducer.js"
import AppsIcon from '@mui/icons-material/Apps'
import CachedIcon from '@mui/icons-material/Cached'
import TheatersIcon from '@mui/icons-material/Theaters'
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'

const Header = () => {

    const dispatch = useDispatch()

    const permissions = useSelector(state => state.auth.permissions)
    const top_menu = useSelector(state => state.interface.top_menu)
    const cities = useSelector(state => state.data.cities)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    const current_page = useSelector(state => state.interface.current_page)
    const cities_list_id = "cities-menu"
    const filials_list_id = "filials-menu"
    const admin_list_id = "admin-menu"
    const cities_ref = useRef(null)
    const filials_ref = useRef(null)
    const admin_ref = useRef(null)
    const [cities_open, set_cities_open] = useState(false)
    const [filials_open, set_filials_open] = useState(false)
    const [admin_open, set_admin_open] = useState(false)
    const prev_cities_open = useRef(Boolean(cities_open))
    const prev_filials_open = useRef(Boolean(filials_open))
    const prev_admin_open = useRef(Boolean(admin_open))

    const auth_opened = useSelector(state => state.interface.auth_opened)
    const app_width = useSelector(state => state.interface.app_width)

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
            up.push(<Button size='medium' onClick={() => {
                document.location.reload()
            }}><CachedIcon/></Button>)
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

    const main_button = (el) => {
        if (app_width > MOBILE_WIDTH || uid_user === null) {
            return (
                <Button>{el.name}</Button>
            )
        } else {
            switch (el.id) {
                case 'films':
                    return (
                        <Button><TheatersIcon/></Button>
                    )
                case 'schedule':
                    return (
                        <Button><CalendarViewMonthIcon/></Button>
                    )
                case 'menu':
                    return (
                        <Button><MenuBookIcon/></Button>
                    )
                case 'kitchen':
                    return (
                        <Button><SoupKitchenIcon/></Button>
                    )
                default:
                    el.name
            }
        }
    }

    const [adv_page_name, set_adv_page_name] = useState('Кинокомплекс')
    useEffect(() => {
        const top_menu_admin = TOP_MENU[1].find(el => el.id === 'admin')
        const page = top_menu_admin.path.find(el => el.id === current_page)
        if (page !== undefined) {
            set_adv_page_name(page.name)
        } else {
            set_adv_page_name('Кинокомплекс')
        }
    }, [current_page])

    return (
        <header id="header">
            <Box id="header-desktop">
                {permissions.includes(0) ? <></> : <TopSlider/>}
                <Box id="header-menu">
                    <ButtonGroup id="header-menu-list" variant="contained" size='small' sx={{marginLeft: '5px'}}>
                        {uid_user === null ?
                            top_menu[0].map(el => {
                                return <NavLink key={el.id} className='link' to={el.path}>
                                    {main_button(el)}
                                </NavLink>
                            }) :
                            top_menu[1].map(el => {
                                if (el.id !== 'admin') {
                                    return <NavLink key={el.id} className='link' to={el.path}>
                                        {main_button(el)}
                                    </NavLink>
                                } else {
                                    return <List
                                        key={el.id}
                                        size='small'
                                        open={admin_open}
                                        anchor={admin_ref}
                                        prev_open={prev_admin_open}
                                        id={admin_list_id}
                                        setOpen={set_admin_open}
                                        button_text={app_width >= MOBILE_WIDTH ? adv_page_name : null}
                                        list={el.path}
                                        startIcon={<AppsIcon/>}
                                        endIcon={<KeyboardArrowDownIcon/>}
                                        type="admin"
                                    />
                                }
                            })
                        }
                    </ButtonGroup>
                    <Box sx={{display: 'flex', flexDirection: 'row', marginRight: '5px'}}>
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
            </Box>
        </header>
    )
}

export default Header