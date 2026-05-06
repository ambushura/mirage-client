import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import SeanceTitle from '../../../components/cinema/SeanceTitle.jsx'
import PlaceLabel from './PlaceLabel.jsx'
import dynamic_price from '../../../images/dynamic_price.svg'
import { useSelector } from 'react-redux'

const SeanceCard = (props) => {
    const city = props.city
    const filial = props.filial
    const seance = props.seance
    const { wp, kiosk } = useSelector((state) => state.interface)

    return (
        <NavLink
            to={`/seance/${city.code}/${filial.eais}/${seance.uid}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`}
            className={`schedule-full-seance-link ${!seance.opened ? 'schedule-full-seance-link-closed' : seance.canceled ? 'schedule-full-seance-link-canceled' : ''}`}
        >
            <Box sx={{ margin: '5px' }}>
                <SeanceTitle seance={seance} content_type={true} day={false} age={true} />
            </Box>
            <Box sx={{ paddingLeft: '5px' }}>
                <Box className="schedule-full-seance-film-name">{seance.film_name}</Box>
            </Box>
            <Box className="schedule-full-tariff">
                <Box className="schedule-full-tariff-body">
                    {seance.tariff.map((price) => {
                        return (
                            <Box key={price.uid_place_type} className="schedule-full-tariff-place">
                                <PlaceLabel name={price.image_name} />
                                <Box>
                                    {price.sum_dynamic !== null ? <img src={dynamic_price} alt="экран" width="10px" height="10px" /> : null}{' '}
                                    {price.price} P
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                <Box className="schedule-full-tariff-footer">
                    <div className="circle"></div>
                </Box>
            </Box>
        </NavLink>
    )
}

export default SeanceCard
