import {Box} from "@mui/material"
import {useEffect, useState} from "react"
import {FOOTER_HEIGHT, HEADER_HEIGHT, TOP_MENU_HEIGHT} from "../../../redux/interfaceReducer.js"
import {useSelector} from "react-redux"

const PageHoreca = () => {

    const app_height = useSelector(state => state.interface.app_height)
    const permissions = useSelector(state => state.auth.permissions)
    const [height, set_height] = useState('')
    const [authenticated, set_authenticated] = useState(0)

    useEffect(() => {
        if (permissions.includes("staff")) {
            set_authenticated(1)
        }
    }, [permissions])

    useEffect(() => {
        set_height(`calc(${app_height}px - ${HEADER_HEIGHT[authenticated]}px - ${TOP_MENU_HEIGHT[authenticated]}px - ${FOOTER_HEIGHT[authenticated]}px)`)
    }, [app_height, authenticated])

    return (
        <Box id="horeca-menu" sx={{height: height}}>
            <PageHoreca/>
            <PageHoreca/>
        </Box>
    )
}

export default PageHoreca