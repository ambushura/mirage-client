import {useSelector} from "react-redux"
import {NavLink} from "react-router-dom"
import {PARAM_DATA_ADMIN_SHIFT, PARAM_DATE_SHIFT} from "../../redux/interfaceReducer.js"
import {WhiteMenuItem} from "../../ui/ThemeContext.jsx"

const City = (props) => {

    const current_page = useSelector(state => state.interface.current_page)
    const param_date = useSelector(state => state.interface.params.param_date)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    return (
        <NavLink
            to={`/${current_page}/${props.city.code}/all/${PARAM_DATE_SHIFT.find(el => el === current_page) !== undefined ? param_date + '/' : ''}${PARAM_DATA_ADMIN_SHIFT.find(el => el === current_page) !== undefined ? param_date_admin + '/' : ''}`}>
            <WhiteMenuItem onClick={(event) => {
                props.handleClose(event)
            }}>{props.city.name}</WhiteMenuItem>
        </NavLink>
    )
}

export default City