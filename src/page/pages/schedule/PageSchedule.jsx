import {useSetSchedule} from "../../../hooks/pages/useSetSchedule.js"
import {Box, Button, Fade} from "@mui/material"
import SeanceCard from "./SeanceCard.jsx"
import {useSelector} from "react-redux"
import {useEffect, useRef, useState} from "react"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import Order from "../../../components/orders/Order.jsx"
import Loader from "../../../components/elements/Loader.jsx"
import {TIMEOUT} from "../../../redux/interfaceReducer.js"

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
                                } else {
                                    return (
                                        <Box key={filial_hall_seances.filial.uid}>
                                            <Box
                                                className="schedule-full-filial-name" style={{
                                                width: `${content_width}px`
                                            }}>
                                                <Button variant='contained'
                                                        color='primary'
                                                        sx={{minWidth: '210px'}}>{filial_hall_seances.filial.name}
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
                                                                <Box className='schedule-full-seances' style={{
                                                                    position: 'sticky',
                                                                    top: '130px',
                                                                    zIndex: 98,
                                                                }}>
                                                                    {hall.seances.map(seance => {
                                                                        return (
                                                                            <SeanceCard
                                                                                key={seance.uid}
                                                                                city={city}
                                                                                filial={filial_hall_seances.filial}
                                                                                seance={seance}>
                                                                            </SeanceCard>
                                                                        )
                                                                    })}
                                                                </Box>
                                                            </Box>
                                                        </Fade>
                                                    )
                                                })}
                                            </Box>
                                        </Box>
                                    )
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