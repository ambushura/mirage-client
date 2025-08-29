import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {
    ROUTE_SECOND_SCREEN_SCHEDULE_GET, ROUTE_SECOND_SCREEN_SEANCE_GET
} from "../../../service/fetch_routes.js"
import {useFetching} from "../../../hooks/common/useFetching.js"
import {setSSSchedule, setSSSeance} from "../../../redux/secondScreenReducer.js"

export function useSetSecondScreen() {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const current_page = useSelector(state => state.second_screen.current_page)
    const date_shift = useSelector(state => state.second_screen.date_shift)
    const uid_seance = useSelector(state => state.second_screen.uid_seance)

    const [url_schedule, set_url_schedule] = useState(undefined)
    const [data_schedule, errors_schedule, loading_schedule] = useFetching(url_schedule)

    const [url_seance, set_url_seance] = useState(undefined)
    const [data_seance, errors_seance, loading_seance] = useFetching(url_seance)

    useEffect(() => {
        if (filial !== undefined && !['seance'].includes(current_page)) {
            set_url_schedule({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_SCHEDULE_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        date_shift: date_shift
                    }
                }
            )
        } else {
            set_url_schedule(undefined)
        }
    }, [filial, current_page, date_shift])

    useEffect(() => {
        if (filial !== undefined && ['seance'].includes(current_page)) {
            set_url_seance({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_SEANCE_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        uid_seance: uid_seance
                    }
                }
            )
        } else {
            set_url_seance(undefined)
        }
    }, [filial, current_page, uid_seance])

    useEffect(() => {
        if (data_schedule !== null) {
            dispatch(setSSSchedule(data_schedule))
        }
    }, [dispatch, data_schedule])

    useEffect(() => {
        if (data_seance !== null) {
            dispatch(setSSSeance(data_seance))
        }
    }, [dispatch, data_seance])

}