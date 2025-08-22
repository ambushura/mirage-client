import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../../../../hooks/common/useFetching.js"
import {
    ROUTE_COMMON_DOCUMENTS_ZPINPADS_GET
} from "../../../../service/fetch_routes.js"

export function useSetZPinpads() {

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const {update} = useSelector(state => state.documents.zpinpads)
    const [url_zpinpads, set_url_zpinpads] = useState(undefined)

    const [fetch_data_zpinpads, fetch_errors_zpinpads, fetch_loading_zpinpads] = useFetching(url_zpinpads)

    useEffect(() => {
        if (filial !== undefined) {
            set_url_zpinpads({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_ZPINPADS_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        date_shift: param_date_admin,
                        update: update,
                    }
                }
            )
        } else {
            set_url_zpinpads(undefined)
        }
    }, [filial, param_date_admin, update])

    return [fetch_data_zpinpads, fetch_errors_zpinpads, fetch_loading_zpinpads]
}