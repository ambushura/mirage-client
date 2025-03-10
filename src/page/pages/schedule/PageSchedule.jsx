import {useSetSchedule} from "../../../hooks/pages/useSetSchedule.js"
import {Box, Button} from "@mui/material"
import SeanceCard from "./SeanceCard.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useRef, useState} from "react"
import {setSchedule} from "../../../redux/scheduleReducer.js"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import Order from "../../../components/orders/Order.jsx"
import {useSetContentHeight} from "../../../hooks/interface/useSetContentHeight.js"
import Loader from "../../../components/Loader.jsx"

const PageSchedule = () => {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из хранилища
    const city = useSelector(state => state.data.city)
    const schedule = useSelector(state => state.schedule.schedule)

    // Хуки
    const [content_height, show_pre_order] = useSetContentHeight()
    const filial_halls_seances = useSetSchedule()

    // Монтаж/демонтаж
    useEffect(() => {
        dispatch(setSchedule(filial_halls_seances))
        return () => {
            dispatch(setSchedule([]))
        }
    }, [dispatch, filial_halls_seances])

    // Массив ширины контента по филиалам
    const elementsRef = useRef(new Map())
    // Максимальная ширина для перекрытия фона при прокрутке
    const [content_width, set_content_width] = useState(200)
    useEffect(() => {
        const widths = Array.from(elementsRef.current.values()).map(el => el?.getBoundingClientRect().width || 0)
        set_content_width(Math.max(...widths))
    }, [schedule])

    return (
        <>
            <ScheduleMenu/>
            <Box sx={{
                display: 'flex',
                height: content_height,
            }}>
                <Box id="content-wrap" style={{display: 'flex', height: content_height}}>
                    <Box id="content"
                         sx={{height: content_height}}>
                        <Box id="schedule-full">
                            {schedule.map((filial_hall_seances, index) => {
                                if (filial_hall_seances.error !== null) {
                                    return (<Box key={filial_hall_seances.filial.uid}></Box>)
                                } else if (filial_hall_seances.loading) {
                                    return (
                                        <Box key={filial_hall_seances.filial.uid}>
                                            <Box className="schedule-full-filial-name" style={{
                                                position: 'sticky',
                                                left: 0,
                                                top: 0,
                                                zIndex: 100,
                                                paddingLeft: '15px',
                                                minWidth: '210px',
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
                                                position: 'sticky',
                                                left: 0,
                                                top: 0,
                                                zIndex: 100,
                                                paddingLeft: '15px',
                                                minWidth: '210px',
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
                                                        <Box key={hall.uid_hall} className='schedule-full-hall'>
                                                            <Box className='schedule-full-hall-name' style={{
                                                                position: 'sticky',
                                                                top: '65px',
                                                                zIndex: 99,
                                                                marginBottom: '5px'
                                                            }}>
                                                                <Button variant='contained'
                                                                        style={{
                                                                            width: '100%',
                                                                            backgroundColor: '#2E3239'
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
                                                    )
                                                })}
                                            </Box>
                                        </Box>)
                                }
                            })}
                        </Box>
                    </Box>
                    {show_pre_order ? <Order/> : <></>}
                </Box>
            </Box>
        </>
    )
}

export default PageSchedule