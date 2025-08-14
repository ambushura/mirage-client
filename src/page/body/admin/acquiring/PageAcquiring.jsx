import {Box} from "@mui/material"
import {useSelector} from "react-redux"

const PageAcquiring = () => {

    const filial = useSelector(state => state.data.filial)

    if (filial === undefined) {
        return <Box className='empty-box'>
            Выберите филиал...
        </Box>
    } else {
        return <Box>Слипы</Box>
    }
}

export default PageAcquiring