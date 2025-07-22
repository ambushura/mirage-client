import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {ROUTE_CINEMA_HALL_GET} from "../../../../service/fetch_routes.js"
import {useFetching} from "../../../../hooks/common/useFetching.js"

export function useSetHall() {

    const filial = useSelector(state => state.data.filial)
    const uid_hall = useSelector(state => state.halls.uid_hall)

    const [url_hall, set_url_hall] = useState(undefined)

    const [fetch_data_hall, fetch_errors_hall, fetch_loading_hall] = useFetching(url_hall)

    useEffect(() => {
        if (filial !== undefined && uid_hall !== null) {
            set_url_hall({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_HALL_GET}`,
                    uid_filial: filial.uid,
                    params: {uid_hall: uid_hall}
                }
            )
        } else {
            set_url_hall(undefined)
        }
    }, [filial, uid_hall])

    return fetch_data_hall
}