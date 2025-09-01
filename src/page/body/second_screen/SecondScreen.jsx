import SSSchedule from "./SSSchedule.jsx"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {FOOTER_HEIGHT, HEADER_HEIGHT, setSecondScreen} from "../../../redux/interfaceReducer.js"
import {useSetSecondScreen} from "./useSetSecondScreen.js"
import SSSeance from "./SSSeance.jsx"
import {Box} from "@mui/material"
import background from "../../../images/background.jpg"

export default function SecondScreen() {

    const dispatch = useDispatch()
    const current_page = useSelector(state => state.second_screen.current_page)

    const app_width = useSelector(state => state.interface.app_width)
    const app_height = useSelector(state => state.interface.app_height)

    const [screen_width, set_screen_width] = useState(100)
    const [screen_height, set_screen_height] = useState(100)

    useEffect(() => {
        set_screen_width(app_width)
        set_screen_height(app_height - HEADER_HEIGHT[1] - FOOTER_HEIGHT[1])
    }, [app_height, app_width])

    useSetSecondScreen()

    useEffect(() => {
        dispatch(setSecondScreen())
    })

    return <Box
        className='ss-background'
        sx={{
            width: `${screen_width}px`,
            height: `${screen_height}px`,
            backgroundImage: `url(${background})`
        }}>
        {!['seance'].includes(current_page) && <SSSchedule width={screen_width} height={screen_height}/>}
        {['seance'].includes(current_page) && <SSSeance/>}
    </Box>

}