import {Box, Button, ButtonGroup, Fade, Popover} from "@mui/material"
import dayjs from "dayjs"
import {
    NEW_EMPTY_ORDER,
    setCurrentPreOrder, setOrdersCinemaFiltersBuyerEmailsSelect, setOrdersCinemaFiltersBuyerPhoneNumbersSelect,
    setOrdersCinemaFiltersHallsSelect,
    setOrdersCinemaFiltersSeancesSelect,
    setOrdersCinemaFiltersStaffSelect, setOrdersCinemaFiltersStateSelect, setOrdersCinemaFiltersWorkplacesSelect,
    setOrdersHorecaFiltersHallsSelect,
    setOrdersHorecaFiltersKitchenPointsSelect,
    setOrdersHorecaFiltersKitchenStateSelect,
    setOrdersHorecaFiltersStaffSelect,
    setOrdersHorecaFiltersStateSelect,
    setOrdersHorecaFiltersWorkPlacesSelect
} from "../../../redux/ordersReducer.js"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {to_str_DAY} from "../../../service/advanced.js"
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
import {useState} from "react"
import FilterAltIcon from '@mui/icons-material/FilterAlt'

const MenuAdmin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const current_page = useSelector(state => state.interface.current_page)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

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

    // Календарь
    const [orders_date_calendar_open, set_orders_date_calendar_open] = useState(null)
    const open = Boolean(orders_date_calendar_open)
    const id = open ? 'orders-date-calendar' : null
    const handleClick = (event) => {
        set_orders_date_calendar_open(event.currentTarget)
    }
    const handleClose = () => {
        set_orders_date_calendar_open(null)
    }
    const handleOnChahge = (value) => {
        set_orders_date_calendar_open(null)
        const current_param_data = value.year() + '-' + (value.month() + 1) + '-' + (value.date())
        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_data}/${current_page === 'film' ? film.uid + '/' : ''}`)
    }

    const show_create_delete = () => {
        if (['admin/operations', 'admin/zbooks'].find(el => el === current_page) !== undefined) {
            return (
                <Fade in={['admin/operations', 'admin/zbooks'].find(el => el === current_page) !== undefined}
                      timeout={TIMEOUT} unmountOnExit>
                    <ButtonGroup sx={{marginRight: '4px'}} size='medium' variant='contained' color='secondary'>
                        <Button variant='contained' startIcon={<AddIcon/>}>Создать</Button>
                        <Button variant='contained' startIcon={<RemoveIcon/>}>Удалить</Button>
                    </ButtonGroup>
                </Fade>
            )
        }
    }

    const show_date_param_admin = () => {
        if (['admin/orders/cinema', 'admin/orders/horeca'].find(el => el === current_page) !== undefined) {
            return <>
                <ButtonGroup size='small' variant='contained' color='secondary'
                             className='admin-panel-period'>
                    <Button onClick={() => {
                        const date = dayjs(new Date()).format('YYYY-MM-DD')
                        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                        navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                    }}>Сегодня</Button>
                    <Button onClick={() => {
                        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                        const date = dayjs(param_date_admin).subtract(1, 'day').format('YYYY-MM-DD')
                        navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                    }}><KeyboardArrowLeftIcon/></Button>
                    <Button onClick={handleClick} endIcon={
                        <KeyboardArrowDownIcon/>}>Заказы {dayjs(param_date_admin).$D} {to_str_DAY(dayjs(param_date_admin).$d)}</Button>
                    <Button onClick={() => {
                        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                        const date = dayjs(param_date_admin).subtract(-1, 'day').format('YYYY-MM-DD')
                        navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                    }}><KeyboardArrowRightIcon/></Button>
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
                    }}>
                    <Calendar
                        value={dayjs(param_date_admin)}
                        handleOnChahge={handleOnChahge}
                    />
                </Popover>
            </>
        }
    }

    const show_cinema_type = () => {
        if (current_page === 'admin/orders/cinema') {
            return (
                <Fade in={current_page === 'admin/orders/cinema'} timeout={TIMEOUT} unmountOnExit>
                    <ButtonGroup sx={{marginLeft: '4px'}} size='medium' variant='contained' color='secondary'>
                        <Button variant='contained'><LaptopIcon/></Button>
                        <Button variant='contained'><DockIcon/></Button>
                        <Button variant='contained'>< LanguageIcon/></Button>
                    </ButtonGroup>
                </Fade>
            )
        }
    }

    const show_egais_menu = () => {
        if (current_page === 'admin/egais') {
            return (
                <Fade in={current_page === 'admin/egais'} timeout={TIMEOUT} unmountOnExit>
                    <Box>
                        <Button variant='contained' color='secondary'>Организации</Button>
                        <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Алкогольная
                            продукция</Button>
                        <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Входящие
                            ТТН</Button>
                        <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Акты
                            списания</Button>
                        <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Чеки</Button>
                    </Box>
                </Fade>
            )
        }
    }

    const show_filters = () => {
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
    }

    return (
        <Box className='admin-panel'>
            {show_create_delete()}
            {show_date_param_admin()}
            {show_cinema_type()}
            {show_filters()}
            {show_egais_menu()}
        </Box>
    )
}

export default MenuAdmin