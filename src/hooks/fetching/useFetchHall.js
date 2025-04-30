import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useFetching} from "../common/useFetching.js"
import {ROUTE_CINEMA_HALL_GET} from "../../service/fetch_routes.js"

export function useFetchHall() {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState(undefined)

    const filial = useSelector(state => state.data.filial)
    const halls = useSelector(state => state.halls.halls)
    const seance = useSelector(state => state.schedule.seance)

    useEffect(() => {
        const hall = halls.find(hall => hall.uid === seance.uid_hall)
        if (hall === undefined) {
            if (filial !== undefined && seance !== undefined) {
                set_url(`http://${filial.ip}:${filial.port}${ROUTE_CINEMA_HALL_GET}?uid_hall=${seance.uid_hall}`)
            } else {
                set_url(undefined)
            }
        } else {
            set_data(hall)
        }
    }, [filial, halls, seance])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data(undefined)
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}