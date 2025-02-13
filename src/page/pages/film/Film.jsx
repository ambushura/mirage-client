import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import cover from "../../../images/cover.jpg"
import SeanceCard from "./SeanceCard.jsx"
import {useEffect} from "react"
import {useSetFilm} from "../../../hooks/useSetFilm.js"
import {setFilm} from "../../../redux/scheduleReducer.js"
import Loader from "../../../components/Loader.jsx"

const Film = (props) => {

    const dispatch = useDispatch()
    const param_date = useSelector(state => state.schedule.param_date)

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    const [film_data, , fetch_loading] = useSetFilm(city, filial, param_date, props.uid_film)
    const film = useSelector(state => state.schedule.film_seances.film)
    const seances = useSelector(state => state.schedule.film_seances.seances)

    useEffect(() => {
        dispatch(setFilm(film_data))
        return () => {
            dispatch(setFilm({film: undefined, seances: []}))
        }
    }, [dispatch, film_data])

    if (!fetch_loading && film !== undefined && seances.length > 0) {
        return (
            <Box className='seances-body-poster'>
                <Box className='seances-cover'>
                    <img className='seances-cover-img'
                         src={film.cover_link === '' ? cover : "http://msk-rst-media.cinema.mirage.ru" + film.cover_link}
                         alt={film.name}/>
                </Box>
                <Box className='seances-body'>
                    <Box className='seances-body-description'>
                        <Box className='seances-body-description-name'>{film.name}</Box>
                        <Box className='seances-body-description-genre'>ужасы, триллеры</Box>
                        <Box>{film.description}</Box>
                    </Box>
                    {seances.map(filial_seances => {
                        return (
                            <Box className='seances-body-filial' key={filial_seances.filial.uid}>
                                <Box
                                    className='seances-body-filial-name'>{filial_seances.filial.name}</Box>
                                <Box className='seances-body-seances'>
                                    {filial_seances.seances.map(seance => {
                                        return (<SeanceCard
                                            key={`${filial_seances.filial.uid}${seance.uid}`}
                                            seance={seance}
                                            city={city}
                                            filial={filial_seances.filial}
                                        />)
                                    })}
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                <Box className='seances-rate'>IMDB 4.7</Box>
            </Box>
        )
    } else {
        return (
            <Loader/>
        )
    }
}

export default Film