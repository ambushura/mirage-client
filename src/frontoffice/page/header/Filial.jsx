import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PARAM_DATA_ADMIN_SHIFT, PARAM_DATE_SHIFT } from '../../../redux/frontoffice/interfaceReducer.js'
import { WhiteMenuItem } from '../../../ui/ThemeContext.jsx'

const Filial = (props) => {
    const current_page = useSelector((state) => state.interface.current_page)
    const city = useSelector((state) => state.data.city)
    const param_date = useSelector((state) => state.interface.params.param_date)
    const param_date_admin = useSelector((state) => state.interface.params.param_date_admin)
    const wp = useSelector((state) => state.interface.wp)
    const film = useSelector((state) => state.schedule.film)

    return (
        <NavLink
            to={`/${current_page}/${city.code}/${props.filial.uid === undefined ? 'all' : props.filial.eais}/${PARAM_DATE_SHIFT.find((el) => el === current_page) !== undefined ? param_date + '/' : ''}${film !== null ? film.uid + '/' : ''}${PARAM_DATA_ADMIN_SHIFT.find((el) => el === current_page) !== undefined ? param_date_admin + '/' : ''}?${wp !== null ? 'wp=' + wp : ''}`}
        >
            <WhiteMenuItem
                onClick={(event) => {
                    props.handleClose(event)
                }}
            >
                {props.filial.uid === undefined ? 'Все кинотеатры' : props.filial.name}
            </WhiteMenuItem>
        </NavLink>
    )
}

export default Filial
