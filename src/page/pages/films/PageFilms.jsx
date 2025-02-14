import {Box} from "@mui/material"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import Order from "../../../components/orders/Order.jsx"
import {useSetContentHeight} from "../../../hooks/useSetContentHeight.js"
import {useSetFilms} from "../../../hooks/useSetFilms.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setFilms} from "../../../redux/scheduleReducer.js"
import FilmCard from "./FilmCard.jsx"
import {useSetCurrentPage} from "../../../hooks/useSetCurrentPage.js"

const PageFilms = () => {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из хранилища
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.schedule.param_date)
    const films = useSelector(state => state.schedule.films)

    // Хуки
    useSetCurrentPage('films')
    const [content_height, show_pre_order] = useSetContentHeight()
    const films_data = useSetFilms(city, filial, param_date)

    // Монтаж/демонтаж
    useEffect(() => {
        dispatch(setFilms(films_data))
        return () => {
            dispatch(setFilms([]))
        }
    }, [dispatch, films_data])

    return (
        <>
            <ScheduleMenu/>
            <Box sx={{
                display: 'flex',
                height: content_height
            }}>
                <Box id="content-wrap"
                     sx={{height: content_height}}>
                    <div className="gradient-block-bottom"></div>
                    <Box id="content" style={{height: content_height, overflowX: 'hidden'}}>
                        {films.length > 0 ?
                            <Box id="schedule">
                                {films.map(film => {
                                    return (
                                        <FilmCard
                                            key={film.uid}
                                            film={film}/>
                                    )
                                })}
                            </Box> : <></>}
                    </Box>
                </Box>
                {show_pre_order ? <Order/> : <></>}
            </Box>
        </>
    )
}

export default PageFilms