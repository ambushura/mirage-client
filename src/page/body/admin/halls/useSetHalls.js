import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET} from "../../../../service/fetch_routes.js"
import {useFetching} from "../../../../hooks/common/useFetching.js"

export function useSetHalls() {

    const filial = useSelector(state => state.data.filial)

    const [url_halls, set_url_halls] = useState(undefined)

    const [fetch_data_halls, fetch_errors_halls, fetch_loading_halls] = useFetching(url_halls)

    useEffect(() => {
        if (filial !== undefined) {
            set_url_halls({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET}`,
                    uid_filial: filial.uid,
                }
            )
        } else {
            set_url_halls(undefined)
        }
    }, [filial])

    return fetch_data_halls
}