import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../../../../hooks/common/useFetching.js"
import {
    ROUTE_COMMON_DOCUMENTS_OPERATIONS_GET
} from "../../../../service/fetch_routes.js"

export function useSetOperations() {

    const filial = useSelector(state => state.data.filial)
    const page = useSelector(state => state.documents.operations.page)
    const [url_operations, set_url_operations] = useState(undefined)

    const [fetch_data_operations, fetch_errors_operations, fetch_loading_operations] = useFetching(url_operations)

    useEffect(() => {
        if (filial !== undefined) {
            set_url_operations({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_OPERATIONS_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        page: page,
                    }
                }
            )
        } else {
            set_url_operations(undefined)
        }
    }, [filial, page])

    return [fetch_data_operations, fetch_errors_operations, fetch_loading_operations]
}