import React from 'react'
import {Box} from "@mui/material"
import dayjs from "dayjs"
import place_1 from "../../../../media/place_types/place_1.svg"
import place_2 from "../../../../media/place_types/place_2.svg"
import place_3 from "../../../../media/place_types/place_3.svg"
import place_1_vip from "../../../../media/place_types/place_1_vip.svg"
import place_stroller from "../../../../media/place_types/place_stroller.svg"
import circle from "../../../../media/circle.svg"
const images = {
    place_1: place_1,
    place_2: place_2,
    place_3: place_3,
    place_1_vip: place_1_vip,
    place_stroller:place_stroller
}
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
            <Box className='schedule-full-tariff'>
                <Box className='schedule-full-tariff-body'>
                    {seance.tariff.map(price => {
                        return (
                            <Box className='schedule-full-tariff-place'>
                                <img width='20px' height='20px' src={images[price.image_name]} alt='место'/>
                                <div>{price.price_tariff} P</div>
                            </Box>
                        )
                    })}
                </Box>
                <Box className='schedule-full-tariff-footer'>
                    <div className='schedule-full-tariff-footer-circle' style={{backgroundImage: `url(${circle})`}}></div>
                </Box>
            </Box>
        </Box>
    )
}
export default SeanceFull