import React from 'react'
import cover from "../../../../../media/cover.jpg"
import SeanceCard from "./SeanceCard"
import {useSelector} from "react-redux"
const ScheduleFilms = () => {
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const film_seances = useSelector(state => state.schedule.film)
    return (
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
    )
}
export default ScheduleFilms