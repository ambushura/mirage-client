import {useEffect, useState} from "react"
import {useFetching} from "./useFetching.js"

export function useSetMenu(city, filial, uid_folder) {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState(undefined)

    useEffect(() => {
        if (filial !== undefined) {
            set_url(`http://${filial.ip}:${filial.port}/api/get_menu?uid_folder=${uid_folder}&&uid_filial=${filial.uid}`)
        } else {
            set_url(undefined)
        }
    }, [city, filial, uid_folder])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data(undefined)
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}