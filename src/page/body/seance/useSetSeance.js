import {useFetchSeance} from "../../../hooks/fetching/useFetchSeance.js"
import {useEffect, useState} from "react"
import {setSeance} from "../../../redux/scheduleReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useFetchHall} from "../../../hooks/fetching/useFetchHall.js"

export function useSetSeance() {

    const dispatch = useDispatch()

    const [seance_data, seance_error, seance_loading] = useFetchSeance()
    const [hall_data, hall_error, hall_loading] = useFetchHall()

    const seance = useSelector(state => state.schedule.seance)
    const [hall, set_hall] = useState(undefined)

    useEffect(() => {
        if (!seance_loading && seance_error === null) {
            dispatch(setSeance(seance_data))
        }
        return () => {
            dispatch(setSeance(undefined))
        }
    }, [seance_data, seance_loading, seance_error])

    useEffect(() => {
        if (seance !== undefined) {
            if (!hall_loading && hall_error == null) {
                set_hall(hall_data)
            }
        }
    }, [hall_data, seance])

    return hall
}