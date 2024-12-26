import React from 'react'
import {Box} from "@mui/material"
import SeanceFull from "./SeanceFull"
import {useSelector} from "react-redux"
const ScheduleFull = () => {
    const schedule_filial = useSelector(state => state.schedule.schedule_filial)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    return (
        <>
            {schedule_filial.map(hall => {
                return (
                    <Box className='schedule-full-hall'>
                        <Box className='schedule-full-hall-name'>{hall.name}</Box>
                        <Box className='schedule-full-seances'>
                            {hall.seances.map(seance => {
                                return (
                                    <SeanceFull
                                        key={seance.uid}
                                        seance={seance}
                                        city={city}
                                        filial={filial}>
                                    </SeanceFull>
                                )
                            })}
                        </Box>
                    </Box>
                )
            })}
        </>
    )
}
export default ScheduleFull