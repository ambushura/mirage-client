import { Box, Fade } from '@mui/material'
import cover from '../../../images/cover.png'
import SeanceCard from './SeanceCard.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../ui/Loader.jsx'
import { TIMEOUT } from '../../../../redux/frontoffice/interfaceReducer.js'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { cinema_film_seances_get } from '../../../../service/fetch_service.js'
import { cleanFilm, setFilm } from '../../../../redux/frontoffice/scheduleReducer.js'
import Order from '../../right-panel/Order.jsx'

export default function PageFilm() {
    const dispatch = useDispatch()

    const param_date = useSelector((state) => state.interface.params.param_date)
    const uid_film = useSelector((state) => state.interface.params.uid_film)
    const uid_user = useSelector((state) => state.auth.uid)

    const city = useSelector((state) => state.data.city)
    const filial = useSelector((state) => state.data.filial)
    const film = useSelector((state) => state.schedule.film)
    const film_seances = useSelector((state) => state.schedule.film_seances)

    const seance_closed = useSelector((state) => state.schedule.schedule_filters_seance_closed)
    const seance_canceled = useSelector((state) => state.schedule.schedule_filters_seance_canceled)
    const seance_opened = useSelector((state) => state.schedule.schedule_filters_seance_opened)
    const films_selected = useSelector((state) => state.schedule.schedule_filters_films_selected)
    const film_copy_types_selected = useSelector((state) => state.schedule.schedule_filters_film_copy_types_selected)
    const film_age = useSelector((state) => state.schedule.schedule_filters_film_age)
    const halls_selected = useSelector((state) => state.schedule.schedule_filters_halls_selected)
    const hall_type_vip = useSelector((state) => state.schedule.schedule_filters_hall_type_vip)
    const hall_type_regular = useSelector((state) => state.schedule.schedule_filters_hall_type_regular)
    const seance_time = useSelector((state) => state.schedule.schedule_filters_time)
    const seance_price = useSelector((state) => state.schedule.schedule_filters_price)
    const film_types_selected = useSelector((state) => state.schedule.schedule_filters_film_types_selected)

    const pre_order = useSelector((state) => state.orders.pre_order)
    const horder = useSelector((state) => state.orders.horder)

    useEffect(() => {
        const fetchSeances = async (f) => {
            const result = await dispatch(
                cinema_film_seances_get(
                    f,
                    param_date,
                    uid_film,
                    seance_closed,
                    seance_canceled,
                    seance_opened,
                    films_selected.map((f) => f.uid),
                    film_copy_types_selected.map((f) => f.uid),
                    film_age,
                    halls_selected.map((f) => f.uid),
                    hall_type_vip,
                    hall_type_regular,
                    seance_time,
                    seance_price,
                    film_types_selected.map((f) => f.uid)
                )
            )
            if (active) {
                dispatch(setFilm({ ...result, filial: f }))
            }
        }
        let active = true
        dispatch(cleanFilm())
        if (uid_film !== undefined) {
            if (filial) {
                fetchSeances(filial)
            } else if (city) {
                city.filials.forEach((f) => fetchSeances(f))
            }
        }
        return () => {
            active = false
            dispatch(cleanFilm())
        }
    }, [
        city,
        filial,
        uid_film,
        param_date,
        seance_closed,
        seance_canceled,
        seance_opened,
        films_selected,
        film_copy_types_selected,
        film_age,
        halls_selected,
        hall_type_vip,
        hall_type_regular,
        seance_time,
        seance_price,
        film_types_selected,
        dispatch,
    ])

    if (film_seances.length > 0 && film !== null) {
        return (
            <Box id="content-box" sx={{ overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box id="content-header"></Box>
                    <Box id="content">
                        <Box className="seances-body-poster">
                            <Box className="seances-cover">
                                <img
                                    className="seances-cover-img"
                                    src={
                                        film.cover_link === ''
                                            ? cover
                                            : `http://${city.filials[0].media_ip}:${city.filials[0].media_port}` + film.cover_link
                                    }
                                    alt={film.name}
                                />
                            </Box>
                            <Box className="seances-body">
                                <Box className="seances-body-description">
                                    <Box className="seances-body-description-name">{film.name}</Box>
                                    <Box className="seances-body-description-genre">
                                        {film.duration} мин. {film.rate_age}+
                                    </Box>
                                    <Box>{film.description}</Box>
                                </Box>
                                {film_seances.map((filial_data) => {
                                    if (!filial_data.loading && filial_data.error !== null && filial_data.data === null) {
                                        return (
                                            <Box className="seances-body-filial" key={filial_data.filial.uid}>
                                                <Box className="seances-body-filial-name">{filial_data.filial.name}</Box>
                                                <Box className="seances-body-seances">Не могу загрузить фильмы для этого филиала...</Box>
                                            </Box>
                                        )
                                    } else if (filial_data.loading && filial_data.error === null && filial_data.data === null) {
                                        return (
                                            <Box className="seances-body-filial" key={filial_data.filial.uid}>
                                                <Box className="seances-body-filial-name">{filial_data.filial.name}</Box>
                                                <Box className="seances-body-seances">
                                                    <Loader key={filial_data.filial.uid} />
                                                </Box>
                                            </Box>
                                        )
                                    } else if (!filial_data.loading && filial_data.error === null && filial_data.data !== null) {
                                        return (
                                            <Fade
                                                key={filial_data.filial.uid}
                                                in={filial_data.data.seances.length > 0}
                                                timeout={TIMEOUT}
                                                unmountOnExit
                                            >
                                                <Box className="seances-body-filial">
                                                    <Box className="seances-body-filial-name">{filial_data.filial.name}</Box>
                                                    <AnimatePresence>
                                                        {filial_data.data.seances.length > 0 && (
                                                            <motion.div
                                                                className="seances-body-seances"
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="hidden"
                                                                variants={containerVariants}
                                                            >
                                                                {filial_data.data.seances.map((seance) => {
                                                                    return (
                                                                        <motion.div
                                                                            key={`${filial_data.filial.uid}${seance.uid}`}
                                                                            variants={itemVariants}
                                                                        >
                                                                            <SeanceCard
                                                                                seance={seance}
                                                                                city={city}
                                                                                filial={filial_data.filial}
                                                                            />
                                                                        </motion.div>
                                                                    )
                                                                })}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </Box>
                                            </Fade>
                                        )
                                    }
                                })}
                            </Box>
                            {uid_user !== null && (
                                <Box
                                    sx={{
                                        minWidth: 'var(--order-width)',
                                        display: pre_order.in_base || horder.in_base ? 'flex' : 'none',
                                    }}
                                ></Box>
                            )}
                        </Box>
                    </Box>
                    <Box id="content-footer"></Box>
                    <Box sx={{ position: 'fixed', right: 0, top: 'var(--header-height)', zIndex: 3 }}>
                        <Order />
                    </Box>
                </Box>
            </Box>
        )
    }
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
}
