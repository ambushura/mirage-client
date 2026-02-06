import React from 'react'
import {Box, Button, ButtonGroup} from "@mui/material"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {center_menu_icons} from "../ui/ThemeContext.jsx"

const CenterHeader = () => {

    const navigate = useNavigate()
    const {main_menu, current_page} = useSelector(state => state.center)

    return <Box id='center-header'>
        <CMenu>
            {main_menu.find(el => el.id === current_page[0])?.submenu.map(item => {
                return <CButtonMenu
                    onClick={() => {
                        navigate(`center/${current_page[0]}/${item.id}`)
                    }}
                    color='secondary'
                    variant={current_page[1] === item.id ? "contained" : "text"}
                    key={item.id}
                    startIcon={center_menu_icons[item.icon]}>{item.title}</CButtonMenu>
            })}
        </CMenu>
    </Box>
}

export default CenterHeader

export function CButtonMenu(props) {
    return <Button
        {...props}
        sx={{
            height: '55px',
            borderRadius: '0px',
            boxShadow: 'none',
            fontWeight: 400,
            padding: '0 15px 0 15px', ...props.sx,
        }}
    />
}

export function CMenu(props) {
    return <ButtonGroup
        {...props}
        sx={{height: '55px', boxShadow: 'none', ...props.sx,}}
    />
}