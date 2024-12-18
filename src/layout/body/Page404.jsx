import React from 'react'
import {NavLink} from "react-router-dom"
import {Button} from "@mui/material"
const Page404 = () => {
    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <NavLink className='link' to={`/`}><Button variant="contained">Мираж Синема</Button></NavLink>
        </div>
    )
}
export default Page404