import {
    Autocomplete,
    Box,
    Button,
    ButtonGroup,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
    Pagination,
    Popover,
    Select,
    TextField
} from "@mui/material"
import dayjs from "dayjs"
import {
    NEW_EMPTY_HORDER,
    NEW_EMPTY_ORDER,
    setCurrentHorder,
    setCurrentPreOrder,
    setKitchenPointsList,
    setOrdersCinemaFiltersBuyerEmailsSelect,
    setOrdersCinemaFiltersBuyerPhoneNumbersSelect,
    setOrdersCinemaFiltersFromKioskSelect,
    setOrdersCinemaFiltersFromSiteSelect,
    setOrdersCinemaFiltersFromWPSelect,
    setOrdersCinemaFiltersHallsSelect,
    setOrdersCinemaFiltersSeancesSelect,
    setOrdersCinemaFiltersStaffSelect,
    setOrdersCinemaFiltersStateSelect,
    setOrdersCinemaFiltersWorkplacesSelect,
    setOrdersCinemaPage,
    setOrderSearchValue,
    setOrdersHorecaFiltersHallsSelect,
    setOrdersHorecaFiltersKitchenPointsSelect,
    setOrdersHorecaFiltersKitchenStateSelect,
    setOrdersHorecaFiltersStaffSelect,
    setOrdersHorecaFiltersStateSelect,
    setOrdersHorecaFiltersWorkPlacesSelect,
    setOrdersHorecaPage,
    setUidKitchenPointsSelected
} from "../../../redux/ordersReducer.js"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {date_dayjs, from_dayjs_to_str, to_str_DAY} from "../../../service/advanced.js"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {openModal} from "../../../redux/interfaceReducer.js"
import LaptopIcon from "@mui/icons-material/Laptop"
import LanguageIcon from "@mui/icons-material/Language"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Calendar from "../../../components/forms/Calendar.jsx"
import {useEffect, useState} from "react"
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import {setMode, setUidHall} from "../../../redux/hallsReducer.js"
import {ClearIcon} from "@mui/x-date-pickers"
import {common_list_get, common_orders_filters_halls_get, equipment_action} from "../../../service/fetch_service.js"
import {SelectMenu} from "../../../ui/SelectMenu.jsx"
import {
    ROUTE_EQUIPMENT_KKT_Z,
    ROUTE_EQUIPMENT_PINPAD_X,
    ROUTE_EQUIPMENT_PINPAD_Z
} from "../../../service/fetch_routes.js"
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import {setOperationsPage} from "../../../redux/documentsReducer.js";

export function AdminHallsList() {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const uid_hall = useSelector(state => state.halls.uid_hall)
    const mode = useSelector(state => state.halls.mode)
    const [halls, set_halls] = useState([])

    useEffect(() => {
        const fetch_halls = async () => {
            const fetching_result = await dispatch(common_orders_filters_halls_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                set_halls(fetching_result.data)
            }
        }
        if (filial !== undefined) {
            fetch_halls()
        }
    }, [dispatch, filial])

    return <Box sx={{marginRight: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <FormControl variant='filled' sx={{minWidth: '200px'}}>
            <InputLabel id="halls-select-label" color='secondary'>Текущий зал</InputLabel>
            <Select
                sx={{marginRight: '5px'}}
                onChange={(event) => {
                    dispatch(setUidHall(event.target.value))
                }}
                labelId="halls-select-label"
                id="halls-select"
                value={uid_hall !== null ? uid_hall : null}
                label="Залы"
                variant='filled'
                color='secondary'
            >
                {halls !== null && halls.map(hall => <MenuItem
                    key={hall.uid}
                    value={hall.uid}>{hall.title}</MenuItem>)}
            </Select>
        </FormControl>
        <ButtonGroup variant='contained'>
            <Button color={mode === 'block' ? 'primary' : 'secondary'} onClick={() => {
                dispatch(setMode('block'))
            }}>Режим блокировки</Button>
            <Button color={mode === 'view' ? 'primary' : 'secondary'} onClick={() => {
                dispatch(setMode('view'))
            }}>Режим редактирования</Button>
        </ButtonGroup>
    </Box>
}

export function ShowFastSearch() {

    const dispatch = useDispatch()
    const order_search_value = useSelector(state => state.orders.order_search_value)

    return (<Box sx={{
        display: "flex", justifyContent: "flex-end", alignItems: 'center', padding: '2px 0', marginRight: '5px'
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
                endAdornment: order_search_value && (<InputAdornment position="end">
                    <IconButton
                        onClick={() => dispatch(setOrderSearchValue(null))}
                        edge="end"
                        size="small"
                    >
                        <ClearIcon/>
                    </IconButton>
                </InputAdornment>),
            }}/>
    </Box>)

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
        return <ButtonGroup sx={{marginRight: '5px'}}>
            <Button variant='outlined' color='secondary'
                    onClick={() => dispatch(openModal({type: 'horeca_filters', props: {}}))}
                    startIcon={<FilterAltIcon/>}>Фильтры</Button>
            {horeca_staff_selected.length > 0 || horeca_state_selected.length > 0 || horeca_halls_selected.length > 0 || horeca_workplaces_selected.length > 0 || horeca_kitchen_points_selected.length > 0 || horeca_kitchen_state_selected.length > 0 ?
                <Button variant='contained' color='secondary' onClick={() => {
                    dispatch(setOrdersHorecaFiltersStaffSelect([]))
                    dispatch(setOrdersHorecaFiltersStateSelect([]))
                    dispatch(setOrdersHorecaFiltersHallsSelect([]))
                    dispatch(setOrdersHorecaFiltersWorkPlacesSelect([]))
                    dispatch(setOrdersHorecaFiltersKitchenPointsSelect([]))
                    dispatch(setOrdersHorecaFiltersKitchenStateSelect([]))
                }}><FilterAltOffIcon/></Button> : null}
        </ButtonGroup>
    } else if (current_page === 'admin/orders/cinema') {
        return <ButtonGroup sx={{marginRight: '5px'}}>
            <Button variant='outlined' color='secondary'
                    onClick={() => dispatch(openModal({type: 'cinema_filters', props: {}}))}
                    startIcon={<FilterAltIcon/>}>Фильтры</Button>
            {cinema_staff_selected.length > 0 || cinema_state_selected.length > 0 || cinema_seances_selected.length > 0 || cinema_halls_selected.length > 0 || cinema_workplaces_selected.length > 0 || cinema_buyer_emails_selected !== '' || cinema_buyer_phone_numbers_selected !== '' ?
                <Button variant='contained' color='secondary' onClick={() => {
                    dispatch(setOrdersCinemaFiltersStaffSelect([]))
                    dispatch(setOrdersCinemaFiltersStateSelect([]))
                    dispatch(setOrdersCinemaFiltersSeancesSelect([]))
                    dispatch(setOrdersCinemaFiltersHallsSelect([]))
                    dispatch(setOrdersCinemaFiltersWorkplacesSelect([]))
                    dispatch(setOrdersCinemaFiltersBuyerEmailsSelect(''))
                    dispatch(setOrdersCinemaFiltersBuyerPhoneNumbersSelect(''))
                }}><FilterAltOffIcon/></Button> : null}
        </ButtonGroup>
    }

    return null
}

export function EGAISMenu() {
    return <ButtonGroup variant='contained' color='secondary' sx={{marginRight: '5px'}}>
        <Button>Контрагенты</Button>
        <Button>Алкогольная продукция</Button>
        <Button>Входящие ТТН</Button>
        <Button>Акты списания</Button>
        <Button>Чеки</Button>
    </ButtonGroup>
}

export function CinemaType() {

    const dispatch = useDispatch()
    const orders_cinema_filters_from_site_selected = useSelector(state => state.orders.orders_cinema_filters_from_site_selected)
    const orders_cinema_filters_from_kiosk_selected = useSelector(state => state.orders.orders_cinema_filters_from_kiosk_selected)
    const orders_cinema_filters_from_wp_selected = useSelector(state => state.orders.orders_cinema_filters_from_wp_selected)

    return <ButtonGroup size='medium' variant='contained' color='secondary' sx={{marginRight: '5px'}}>
        <Button color={orders_cinema_filters_from_wp_selected ? 'primary' : 'secondary'}
                onClick={() => dispatch(setOrdersCinemaFiltersFromWPSelect())}><LaptopIcon/></Button>
        <Button color={orders_cinema_filters_from_kiosk_selected ? 'primary' : 'secondary'}
                onClick={() => dispatch(setOrdersCinemaFiltersFromKioskSelect())}><SmartphoneIcon/></Button>
        <Button color={orders_cinema_filters_from_site_selected ? 'primary' : 'secondary'}
                onClick={() => dispatch(setOrdersCinemaFiltersFromSiteSelect())}><LanguageIcon/></Button>
    </ButtonGroup>
}

export function DateParamAdmin() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const current_page = useSelector(state => state.interface.current_page)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const film = useSelector(state => state.schedule.film)
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
                const date = date_dayjs(now.getHours() >= 0 && now.getHours() < 7 ? new Date(now.setDate(now.getDate() - 1)) : now)
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
            <Button onClick={handleClick} endIcon={
                <KeyboardArrowDownIcon/>}>{dayjs(param_date_admin).$D} {to_str_DAY(dayjs(param_date_admin).$d)}</Button>
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
                vertical: 'bottom', horizontal: 'left',
            }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: '12px', backgroundColor: '#393a3b'
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
        <Button startIcon={<AddIcon/>} onClick={() => {
            switch (current_page) {
                case 'admin/operations':
                    dispatch(openModal({type: 'documents_operation', props: {}}))
                    break
            }
        }}>Создать</Button>
        <Button startIcon={<RemoveIcon/>}>Удалить</Button>
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
        <Button startIcon={<AddIcon/>} onClick={handleClick} variant="outlined" color='outlined'>
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
    const {columns, rows} = useSelector(state => state.documents.operations)

    if (columns.length === 0 || rows.length === 0) return null

    return <ButtonGroup color='secondary' variant='outlined'>
        <Button>{date_shift_beginning}</Button>
        <Button>{date_shift_ending}</Button>
    </ButtonGroup>
}

export function Operations() {

    const dispatch = useDispatch()
    const {operations_page, operations_pages} = useSelector(state => state.documents)
    return <Pagination
        sx={{flexWrap: 'no-wrap'}}
        page={operations_page}
        onChange={(event, value) => dispatch(setOperationsPage(value))}
        size={'large'}
        count={operations_pages}
        showFirstButton showLastButton/>

}

export function CurrentKKT() {

    const dispatch = useDispatch()
    const current_page = useSelector(state => state.interface.current_page)
    const {kkt_list, uid_kkt_current} = useSelector(state => state.documents.zbooks)
    const filial = useSelector(state => state.data.filial)

    useEffect(() => {
        dispatch(common_list_get(filial, 'kkt'))
    }, [dispatch, filial, current_page])

    return <Box sx={{marginRight: '5px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}}>
        <SelectMenu
            type={'zbooks-kkt'}
            list={kkt_list}
            current_value={uid_kkt_current}
            width={230}
        />
        <ButtonGroup color='secondary' variant='outlined' sx={{marginLeft: '5px'}}>
            <Button>Суточный отчет</Button>
            <Button>X-отчет</Button>
            <Button>Открыть ДЯ</Button>
            <Button variant='contained' color='primary'
                    onClick={() => dispatch(equipment_action(filial, ROUTE_EQUIPMENT_KKT_Z, {uid: uid_kkt_current}))}>Закрыть
                смену</Button>
        </ButtonGroup>
    </Box>
}

export function CurrentPinpad() {

    const dispatch = useDispatch()
    const current_page = useSelector(state => state.interface.current_page)
    const {pinpad_list, uid_pinpad_current} = useSelector(state => state.documents.zpinpads)
    const filial = useSelector(state => state.data.filial)

    useEffect(() => {
        dispatch(common_list_get(filial, 'pinpad'))
    }, [dispatch, filial, current_page])

    return (<Box sx={{marginRight: '5px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}}>
        <SelectMenu
            type={'zbooks-pinpad'}
            list={pinpad_list}
            current_value={uid_pinpad_current}
            width={230}
        />
        <ButtonGroup color='secondary' variant='outlined' sx={{marginLeft: '5px'}}>
            <Button variant='outlined' color='secondary'
                    onClick={() => dispatch(equipment_action(filial, ROUTE_EQUIPMENT_PINPAD_X, {uid: uid_pinpad_current}))}>Краткий
                отчет</Button>
            <Button variant='contained' color='primary'
                    onClick={() => dispatch(equipment_action(filial, ROUTE_EQUIPMENT_PINPAD_Z, {uid: uid_pinpad_current}))}>Закрыть
                смену</Button>
        </ButtonGroup>
    </Box>)
}

export function ShowKitchenPoints() {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const current_page = useSelector(state => state.interface.current_page)
    const kitchen_points_list = useSelector(state => state.orders.kitchen_points_list)
    const uid_kitchen_points_selected = useSelector(state => state.orders.uid_kitchen_points_selected)

    useEffect(() => {
        dispatch(common_list_get(filial, 'kitchen_points'))
        return () => dispatch(setKitchenPointsList([]))
    }, [dispatch, filial, current_page])

    const tags = (size, multiply, limit_tags, id, label, placeholder) => {
        return <Autocomplete
            sx={{backgroundColor: 'white', borderRadius: '4px 4px 0 0'}}
            multiple={multiply}
            size={size}
            limitTags={limit_tags}
            id={id}
            options={kitchen_points_list}
            value={kitchen_points_list.filter(opt => uid_kitchen_points_selected.includes(opt.uid))}
            onChange={(event, newValue) => {
                dispatch(setUidKitchenPointsSelected(newValue.map(v => v.uid)))
            }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (<TextField
                {...params}
                sx={{width: '100%'}}
                variant="filled"
                color='secondary'
                label={label}
                placeholder={placeholder}
            />)}
            isOptionEqualToValue={(option, value) => option.uid === value.uid}
        />
    }

    return <Box sx={{flex: 1, width: '100%', marginRight: '4px'}}>
        {tags("large", true, 1, "kitchen-points-tags", "Цеха", "Цех")}
    </Box>
}

export function ShowPagesHorecaOrders() {

    const dispatch = useDispatch()
    const {total_count} = useSelector(state => state.orders.orders_horeca)
    const page = useSelector(state => state.orders.orders_horeca_page)
    const pages = Math.ceil(total_count / 20)
    if (pages > 1) return <Pagination
        page={page}
        onChange={(event, value) => dispatch(setOrdersHorecaPage(value))}
        size={'large'}
        count={pages}
        showFirstButton
        showLastButton/>
}

export function ShowPagesCinemaOrders() {

    const dispatch = useDispatch()
    const {total_count} = useSelector(state => state.orders.orders_cinema)
    const page = useSelector(state => state.orders.orders_cinema_page)
    const pages = Math.ceil(total_count / 20)
    if (pages > 1) return <Pagination
        page={page}
        onChange={(event, value) => dispatch(setOrdersCinemaPage(value))}
        size={'large'}
        count={pages}
        showFirstButton
        showLastButton/>
}

export default function AdminMenu() {

    const current_page = useSelector(state => state.interface.current_page)
    const order_search_value = useSelector(state => state.orders.order_search_value)

    const filial = useSelector(state => state.data.filial)

    return <Box id='top-menu'>
        {['admin/orders/cinema', 'admin/orders/horeca', 'kitchen', 'admin/equipment', 'admin/zbooks', 'admin/acquiring'].includes(current_page) ?
            <DateParamAdmin/> : null}
        {current_page === 'admin/zbooks' && filial !== undefined ? <CurrentKKT/> : null}
        {current_page === 'admin/acquiring' && filial !== undefined ? <CurrentPinpad/> : null}
        {['admin/operations', 'admin/zbooks', 'admin/acquiring'].includes(current_page) ? <CreateDeleteButtons/> : null}
        {current_page === 'admin/operations' ? <ShowDateOperations/> : null}
        {current_page === 'admin/operations' ? <Operations/> : null}
        {current_page === 'admin/orders/cinema' && order_search_value === null ? <CinemaType/> : null}
        {(current_page === 'admin/orders/horeca' || current_page === 'admin/orders/cinema') || order_search_value !== null ?
            <ShowFilters/> : null}
        {['admin/orders/horeca', 'admin/orders/cinema'].includes(current_page) && <ShowFastSearch/>}
        {current_page === 'admin/egais' && <EGAISMenu/>}
        {current_page === 'admin/halls' && <AdminHallsList/>}
        {current_page === 'admin/equipment' && <Equipment/>}
        {current_page === 'kitchen' && filial !== undefined && <ShowKitchenPoints/>}
        {current_page === 'admin/orders/horeca' && <ShowPagesHorecaOrders/>}
        {current_page === 'admin/orders/cinema' && <ShowPagesCinemaOrders/>}
    </Box>
}