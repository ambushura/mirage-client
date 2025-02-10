import {useEffect, useState} from "react"
import {useFetching} from "./useFetching.js"

export function useFetchSeance(city, filial, uid_seance) {

    const [url, set_url] = useState('')
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState(undefined)

    useEffect(() => {
        if (filial !== undefined) {
            set_url(`http://${filial.ip}:${filial.port}/api/get_seance?uid_seance=${uid_seance}`)
        }
    }, [filial, uid_seance])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}