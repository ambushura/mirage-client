import {Box} from "@mui/material"
import {NavLink} from "react-router-dom"
import SeanceTitle from "../../../components/cinema/SeanceTitle.jsx"
import PlaceLabel from "./PlaceLabel.jsx"

const SeanceCard = (props) => {

    const city = props.city
    const filial = props.filial
    const seance = props.seance

    return (
        <NavLink to={`/seance/${city.code}/${filial.eais}/${seance.uid}/`} className='schedule-full-seance-link'>
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
                                <PlaceLabel name={price.image_name}/>
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