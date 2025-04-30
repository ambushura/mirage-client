import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"
import {useSelector} from "react-redux"
import {ROUTE_CINEMA_SEANCE_GET_BOOKING} from "../../service/fetch_routes.js"

export function useFetchBooking() {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState([])

    const filial = useSelector(state => state.data.filial)
    const seance = useSelector(state => state.schedule.seance)
    const pre_order = useSelector(state => state.orders.pre_order)

    useEffect(() => {
        if (filial !== undefined && seance !== undefined && pre_order !== undefined) {
            set_url(`http://${filial.ip}${filial.port}${ROUTE_CINEMA_SEANCE_GET_BOOKING}?uid_seance=${seance.uid}&uid_order=${pre_order.uid}&time=${new Date().getMinutes()}-${new Date().getSeconds()}`)
        } else {
            set_url(undefined)
        }
    }, [filial, seance, pre_order])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data([])
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}