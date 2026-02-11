import React from 'react'
import {Box, Button, ButtonGroup} from "@mui/material"
import {logout} from "../redux/authReducer.js"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import {useDispatch, useSelector} from "react-redux"
import {center_menu_icons} from "../ui/ThemeContext.jsx"
import {useNavigate} from "react-router-dom"

const CenterSidePanel = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {main_menu, current_page} = useSelector(state => state.center)
    const {cities} = useSelector(state => state.data)
    const param_date = useSelector(state => state.interface.params.param_date)

    return <Box id='center-side-panel'>
        <CMainMenu orientation='vertical'>
            <CButtonMainMenu variant='text' color='secondary'
                             onClick={() => {
                                 navigate(cities.length ? `/films/${cities[0].code}/all/${param_date}/` : "/")
                                 dispatch(logout())
                             }}><ExitToAppIcon/></CButtonMainMenu>
            {main_menu.map(item => {
                return <CButtonMainMenu
                    onClick={() => {
                        navigate(`center/${item.id}/${item?.submenu[0].id}`)
                    }}
                    color='secondary'
                    variant={current_page[0] === item.id ? "contained" : "text"}
                    key={item.id}>{center_menu_icons[item.icon]}</CButtonMainMenu>
            })}
        </CMainMenu>
    </Box>
}

export default CenterSidePanel

export function CButtonMainMenu(props) {
    return <Button
        {...props}
        sx={{minHeight: '56px', width: '56px', borderRadius: '0px', boxShadow: 'none', ...props.sx,}}
    />
}

export function CMainMenu(props) {
    return <ButtonGroup
        {...props}
        sx={{minHeight: '56px', width: '56px', boxShadow: 'none', ...props.sx,}}
    />
}