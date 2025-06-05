import {useState} from 'react'
import {Box, Button, ButtonGroup, Popover} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import dayjs from "dayjs"
import {useNavigate} from "react-router-dom"
import {date_dayjs, from_dayjs_to_str, to_str_DAY} from "../../../service/advanced.js"
import Calendar from "../../../components/forms/Calendar.jsx"
import AddIcon from '@mui/icons-material/Add'
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import {openModal} from "../../../redux/interfaceReducer.js"

const ScheduleMenu = () => {

    // Служебные функции
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Данные из хранилища
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const film = useSelector(state => state.schedule.film_seances.film)

    const current_page = useSelector(state => state.interface.current_page)
    const param_date = useSelector(state => state.interface.params.param_date)

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
        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_data}/${current_page === 'film' ? film.uid + '/' : ''}`)
    }

    const uid_user = useSelector(state => state.auth.uid)

    return (
        <Box id="top-menu">
            <Box id="top-menu-schedule">
                {current_page === 'film' && film !== undefined ?
                    <Button variant="contained" color="secondary" size='small' onClick={() => {
                        navigate(`/films/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date}/`)
                    }}
                            sx={{marginRight: '4px'}}><KeyboardArrowLeftIcon/>Назад</Button> : <></>}
                <ButtonGroup size='small' variant="contained" color="secondary">
                    <Button onClick={() => {
                        const now = new Date()
                        const date = date_dayjs(
                            now.getHours() >= 0 && now.getHours() < 7
                                ? new Date(now.setDate(now.getDate() - 1))
                                : now
                        )
                        const current_param_date = from_dayjs_to_str(date)
                        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}/${current_page === 'film' ? film.uid + '/' : ''}`)
                    }}>Сегодня</Button>
                    <Button size="large" onClick={() => {
                        const current_date = dayjs(param_date).add(-1, 'day')
                        const current_param_date = from_dayjs_to_str(current_date)
                        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}/${current_page === 'film' ? film.uid + '/' : ''}`)
                    }}><KeyboardArrowLeftIcon/></Button>
                    <Button aria-describedby={id} onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon/>}>
                        Фильмы {dayjs(param_date).$D} {to_str_DAY(dayjs(param_date).$d)}
                    </Button>
                    <Button size="large" onClick={() => {
                        const current_date = dayjs(param_date).add(1, 'day')
                        const current_param_date = from_dayjs_to_str(current_date)
                        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}/${current_page === 'film' ? film.uid + '/' : ''}`)
                    }}><KeyboardArrowRightIcon/></Button>
                </ButtonGroup>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={schedule_calendar_open}
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
                        value={dayjs(param_date)}
                        handleOnChahge={handleOnChahge}
                    />
                </Popover>
                <ButtonGroup className='top-menu-content-types' size='small' sx={{marginLeft: '4px'}}>
                    <Button variant="contained" color="primary">Все фильмы</Button>
                    <Button variant="contained" color="secondary">ТоКино!</Button>
                    <Button variant="contained" color="secondary">Пушкарта</Button>
                </ButtonGroup>
                {uid_user !== null ?
                    <ButtonGroup variant='contained' color='secondary' size='small' sx={{marginLeft: '4px'}}>
                        {filial !== undefined ? <Button variant='contained' startIcon={<FilterAltIcon/>} onClick={() => dispatch(openModal({
                            type: 'schedule_filters',
                            props: {}
                        }))}>Фильтры</Button> : null}
                        {current_page === 'schedule' ? <Button variant='contained' startIcon={<FormatLineSpacingIcon/>}>Сводобное
                            время</Button> : null}
                        <Button variant='contained' startIcon={<AddIcon/>}>Новый сеанс</Button>
                    </ButtonGroup>
                    : null}
            </Box>
        </Box>
    )
}

export default ScheduleMenu