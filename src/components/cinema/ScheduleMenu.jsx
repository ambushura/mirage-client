import {useState} from 'react'
import {DateCalendar} from "@mui/x-date-pickers"
import {Box, Button, ButtonGroup, Fade, Popover} from "@mui/material"
import {useSelector} from "react-redux"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import dayjs from "dayjs"
import {ANIMATION_SPEED, MOBILE_WIDTH} from "../../redux/interfaceReducer.js"
import {useNavigate} from "react-router-dom"
import {date_dayjs, to_str_DAY} from "../../service/advanced.js"

const ScheduleMenu = () => {

    const navigate = useNavigate()
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const film = useSelector(state => state.schedule.film)
    const current_page = useSelector(state => state.interface.current_page)
    const date = useSelector(state => state.schedule.date)
    const param_date = useSelector(state => state.schedule.param_date)
    const app_width = useSelector(state => state.interface.app_width)
    const date_shift = useSelector(state => dayjs(state.schedule.date))

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

    const cd = (current_date) => {
        return current_date.year() + '-' + (current_date.month() + 1) + '-' + (current_date.date())
    }

    return (
        <Box id="top-menu">
            <Fade in={app_width > MOBILE_WIDTH} timeout={ANIMATION_SPEED}>
                <Box style={{width: 'inherit', display: 'flex'}} id="top-menu-schedule">
                    {current_page === 'film' && film !== undefined ?
                        <Button variant="contained" color="secondary" style={{marginRight: '5px'}} onClick={() => {
                            navigate(`/films/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date}/`)
                        }}><KeyboardArrowLeftIcon/>Назад</Button> : <></>}
                    <ButtonGroup>
                        <Button variant="contained" color="secondary" onClick={() => {
                            const current_date = date_dayjs(new Date())
                            const current_param_date = cd(current_date)
                            navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}/${current_page === 'film' ? film.uid + '/' : ''}`)
                        }}>сегодня</Button>
                        <Button variant="contained" color="secondary" size="large" onClick={() => {
                            const current_date = dayjs(date).add(-1, 'day')
                            const current_param_date = cd(current_date)
                            navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_date}/${current_page === 'film' ? film.uid + '/' : ''}`)
                        }}><KeyboardArrowLeftIcon/></Button>
                        <Button aria-describedby={id} variant="contained" color="secondary" onClick={handleClick}
                                endIcon={<KeyboardArrowDownIcon/>}>
                            Фильмы {date_shift.$D} {to_str_DAY(date_shift.$d)}
                        </Button>
                        <Button variant="contained" color="secondary" size="large" onClick={() => {
                            const current_date = dayjs(date).add(1, 'day')
                            const current_param_date = cd(current_date)
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
                        <DateCalendar value={date_shift}
                                      onChange={(newValue) => {
                                          set_schedule_calendar_open(null)
                                          const current_param_data = newValue.year() + '-' + (newValue.month() + 1) + '-' + (newValue.date())
                                          navigate(`/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${current_param_data}/`)
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
                    <Box className='top-menu-content-types'>
                        <Button variant="contained" color="primary">Все фильмы</Button>
                        <Button variant="contained" color="secondary">ТоКино!</Button>
                        <Button variant="contained" color="secondary">Пушкарта</Button>
                    </Box>
                </Box>
            </Fade>
            <Fade in={app_width <= MOBILE_WIDTH} timeout={ANIMATION_SPEED}>
                <Box>
                    Мобильное меню
                </Box>
            </Fade>
        </Box>
    )
}
export default ScheduleMenu