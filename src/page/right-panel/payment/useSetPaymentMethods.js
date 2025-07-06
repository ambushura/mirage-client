import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../../../hooks/common/useFetching.js"
import {ROUTE_COMMON_PAYMENT_METHODS_GET} from "../../../service/fetch_routes.js"

export function useSetPaymentMethods(uid_order, type) {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState({uid_filial: undefined, uid_work_place: undefined, list: []})

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    useEffect(() => {
        if (filial !== undefined && wp !== undefined) {
            set_url({
                url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_PAYMENT_METHODS_GET}`,
                uid_filial: filial.uid,
                params: {
                    uid_order: uid_order,
                    type: type
                }
            })
        } else {
            set_url(undefined)
        }
    }, [filial, wp])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        } else {
            set_data({uid_filial: undefined, uid_work_place: undefined, list: []})
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}