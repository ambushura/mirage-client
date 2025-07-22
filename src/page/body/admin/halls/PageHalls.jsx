import {Box} from "@mui/material"
import {useSetHall} from "./useSetHall.js"
import Hall from "../../../../components/halls/Hall.jsx"
import {useSelector} from "react-redux"
import {useEffect, useState} from "react";
import {FOOTER_HEIGHT, HEADER_HEIGHT} from "../../../../redux/interfaceReducer.js"

const PageHalls = () => {

    const hall = useSetHall()
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const app_width = useSelector(state => state.interface.app_width)
    const app_height = useSelector(state => state.interface.app_height)
    const [hall_height, set_hall_height] = useState(400)

    useEffect(() => {
        set_hall_height(app_height - HEADER_HEIGHT[1] - FOOTER_HEIGHT[1] - 65)
    }, [app_height])

    return (
        <Box>
            {hall !== null ? <Hall
                city={city}
                filial={filial}
                pre_order={null}
                hall={hall}
                seance={null}
                height={hall_height}
                width={app_width}
                booking={[]}
                set_count_book={() => {
                }}
                set_time_remaining={() => {
                }}
            /> : null}
        </Box>
    )
}

export default PageHalls