import {useEffect, useState} from 'react'
import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import {FOOTER_HEIGHT, HEADER_HEIGHT, TOP_MENU_HEIGHT} from "../../../redux/interfaceReducer.js"
import {useSetCurrentPage} from "../../../hooks/useSetCurrentPage.js"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import Film from "./Film.jsx"
import Order from "../../../components/orders/Order.jsx"

const PageFilm = () => {

    const params = useParams()

    const permissions = useSelector(state => state.auth.permissions)
    const [authenticated, set_authenticated] = useState(0)

    const app_height = useSelector(state => state.interface.app_height)
    const [height, setHeight] = useState('')

    useEffect(() => {
        if (permissions.includes("staff")) {
            set_authenticated(1)
        } else {
            set_authenticated(0)
        }
        setHeight(`calc(${app_height}px - ${HEADER_HEIGHT[authenticated]}px - ${TOP_MENU_HEIGHT[authenticated]}px - ${FOOTER_HEIGHT[authenticated]}px)`)
    }, [app_height, authenticated, permissions])

    useSetCurrentPage('film')

    return (
        <>
            <ScheduleMenu/>
            <Box sx={{
                display: 'flex',
                height: height,
            }}>
                <Box id="content-wrap" style={{display: 'flex'}}>
                    <Box id="content-wrap"
                         sx={{height: height}}>
                        <div className="gradient-block-bottom"></div>
                        <Box id="content"
                             sx={{height: height}}
                             style={{overflowX: 'hidden'}}>
                            <Film uid_film={params.uid_film}/>
                        </Box>
                    </Box>
                    {permissions.includes('staff') ? <Order/> : <></>}
                </Box>
            </Box>
        </>
    )
}

export default PageFilm