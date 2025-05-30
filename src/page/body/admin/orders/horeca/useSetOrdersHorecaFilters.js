import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../../../../../hooks/common/useFetching.js"
import {
    setOrdersHorecaFiltersHalls,
    setOrdersHorecaFiltersKitchenPoints,
    setOrdersHorecaFiltersStaff, setOrdersHorecaFiltersWorkPlaces
} from "../../../../../redux/ordersReducer.js"
import {
    ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET, ROUTE_HORECA_ORDERS_FILTERS_KITCHENPOINTS_GET,
    ROUTE_COMMON_ORDERS_FILTERS_STAFF_GET, ROUTE_COMMON_ORDERS_FILTERS_WORKPLACES_GET
} from "../../../../../service/fetch_routes.js"

export function useSetOrdersHorecaFilters() {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const [url_staff, set_url_staff] = useState(undefined)
    const [url_halls, set_url_halls] = useState(undefined)
    const [url_workplaces, set_url_workplaces] = useState(undefined)
    const [url_kitchen_points, set_url_kitchen_points] = useState(undefined)

    const [fetch_data_staff, fetch_errors_staff, fetch_loading_staff] = useFetching(url_staff)
    const [fetch_data_halls, fetch_errors_halls, fetch_loading_halls] = useFetching(url_halls)
    const [fetch_data_workplaces, fetch_errors_workplaces, fetch_loading_workplaces] = useFetching(url_workplaces)
    const [fetch_data_kitchen_points, fetch_errors_kitchen_points, fetch_loading_kitchen_points] = useFetching(url_kitchen_points)

    useEffect(() => {
        if (filial !== undefined) {
            set_url_staff({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_STAFF_GET}`,
                    uid_filial: filial.uid,
                    params: {}
                }
            )
            set_url_halls({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET}`,
                    uid_filial: filial.uid,
                    params: {}
                }
            )
            set_url_workplaces({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_WORKPLACES_GET}`,
                    uid_filial: filial.uid,
                    params: {}
                }
            )
            set_url_kitchen_points({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDERS_FILTERS_KITCHENPOINTS_GET}`,
                    uid_filial: filial.uid,
                    params: {}
                }
            )
        } else {
            set_url_staff(undefined)
            set_url_halls(undefined)
            set_url_workplaces(undefined)
            set_url_kitchen_points(undefined)
        }
    }, [filial])

    useEffect(() => {
        if (fetch_data_staff !== null) {
            dispatch(setOrdersHorecaFiltersStaff(fetch_data_staff))
        }
        if (fetch_data_halls !== null) {
            dispatch(setOrdersHorecaFiltersHalls(fetch_data_halls))
        }
        if (fetch_data_workplaces !== null) {
            dispatch(setOrdersHorecaFiltersWorkPlaces(fetch_data_workplaces))
        }
        if (fetch_data_kitchen_points !== null) {
            dispatch(setOrdersHorecaFiltersKitchenPoints(fetch_data_kitchen_points))
        }
    }, [dispatch, fetch_data_staff, fetch_data_halls, fetch_data_workplaces, fetch_data_kitchen_points])
}