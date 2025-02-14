import {useSetSchedule} from "../../../hooks/useSetSchedule.js"
import {Box} from "@mui/material"
import SeanceCard from "./SeanceCard.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setSchedule} from "../../../redux/scheduleReducer.js"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import {useSetCurrentPage} from "../../../hooks/useSetCurrentPage.js"
import Order from "../../../components/orders/Order.jsx"
import {useSetContentHeight} from "../../../hooks/useSetContentHeight.js"
import Loader from "../../../components/Loader.jsx"

const PageSchedule = () => {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из хранилища
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.schedule.param_date)
    const schedule = useSelector(state => state.schedule.schedule)

    // Хуки
    useSetCurrentPage('schedule')
    const [content_height, show_pre_order] = useSetContentHeight()
    const filial_halls_seances = useSetSchedule(city, filial, param_date)

    // Монтаж/демонтаж
    useEffect(() => {
        dispatch(setSchedule(filial_halls_seances))
        return () => {
            dispatch(setSchedule([]))
        }
    }, [dispatch, filial_halls_seances])

    return (
        <>
            <ScheduleMenu/>
            <Box sx={{
                display: 'flex',
                height: content_height,
            }}>
                <Box id="content-wrap" style={{display: 'flex'}}>
                    <Box id="content-wrap"
                         sx={{height: content_height}}>
                        <Box id="content"
                             sx={{height: content_height}}>
                            <Box id="schedule-full">
                                {schedule.map(filial_hall_seances => {
                                    if (filial_hall_seances.error !== null) {
                                        return (
                                            <Box key={filial_hall_seances.filial.uid}>
                                                <Box className="schedule-full-filial-name">
                                                    <span>{filial_hall_seances.filial.name}</span>
                                                </Box>
                                                <Box className="schedule-full-filial">
                                                    Ошибка загрузки {filial_hall_seances.error}
                                                </Box>
                                            </Box>)
                                    } else if (filial_hall_seances.loading) {
                                        return (
                                            <Loader key={filial_hall_seances.filial.uid}/>
                                        )
                                    } else {
                                        return (
                                            <Box key={filial_hall_seances.filial.uid}>
                                                <Box
                                                    className="schedule-full-filial-name">
                                                    <span>{filial_hall_seances.filial.name}</span>
                                                </Box>
                                                <Box className="schedule-full-filial">
                                                    {filial_hall_seances.data.map(hall => {
                                                        return (
                                                            <Box key={hall.uid} className='schedule-full-hall'>
                                                                <Box className='schedule-full-hall-name'>
                                                                    <Box>Зал {hall.name_full_hall}</Box>
                                                                </Box>
                                                                <Box className='schedule-full-seances'>
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
                    </Box>
                    {show_pre_order ? <Order/> : <></>}
                </Box>
            </Box>
        </>
    )
}

export default PageSchedule