import {Box} from "@mui/material"
import place_1 from "../../../images/place_types/place_1.svg"
import place_2 from "../../../images/place_types/place_2.svg"
import place_3 from "../../../images/place_types/place_3.svg"
import place_1_vip from "../../../images/place_types/place_1_vip.svg"
import place_stroller from "../../../images/place_types/place_stroller.svg"
import {NavLink} from "react-router-dom"
import SeanceTitle from "../../../components/cinema/SeanceTitle.jsx"

const SeanceCard = (props) => {

    const city = props.city
    const filial = props.filial
    const seance = props.seance

    const images = {
        place_1: place_1,
        place_2: place_2,
        place_3: place_3,
        place_1_vip: place_1_vip,
        place_stroller: place_stroller
    }

    return (
        <NavLink to={`/seance/${city.code}/${filial.eais}/${seance.uid}/`} className='schedule-full-seance'>
            <Box sx={{margin: '5px'}}>
                <SeanceTitle
                    seance={seance}
                    content_type={true}
                    day={false}
                    age={true}/>
            </Box>
            <Box sx={{paddingLeft: '5px'}}>
                <Box className='schedule-full-seance-film-name'>
                    {seance.film_name}
                </Box>
            </Box>
            <Box className='schedule-full-tariff'>
                <Box className='schedule-full-tariff-body'>
                    {seance.tariff.map(price => {
                        return (
                            <Box key={price.uid_place_type} className='schedule-full-tariff-place'>
                                <img width='20px' height='20px' src={`${images[price.image_name]}`} alt='место'/>
                                <div>{price.price} P</div>
                            </Box>
                        )
                    })}
                </Box>
                <Box className='schedule-full-tariff-footer'>
                    <div className='circle'></div>
                </Box>
            </Box>
        </NavLink>
    )
}

export default SeanceCard