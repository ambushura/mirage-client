import {MenuItem} from "@mui/material"
import {useSelector} from "react-redux"
import {NavLink} from "react-router-dom"

const City = (props) => {

    const current_page = useSelector(state => state.interface.current_page)
    const param_date = useSelector(state => state.schedule.param_date)

    return (
        <NavLink to={`/${current_page}/${props.city.code}/all/${param_date}/`}>
            <MenuItem style={{color: 'white', fontWeight: 'bold'}}
                      onClick={(event) => {
                          props.handleClose(event)
                      }}>{props.city.name}</MenuItem>
        </NavLink>
    )
}

export default City