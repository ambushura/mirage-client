import cover from "../../../images/cover.png"
import {useSelector} from "react-redux"
import {Box} from "@mui/material"
import {NavLink} from "react-router-dom"

const FilmCard = (props) => {

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)
    const {wp, kiosk} = useSelector(state => state.interface)

    return <NavLink
        to={`/film/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date}/${props.film.uid}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`}>
        <Box className='film-poster'>
            <img className='film-poster-img'
                 src={props.film.cover_link === '' || filial === undefined ? cover : `http://${filial.media_ip}:${filial.media_port}${props.film.cover_link}`}
                 alt={props.film.name}/>
            <Box className='film-rate-age'>
                <Box>{props.film.rate_age}+</Box>
            </Box>
        </Box>
        <Box className='film-description'>
            <Box className='film-description-name'>{props.film.name}</Box>
            <Box className='film-description-genre'>{props.film.duration} мин.</Box>
        </Box>
    </NavLink>
}

export default FilmCard