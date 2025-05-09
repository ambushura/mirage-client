import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"
import {
    ROUTE_CINEMA_DISCOUNTS_GET,
} from "../../service/fetch_routes.js"
import {useSelector} from "react-redux"

export function useFetchDiscounts() {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)

    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)

    useEffect(() => {
        if (filial !== undefined && pre_order.in_base && pre_order.uid_seance !== undefined) {
            set_url(`http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_GET}?&uid_seance=${pre_order.uid_seance}&time=${new Date().getMinutes()}-${new Date().getSeconds()}`)
        } else {
            set_url(undefined)
        }
    }, [filial, pre_order])

    return [fetch_data, fetch_errors, fetch_loading]
}