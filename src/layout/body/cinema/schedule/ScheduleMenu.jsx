import React, {useState} from 'react'
import {DateCalendar} from "@mui/x-date-pickers"
import {Box, Button, ButtonGroup, Fade, Popover} from "@mui/material"
import {useSelector} from "react-redux"
import {date_dayjs, to_str_day, to_str_DAY} from "../../../../func/functions"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import dayjs from "dayjs"
import {ANIMATION_SPEED, MOBILE_WIDTH} from "../../../../redux/interfaceReducer"
const ScheduleMenu = (props) => {

    // Текущее время
    const currentDateTime = new Date()
    const currentDay = to_str_day(currentDateTime)
    const currentDAY = to_str_DAY(currentDateTime)

    const current_date_shift_schedule = useSelector(state => state.schedule.date)
    const [schedule_calendar_open, set_schedule_calendar_open] = useState(null)
    const date_shift_schedule_param = useSelector(state => state.schedule.date_param)
    const handleClick = (event) => {
        set_schedule_calendar_open(event.currentTarget)
    }
    const handleClose = () => {
        set_schedule_calendar_open(null)
    }
    const open = Boolean(schedule_calendar_open)
    const id = open ? 'schedule-calendar' : undefined

    const app_width = useSelector(state => state.interface.app_width)

    const film = useSelector(state => state.schedule.film)

    return (
        <section id="top-menu">
            <Fade in={app_width > MOBILE_WIDTH} timeout={ANIMATION_SPEED}>
                <Box style={{width: '100%', display: 'flex'}} id="top-menu-schedule">
                    {film !== undefined ? <Button variant="contained" color="secondary" onClick={() => {
                        props.setSearchParams(prev => {
                            prev.delete('film')
                            return prev
                        })
                    }} style={{marginRight: '5px'}}><KeyboardArrowLeftIcon/>Все фильмы</Button> : <></>}
                    <ButtonGroup>
                        <Button variant="contained" color="secondary" onClick={() => {
                            props.setSearchParams(prev => {
                                const current_date = date_dayjs(new Date())
                                const current_date_param = current_date.$y + '-' + (current_date.$M + 1) + '-' + current_date.$D
                                prev.set('date', current_date_param)
                                return prev
                            })
                        }}>{currentDay} {currentDAY}</Button>
                        <Button variant="contained" color="secondary" size="large" onClick={() => {
                            props.setSearchParams(prev => {
                                const current_date = dayjs(date_shift_schedule_param).add(-1, 'day')
                                const current_date_param = current_date.$y + '-' + (current_date.$M + 1) + '-' + (current_date.$D)
                                prev.set('date', current_date_param)
                                return prev
                            })
                        }}><KeyboardArrowLeftIcon/></Button>
                        <Button aria-describedby={id} variant="contained" color="secondary" onClick={handleClick}
                                endIcon={<KeyboardArrowDownIcon/>}>
                            Фильмы {current_date_shift_schedule.$D} {to_str_DAY(current_date_shift_schedule.$d)}
                        </Button>
                        <Button variant="contained" color="secondary" size="large" onClick={() => {
                            props.setSearchParams(prev => {
                                const current_date = dayjs(date_shift_schedule_param).add(1, 'day')
                                const current_date_param = current_date.$y + '-' + (current_date.$M + 1) + '-' + (current_date.$D)
                                prev.set('date', current_date_param)
                                return prev
                            })
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
                        <DateCalendar value={current_date_shift_schedule}
                                      onChange={(newValue) => {
                                          set_schedule_calendar_open(null)
                                          props.setSearchParams(prev => {
                                              const current_date_param = newValue.$y + '-' + (newValue.$M + 1) + '-' + (newValue.$D)
                                              prev.set('date', current_date_param)
                                              return prev
                                          })
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
                    <div className='top-menu-content-types'>
                        <Button variant="contained" color="primary">Уже в кино</Button>
                        <Button variant="contained" color="secondary">ТоКино!</Button>
                        <Button variant="contained" color="secondary">Пушкинская карта</Button>
                    </div>
                </Box>
            </Fade>
            <Fade in={app_width <= MOBILE_WIDTH} timeout={ANIMATION_SPEED}>
                <Box>
                    Мобильное меню
                </Box>
            </Fade>
        </section>
    )
}
export default ScheduleMenu