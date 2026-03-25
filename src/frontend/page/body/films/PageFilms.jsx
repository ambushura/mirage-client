import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import FilmCard from "./FilmCard.jsx"
import {AnimatePresence, motion} from 'framer-motion'
import {useEffect} from "react"
import {cinema_films_get} from "../../../../service/fetch_service.js"
import {cleanFilms, setFilms} from "../../../../redux/scheduleReducer.js"
import Order from "../../right-panel/Order.jsx"

const PageFilms = () => {

    const dispatch = useDispatch()
    const param_date = useSelector(state => state.interface.params.param_date)
    const uid_user = useSelector(state => state.auth.uid)

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const films = useSelector(state => state.schedule.films || [])

    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)

    const seance_closed = useSelector(state => state.schedule.schedule_filters_seance_closed)
    const seance_canceled = useSelector(state => state.schedule.schedule_filters_seance_canceled)
    const seance_opened = useSelector(state => state.schedule.schedule_filters_seance_opened)
    const films_selected = useSelector(state => state.schedule.schedule_filters_films_selected)
    const film_copy_types_selected = useSelector(state => state.schedule.schedule_filters_film_copy_types_selected)
    const film_age = useSelector(state => state.schedule.schedule_filters_film_age)
    const halls_selected = useSelector(state => state.schedule.schedule_filters_halls_selected)
    const hall_type_vip = useSelector(state => state.schedule.schedule_filters_hall_type_vip)
    const hall_type_regular = useSelector(state => state.schedule.schedule_filters_hall_type_regular)
    const seance_time = useSelector(state => state.schedule.schedule_filters_time)
    const seance_price = useSelector(state => state.schedule.schedule_filters_price)
    const film_types_selected = useSelector(state => state.schedule.schedule_filters_film_types_selected)

    useEffect(() => {
        const fetch = async (f) => {
            const fetching_result = await dispatch(cinema_films_get(f, param_date, seance_closed, seance_canceled, seance_opened, films_selected.map(f => f.uid), film_copy_types_selected.map(f => f.uid), film_age, halls_selected.map(f => f.uid), hall_type_vip, hall_type_regular, seance_time, seance_price, film_types_selected.map(f => f.uid)))
            dispatch(setFilms({...fetching_result, filial: f}))
        }
        dispatch(cleanFilms())
        if (filial !== undefined) {
            fetch(filial)
        } else if (city !== undefined) {
            city.filials.forEach(async (f) => {
                fetch(f)
            })
        }
        return () => {
            dispatch(cleanFilms())
        }
    }, [city, dispatch, filial, film_age, film_copy_types_selected, film_types_selected, films_selected, hall_type_regular, hall_type_vip, halls_selected, param_date, seance_canceled, seance_closed, seance_opened, seance_price, seance_time])

    return <Box id='content-box' style={{
        overflowY: 'auto',
        width: uid_user !== null && (pre_order.in_base || horder.in_base) ? 'calc(100vw - var(--order-width))' : '100vw'
    }}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box id='content-header'></Box>
            <Box id='content' sx={{padding: '10px 0'}}>
                <AnimatePresence>
                    {films.length > 0 && (<motion.div
                        id="schedule"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={containerVariants}>
                        {films.map(film => (<motion.div
                            className='film'
                            key={film.uid}
                            variants={itemVariants}>
                            <FilmCard film={film}/>
                        </motion.div>))}
                    </motion.div>)}
                    {films.length === 0 && <Box className='empty-box'>Нет фильмов на эту дату...</Box>}
                </AnimatePresence>
            </Box>
            <Box id='content-footer'></Box>
            <Box sx={{position: 'fixed', right: 0, top: 'var(--header-height)', zIndex: 3}}><Order/></Box>
        </Box>
    </Box>
}

export default PageFilms

const containerVariants = {
    hidden: {}, visible: {
        transition: {
            staggerChildren: 0.03, delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: {opacity: 0, y: 20}, visible: {
        opacity: 1, y: 0, transition: {
            duration: 0.4, ease: "easeOut"
        }
    }
}