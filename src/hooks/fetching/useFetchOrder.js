import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"
import {useSelector} from "react-redux"

export function useFetchOrder() {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors,] = useFetching(url)
    const [data, set_data] = useState(undefined)

    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.data.pre_order)

    useEffect(() => {
        if (filial !== undefined && pre_order !== undefined) {
            set_url(`http://${filial.ip}:${filial.port}/api/get_preorder?uid_order=${pre_order.uid}`)
        } else {
            set_url(undefined)
        }
    }, [filial, pre_order])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data(undefined)
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_errors]
}