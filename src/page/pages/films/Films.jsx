import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import FilmCard from "./FilmCard.jsx"
import {useEffect} from "react"
import {useSetFilms} from "../../../hooks/useSetFilms.js"
import {setFilms} from "../../../redux/scheduleReducer.js"
import Loader from "../../../components/Loader.jsx"

const Films = () => {

    const dispatch = useDispatch()
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.schedule.param_date)

    const [films_data, , fetch_loading] = useSetFilms(city, filial, param_date)
    const films = useSelector(state => state.schedule.films)

    useEffect(() => {
        dispatch(setFilms(films_data))
        return () => {
            dispatch(setFilms([]))
        }
    }, [dispatch, films_data])

    if (fetch_loading) {
        return <Loader/>
    } else {
        return <Box id="schedule">
            {films.map(film => {
                return (
                    <FilmCard
                        key={film.uid}
                        film={film}/>
                )
            })}
        </Box>
    }
}

export default Films