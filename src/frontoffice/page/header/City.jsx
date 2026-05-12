import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PARAM_DATA_ADMIN_SHIFT, PARAM_DATE_SHIFT } from '../../../redux/frontoffice/interfaceReducer.js'
import { WhiteMenuItem } from '../../../ui/ThemeContext.jsx'

const City = (props) => {
    const current_page = useSelector((state) => state.interface.current_page)
    const param_date = useSelector((state) => state.interface.params.param_date)
    const param_date_admin = useSelector((state) => state.interface.params.param_date_admin)
    const film = useSelector((state) => state.schedule.film)
    const { wp, kiosk } = useSelector((state) => state.interface)

    return (
        <NavLink
            to={`/${current_page}/${props.city.code}/all/${PARAM_DATE_SHIFT.find((el) => el === current_page) !== undefined ? param_date + '/' : ''}${film !== null ? film.uid + '/' : ''}${PARAM_DATA_ADMIN_SHIFT.find((el) => el === current_page) !== undefined ? param_date_admin + '/' : ''}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`}
        >
            <WhiteMenuItem
                onClick={(event) => {
                    props.handleClose(event)
                }}
            >
                {props.city.name}
            </WhiteMenuItem>
        </NavLink>
    )
}

export default City
