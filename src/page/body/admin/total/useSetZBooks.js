import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useFetching} from "../../../../hooks/common/useFetching.js";
import {ROUTE_COMMON_DOCUMENTS_ZBOOKS_GET, ROUTE_COMMON_PAYMENT_MAP_GET} from "../../../../service/fetch_routes.js";

export function useSetZBooks() {

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const [url_zbooks, set_url_zbooks] = useState(undefined)

    const [fetch_data_zbooks, fetch_errors_zbooks, fetch_loading_zbooks] = useFetching(url_zbooks)

    useEffect(() => {
        if (filial !== undefined) {
            set_url_zbooks({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_ZBOOKS_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        date_shift: param_date_admin,
                    }
                }
            )
        } else {
            set_url_zbooks(undefined)
        }
    }, [filial, param_date_admin])

    return [fetch_data_zbooks, fetch_errors_zbooks, fetch_loading_zbooks]
}