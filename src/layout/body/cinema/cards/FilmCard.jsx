import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom"
import cover from "../../../../media/cover.jpg"
import {useSelector} from "react-redux"
const FilmCard = (props) => {
    const [film, set_film] = useState(undefined)
    const [link, set_link] = useState(undefined)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const date_param = useSelector(state => state.schedule.date_param)
    useEffect(() => {
        if (film === undefined) {
            set_film(props.film)
        }
    }, [film, props.film])
    useEffect(() => {
        let link_path = ''
        if (city !== undefined && date_param !== undefined && film !== undefined) {
            link_path = `/films/${city.code}/?date=${date_param}&film=${film.uid}`
            if (filial !== undefined) {
                link_path = `/films/${city.code}/${filial.eais}/?date=${date_param}&film=${film.uid}`
            }
        }
        set_link(link_path)
    }, [city, date_param, filial, film, props.filial])
    const card_film = () => {
        if (film !== undefined) {
            return (
                <div className='film'>
                    <div className='film-poster'>
                        <img className='film-poster-img'
                             src={film.cover_link === '' ? cover : "http://msk-rst-media.cinema.mirage.ru" + film.cover_link}
                             alt={film.name}/>
                        <div className='film-rate-age'>
                            <div>{film.rate_age}+</div>
                        </div>
                    </div>
                    <div className='film-description'>
                        <div className='film-description-name'>{film.name}</div>
                        <div className='film-description-genre'>ужасы, триллер</div>
                    </div>
                </div>
            )
        }
    }
    return (
        <NavLink className='card_film' to={link}>{card_film()}</NavLink>
    )
}
export default FilmCard