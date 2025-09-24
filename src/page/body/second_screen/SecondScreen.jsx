import SSSchedule from "./SSSchedule.jsx"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {FOOTER_HEIGHT, HEADER_HEIGHT, setSecondScreen} from "../../../redux/interfaceReducer.js"
import {useSetSecondScreen} from "./useSetSecondScreen.js"
import SSSeance from "./SSSeance.jsx"
import {Box} from "@mui/material"
import background from "../../../images/background.jpg"
import SSOrder from "./SSOrder.jsx"

export default function SecondScreen() {

    const dispatch = useDispatch()
    const current_page = useSelector(state => state.second_screen.current_page)

    const app_width = useSelector(state => state.interface.app_width)
    const app_height = useSelector(state => state.interface.app_height)

    const [screen_width, set_screen_width] = useState(100)
    const [screen_height, set_screen_height] = useState(100)
    const [body_width, set_body_width] = useState(100)
    const [order_width, set_order_width] = useState(100)

    const show_pre_order = useSelector(state => state.second_screen.show_pre_order)
    const show_horder = useSelector(state => state.second_screen.show_horder)

    useEffect(() => {
        set_screen_width(app_width)
        set_screen_height(app_height - HEADER_HEIGHT[1] - FOOTER_HEIGHT[1])
    }, [app_height, app_width])

    useSetSecondScreen()

    useEffect(() => {
        dispatch(setSecondScreen())
    })

    useEffect(() => {
        set_order_width(screen_width * 30 / 100)
        set_body_width(screen_width * 70 / 100)
    }, [screen_width, show_pre_order, show_horder])

    return <Box id='content-box'
                sx={{
                    overflow: 'hidden',
                    backgroundImage: current_page === 'seance' ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${background})` : `url(${background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box id='content-header'></Box>
            <Box className='ss-background' sx={{width: '100%', height: 'var(--page-height)'}}>
                <Box sx={{width: `${body_width}px`, height: '100%'}}>
                    {!['seance'].includes(current_page) && <SSSchedule width={body_width} height={screen_height}/>}
                    {['seance'].includes(current_page) && <SSSeance/>}
                </Box>
                {show_pre_order || show_horder ? <Box sx={{width: `${order_width}px`, height: '100%'}}>
                    <SSOrder/>
                </Box> : null}
            </Box>
        </Box>
    </Box>
}