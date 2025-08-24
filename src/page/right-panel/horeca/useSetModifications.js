import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../../../hooks/common/useFetching.js"
import {ROUTE_HORECA_MODIFICATIONS_GET} from "../../../service/fetch_routes.js"

export function useSetModifications(uid_menu, order_type) {

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)
    const [url_modifications, set_url_modifications] = useState(undefined)

    const [fetch_data_modifications, fetch_errors_modifications, fetch_loading_modifications] = useFetching(url_modifications)

    useEffect(() => {
        if (filial !== undefined && order_type === 'horeca') {
            set_url_modifications({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_MODIFICATIONS_GET}`,
                    uid_filial: filial.uid,
                    wp: wp,
                    params: {uid_menu}
                }
            )
        } else {
            set_url_modifications(undefined)
        }
    }, [filial, uid_menu, wp])

    return fetch_data_modifications
}