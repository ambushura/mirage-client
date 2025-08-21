import {
    Box,
    Button,
    ButtonGroup,
    FormControl, IconButton, InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
    Popover,
    Select,
    TextField
} from "@mui/material"
import dayjs from "dayjs"
import {
    NEW_EMPTY_HORDER,
    NEW_EMPTY_ORDER, setCurrentHorder,
    setCurrentPreOrder,
    setOrdersCinemaFiltersBuyerEmailsSelect,
    setOrdersCinemaFiltersBuyerPhoneNumbersSelect,
    setOrdersCinemaFiltersHallsSelect,
    setOrdersCinemaFiltersSeancesSelect,
    setOrdersCinemaFiltersStaffSelect,
    setOrdersCinemaFiltersStateSelect,
    setOrdersCinemaFiltersWorkplacesSelect, setOrdersCinemaPage, setOrderSearchValue,
    setOrdersHorecaFiltersHallsSelect,
    setOrdersHorecaFiltersKitchenPointsSelect,
    setOrdersHorecaFiltersKitchenStateSelect,
    setOrdersHorecaFiltersStaffSelect,
    setOrdersHorecaFiltersStateSelect,
    setOrdersHorecaFiltersWorkPlacesSelect, setOrdersHorecaPage
} from "../../../redux/ordersReducer.js"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {date_dayjs, from_dayjs_to_str, to_str_DAY} from "../../../service/advanced.js"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {openModal} from "../../../redux/interfaceReducer.js"
import LaptopIcon from "@mui/icons-material/Laptop"
import DockIcon from "@mui/icons-material/Dock"
import LanguageIcon from "@mui/icons-material/Language"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Calendar from "../../../components/forms/Calendar.jsx"
import {useEffect, useState} from "react"
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import {useSetHalls} from "../admin/halls/useSetHalls.js"
import {setMode, setUidHall} from "../../../redux/hallsReducer.js"
import {ClearIcon} from "@mui/x-date-pickers"
import {common_list_get} from "../../../service/fetch_service.js"
import {SelectMenu} from "../../../ui/SelectMenu.jsx"

export function AdminHallsList() {

    const dispatch = useDispatch()
    const halls = useSetHalls()

    const uid_hall = useSelector(state => state.halls.uid_hall)
    const mode = useSelector(state => state.halls.mode)

    return <Box sx={{marginRight: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <FormControl variant='filled' sx={{minWidth: '200px'}}>
            <InputLabel id="halls-select-label">Текущий зал</InputLabel>
            <Select
                sx={{marginRight: '5px'}}
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
            }}>Режим редактирования</Button>
        </ButtonGroup>
    </Box>
}

export function ShowFastSearch() {

    const dispatch = useDispatch()
    const order_search_value = useSelector(state => state.orders.order_search_value)

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: 'center',
            padding: '2px 0',
            marginRight: '5px'
        }}>
            <TextField
                label='QR, номер заказа, телефон'
                sx={{minWidth: '400px'}}
                variant='filled' color="textSecondary"
                value={order_search_value ?? ""}
                onChange={(event) => {
                    if (event.target.value === '') {
                        dispatch(setOrderSearchValue(null))
                    } else {
                        dispatch(setOrderSearchValue(event.target.value))
                    }
                }}
                InputProps={{
                    endAdornment: order_search_value && (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => dispatch(setOrderSearchValue(null))}
                                edge="end"
                                size="small"
                            >
                                <ClearIcon/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}/>
        </Box>
    )

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

    if (current_page === 'admin/orders/horeca') {
        return (
            <ButtonGroup sx={{marginRight: '5px'}}>
                <Button variant='contained' color='secondary'
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
            <ButtonGroup sx={{marginRight: '5px'}}>
                <Button variant='contained' color='secondary'
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

    return <Box sx={{marginRight: '5px'}}>
        <Button variant='contained' color='secondary'>Контрагенты</Button>
        <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Алкогольная продукция</Button>
        <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Входящие ТТН</Button>
        <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Акты списания</Button>
        <Button sx={{marginLeft: '4px'}} variant='contained' color='secondary'>Чеки</Button>
    </Box>
}

export function CinemaType() {

    return <ButtonGroup size='medium' variant='contained' color='secondary' sx={{marginRight: '5px'}}>
        <Button variant='contained'><LaptopIcon/></Button>
        <Button variant='contained'><DockIcon/></Button>
        <Button variant='contained'><LanguageIcon/></Button>
    </ButtonGroup>
}

export function DateParamAdmin() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const current_page = useSelector(state => state.interface.current_page)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const film = useSelector(state => state.schedule.film_seances.film)
    const order_search_value = useSelector(state => state.orders.order_search_value)
    const [admin_calendar_open, set_admin_calendar_open] = useState(null)

    if (order_search_value !== null) return null

    // Календарь
    const open = Boolean(admin_calendar_open)
    const id = open ? 'admin-date-calendar' : null

    const handleClick = (event) => {
        set_admin_calendar_open(event.currentTarget)
    }
    const handleClose = () => {
        set_admin_calendar_open(null)
    }
    const handleOnChange = async (value) => {
        set_admin_calendar_open(null)
        const current_param_data = value.year() + '-' + (value.month() + 1) + '-' + (value.date())
        await navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_data}/${current_page === 'film' ? film.uid + '/' : ''}`)
        await dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        await dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
        dispatch(setOrdersHorecaPage(1))
        dispatch(setOrdersCinemaPage(1))
    }

    return <>
        <ButtonGroup size='medium' variant='contained' color='secondary' className='admin-panel-period'
                     sx={{marginRight: '5px'}}>
            <Button onClick={async () => {
                const now = new Date()
                const date = date_dayjs(
                    now.getHours() >= 0 && now.getHours() < 7
                        ? new Date(now.setDate(now.getDate() - 1))
                        : now
                )
                const current_param_date = from_dayjs_to_str(date)
                await navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}` : '/'}`)
                await dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                await dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
                dispatch(setOrdersHorecaPage(1))
                dispatch(setOrdersCinemaPage(1))
            }}>
                Сегодня
            </Button>
            <Button onClick={async () => {
                const date = dayjs(param_date_admin).subtract(1, 'day').format('YYYY-MM-DD')
                await navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                await dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                await dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
                dispatch(setOrdersHorecaPage(1))
                dispatch(setOrdersCinemaPage(1))
            }}>
                <KeyboardArrowLeftIcon/>
            </Button>
            <Button onClick={handleClick} endIcon={<KeyboardArrowDownIcon/>}>
                Заказы {dayjs(param_date_admin).$D} {to_str_DAY(dayjs(param_date_admin).$d)}
            </Button>
            <Button onClick={async () => {
                const date = dayjs(param_date_admin).add(1, 'day').format('YYYY-MM-DD')
                await navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                await dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                await dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
                dispatch(setOrdersHorecaPage(1))
                dispatch(setOrdersCinemaPage(1))
            }}>
                <KeyboardArrowRightIcon/>
            </Button>
        </ButtonGroup>
        <Popover
            id={id}
            open={open}
            anchorEl={admin_calendar_open}
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

    const dispatch = useDispatch()
    const current_page = useSelector(state => state.interface.current_page)

    return <ButtonGroup size='medium' variant='contained' color='secondary' sx={{marginRight: '5px'}}>
        <Button variant='contained' startIcon={<AddIcon/>} onClick={() => {
            switch (current_page) {
                case 'admin/operations':
                    dispatch(openModal({type: 'documents_operation', props: {}}))
                    break
            }
        }}>Создать</Button>
        <Button variant='contained' startIcon={<RemoveIcon/>}>Удалить</Button>
    </ButtonGroup>
}

export function Equipment() {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSelect = () => {
        handleClose()
    }

    return <Box>
        <Button startIcon={<AddIcon/>} onClick={handleClick} variant="contained">
            Добавить устройство
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => handleSelect('Рабочее место')}>Рабочее место</MenuItem>
            <MenuItem onClick={() => handleSelect('Кассу')}>Кассу</MenuItem>
            <MenuItem onClick={() => handleSelect('Пинпад')}>Пинпад</MenuItem>
            <MenuItem onClick={() => handleSelect('Чековый принтер')}>Чековый принтер</MenuItem>
            <MenuItem onClick={() => handleSelect('Билетный контролер')}>Билетный контролер</MenuItem>
        </Menu>
    </Box>

}

export function ShowDateOperations() {

    const {date_shift_beginning, date_shift_ending} = useSelector(state => state.documents.operations)

    return (
        <ButtonGroup color='secondary' variant='contained'>
            <Button>{date_shift_beginning}</Button>
            <Button>{date_shift_ending}</Button>
        </ButtonGroup>
    )
}

export function CurrentKKT() {

    const dispatch = useDispatch()
    const {kkt_list, uid_kkt_current} = useSelector(state => state.documents.zbooks)
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    useEffect(() => {
        dispatch(common_list_get(filial, wp, 'kkt'))
    }, [dispatch, filial, wp])

    return (
        <Box sx={{marginRight: '5px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}}>
            <SelectMenu
                type={'zbooks-kkt'}
                list={kkt_list}
                current_value={uid_kkt_current}
                width={230}
            />
            <ButtonGroup color='secondary' variant='contained' sx={{marginLeft: '5px'}}>
                <Button>Суточный отчет</Button>
                <Button>X-отчет</Button>
                <Button>Закрыть смену</Button>
            </ButtonGroup>
        </Box>
    )
}

export function CurrentPinpad() {

    const dispatch = useDispatch()
    const {pinpad_list, uid_pinpad_current} = useSelector(state => state.documents.zbooks)
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    useEffect(() => {
        dispatch(common_list_get(filial, wp, 'pinpad'))
    }, [dispatch, filial, wp])

    return (
        <Box sx={{marginRight: '5px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}}>
            <SelectMenu
                type={'zbooks-pinpad'}
                list={pinpad_list}
                current_value={uid_pinpad_current}
                width={230}
            />
            <ButtonGroup color='secondary' variant='contained' sx={{marginLeft: '5px'}}>
                <Button>Закрыть смену</Button>
            </ButtonGroup>
        </Box>
    )
}

export default function AdminMenu() {

    const current_page = useSelector(state => state.interface.current_page)
    const order_search_value = useSelector(state => state.orders.order_search_value)

    return (
        <Box className='admin-panel'>
            {['admin/orders/cinema', 'admin/orders/horeca', 'kitchen', 'admin/equipment', 'admin/zbooks', 'admin/acquiring'].includes(current_page) ?
                <DateParamAdmin/> : null}
            {current_page === 'admin/zbooks' ? <CurrentKKT/> : null}
            {current_page === 'admin/acquiring' ? <CurrentPinpad/> : null}
            {['admin/operations', 'admin/zbooks', 'admin/acquiring'].includes(current_page) ?
                <CreateDeleteButtons/> : null}
            {current_page === 'admin/operations' ? <ShowDateOperations/> : null}
            {current_page === 'admin/orders/cinema' && order_search_value === null ? <CinemaType/> : null}
            {(current_page === 'admin/orders/horeca' || current_page === 'admin/orders/cinema') || order_search_value !== null ?
                <ShowFilters/> : null}
            {current_page === 'admin/orders/horeca' || current_page === 'admin/orders/cinema' ?
                <ShowFastSearch/> : null}
            {current_page === 'admin/egais' ? <EGAISMenu/> : null}
            {current_page === 'admin/halls' ? <AdminHallsList/> : null}
            {current_page === 'admin/equipment' ? <Equipment/> : null}
        </Box>
    )
}