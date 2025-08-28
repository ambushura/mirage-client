import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {ROUTE_CINEMA_SECOND_SCREEN_GET} from "../../../service/fetch_routes.js"
import {useFetching} from "../../../hooks/common/useFetching.js"

export function useSetSecondScreen() {

    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)

    const [url_schedule, set_url_schedule] = useState(undefined)
    const [fetch_data_schedule, fetch_errors_schedule, fetch_loading_schedule] = useFetching(url_schedule)

    useEffect(() => {
        if (filial !== undefined) {
            set_url_schedule({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SECOND_SCREEN_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        date_shift: param_date
                    }
                }
            )
        } else {
            set_url_schedule(undefined)
        }
    }, [filial])

    return fetch_data_schedule
}