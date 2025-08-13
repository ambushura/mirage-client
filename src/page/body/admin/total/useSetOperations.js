import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../../../../hooks/common/useFetching.js"
import {
    ROUTE_COMMON_DOCUMENTS_OPERATIONS_GET
} from "../../../../service/fetch_routes.js"

export function useSetOperations() {

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const [url_operations, set_url_operations] = useState(undefined)

    const [fetch_data_operations, fetch_errors_operations, fetch_loading_operations] = useFetching(url_operations)

    useEffect(() => {
        if (filial !== undefined) {
            set_url_operations({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_OPERATIONS_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        date_shift: param_date_admin,
                    }
                }
            )
        } else {
            set_url_operations(undefined)
        }
    }, [filial, param_date_admin])

    return [fetch_data_operations, fetch_errors_operations, fetch_loading_operations]
}