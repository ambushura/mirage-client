import React from 'react'
import {Box, Button, ButtonGroup} from "@mui/material"
import {useSelector} from "react-redux"
import {center_menu_icons} from "../ui/ThemeContext.jsx"
import {useNavigate} from "react-router-dom"

const CenterSidePanel = () => {

    const navigate = useNavigate()

    const {main_menu, current_page} = useSelector(state => state.center)

    return <Box id='center-side-panel'>
        <ButtonGroup orientation='vertical' sx={{
            minHeight: '60px', width: '60px', boxShadow: 'none', paddingTop: 'var(--center-header-height)'
        }}>
            {main_menu.map(item => {
                return <Button
                    sx={{minHeight: '60px', width: '60px', borderRadius: '0px', boxShadow: 'none'}}
                    onClick={() => {
                        navigate(`center/${item.id}/${item?.submenu[0].id}`)
                    }}
                    color='secondary'
                    variant={current_page[0] === item.id ? "contained" : "text"}
                    key={item.id}>{center_menu_icons[item.icon]}</Button>
            })}
        </ButtonGroup>
    </Box>
}

export default CenterSidePanel