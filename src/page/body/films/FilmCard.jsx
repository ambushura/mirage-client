import cover from "../../../images/cover.jpg"
import {useSelector} from "react-redux"
import {Box} from "@mui/material"
import {NavLink} from "react-router-dom"

const FilmCard = (props) => {

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)
    const settings = useSelector(state => state.data.settings)

    return (
        <NavLink
            to={`/film/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date}/${props.film.uid}/`}>
            <Box className='film-poster'>
                <img className='film-poster-img'
                     src={props.film.cover_link === '' ? cover : `http://${settings !== null ? settings.media_ip : ''}:${settings !== null ? settings.media_port : ''}` + props.film.cover_link}
                     alt={props.film.name}/>
                <Box className='film-rate-age'>
                    <Box>{props.film.rate_age}+</Box>
                </Box>
            </Box>
            <Box className='film-description'>
                <Box className='film-description-name'>{props.film.name}</Box>
                <Box className='film-description-genre'>ужасы, триллер</Box>
            </Box>
        </NavLink>
    )
}

export default FilmCard