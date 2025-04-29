import {Box, Fade} from "@mui/material"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import Order from "../../../components/orders/Order.jsx"
import {useSetFilms} from "../../../hooks/pages/useSetFilms.js"
import {useSelector} from "react-redux"
import FilmCard from "./FilmCard.jsx"
import {TIMEOUT} from "../../../redux/interfaceReducer.js"

const PageFilms = () => {

    useSetFilms()

    const films = useSelector(state => state.schedule.films || [])
    const pre_order = useSelector(state => state.orders.pre_order || {in_base: false})
    const horder = useSelector(state => state.orders.horder || {in_base: false})

    return (
        <>
            <ScheduleMenu/>
            <Box id='content-box'>
                <Box id='content-wrap'>
                    <Box id='content'>
                        <Fade in={films.length > 0} timeout={TIMEOUT} unmountOnExit>
                            <Box id="schedule">
                                {films.map(film => {
                                    return (
                                        <FilmCard
                                            key={film.uid}
                                            film={film}/>
                                    )
                                })}
                            </Box>
                        </Fade>
                    </Box>
                </Box>
                {pre_order.in_base || horder.in_base ? <Order/> : null}
            </Box>
        </>
    )
}

export default PageFilms