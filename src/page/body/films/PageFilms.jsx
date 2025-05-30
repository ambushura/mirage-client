import {Box} from "@mui/material"
import ScheduleMenu from "../top-menu/ScheduleMenu.jsx"
import Order from "../../right-panel/Order.jsx"
import {useSetFilms} from "./useSetFilms.js"
import {useSelector} from "react-redux"
import FilmCard from "./FilmCard.jsx"
import {motion, AnimatePresence} from 'framer-motion'

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
                        <AnimatePresence>
                            {films.length > 0 && (
                                <motion.div
                                    id="schedule"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={containerVariants}>
                                    {films.map(film => (
                                        <motion.div
                                            className='film'
                                            key={film.uid}
                                            variants={itemVariants}>
                                            <FilmCard film={film}/>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>
                </Box>
                {pre_order.in_base || horder.in_base ? <Order/> : null}
            </Box>
        </>
    )
}

export default PageFilms

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