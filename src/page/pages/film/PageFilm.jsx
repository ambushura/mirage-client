import {Box, Fade} from "@mui/material"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import Order from "../../../components/orders/Order.jsx"
import cover from "../../../images/cover.jpg"
import SeanceCard from "./SeanceCard.jsx"
import {useSelector} from "react-redux"
import Loader from "../../../components/elements/Loader.jsx"
import {TIMEOUT} from "../../../redux/interfaceReducer.js"
import {useSetFilm} from "../../../hooks/pages/useSetFilm.js"
import {motion, AnimatePresence} from 'framer-motion'

const PageFilm = () => {

    useSetFilm()

    const city = useSelector(state => state.data.city)
    const film = useSelector(state => state.schedule.film_seances.film)
    const filials_seances = useSelector(state => state.schedule.film_seances.data || [])
    const pre_order = useSelector(state => state.orders.pre_order || {in_base: false})
    const horder = useSelector(state => state.orders.horder || {in_base: false})

    return (
        <>
            <ScheduleMenu/>
            <Box id='content-box'>
                <Box id="content-wrap">
                    <Box id="content">
                        <Box className='seances-body-poster'>
                            {film !== undefined ?
                                <Box className='seances-cover'>
                                    <img className='seances-cover-img'
                                         src={film.cover_link === '' ? cover : "http://msk-rst-media.cinema.mirage.ru" + film.cover_link}
                                         alt={film.name}/>
                                </Box> : <></>}
                            <Box className='seances-body'>
                                {film !== undefined ? <Box className='seances-body-description'>
                                    <Box className='seances-body-description-name'>{film.name}</Box>
                                    <Box className='seances-body-description-genre'>ужасы, триллеры</Box>
                                    <Box>{film.description}</Box>
                                </Box> : <></>}
                                {filials_seances.map(filial_seances => {
                                    if (filial_seances.error !== null) {
                                        return (<></>)
                                    } else if (filial_seances.loading) {
                                        return (
                                            <Box className='seances-body-filial'
                                                 key={filial_seances.filial.uid}>
                                                <Box
                                                    className='seances-body-filial-name'>{filial_seances.filial.name}</Box>
                                                <Box className='seances-body-seances'>
                                                    <Loader key={filial_seances.filial.uid}/>
                                                </Box>
                                            </Box>)
                                    } else {
                                        return (
                                            <Fade key={filial_seances.filial.uid}
                                                  in={filial_seances.data.seances.length > 0} timeout={TIMEOUT}
                                                  unmountOnExit>
                                                <Box className='seances-body-filial'>
                                                    <Box
                                                        className='seances-body-filial-name'>{filial_seances.filial.name}</Box>
                                                    <AnimatePresence>
                                                        {filial_seances.data.seances.length > 0 && (
                                                            <motion.div
                                                                className='seances-body-seances'
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="hidden"
                                                                variants={containerVariants}>
                                                                {filial_seances.data.seances.map(seance => {
                                                                    return (
                                                                        <motion.div
                                                                            key={`${filial_seances.filial.uid}${seance.uid}`}
                                                                            variants={itemVariants}>
                                                                            <SeanceCard
                                                                                seance={seance}
                                                                                city={city}
                                                                                filial={filial_seances.filial}/>
                                                                        </motion.div>)
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
                        </Box>
                    </Box>
                </Box>
                {pre_order.in_base || horder.in_base ? <Order/> : null}
            </Box>
        </>
    )
}

export default PageFilm

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
}