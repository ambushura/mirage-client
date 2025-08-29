import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {
    ROUTE_SECOND_SCREEN_SCHEDULE_GET
} from "../../../service/fetch_routes.js"
import {useFetching} from "../../../hooks/common/useFetching.js"
import {setSSSchedule} from "../../../redux/secondScreenReducer.js"

export function useSetSecondScreen() {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const current_page = useSelector(state => state.second_screen.current_page)
    const date_shift = useSelector(state => state.second_screen.date_shift)

    const [url_schedule, set_url_schedule] = useState(undefined)
    const [data_schedule, errors_schedule, loading_schedule] = useFetching(url_schedule)

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
        if (data_schedule !== null) {
            dispatch(setSSSchedule(data_schedule))
        }
    }, [dispatch, data_schedule])

}