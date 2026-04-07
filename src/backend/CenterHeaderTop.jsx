import React from 'react'
import {Box, Button, ButtonGroup} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {center_menu_icons} from "../ui/ThemeContext.jsx"
import {logout} from "../redux/authReducer.js"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import {useGetCenterData} from "./hooks/useGetCenterData.js"

const CenterHeaderTop = () => {

    useGetCenterData()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {main_menu, current_page} = useSelector(state => state.center)
    const param_date = useSelector(state => state.interface.params.param_date)
    const cities = useSelector(state => state.data.cities)

    return <Box id='center-header'>
        <ButtonGroup sx={{height: '40px', boxShadow: 'none'}}>
            {main_menu.find(el => el.id === current_page[0])?.submenu.map(item => {
                return <Button
                    sx={{
                        height: '40px',
                        fontWeight: 400,
                        borderRadius: '0px',
                        boxShadow: 'none',
                        padding: '0 15px 0 15px'
                    }}
                    onClick={() => {
                        navigate(`center/${current_page[0]}/${item.id}`)
                    }}
                    color='secondary'
                    variant={current_page[1] === item.id ? "contained" : "text"}
                    key={item.id}
                    startIcon={center_menu_icons[item.icon]}>{item.title}</Button>
            })}
        </ButtonGroup>
        <Button
            startIcon={<ExitToAppIcon/>}
            variant='text' color='secondary'
            sx={{maxHeight: '40px', borderRadius: 0}}
            onClick={() => {
                navigate(cities.length ? `/films/${cities[0].code}/all/${param_date}/` : "/")
                dispatch(logout())
            }}>Выход</Button>
    </Box>
}

export default CenterHeaderTop