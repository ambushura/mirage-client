import {useState} from 'react'
import {Box, Button, ButtonGroup, Popover} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import dayjs from "dayjs"
import {useNavigate} from "react-router-dom"
import {date_dayjs, from_dayjs_to_str, get_date_shift, to_str_DAY} from "../../service/advanced.js"
import Calendar from "../../ui/Calendar.jsx"
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import {openModal} from "../../redux/interfaceReducer.js"
import {
    setScheduleFiltersFilmAgeSelect,
    setScheduleFiltersFilmCopyTypes,
    setScheduleFiltersFilmsSelect,
    setScheduleFiltersFilmTypesSelect,
    setScheduleFiltersHallsSelect,
    setScheduleFiltersHallTypeRegular,
    setScheduleFiltersHallTypeVip,
    setScheduleFiltersPrice,
    setScheduleFiltersSeanceCanceled,
    setScheduleFiltersSeanceClosed,
    setScheduleFiltersSeanceOpened,
    setScheduleFiltersTime,
    setShowFreeSpace
} from "../../redux/scheduleReducer.js"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const ScheduleMenu = () => {

    // Служебные функции
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Данные из хранилища
    const {city, filial} = useSelector(state => state.data)
    const film = useSelector(state => state.schedule.film)

    const current_page = useSelector(state => state.interface.current_page)
    const param_date = useSelector(state => state.interface.params.param_date)

    const schedule_filters_film_types = useSelector(state => state.schedule.schedule_filters_film_types)
    const schedule_filters_film_types_selected = useSelector(state => state.schedule.schedule_filters_film_types_selected)

    const show_free_space = useSelector(state => state.schedule.show_free_space)

    // Календарь
    const [schedule_calendar_open, set_schedule_calendar_open] = useState(null)
    const open = Boolean(schedule_calendar_open)
    const id = open ? 'schedule-city-calendar' : null

    const handleClick = (event) => {
        set_schedule_calendar_open(event.currentTarget)
    }
    const handleClose = () => {
        set_schedule_calendar_open(null)
    }

    const handleOnChahge = (value) => {
        set_schedule_calendar_open(null)
        const current_param_data = value.year() + '-' + (value.month() + 1) + '-' + (value.date())
        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_data}/${current_page === 'film' ? film.uid + '/' : ''}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`)
    }

    // Фильтры кино
    const seance_closed = useSelector(state => state.schedule.schedule_filters_seance_closed)
    const seance_canceled = useSelector(state => state.schedule.schedule_filters_seance_canceled)
    const seance_opened = useSelector(state => state.schedule.schedule_filters_seance_opened)
    const films_selected = useSelector(state => state.schedule.schedule_filters_films_selected)
    const film_copy_types_selected = useSelector(state => state.schedule.schedule_filters_film_copy_types_selected)
    const film_age = useSelector(state => state.schedule.schedule_filters_film_age)
    const halls_selected = useSelector(state => state.schedule.schedule_filters_halls_selected)
    const hall_type_vip = useSelector(state => state.schedule.schedule_filters_hall_type_vip)
    const hall_type_regular = useSelector(state => state.schedule.schedule_filters_hall_type_regular)
    const seance_time = useSelector(state => state.schedule.schedule_filters_time)
    const seance_price = useSelector(state => state.schedule.schedule_filters_price)

    const uid_user = useSelector(state => state.auth.uid)
    const {wp, kiosk} = useSelector(state => state.interface)

    return <Box id="top-menu">
        <Box id="top-menu-schedule">
            {current_page === 'film' && film !== null ? <Button
                variant="contained"
                color="secondary" size='large' onClick={() => {
                navigate(`/films/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date}/?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`)
            }}
                sx={{marginRight: '4px'}} startIcon={<KeyboardArrowLeftIcon/>}>Назад</Button> : <></>}
            <ButtonGroup size='medium' variant="contained" color="secondary" sx={{marginRight: '5px'}}>
                {(!kiosk || (kiosk && dayjs(param_date).add(-1, 'day') >= dayjs(get_date_shift(new Date())))) && <Button
                    onClick={() => {
                        const current_date = dayjs(param_date).add(-1, 'day')
                        const current_param_date = from_dayjs_to_str(current_date)
                        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}/${current_page === 'film' ? film.uid + '/' : ''}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`)
                    }}><KeyboardArrowLeftIcon/></Button>}
                <Button
                    aria-describedby={id} onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon/>}>
                    {`${current_page === 'films' ? 'Фильмы' : 'Сеансы'} ${dayjs(param_date).$D} ${to_str_DAY(dayjs(param_date).$d)}`}
                </Button>
                <Button
                    onClick={() => {
                        const current_date = dayjs(param_date).add(1, 'day')
                        const current_param_date = from_dayjs_to_str(current_date)
                        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}/${current_page === 'film' ? film.uid + '/' : ''}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`)
                    }}><KeyboardArrowRightIcon/></Button>
                {dayjs(param_date).diff(dayjs(get_date_shift(new Date()))) !== 0 && <Button
                    onClick={() => {
                        const now = new Date()
                        const date = date_dayjs(now.getHours() >= 0 && now.getHours() < 7 ? new Date(now.setDate(now.getDate() - 1)) : now)
                        const current_param_date = from_dayjs_to_str(date)
                        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}/${current_page === 'film' ? film.uid + '/' : ''}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`)
                    }}>Сегодня</Button>}
            </ButtonGroup>
            <Popover
                id={id}
                open={open}
                anchorEl={schedule_calendar_open}
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
                }}>
                <Calendar
                    value={dayjs(param_date)}
                    handleOnChahge={handleOnChahge}
                />
            </Popover>
            {!kiosk && <Box
                className='top-menu-content-types'
                size='small'
                sx={{display: 'flex', flexWrap: 'noWrap'}}>
                {schedule_filters_film_types.map(type => {
                    return <Button variant="contained"
                                   color={schedule_filters_film_types_selected.find(el => el.uid === type.uid) !== undefined ? 'primary' : 'secondary'}
                                   key={type.uid}
                                   onClick={() => {
                                       dispatch(setScheduleFiltersFilmTypesSelect(type))
                                   }}
                                   sx={{marginRight: '4px'}}>{type.title}</Button>
                })}
            </Box>}
            {uid_user !== null ? <ButtonGroup
                variant='contained'
                color='secondary'
                size='small'>
                {filial !== undefined ? <Button variant='contained' startIcon={<FilterAltIcon/>}
                                                onClick={() => dispatch(openModal({
                                                    type: 'schedule_filters', props: {}
                                                }))}>Фильтры</Button> : null}
                {filial !== undefined && (seance_closed || seance_canceled || !seance_opened || films_selected.length > 0 || film_copy_types_selected.length > 0 || film_age[0] !== 0 || film_age[1] !== 100 || halls_selected.length > 0 || !hall_type_vip || !hall_type_regular || seance_time[0] !== 0 || seance_time[1] !== 100 || seance_price[0] !== 0 || seance_price[1] !== 10000) ?
                    <Button variant='contained' size='large' onClick={() => {
                        dispatch(setScheduleFiltersSeanceClosed(false))
                        dispatch(setScheduleFiltersSeanceCanceled(false))
                        dispatch(setScheduleFiltersSeanceOpened(true))
                        dispatch(setScheduleFiltersFilmsSelect([]))
                        dispatch(setScheduleFiltersFilmCopyTypes([]))
                        dispatch(setScheduleFiltersFilmAgeSelect([0, 100]))
                        dispatch(setScheduleFiltersHallsSelect([]))
                        dispatch(setScheduleFiltersHallTypeVip(true))
                        dispatch(setScheduleFiltersHallTypeRegular(true))
                        dispatch(setScheduleFiltersTime([0, 100]))
                        dispatch(setScheduleFiltersPrice([0, 10000]))
                    }}><FilterAltOffIcon/></Button> : null}
                {current_page === 'schedule' && <Button variant='contained' sx={{color: 'white'}}
                                                        color={show_free_space ? 'primary' : 'secondary'}
                                                        startIcon={<FormatLineSpacingIcon/>} onClick={() => {
                    dispatch(setShowFreeSpace(!show_free_space))
                }}>Сводобные слоты</Button>}
                {current_page === 'schedule' && <Button size='large' onClick={() => {
                    dispatch(openModal({
                        type: 'seance_settings', props: {
                            action: 'new', beginning: '', ending: '', uid_hall: '', name_hall: '',
                        }
                    }))
                }}><AddCircleOutlineIcon/></Button>}
            </ButtonGroup> : null}
        </Box>
    </Box>
}

export default ScheduleMenu