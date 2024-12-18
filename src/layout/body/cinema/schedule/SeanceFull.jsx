import React from 'react'
import {Box} from "@mui/material"
import dayjs from "dayjs"
const SeanceFull = (props) => {
    const seance = props.seance
    const beginning = dayjs(seance.beginning.replace('Z', ''))
    const ending = dayjs(seance.ending.replace('Z', ''))
    return (
        <Box className='schedule-full-seance'>
            <Box className='schedule-full-seance-title'>
                <Box className='schedule-full-seance-time-copy-type'>
                    <Box
                        className='schedule-full-seance-title-copy-type'><span><span>{seance.copy_type}</span></span></Box>
                    <Box
                        className='schedule-full-seance-title-time'>{String(beginning.$H).padStart(2, '0')}:{String(beginning.$m).padStart(2, '0')}<span>-{String(ending.$H).padStart(2, '0')}:{String(ending.$m).padStart(2, '0')}</span></Box>
                </Box>
                <Box className='schedule-full-seance-title-age'>
                    {`${seance.film_rate_age}+`}
                </Box>
            </Box>
            <Box className='schedule-full-seance-film-name'>
                {seance.film_name}
            </Box>
        </Box>
    )
}
export default SeanceFull