import {Box} from "@mui/material"
import {useSelector} from "react-redux"

const SsSeance = () => {

    const uid_seance = useSelector(state => state.second_screen.uid_seance)
    const uid_order = useSelector(state => state.second_screen.uid_order)


    return (
        <Box>
            Схема зала
        </Box>
    )
}

export default SsSeance