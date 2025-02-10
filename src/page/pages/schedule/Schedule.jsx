import {useEffect} from 'react'
import {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Box} from "@mui/material"
import SeanceCard from "./SeanceCard.jsx"
import dayjs from "dayjs"
import {useFetching} from "../../../hooks/useFetching.js"
import {setScheduleDateShift, setScheduleFilial} from "../../../redux/scheduleReducer.js"
const Schedule = (props) => {

    const dispatch = useDispatch()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const schedule_filial = useSelector(state => state.schedule.schedule_filial)
    const param_data = useSelector(state => state.schedule.param_data)

    const [url, set_url] = useState('')
    const [schedule_filial_response, , ] = useFetching(url)

    useEffect(() => {
        if (filial !== undefined) {
            const url_new = `http://${filial.ip}:${filial.port}/api/get_schedule_halls_seances?uid_filial=${filial.uid}&date_shift=${param_data}`
            set_url(url_new)
        }
        return () => {
            dispatch(setScheduleFilial([]))
        }
    }, [filial, param_data])

    useEffect(() => {
        if (schedule_filial_response !== null) {
            dispatch(setScheduleFilial(schedule_filial_response))
        }
    }, [dispatch, schedule_filial_response])

    useEffect(() => {
        if (props.param_date !== undefined) {
            dispatch(setScheduleDateShift(dayjs(props.param_date)))
        }
    }, [dispatch, props.param_date])

    return (
        <Box id="schedule-full">
            {schedule_filial.map(hall => {
                return (
                    <Box className='schedule-full-hall'>
                        <Box className='schedule-full-hall-name'>
                            <Box>Зал {hall.name_full_hall}</Box>
                        </Box>
                        <Box className='schedule-full-seances'>
                            {hall.seances.map(seance => {
                                return (
                                    <SeanceCard
                                        key={seance.uid}
                                        seance={seance}
                                        city={city}
                                        filial={filial}>
                                    </SeanceCard>
                                )
                            })}
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}
export default Schedule