import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"
import {ROUTE_CINEMA_DISCOUNTS_GET, ROUTE_CINEMA_DISCOUNTS_GROUPS_GET,} from "../../service/fetch_routes.js"
import {useSelector} from "react-redux"

export function useFetchDiscounts() {

    const [url_discounts, set_url_discounts] = useState(undefined)
    const [url_discounts_groups, set_url_discounts_groups] = useState(undefined)
    const [fetch_data_discounts, fetch_errors_discounts, fetch_loading_discounts] = useFetching(url_discounts)
    const [fetch_data_discounts_groups, fetch_errors_discounts_groups, fetch_loading_discounts_groups] = useFetching(url_discounts_groups)

    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)

    useEffect(() => {
        if (filial !== undefined && pre_order.in_base && pre_order.uid_seance !== undefined) {
            set_url_discounts({
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_GET}`,
                uid_filial: filial.uid,
                params: {
                    uid_seance: pre_order.uid_seance
                }
            })
            set_url_discounts_groups({
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_GROUPS_GET}`,
                uid_filial: filial.uid,
                params: {}
            })
        } else {
            set_url_discounts(undefined)
            set_url_discounts_groups(undefined)
        }
    }, [filial, pre_order])

    return {
        discounts: [fetch_data_discounts, fetch_errors_discounts, fetch_loading_discounts],
        discounts_groups: [fetch_data_discounts_groups, fetch_errors_discounts_groups, fetch_loading_discounts_groups]
    }
}