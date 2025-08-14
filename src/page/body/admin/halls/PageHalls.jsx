import {useSetHall} from "./useSetHall.js"
import Hall from "../../../../components/halls/Hall.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setHall} from "../../../../redux/hallsReducer.js"
import {Box} from "@mui/material"

const PageHalls = () => {

    const dispatch = useDispatch()

    const uid_hall = useSelector(state => state.halls.uid_hall)

    const hall = useSelector(state => state.halls.hall)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const app_width = useSelector(state => state.interface.app_width)

    const hallN = useSetHall(uid_hall)

    useEffect(() => {
        dispatch(setHall(hallN))
    }, [dispatch, hallN])

    if (filial === undefined) {
        return <Box className='empty-box'>
            Выберите филиал...
        </Box>
    } else if (hall === null) {
        return <Box className='empty-box'>
            Выберите зал...
        </Box>
    } else {
        return <Hall
            uid_hall={hall.uid}
            city={city}
            filial={filial}
            pre_order={null}
            hall={hall}
            seance={null}
            width={app_width}
            booking={[]}
        />
    }
}

export default PageHalls