import {useSetSchedule} from "./useSetSchedule.js"
import {Box, Button, Fade} from "@mui/material"
import SeanceCard from "./SeanceCard.jsx"
import {useSelector} from "react-redux"
import {Fragment, useEffect, useRef, useState} from "react"
import ScheduleMenu from "../top-menu/ScheduleMenu.jsx"
import Order from "../../right-panel/Order.jsx"
import Loader from "../../../ui/Loader.jsx"
import {TIMEOUT} from "../../../redux/interfaceReducer.js"
import {AnimatePresence, motion} from 'framer-motion'
import NewSeance from "./NewSeance.jsx"
import dayjs from "dayjs"

const PageSchedule = () => {

    useSetSchedule()

    const city = useSelector(state => state.data.city)
    const schedule = useSelector(state => state.schedule.schedule || [])
    const pre_order = useSelector(state => state.orders.pre_order || {in_base: false})
    const horder = useSelector(state => state.orders.horder || {in_base: false})

    const elementsRef = useRef(new Map())
    const [content_width, set_content_width] = useState(200)
    useEffect(() => {
        const widths = Array.from(elementsRef.current.values()).map(el => el?.getBoundingClientRect().width || 0)
        set_content_width(Math.max(...widths))
    }, [schedule])

    const show_free_space = useSelector(state => state.schedule.show_free_space)

    return (
        <>
            <ScheduleMenu/>
            <Box id='content-box'>
                <Box id='content-wrap'>
                    <Box id="content">
                        <Box id="schedule-full">
                            {schedule.map((filial_hall_seances, index) => {
                                if (filial_hall_seances.error !== null) {
                                    return (<Box key={filial_hall_seances.filial.uid}></Box>)
                                } else if (filial_hall_seances.loading) {
                                    return (
                                        <Box key={filial_hall_seances.filial.uid}>
                                            <Box className="schedule-full-filial-name" style={{
                                                width: `${content_width}px`
                                            }}>
                                                <Button variant='contained' color='primary'
                                                        sx={{
                                                            marginBottom: '5px',
                                                            minWidth: '210px'
                                                        }}>{filial_hall_seances.filial.name}</Button>
                                            </Box>
                                            <Box className="schedule-full-filial">
                                                <Loader key={filial_hall_seances.filial.uid}/>
                                            </Box>
                                        </Box>
                                    )
                                } else if (filial_hall_seances.data.length > 0) {
                                    return (
                                        <Box key={filial_hall_seances.filial.uid}>
                                            <Box
                                                className="schedule-full-filial-name" style={{
                                                width: `${content_width}px`
                                            }}>
                                                <Button variant='contained'
                                                        color='primary'
                                                        sx={{
                                                            minWidth: '210px',
                                                            position: 'sticky',
                                                            left: '4px'
                                                        }}>{filial_hall_seances.filial.name}
                                                </Button>
                                            </Box>
                                            <Box className="schedule-full-filial"
                                                 ref={el => elementsRef.current.set(index, el)}>
                                                {filial_hall_seances.data.map(hall => {
                                                    return (
                                                        <Fade key={hall.uid_hall} in={hall.seances.length > 0}
                                                              timeout={TIMEOUT} unmountOnExit>
                                                            <Box className='schedule-full-hall'>
                                                                <Box className='schedule-full-hall-name' style={{
                                                                    position: 'sticky',
                                                                    top: '65px',
                                                                    zIndex: 99,
                                                                    marginBottom: '5px'
                                                                }}>
                                                                    <Button variant='contained'
                                                                            style={{
                                                                                width: '100%',
                                                                                backgroundColor: 'var(--bgr-seance-card)',
                                                                                color: 'var(--txt-color)'
                                                                            }}>Зал {hall.name_full_hall}</Button>
                                                                </Box>
                                                                <AnimatePresence>
                                                                    {hall.seances.length > 0 && (
                                                                        <motion.div className='schedule-full-seances'
                                                                                    style={{
                                                                                        position: 'sticky',
                                                                                        top: '130px',
                                                                                        zIndex: 98,
                                                                                    }}
                                                                                    initial="hidden"
                                                                                    animate="visible"
                                                                                    exit="hidden"
                                                                                    variants={containerVariants}>
                                                                            {hall.seances.map((seance, i) => {
                                                                                if (show_free_space) {
                                                                                    return (
                                                                                        <Fragment key={i}>
                                                                                            {i === 0 ?
                                                                                                <motion.div
                                                                                                    className='schedule-full-seance'
                                                                                                    key={'first'}
                                                                                                    variants={itemVariants}>
                                                                                                    <NewSeance
                                                                                                        key={i}
                                                                                                        beginning={null}
                                                                                                        ending={dayjs.utc(hall.seances[i].beginning).add(-1, 'minute')}
                                                                                                    />
                                                                                                </motion.div> : null}
                                                                                            <motion.div
                                                                                                className='schedule-full-seance'
                                                                                                key={`${seance.uid}${seance.ver}`}
                                                                                                variants={itemVariants}>
                                                                                                <SeanceCard
                                                                                                    key={seance.uid}
                                                                                                    city={city}
                                                                                                    filial={filial_hall_seances.filial}
                                                                                                    seance={seance}>
                                                                                                </SeanceCard>
                                                                                            </motion.div>
                                                                                            {i !== hall.seances.length - 1 ?
                                                                                                <motion.div
                                                                                                    className='schedule-full-seance'
                                                                                                    key={`${hall.seances[i]}-last`}
                                                                                                    variants={itemVariants}>
                                                                                                    <NewSeance
                                                                                                        key={i}
                                                                                                        beginning={dayjs.utc(hall.seances[i].ending).add(1, 'minute')}
                                                                                                        ending={dayjs.utc(hall.seances[i + 1].beginning).add(-1, 'minute')}
                                                                                                    />
                                                                                                </motion.div> : null}
                                                                                            {i === hall.seances.length - 1 ?
                                                                                                <motion.div
                                                                                                    className='schedule-full-seance'
                                                                                                    key={'last'}
                                                                                                    variants={itemVariants}>
                                                                                                    <NewSeance
                                                                                                        key={i}
                                                                                                        beginning={dayjs.utc(hall.seances[hall.seances.length - 1].ending).add(-1, 'minute')}
                                                                                                        ending={null}
                                                                                                    />
                                                                                                </motion.div> : null}
                                                                                        </Fragment>
                                                                                    )
                                                                                } else {
                                                                                    return (
                                                                                        <motion.div
                                                                                            className='schedule-full-seance'
                                                                                            key={`${seance.uid}${seance.ver}`}
                                                                                            variants={itemVariants}>
                                                                                            <SeanceCard
                                                                                                key={seance.uid}
                                                                                                city={city}
                                                                                                filial={filial_hall_seances.filial}
                                                                                                seance={seance}>
                                                                                            </SeanceCard>
                                                                                        </motion.div>
                                                                                    )
                                                                                }
                                                                            })
                                                                            }
                                                                        </motion.div>)}
                                                                </AnimatePresence>
                                                            </Box>
                                                        </Fade>
                                                    )
                                                })}
                                            </Box>
                                        </Box>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </Box>
                    </Box>
                </Box>
                {pre_order.in_base || horder.in_base ? <Order/> : null}
            </Box>
        </>
    )
}

export default PageSchedule

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