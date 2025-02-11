import {useEffect, useState} from "react"
import {useFetching} from "./useFetching.js"

export function useFetchOrder(city, filial, order) {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, ] = useFetching(url)
    const [data, set_data] = useState(undefined)

    useEffect(() => {
        if (filial !== undefined && order !== undefined) {
            set_url(`http://${filial.ip}:${filial.port}/api/get_preorder?uid_order=${order.uid}`)
        } else {
            set_url(undefined)
        }
    }, [city, filial, order])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data(undefined)
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_errors]
}