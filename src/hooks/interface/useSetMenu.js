import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"
import {useSelector} from "react-redux"

export function useSetMenu(uid_folder) {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState(undefined)

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.data.param_date_admin)

    useEffect(() => {
        if (filial !== undefined) {
            set_url(`http://${filial.ip}:${filial.port}/api/horeca_get_menu?uid_folder=${uid_folder}&uid_filial=${filial.uid}&date_shift=${param_date_admin}`)
        } else {
            set_url(undefined)
        }
    }, [filial, uid_folder])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data(undefined)
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}