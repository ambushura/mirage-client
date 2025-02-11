import {MenuItem} from "@mui/material"
import {useSelector} from "react-redux"
import {NavLink} from "react-router-dom"
import {PARAM_DATE_SHIFT} from "../../redux/interfaceReducer.js"
const Filial = (props) => {

    const current_page = useSelector(state => state.interface.current_page)
    const city = useSelector(state => state.data.city)
    const param_date = useSelector(state => state.schedule.param_date)
    const film = useSelector(state => state.schedule.film)

    return (
        <NavLink
            to={`/${current_page}/${city.code}/${props.filial.uid === undefined ? 'all' : props.filial.eais}/${PARAM_DATE_SHIFT.find(el => el === current_page) !== undefined ? param_date + '/' : ''}${film !== undefined ? film.uid + '/' : ''}`}>
            <MenuItem style={{color: 'white', fontWeight: 'bold'}} onClick={(event) => {
                props.handleClose(event)
            }}>{props.filial.uid === undefined ? 'Все кинотеатры' : props.filial.name}</MenuItem>
        </NavLink>
    )
}

export default Filial