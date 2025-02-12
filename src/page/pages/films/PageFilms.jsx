import {useEffect, useState} from 'react'
import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import {FOOTER_HEIGHT, HEADER_HEIGHT, TOP_MENU_HEIGHT} from "../../../redux/interfaceReducer.js"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import Films from "./Films.jsx"
import Order from "../../../components/orders/Order.jsx"

const PageFilms = () => {

    const app_height = useSelector(state => state.interface.app_height)
    const [authenticated, set_authenticated] = useState(0)
    const [height, setHeight] = useState('')

    const permissions = useSelector(state => state.auth.permissions)

    useEffect(() => {
        if (permissions.includes("staff")) {
            set_authenticated(1)
        } else {
            set_authenticated(0)
        }
        setHeight(`calc(${app_height}px - ${HEADER_HEIGHT[authenticated]}px - ${TOP_MENU_HEIGHT[authenticated]}px - ${FOOTER_HEIGHT[authenticated]}px)`)
    }, [app_height, authenticated, permissions])

    return (
        <>
            <ScheduleMenu/>
            <Box sx={{
                display: 'flex',
                height: height
            }}>
                <Box id="content-wrap"
                     sx={{height: height}}>
                    <div className="gradient-block-bottom"></div>
                    <Box id="content" style={{height: height, overflowX: 'hidden'}}>
                        <Films/>
                    </Box>
                </Box>
                {permissions.includes("staff") ? <Order/> : <></>}
            </Box>
        </>
    )
}

export default PageFilms