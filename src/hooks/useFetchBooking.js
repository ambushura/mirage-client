import {useEffect, useState} from "react"
import {useFetching} from "./useFetching.js"

export function useFetchBooking(city, filial, seance, order) {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState([])

    useEffect(() => {
        if (filial !== undefined && seance !== undefined && order !== undefined) {
            set_url(`http://${filial.ip}:${filial.port}/api/get_booking?uid_seance=${seance.uid}&uid_order=${order.uid}&time=${new Date().getMinutes()}-${new Date().getSeconds()}`)
        } else {
            set_url(undefined)
        }
    }, [city, filial, seance, order])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data([])
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}