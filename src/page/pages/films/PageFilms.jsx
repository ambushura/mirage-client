import {useEffect, useState} from 'react'
import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import {FOOTER_HEIGHT, HEADER_HEIGHT, TOP_MENU_HEIGHT} from "../../../redux/interfaceReducer.js"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import Films from "./Films.jsx"
import Order from "../../../components/orders/Order.jsx"

const PageFilms = () => {

    const app_height = useSelector(state => state.interface.app_height)
    const authenticated = useSelector(state => state.interface.authenticated)
    const [height, setHeight] = useState('')

    useEffect(() => {
        setHeight(`calc(${app_height}px - ${HEADER_HEIGHT[authenticated]}px - ${TOP_MENU_HEIGHT[authenticated]}px - ${FOOTER_HEIGHT[authenticated]}px)`)
    }, [app_height, authenticated])

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
                {authenticated === 1 ? <Order/> : <></>}
            </Box>
        </>
    )
}

export default PageFilms