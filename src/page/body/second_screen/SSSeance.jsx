import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import Hall from "../../../components/halls/Hall.jsx"
import {FOOTER_HEIGHT, HEADER_HEIGHT} from "../../../redux/interfaceReducer.js"

const SsSeance = ({width, height}) => {

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const seance = useSelector(state => state.second_screen.seance)
    const hall = useSelector(state => state.second_screen.hall)

    const booking = useSelector(state => state.second_screen.booking)
    const pre_order = useSelector(state => state.second_screen.pre_order)

    return <Box sx={{width: '100%', height: '100%'}}>
        <Hall
            city={city}
            filial={filial}
            pre_order={pre_order}
            hall={hall}
            seance={seance}
            height={height - HEADER_HEIGHT[1] - FOOTER_HEIGHT[1]}
            width={width}
            booking={booking}
            set_count_book={() => {
            }}
            set_time_remaining={() => {
            }}/>
    </Box>
}

export default SsSeance