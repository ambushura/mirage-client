import {useSetSchedule} from "../../../hooks/useSetSchedule.js"
import {Box} from "@mui/material"
import SeanceCard from "./SeanceCard.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {setSchedule} from "../../../redux/scheduleReducer.js"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import {FOOTER_HEIGHT, HEADER_HEIGHT, TOP_MENU_HEIGHT} from "../../../redux/interfaceReducer.js"
import {useSetCurrentPage} from "../../../hooks/useSetCurrentPage.js"
import Order from "../../../components/orders/Order.jsx"
import Film from "../film/Film.jsx";

const PageSchedule = () => {

    const dispatch = useDispatch()
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.schedule.param_date)
    const [hall_seances_data, ,] = useSetSchedule(city, filial, param_date)
    const permissions = useSelector(state => state.auth.permissions)
    const [authenticated, set_authenticated] = useState(0)
    const app_height = useSelector(state => state.interface.app_height)
    const [height, setHeight] = useState('')

    useEffect(() => {
        dispatch(setSchedule(hall_seances_data))
        return () => {
            dispatch(setSchedule([]))
        }
    }, [dispatch, hall_seances_data])

    useEffect(() => {
        if (permissions.includes("staff")) {
            set_authenticated(1)
        } else {
            set_authenticated(0)
        }
        setHeight(`calc(${app_height}px - ${HEADER_HEIGHT[authenticated]}px - ${TOP_MENU_HEIGHT[authenticated]}px - ${FOOTER_HEIGHT[authenticated]}px)`)
    }, [app_height, authenticated, permissions])

    useSetCurrentPage('schedule')

    return (
        <>
            <ScheduleMenu/>
            <Box sx={{
                display: 'flex',
                height: height,
            }}>
                <Box id="content-wrap" style={{display: 'flex'}}>
                    <Box id="content-wrap"
                         sx={{height: height}}>
                        <Box id="content"
                             sx={{height: height}}>
                            <Box id="schedule-full">
                                {hall_seances_data.map(filial_hall_seances => {
                                    return (
                                        <Box key={filial_hall_seances.filial.uid}>
                                            {hall_seances_data.length > 1 ? <Box
                                                className="schedule-full-filial-name">{filial_hall_seances.filial.name}</Box> : <></>}
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
                                })}
                            </Box>
                        </Box>
                    </Box>
                    {permissions.includes('staff') ? <Order/> : <></>}
                </Box>
            </Box>
        </>
    )
}

export default PageSchedule