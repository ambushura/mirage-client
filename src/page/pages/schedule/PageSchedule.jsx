import {useSetSchedule} from "../../../hooks/useSetSchedule.js"
import {Box} from "@mui/material"
import SeanceCard from "./SeanceCard.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setSchedule} from "../../../redux/scheduleReducer.js"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"

const PageSchedule = () => {

    const dispatch = useDispatch()
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.schedule.param_date)
    const [hall_seances_data, ,] = useSetSchedule(city, filial, param_date)

    useEffect(() => {
        dispatch(setSchedule(hall_seances_data))
        return () => {
            dispatch(setSchedule([]))
        }
    }, [dispatch, hall_seances_data])

    return (
        <>
            <ScheduleMenu/>
            <Box id="schedule-full">
                {hall_seances_data.map(filial_hall_seances => {
                    return (
                        <Box key={filial_hall_seances.filial.uid}>
                            <Box className="schedule-full-filial-name">{filial_hall_seances.filial.name}</Box>
                            <Box className="schedule-full-filial">
                                {filial_hall_seances.hall_seances.map(hall => {
                                    return (
                                        <Box key={hall.uid} className='schedule-full-hall'>
                                            <Box className='schedule-full-hall-name'>
                                                <Box>Зал {hall.name_full_hall}</Box>
                                            </Box>
                                            <Box className='schedule-full-seances'>
                                                {hall.seances.map(seance => {
                                                    return (
                                                        <SeanceCard
                                                            city={city}
                                                            filial={filial_hall_seances.filial}
                                                            key={seance.uid}
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
                })}
            </Box>
        </>
    )
}

export default PageSchedule