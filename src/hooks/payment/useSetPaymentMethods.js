import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"

export function useSetPaymentMethods() {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState({uid_filial: undefined, uid_work_place: undefined, list: []})

    const filial = useSelector(state => state.data.filial)
    const name_workplace = useSelector(state => state.interface.search_params.wp)

    useEffect(() => {
        if (filial !== undefined && name_workplace !== undefined) {
            set_url(`http://${filial.ip}:8080/api/get_payment_methods?name_workplace=${name_workplace}&&uid_filial=${filial.uid}`)
        } else {
            set_url(undefined)
        }
    }, [filial, name_workplace])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data({uid_filial: undefined, uid_work_place: undefined, list: []})
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}