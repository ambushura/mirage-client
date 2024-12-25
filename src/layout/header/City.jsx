import React from 'react'
import {MenuItem} from "@mui/material"
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux"
const City = (props) => {
    const current_page = useSelector(state => state.data.current_page)
    return (<NavLink to={`/${current_page}/${props.city.code}/`}><MenuItem style={{color: 'white', fontWeight: 'bold'}}
                                                                                            onClick={(event) => {
                                                                                                props.handleClose(event)
                                                                                            }}>{props.city.name}</MenuItem></NavLink>
    )
}
export default City