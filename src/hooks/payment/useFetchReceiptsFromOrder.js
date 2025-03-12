import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"

export function useFetchReceiptsFromOrder(type) {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState(null)

    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)

    useEffect(() => {
        if (filial !== undefined) {
            set_url(`http://${filial.ip}:${filial.port}/api/get_receipts_from_order?&uid_order=${type === 'horeca' ? horder.uid : pre_order.uid}&type=${type}&time=${new Date().getMinutes()}-${new Date().getSeconds()}`)
        } else {
            set_url(undefined)
        }
    }, [filial, type, horder, pre_order])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data(null)
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}