import React, {useEffect, useState} from 'react'
import FilmCard from "../cards/FilmCard"
import {Box, Fade} from "@mui/material"
import {useSelector} from "react-redux"
import "../cinema.css"
import cover from "../../../../media/cover.jpg"
import SeanceCard from "../cards/SeanceCard"
import ScheduleFull from "./ScheduleFull"
const Schedule = () => {

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
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
                    {films.map(film => {
                        return (
                            <FilmCard
                                key={film.uid + film.ver}
                                film={film}/>
                        )
                    })}
                </Box>
            </Fade>
            <Fade
                in={visibility[1]}
                timeout={250}
                key='2'>
                {film_seances !== undefined ?
                    <Box id='seances'>
                        <div className='seances-body-poster'>
                            <div className='seances-cover'>
                                <img className='seances-cover-img'
                                     src={film_seances.film.cover_link === '' ? cover : "http://msk-rst-media.cinema.mirage.ru" + film_seances.film.cover_link}
                                     alt={film_seances.film.name}/>
                            </div>
                            <div className='seances-body'>
                                <div className='seances-body-description'>
                                    <div className='seances-body-description-name'>{film_seances.film.name}</div>
                                    <div className='seances-body-description-genre'>ужасы, триллеры</div>
                                    <div>{film_seances.film.description}</div>
                                </div>
                                {city.filials.map(current_filial => {
                                    if (filial === undefined || (current_filial.uid === filial.uid)) {
                                        const seances = film_seances.seances.filter(seance => seance.uid_filial === current_filial.uid)
                                        if (seances.length !== 0) {
                                            return (
                                                <div className='seances-body-filial'>
                                                    <div
                                                        className='seances-body-filial-name'>{current_filial.name}</div>
                                                    <div className='seances-body-seances'>
                                                        {seances.map(seance => {
                                                            return (<SeanceCard
                                                                key={seance.uid + seance.ver}
                                                                seance={seance}
                                                                city={city}
                                                                filial={current_filial}
                                                            />)
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className='seances-body-filial'>
                                                    <div
                                                        className='seances-body-filial-name'>{current_filial.name}</div>
                                                    <div>Нет в расписании на эту дату...</div>
                                                </div>
                                            )
                                        }
                                    }
                                })}
                            </div>
                            <div className='seances-rate'>IMDB 4.7</div>
                        </div>
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
                <Box id='schedule-full' style={{height: visibility[3] ? 'auto' : '0px'}}>
                    <ScheduleFull/>
                </Box>
            </Fade>
        </>
    )
}
export default Schedule