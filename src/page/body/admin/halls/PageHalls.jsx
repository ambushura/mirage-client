import {useSetHall} from "./useSetHall.js"
import Hall from "../../../../components/halls/Hall.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setHall} from "../../../../redux/hallsReducer.js"

const PageHalls = () => {

    const dispatch = useDispatch()

    const hallN = useSetHall()
    const hall = useSelector(state => state.halls.hall)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const app_width = useSelector(state => state.interface.app_width)

    useEffect(() => {
        dispatch(setHall(hallN))
    }, [dispatch, hallN])

    if (hall === null) return null
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

export default PageHalls