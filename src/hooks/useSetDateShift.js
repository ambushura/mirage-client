import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import dayjs from "dayjs"
import {setScheduleDateShift} from "../redux/scheduleReducer.js"

export function useSetDateShift(param_date) {

    const dispatch = useDispatch()
    const current_page = useSelector(state => state.interface.current_page)

    useEffect(() => {
        if (['films', 'film', 'schedule'].find(el => el === current_page) !== undefined) {
            dispatch(setScheduleDateShift(dayjs(param_date).toISOString()))
        }
    }, [dispatch, param_date, current_page])
}