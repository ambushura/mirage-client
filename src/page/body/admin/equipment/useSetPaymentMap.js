import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../../../../hooks/common/useFetching.js"
import {ROUTE_COMMON_PAYMENT_MAP_GET} from "../../../../service/fetch_routes.js"

export function useSetPaymentMap() {

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const [url_payment_map, set_url_payment_map] = useState(undefined)

    const [fetch_data_payment_map, fetch_errors_payment_map, fetch_loading_payment_map] = useFetching(url_payment_map)

    useEffect(() => {
        if (filial !== undefined) {
            set_url_payment_map({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_PAYMENT_MAP_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        date_shift: param_date_admin,
                    }
                }
            )
        } else {
            set_url_payment_map(undefined)
        }
    }, [filial, param_date_admin])

    return fetch_data_payment_map
}