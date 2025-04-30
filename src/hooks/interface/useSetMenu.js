import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"
import {useSelector} from "react-redux"
import {ROUTE_HORECA_MENU_GET} from "../../service/fetch_routes.js"

export function useSetMenu(uid_folder) {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState(undefined)

    const filial = useSelector(state => state.data.filial || {ip: '', port: ''})
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    useEffect(() => {
        if (filial !== undefined) {
            set_url(`http://${filial.ip}:${filial.port}${ROUTE_HORECA_MENU_GET}?uid_folder=${uid_folder}&uid_filial=${filial.uid}&date_shift=${param_date_admin}`)
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