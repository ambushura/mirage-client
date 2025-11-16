import {
    Autocomplete,
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Pagination,
    Popover,
    Select,
    Switch,
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
} from "../../redux/ordersReducer.js"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {date_dayjs, from_dayjs_to_str, to_str_DAY} from "../../service/advanced.js"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {openModal} from "../../redux/interfaceReducer.js"
import LaptopIcon from "@mui/icons-material/Laptop"
import LanguageIcon from "@mui/icons-material/Language"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Calendar from "../../ui/Calendar.jsx"
import {useEffect, useRef, useState} from "react"
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import {setMode, setUidHall} from "../../redux/hallsReducer.js"
import {ClearIcon} from "@mui/x-date-pickers"
import {
    cinema_order_fetch,
    common_list_get,
    common_orders_filters_halls_get,
    horeca_order_fetch
} from "../../service/fetch_service.js"
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import {
    setCurrentKKT,
    setCurrentPinpad,
    setOperationsDetails,
    setOperationsPage,
    setTriggerDeleteOperation,
    setTriggerDeleteReceipt,
    setTriggerDeleteSlip,
    setTriggerDeleteZBook,
    setTriggerSubmitOperation,
    setTriggerSubmitReceipt,
    setTriggerSubmitSlip,
    setTriggerSubmitZBook
} from "../../redux/documentsReducer.js"
import List from "../../ui/List.jsx"
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded'
import CloseIcon from '@mui/icons-material/Close'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SavingsIcon from '@mui/icons-material/Savings'
import SaveIcon from '@mui/icons-material/Save'

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

    return <Box sx={{
        display: "flex", justifyContent: "flex-end", alignItems: 'center', padding: '2px 0', marginRight: '5px'
    }}>
        <TextField
            label='QR, номер заказа, телефон'
            sx={{minWidth: '400px'}}
            variant='filled'
            color="textSecondary"
            value={order_search_value ?? ''}
            onChange={(event) => {
                if (event.target.value === '') {
                    dispatch(setOrderSearchValue(null))
                } else {
                    dispatch(setOrderSearchValue(event.target.value))
                }
            }}
            InputProps={{
                endAdornment: order_search_value !== null && <>
                    {order_search_value && <InputAdornment position="end">
                        <IconButton
                            onClick={() => dispatch(setOrderSearchValue(null))}
                            edge="end"
                            size="small"
                        >
                            <ClearIcon/>
                        </IconButton>
                    </InputAdornment>}
                </>
            }}
        />
    </Box>
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
    const {wp, kiosk} = useSelector(state => state.interface)

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
        await navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_data}/${current_page === 'film' ? film.uid + '/' : ''}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`)
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
                await navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}` : '/'}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`)
                await dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                await dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
                dispatch(setOrdersHorecaPage(1))
                dispatch(setOrdersCinemaPage(1))
            }}>
                Сегодня
            </Button>
            <Button onClick={async () => {
                const date = dayjs(param_date_admin).subtract(1, 'day').format('YYYY-MM-DD')
                await navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`)
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
                await navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`)
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
    const navigate = useNavigate()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const current_page = useSelector(state => state.interface.current_page)
    const [menu, set_menu] = useState([])
    const [menu_create_opened, set_menu_create_opened] = useState(false)
    const menu_create_ref = useRef(null)
    const prev_menu_create_opened = useRef(Boolean(menu_create_opened))

    useEffect(() => {
        switch (current_page) {
            case 'admin/zbooks':
                set_menu([{uid: 'documents_z_book', title: 'Книга'}, {uid: 'documents_receipt', title: 'Чек'}])
                break
            case 'admin/operations':
                set_menu([{
                    uid: 'documents_operation_close_shift', title: 'Заполнить по итогам смены'
                }, {uid: 'documents_operation', title: 'Операция'}])
                break
        }
    }, [current_page])

    return <>
        <ButtonGroup size='medium' variant='contained' color='secondary' sx={{marginRight: '5px'}}>
            <List
                size='small'
                open={menu_create_opened}
                anchor={menu_create_ref}
                prev_open={prev_menu_create_opened}
                id={'menu-create'}
                setOpen={set_menu_create_opened}
                button_text={'Создать'}
                list={menu}
                startIcon={<AddCircleOutlineIcon/>}
                endIcon={<KeyboardArrowDownIcon/>}
                type="menu-create"
                color={'secondary'}
                handleClose={(uid) => {
                    switch (uid) {
                        case 'documents_z_book':
                            navigate(`/admin/zbook/${city.code}/${filial.eais}/new/?${wp !== null ? 'wp=' + wp : ''}`)
                            break
                        case 'documents_receipt':
                            navigate(`/admin/receipt/${city.code}/${filial.eais}/new/?${wp !== null ? 'wp=' + wp : ''}`)
                            break
                        case 'documents_operation':
                            navigate(`/admin/operation/${city.code}/${filial.eais}/new/?${wp !== null ? 'wp=' + wp : ''}`)
                            break
                        case 'documents_operation_close_shift':
                            dispatch(openModal({type: 'documents_operation_close_shift', props: {uid: 'new'}}))
                            break
                    }
                }}
            />
            <Button startIcon={<DeleteForeverIcon/>}>Удалить</Button>
        </ButtonGroup>
    </>
}

export function Equipment() {

    const [menu, set_menu] = useState([{uid: 'workplace', title: 'Рабочее место'}, {
        uid: 'kkt', title: 'Касса'
    }, {uid: 'pinpad', title: 'Пинпад'}, {uid: 'printer', title: 'Чековый принтер'}, {
        uid: 'billet_check', title: 'Билетный контролер'
    }])
    const [menu_create_opened, set_menu_create_opened] = useState(false)
    const menu_create_ref = useRef(null)
    const prev_menu_create_opened = useRef(Boolean(menu_create_opened))

    return <Box>
        <List
            size='small'
            open={menu_create_opened}
            anchor={menu_create_ref}
            prev_open={prev_menu_create_opened}
            id={'menu-create'}
            setOpen={set_menu_create_opened}
            button_text={'Новое устройство'}
            list={menu}
            startIcon={<AddCircleOutlineIcon/>}
            endIcon={<KeyboardArrowDownIcon/>}
            type="menu-create"
            color={'secondary'}
            handleClose={(uid) => {
                switch (uid) {
                    case 'workplace':
                        break
                    case 'kkt':
                        break
                    case 'pinpad':
                        break
                    case 'printer':
                        break
                    case 'billet_check':
                        break
                }
            }}
        />
    </Box>
}

export function Operations() {

    const dispatch = useDispatch()
    const {operations_page, operations_pages} = useSelector(state => state.documents)
    const {operations_details} = useSelector(state => state.documents)
    const {columns, rows, date_shift_beginning, date_shift_ending} = useSelector(state => state.documents.operations)

    return <>
        <FormControlLabel onChange={() => {
            dispatch(setOperationsDetails(!operations_details))
        }} sx={{margin: '0 4px'}}
                          checked={operations_details}
                          control={<Switch/>} label="Подробно"/>
        <Pagination
            sx={{flexWrap: 'no-wrap'}}
            page={operations_page}
            onChange={(event, value) => dispatch(setOperationsPage(value))}
            size={'large'}
            count={operations_pages}
            showFirstButton showLastButton/>
    </>

}

export function CurrentKKT() {

    const dispatch = useDispatch()
    const current_page = useSelector(state => state.interface.current_page)
    const {kkt_list, uid_kkt_current} = useSelector(state => state.documents)
    const filial = useSelector(state => state.data.filial)

    const kkt_list_id = "zbooks-kkt-menu"
    const kkt_ref = useRef(null)
    const [kkt_open, set_kkt_open] = useState(false)
    const prev_kkt_open = useRef(Boolean(kkt_open))

    useEffect(() => {
        dispatch(common_list_get(filial, 'kkt'))
    }, [dispatch, filial, current_page])

    return <Box sx={{marginRight: '5px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}}>
        <ButtonGroup sx={{marginLeft: '5px'}}>
            <List
                type="zbooks-kkt"
                size='small'
                open={kkt_open}
                anchor={kkt_ref}
                prev_open={prev_kkt_open}
                id={kkt_list_id}
                setOpen={set_kkt_open}
                button_text={uid_kkt_current === '' ? 'Выберите кассу' : kkt_list.find(el => el.uid === uid_kkt_current) !== undefined ? kkt_list.find(el => el.uid === uid_kkt_current).name_organization + ' · ЗН ' + kkt_list.find(el => el.uid === uid_kkt_current).title : 'Объект не найден'}
                list={kkt_list}
                color='secondary'
                variant='contained'
                startIcon={<SavingsIcon/>}
                endIcon={<KeyboardArrowDownIcon/>}
                handleClose={(event) => {
                    dispatch(setCurrentKKT(event))
                }}
            />
            {uid_kkt_current !== '' && <Button
                variant='outlined'
                color='secondary'
                onClick={() => dispatch(openModal({
                    type: 'equipment_kkt', props: {uid: uid_kkt_current}
                }))}><OpenInNewIcon/></Button>}
            {uid_kkt_current !== '' && <Button variant='outlined'
                                               color='secondary'
                                               onClick={() => dispatch(setCurrentKKT(''))}>
                <CloseIcon/></Button>}
        </ButtonGroup>
    </Box>
}

export function CurrentPinpad() {

    const dispatch = useDispatch()
    const current_page = useSelector(state => state.interface.current_page)
    const {pinpad_list, uid_pinpad_current} = useSelector(state => state.documents)
    const filial = useSelector(state => state.data.filial)

    const pinpad_list_id = "zpinpads-pinpad-menu"
    const pinpad_ref = useRef(null)
    const [pinpad_open, set_pinpad_open] = useState(false)
    const prev_pinpad_open = useRef(Boolean(pinpad_open))

    useEffect(() => {
        dispatch(common_list_get(filial, 'pinpad'))
    }, [dispatch, filial, current_page])

    return <Box sx={{marginRight: '5px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}}>
        <ButtonGroup color='secondary' variant='outlined' sx={{marginLeft: '5px'}}>
            <List
                type="zpinpads-pinpad"
                size='small'
                open={pinpad_open}
                anchor={pinpad_ref}
                prev_open={prev_pinpad_open}
                id={pinpad_list_id}
                setOpen={set_pinpad_open}
                button_text={uid_pinpad_current === '' ? 'Выберите пинпад' : pinpad_list.find(el => el.uid === uid_pinpad_current).title}
                list={pinpad_list}
                color='secondary'
                variant='contained'
                startIcon={<PaymentRoundedIcon/>}
                endIcon={<KeyboardArrowDownIcon/>}
                handleClose={(event) => {
                    dispatch(setCurrentPinpad(event))
                }}
            />
            {uid_pinpad_current !== '' && <Button
                variant='outlined'
                onClick={() => dispatch(openModal({
                    type: 'equipment_pinpad', props: {uid: uid_pinpad_current}
                }))}><OpenInNewIcon/></Button>}
            {uid_pinpad_current !== '' && <Button variant='outlined'
                                                  color='secondary'
                                                  onClick={() => dispatch(setCurrentPinpad(''))}>
                <CloseIcon/>
            </Button>}
        </ButtonGroup>
    </Box>
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

export function ZBookMenu() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const wp = useSelector(state => state.interface.wp)
    const caption_zBook = useSelector(state => state.documents.caption_zBook)
    const {uid} = useSelector(state => state.interface.params)

    return <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <ButtonGroup sx={{marginRight: '4px'}}>
            <Button
                variant='contained' color='secondary'
                startIcon={<KeyboardArrowLeftIcon/>}
                onClick={() => {
                    navigate(-1)
                }}>Назад</Button>
            <Button variant='outlined' color='secondary' sx={{textWrap: 'nowrap'}}>{caption_zBook}</Button>
        </ButtonGroup>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button variant='contained' color='secondary' sx={{marginRight: 1}}
                    startIcon={<SaveIcon/>} onClick={() => {
                dispatch(setTriggerSubmitZBook(true))
                navigate(`/admin/zbooks/${city.code}/${filial.eais}/${param_date_admin}/?${wp !== null ? 'wp=' + wp : ''}`)
            }}>Сохранить</Button>
            {uid !== 'new' && <Button startIcon={<DeleteForeverIcon/>}
                                      variant='contained'
                                      color='error'
                                      onClick={() => {
                                          dispatch(setTriggerDeleteZBook(true))
                                          navigate(`/admin/zbooks/${city.code}/${filial.eais}/${param_date_admin}/?${wp !== null ? 'wp=' + wp : ''}`)
                                      }}
                                      sx={{marginRight: '2px'}}>Удалить</Button>}
        </Box>
    </Box>
}

export function OperationMenu() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const wp = useSelector(state => state.interface.wp)
    const caption_operation = useSelector(state => state.documents.caption_operation)
    const {uid} = useSelector(state => state.interface.params)

    return <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <ButtonGroup sx={{marginRight: '4px'}}>
            <Button
                variant='contained' color='secondary'
                startIcon={<KeyboardArrowLeftIcon/>}
                onClick={() => {
                    navigate(-1)
                }}>Назад</Button>
            <Button variant='outlined' color='secondary' sx={{textWrap: 'nowrap'}}>{caption_operation}</Button>
        </ButtonGroup>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button variant='contained' color='secondary' sx={{marginRight: 1}}
                    startIcon={<SaveIcon/>} onClick={() => {
                dispatch(setTriggerSubmitOperation(true))
                navigate(`/admin/operations/${city.code}/${filial.eais}/${param_date_admin}/?${wp !== null ? 'wp=' + wp : ''}`)
            }}>Сохранить</Button>
            {uid !== 'new' && <Button startIcon={<DeleteForeverIcon/>}
                                      variant='contained'
                                      color='error'
                                      onClick={() => {
                                          dispatch(setTriggerDeleteOperation(true))
                                          navigate(`/admin/operations/${city.code}/${filial.eais}/${param_date_admin}/?${wp !== null ? 'wp=' + wp : ''}`)
                                      }}
                                      sx={{marginRight: '2px'}}>Удалить</Button>}
        </Box>
    </Box>
}

export function ReceiptMenu() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {city, filial} = useSelector(state => state.data)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const wp = useSelector(state => state.interface.wp)
    const {receipt_order, caption_receipt} = useSelector(state => state.documents)
    const {uid} = useSelector(state => state.interface.params)

    return <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <ButtonGroup sx={{marginRight: '4px'}}>
            <Button
                variant='contained' color='secondary'
                startIcon={<KeyboardArrowLeftIcon/>}
                onClick={() => {
                    navigate(-1)
                }}>Назад</Button>
            <Button variant='outlined' color='secondary' sx={{textWrap: 'nowrap'}}>{caption_receipt}</Button>
        </ButtonGroup>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            {receipt_order !== null &&
                <Button sx={{marginRight: '4px'}} variant='outlined' color='secondary' startIcon={<OpenInNewIcon/>}
                        onClick={() => {
                            if (receipt_order.type === 'cinema') {
                                dispatch(cinema_order_fetch(filial, receipt_order.uid))
                            } else {
                                dispatch(horeca_order_fetch(filial, receipt_order.uid))
                            }
                        }}>Открыть заказ</Button>}
            <Button variant='contained' color='secondary' sx={{marginRight: 1}}
                    startIcon={<SaveIcon/>} onClick={() => {
                dispatch(setTriggerSubmitReceipt(true))
                navigate(`/admin/zbooks/${city.code}/${filial.eais}/${param_date_admin}/?${wp !== null ? 'wp=' + wp : ''}`)
            }}>Сохранить</Button>
            {uid !== 'new' && <Button startIcon={<DeleteForeverIcon/>}
                                      variant='contained'
                                      color='error'
                                      onClick={() => {
                                          dispatch(setTriggerDeleteReceipt(true))
                                          navigate(`/admin/zbooks/${city.code}/${filial.eais}/${param_date_admin}/?${wp !== null ? 'wp=' + wp : ''}`)
                                      }}
                                      sx={{marginRight: '2px'}}>Удалить</Button>}
        </Box>
    </Box>
}

export function SlipMenu() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {city, filial} = useSelector(state => state.data)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const wp = useSelector(state => state.interface.wp)
    const {slip_order, caption_slip} = useSelector(state => state.documents)
    const {uid} = useSelector(state => state.interface.params)

    return <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <ButtonGroup sx={{marginRight: '4px'}}>
            <Button
                variant='contained' color='secondary'
                startIcon={<KeyboardArrowLeftIcon/>}
                onClick={() => {
                    navigate(-1)
                }}>Назад</Button>
            <Button variant='outlined' color='secondary' sx={{textWrap: 'nowrap'}}>{caption_slip}</Button>
        </ButtonGroup>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            {slip_order !== null &&
                <Button sx={{marginRight: '4px'}} variant='outlined' color='secondary' startIcon={<OpenInNewIcon/>}
                        onClick={() => {
                            if (slip_order.type === 'cinema') {
                                dispatch(cinema_order_fetch(filial, slip_order.uid))
                            } else {
                                dispatch(horeca_order_fetch(filial, slip_order.uid))
                            }
                        }}>Открыть заказ</Button>}
            <Button variant='contained' color='secondary' sx={{marginRight: 1}}
                    startIcon={<SaveIcon/>} onClick={() => {
                dispatch(setTriggerSubmitSlip(true))
                navigate(`/admin/slip/${city.code}/${filial.eais}/${param_date_admin}/?${wp !== null ? 'wp=' + wp : ''}`)
            }}>Сохранить</Button>
            {uid !== 'new' && <Button startIcon={<DeleteForeverIcon/>}
                                      variant='contained'
                                      color='error'
                                      onClick={() => {
                                          dispatch(setTriggerDeleteSlip(true))
                                          navigate(`/admin/slip/${city.code}/${filial.eais}/${param_date_admin}/?${wp !== null ? 'wp=' + wp : ''}`)
                                      }}
                                      sx={{marginRight: '2px'}}>Удалить</Button>}
        </Box>
    </Box>
}

export default function AdminMenu() {

    const current_page = useSelector(state => state.interface.current_page)
    const order_search_value = useSelector(state => state.orders.order_search_value)

    const filial = useSelector(state => state.data.filial)
    const uid_user = useSelector(state => state.auth.uid)

    if (uid_user !== null) {
        return <Box id='top-menu'>
            {['admin/orders/cinema', 'admin/orders/horeca', 'kitchen', 'admin/scheme', 'admin/zbooks', 'admin/acquiring', 'admin/sales'].includes(current_page) &&
                <DateParamAdmin/>}
            {current_page === 'admin/acquiring' && filial !== undefined && <CurrentPinpad/>}
            {['admin/operations', 'admin/zbooks'].includes(current_page) && <CreateDeleteButtons/>}
            {current_page === 'admin/zbooks' && filial !== undefined && <CurrentKKT/>}
            {current_page === 'admin/zbook' && filial !== undefined && <ZBookMenu/>}
            {current_page === 'admin/receipt' && filial !== undefined && <ReceiptMenu/>}
            {current_page === 'admin/slip' && filial !== undefined && <SlipMenu/>}
            {current_page === 'admin/operation' && filial !== undefined && <OperationMenu/>}
            {current_page === 'admin/operations' && <Operations/>}
            {current_page === 'admin/orders/cinema' && order_search_value === null && <CinemaType/>}
            {((current_page === 'admin/orders/horeca' || current_page === 'admin/orders/cinema') || order_search_value !== null) &&
                <ShowFilters/>}
            {['admin/orders/horeca', 'admin/orders/cinema'].includes(current_page) && <ShowFastSearch/>}
            {current_page === 'admin/egais' && <EGAISMenu/>}
            {current_page === 'admin/halls' && <AdminHallsList/>}
            {current_page === 'admin/scheme' && <Equipment/>}
            {current_page === 'kitchen' && filial !== undefined && <ShowKitchenPoints/>}
            {current_page === 'admin/orders/horeca' && <ShowPagesHorecaOrders/>}
            {current_page === 'admin/orders/cinema' && <ShowPagesCinemaOrders/>}
        </Box>
    }
}