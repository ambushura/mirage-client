import React from 'react'
import {MenuItem} from "@mui/material"
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux"
const Filial = (props) => {
    const current_page = useSelector(state => state.data.current_page)
    const city = useSelector(state => state.data.city)
    return (
        <NavLink to={props.filial.eais !== undefined ? `/${current_page}/${city.code}/${props.filial.eais}/` : `/${current_page}/${city.code}/`}>
            <MenuItem style={{color: 'white', fontWeight: 'bold'}} onClick={(event) => {
                props.handleClose(event)
            }}>{props.filial.name}</MenuItem>
        </NavLink>
    )
}
export default Filial