import React, {useEffect, useState} from 'react'
import {Box, Fade} from "@mui/material"
import {useSelector} from "react-redux"
import "../cinema.css"
import ScheduleFull from "./schedule_full/ScheduleFull"
import ScheduleFilms from "./schedule_films/ScheduleFilms"
import Films from "./schedule_films/film/Films"
const Schedule = () => {

    const films = useSelector(state => state.schedule.films)
    const film_seances = useSelector(state => state.schedule.film)
    const schedule_city = useSelector(state => state.schedule.schedule_city)
    const schedule_filial = useSelector(state => state.schedule.schedule_filial)

    const [visibility, set_visibility] = useState([false, false, false, false])
    useEffect(() => {
        if (films.length > 0 && film_seances === undefined && schedule_city.length === 0 && schedule_filial.length === 0) {
            set_visibility([true, false, false, false])
        } else if (films.length === 0 && film_seances !== undefined && schedule_city.length === 0 && schedule_filial.length === 0) {
            set_visibility([false, true, false, false])
        } else if (films.length === 0 && film_seances === undefined && schedule_city.length > 0 && schedule_filial.length === 0) {
            set_visibility([false, false, true, false])
        } else if (films.length === 0 && film_seances === undefined && schedule_city.length === 0 && schedule_filial.length > 0) {
            set_visibility([false, false, false, true])
        }
    }, [film_seances, films.length, schedule_city.length, schedule_filial.length])

    return (
        <>
            <Fade
                in={visibility[0]}
                timeout={250}
                key='1'>
                <Box id='schedule' style={{height: films.length > 0 ? 'auto' : '0px'}}>
                    <Films/>
                </Box>
            </Fade>
            <Fade
                in={visibility[1]}
                timeout={250}
                key='2'>
                {film_seances !== undefined ?
                    <Box id='seances'>
                        <ScheduleFilms/>
                    </Box> : <div></div>
                }
            </Fade>
            <Fade
                in={visibility[2]}
                timeout={250} key='3'>
                <Box>

                </Box>
            </Fade>
            <Fade
                in={visibility[3]}
                timeout={250}
                key='4'>
                <Box id='schedule-full' style={{height: visibility[3] ? 'fit-content' : '0px'}}>
                    <ScheduleFull/>
                </Box>
            </Fade>
        </>
    )
}
export default Schedule