import {Box, Button, ButtonGroup, Fade, FormControl, InputLabel, MenuItem, Popover, Select} from "@mui/material"
import dayjs from "dayjs"
import {
    NEW_EMPTY_ORDER,
    setCurrentPreOrder,
    setOrdersCinemaFiltersBuyerEmailsSelect,
    setOrdersCinemaFiltersBuyerPhoneNumbersSelect,
    setOrdersCinemaFiltersHallsSelect,
    setOrdersCinemaFiltersSeancesSelect,
    setOrdersCinemaFiltersStaffSelect,
    setOrdersCinemaFiltersStateSelect,
    setOrdersCinemaFiltersWorkplacesSelect,
    setOrdersHorecaFiltersHallsSelect,
    setOrdersHorecaFiltersKitchenPointsSelect,
    setOrdersHorecaFiltersKitchenStateSelect,
    setOrdersHorecaFiltersStaffSelect,
    setOrdersHorecaFiltersStateSelect,
    setOrdersHorecaFiltersWorkPlacesSelect
} from "../../../redux/ordersReducer.js"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {date_dayjs, from_dayjs_to_str, to_str_DAY} from "../../../service/advanced.js"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {openModal, TIMEOUT} from "../../../redux/interfaceReducer.js"
import LaptopIcon from "@mui/icons-material/Laptop"
import DockIcon from "@mui/icons-material/Dock"
import LanguageIcon from "@mui/icons-material/Language"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Calendar from "../../../components/forms/Calendar.jsx"
import {Fragment, useState} from "react"
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import {useSetHalls} from "../admin/halls/useSetHalls.js"
import {setMode, setUidHall} from "../../../redux/hallsReducer.js"
import {KKTSVG} from '../admin/equipment/svg/KKTSVG.jsx'

export function AdminHallsList() {

    const dispatch = useDispatch()
    const halls = useSetHalls()

    const current_page = useSelector(state => state.interface.current_page)
    const uid_hall = useSelector(state => state.halls.uid_hall)
    const mode = useSelector(state => state.halls.mode)

    if (current_page !== 'admin/halls') return null

    return <Fragment>
        <FormControl variant='filled' sx={{m: 1, minWidth: '200px'}}>
            <InputLabel id="halls-select-label">Текущий зал</InputLabel>
            <Select
                onChange={(event) => {
                    dispatch(setUidHall(event.target.value))
                }}
                labelId="halls-select-label"
                id="halls-select"
                value={uid_hall !== null ? uid_hall : null}
                label="Залы"
                variant='filled'>
                {halls !== null ? halls.map(hall => <MenuItem
                    sx={{color: 'black'}} key={hall.uid}
                    value={hall.uid}>{hall.title}</MenuItem>) : null}
            </Select>
        </FormControl>
        <ButtonGroup>
            <Button variant='contained' color={mode === 'block' ? 'primary' : 'secondary'} onClick={() => {
                dispatch(setMode('block'))
            }}>Режим блокировки</Button>
            <Button variant='contained' color={mode === 'view' ? 'primary' : 'secondary'} onClick={() => {
                dispatch(setMode('view'))
            }}>Режим просмотра</Button>
        </ButtonGroup>
    </Fragment>
}

export function ShowFilters() {

    const dispatch = useDispatch()
    const current_page = useSelector(state => state.interface.current_page)

    const horeca_staff_selected = useSelector(state => state.orders.orders_horeca_filters_staff_selected)
    const horeca_state_selected = useSelector(state => state.orders.orders_horeca_filters_state_selected)
    const horeca_halls_selected = useSelector(state => state.orders.orders_horeca_filters_halls_selected)
    const horeca_workplaces_selected = useSelector(state => state.orders.orders_horeca_filters_workplaces_selected)
    const horeca_kitchen_points_selected = useSelector(state => state.orders.orders_horeca_filters_kitchen_points_selected)
    const horeca_kitchen_state_selected = useSelector(state => state.orders.orders_horeca_filters_kitchen_state_selected)

    const cinema_staff_selected = useSelector(state => state.orders.orders_cinema_filters_staff_selected)
    const cinema_state_selected = useSelector(state => state.orders.orders_cinema_filters_state_selected)
    const cinema_seances_selected = useSelector(state => state.orders.orders_cinema_filters_seances_selected)
    const cinema_halls_selected = useSelector(state => state.orders.orders_cinema_filters_halls_selected)
    const cinema_workplaces_selected = useSelector(state => state.orders.orders_cinema_filters_workplaces_selected)
    const cinema_buyer_emails_selected = useSelector(state => state.orders.orders_cinema_filters_buyer_emails_selected)
    const cinema_buyer_phone_numbers_selected = useSelector(state => state.orders.orders_cinema_filters_buyer_phone_numbers_selected)

    if (current_page !== 'admin/orders/horeca' && current_page !== 'admin/orders/cinema') return null

    if (current_page === 'admin/orders/horeca') {
        return (
            <ButtonGroup>
                <Button variant='contained' color='secondary' sx={{marginLeft: '4px'}}
                        onClick={() => dispatch(openModal({type: 'horeca_filters', props: {}}))}
                        startIcon={<FilterAltIcon/>}>Фильтры</Button>
                {horeca_staff_selected.length > 0 ||
                horeca_state_selected.length > 0 ||
                horeca_halls_selected.length > 0 ||
                horeca_workplaces_selected.length > 0 ||
                horeca_kitchen_points_selected.length > 0 ||
                horeca_kitchen_state_selected.length > 0 ?
                    <Button variant='contained' color='primary' onClick={() => {
                        dispatch(setOrdersHorecaFiltersStaffSelect([]))
                        dispatch(setOrdersHorecaFiltersStateSelect([]))
                        dispatch(setOrdersHorecaFiltersHallsSelect([]))
                        dispatch(setOrdersHorecaFiltersWorkPlacesSelect([]))
                        dispatch(setOrdersHorecaFiltersKitchenPointsSelect([]))
                        dispatch(setOrdersHorecaFiltersKitchenStateSelect([]))
                    }}><FilterAltOffIcon/></Button> : null}
            </ButtonGroup>
        )
    } else if (current_page === 'admin/orders/cinema') {
        return (
            <ButtonGroup>
                <Button variant='contained' color='secondary' sx={{marginLeft: '4px'}}
                        onClick={() => dispatch(openModal({type: 'cinema_filters', props: {}}))}
                        startIcon={<FilterAltIcon/>}>Фильтры</Button>
                {cinema_staff_selected.length > 0 ||
                cinema_state_selected.length > 0 ||
                cinema_seances_selected.length > 0 ||
                cinema_halls_selected.length > 0 ||
                cinema_workplaces_selected.length > 0 ||
                cinema_buyer_emails_selected !== '' ||
                cinema_buyer_phone_numbers_selected !== '' ?
                    <Button variant='contained' color='primary' onClick={() => {
                        dispatch(setOrdersCinemaFiltersStaffSelect([]))
                        dispatch(setOrdersCinemaFiltersStateSelect([]))
                        dispatch(setOrdersCinemaFiltersSeancesSelect([]))
                        dispatch(setOrdersCinemaFiltersHallsSelect([]))
                        dispatch(setOrdersCinemaFiltersWorkplacesSelect([]))
                        dispatch(setOrdersCinemaFiltersBuyerEmailsSelect(''))
                        dispatch(setOrdersCinemaFiltersBuyerPhoneNumbersSelect(''))
                    }}><FilterAltOffIcon/></Button> : null}
            </ButtonGroup>
        )
    }

    return null
}

export function EGAISMenu() {

    const current_page = useSelector(state => state.interface.current_page)

    if (current_page !== 'admin/egais') return null

    return (
        <Fade in={current_page === 'admin/egais'} timeout={TIMEOUT} unmountOnExit>
            <Box>
                <Button variant='contained' color='secondary'>Контрагенты</Button>
                <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Алкогольная продукция</Button>
                <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Входящие ТТН</Button>
                <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Акты списания</Button>
                <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Чеки</Button>
            </Box>
        </Fade>
    )
}

export function CinemaType() {

    const current_page = useSelector(state => state.interface.current_page)

    if (current_page !== 'admin/orders/cinema') return null

    return (
        <Fade in={current_page === 'admin/orders/cinema'} timeout={TIMEOUT} unmountOnExit>
            <ButtonGroup sx={{marginLeft: '4px'}} size='medium' variant='contained' color='secondary'>
                <Button variant='contained'><LaptopIcon/></Button>
                <Button variant='contained'><DockIcon/></Button>
                <Button variant='contained'><LanguageIcon/></Button>
            </ButtonGroup>
        </Fade>
    )
}

export function DateParamAdmin() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const current_page = useSelector(state => state.interface.current_page)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const film = useSelector(state => state.schedule.film_seances.film)

    const handleClick = (event) => {
        set_orders_date_calendar_open(event.currentTarget)
    }
    const handleClose = () => {
        set_orders_date_calendar_open(null)
    }
    const handleOnChange = (value) => {
        set_orders_date_calendar_open(null)
        const current_param_data = value.year() + '-' + (value.month() + 1) + '-' + (value.date())
        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_data}/${current_page === 'film' ? film.uid + '/' : ''}`)
    }

    // Календарь
    const [orders_date_calendar_open, set_orders_date_calendar_open] = useState(null)
    const open = Boolean(orders_date_calendar_open)
    const id = open ? 'orders-date-calendar' : null

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    const isPageMatch = ['admin/orders/cinema', 'admin/orders/horeca', 'kitchen'].includes(current_page)
    if (!isPageMatch) return null

    return <>
        <ButtonGroup size='small' variant='contained' color='secondary' className='admin-panel-period'>
            <Button onClick={() => {
                const now = new Date()
                const date = date_dayjs(
                    now.getHours() >= 0 && now.getHours() < 7
                        ? new Date(now.setDate(now.getDate() - 1))
                        : now
                )
                const current_param_date = from_dayjs_to_str(date)
                dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}` : '/'}`)
            }}>
                Сегодня
            </Button>
            <Button onClick={() => {
                dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                const date = dayjs(param_date_admin).subtract(1, 'day').format('YYYY-MM-DD')
                navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
            }}>
                <KeyboardArrowLeftIcon/>
            </Button>
            <Button onClick={handleClick} endIcon={<KeyboardArrowDownIcon/>}>
                Заказы {dayjs(param_date_admin).$D} {to_str_DAY(dayjs(param_date_admin).$d)}
            </Button>
            <Button onClick={() => {
                dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                const date = dayjs(param_date_admin).add(1, 'day').format('YYYY-MM-DD')
                navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
            }}>
                <KeyboardArrowRightIcon/>
            </Button>
        </ButtonGroup>

        <Popover
            id={id}
            open={open}
            anchorEl={orders_date_calendar_open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: '12px',
                        backgroundColor: '#393a3b'
                    }
                }
            }}
        >
            <Calendar
                value={dayjs(param_date_admin)}
                handleOnChahge={handleOnChange}
            />
        </Popover>
    </>
}

export function CreateDeleteButtons() {

    const current_page = useSelector(state => state.interface.current_page)

    const visiblePages = ['admin/operations', 'admin/zbooks']
    const isVisible = visiblePages.includes(current_page)

    if (!isVisible) return null

    return <Fade in={isVisible} timeout={TIMEOUT} unmountOnExit>
        <ButtonGroup sx={{marginRight: '4px'}} size='medium' variant='contained' color='secondary'>
            <Button variant='contained' startIcon={<AddIcon/>}>Создать</Button>
            <Button variant='contained' startIcon={<RemoveIcon/>}>Удалить</Button>
        </ButtonGroup>
    </Fade>
}

export function Equipment() {

    const current_page = useSelector(state => state.interface.current_page)

    if (current_page !== 'admin/equipment') return null

    return null

}

export default function AdminMenu() {
    return (
        <Box className='admin-panel'>
            <CreateDeleteButtons/>
            <DateParamAdmin/>
            <CinemaType/>
            <ShowFilters/>
            <EGAISMenu/>
            <AdminHallsList/>
            <Equipment/>
        </Box>
    )
}