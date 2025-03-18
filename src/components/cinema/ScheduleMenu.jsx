import {useState} from 'react'
import {DateCalendar} from "@mui/x-date-pickers"
import {Box, Button, ButtonGroup, Popover} from "@mui/material"
import {useSelector} from "react-redux"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import dayjs from "dayjs"
import {useNavigate} from "react-router-dom"
import {date_dayjs, from_dayjs_to_str, to_str_DAY} from "../../service/advanced.js"

const ScheduleMenu = () => {

    // Служебные функции
    const navigate = useNavigate()

    // Данные из хранилища
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const film = useSelector(state => state.schedule.film_seances.film)

    const current_page = useSelector(state => state.interface.current_page)
    const param_date = useSelector(state => state.interface.params.param_date)

    // Календарь
    const [schedule_calendar_open, set_schedule_calendar_open] = useState(null)
    const open = Boolean(schedule_calendar_open)
    const id = open ? 'schedule_city-calendar' : undefined

    const handleClick = (event) => {
        set_schedule_calendar_open(event.currentTarget)
    }
    const handleClose = () => {
        set_schedule_calendar_open(null)
    }

    return (
        <Box id="top-menu">
            <Box style={{width: 'inherit', display: 'flex'}} id="top-menu-schedule">
                {current_page === 'film' && film !== undefined ?
                    <Button variant="contained" color="secondary" style={{marginRight: '5px'}} onClick={() => {
                        navigate(`/films/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date}/`)
                    }}><KeyboardArrowLeftIcon/>Назад</Button> : <></>}
                <ButtonGroup size='small'>
                    <Button variant="contained" color="secondary" onClick={() => {
                        const date = date_dayjs(new Date())
                        const current_param_date = from_dayjs_to_str(date)
                        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}/${current_page === 'film' ? film.uid + '/' : ''}`)
                    }}>сегодня</Button>
                    <Button variant="contained" color="secondary" size="large" onClick={() => {
                        const current_date = dayjs(param_date).add(-1, 'day')
                        const current_param_date = from_dayjs_to_str(current_date)
                        navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}/${current_page === 'film' ? film.uid + '/' : ''}`)
                    }}><KeyboardArrowLeftIcon/></Button>
                    <Button aria-describedby={id} variant="contained" color="secondary" onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon/>}>
                        Фильмы {dayjs(param_date).$D} {to_str_DAY(dayjs(param_date).$d)}
                    </Button>
                    <Button variant="contained" color="secondary" size="large" onClick={() => {
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
                    <DateCalendar value={dayjs(param_date)}
                                  onChange={(newValue) => {
                                      set_schedule_calendar_open(null)
                                      const current_param_data = newValue.year() + '-' + (newValue.month() + 1) + '-' + (newValue.date())
                                      navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_data}/${current_page === 'film' ? film.uid + '/' : ''}`)
                                  }}
                                  sx={{
                                      backgroundColor: '#0E0F11',
                                      opacity: '95%',
                                      textTransform: 'uppercase'
                                  }}
                                  slotProps={{
                                      desktopPaper: {sx: {backgroundColor: '#393a3b'}},
                                      mobilePaper: {sx: {backgroundColor: '#393a3b'}},
                                      layout: {sx: {backgroundColor: '#393a3b', borderRadius: '10px'}},
                                      day: {
                                          sx: {
                                              backgroundColor: '#1C1F23',
                                              "&:hover": {backgroundColor: '#282a2e'},
                                              borderRadius: '12px',
                                              fontWeight: 'bold',
                                              color: 'white'
                                          }
                                      },
                                      calendarHeader: {
                                          sx: {color: 'white', textTransform: 'capitalize'}
                                      },
                                      monthButton: {sx: {backgroundColor: 'white'}},
                                      yearButton: {sx: {backgroundColor: '#1C1F23', color: 'white'}},
                                      openPickerIcon: {sx: {padding: '10px', marginRight: '20px'}},
                                      previousIconButton: {
                                          sx: {
                                              borderRadius: '16px',
                                              backgroundColor: '#2e3239',
                                              "&:hover": {backgroundColor: '#1f2226'}
                                          },
                                      },
                                      nextIconButton: {
                                          sx: {
                                              borderRadius: '16px',
                                              marginLeft: 0,
                                              backgroundColor: '#2e3239',
                                              "&:hover": {backgroundColor: '#1f2226'}
                                          }
                                      },
                                  }}
                                  format="DD dd"
                                  views={['day']}/>
                </Popover>
                <ButtonGroup className='top-menu-content-types' size='small' sx={{marginLeft: '5px'}}>
                    <Button variant="contained" color="primary">Все фильмы</Button>
                    <Button variant="contained" color="secondary">ТоКино!</Button>
                    <Button variant="contained" color="secondary">Пушкарта</Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}

export default ScheduleMenu