import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"
import {useSelector} from "react-redux"

export function useFetchSeance() {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState(undefined)

    const filial = useSelector(state => state.data.filial)
    const uid_seance = useSelector(state => state.interface.params.uid_seance)

    useEffect(() => {
        if (filial !== undefined) {
            set_url(`https://${filial.ip}/api/get_seance?uid_seance=${uid_seance}`)
        } else {
            set_url(undefined)
        }
    }, [filial, uid_seance])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data(undefined)
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}