import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
    common_orders_filters_halls_get,
    common_orders_filters_staff_get,
    common_orders_filters_workplace_get,
    horeca_orders_filters_kitchen_points_get,
} from '../../../../../../../service/fetch_service.js'
import {
    setOrdersHorecaFiltersHalls,
    setOrdersHorecaFiltersKitchenPoints,
    setOrdersHorecaFiltersStaff,
    setOrdersHorecaFiltersWorkPlaces,
} from '../../../../../../../redux/desktop/frontoffice/ordersReducer.js'

export function useSetOrdersHorecaFilters() {
    const dispatch = useDispatch()
    const filial = useSelector((state) => state.data.filial)

    useEffect(() => {
        const fetch_staff = async () => {
            const fetching_result = await dispatch(common_orders_filters_staff_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setOrdersHorecaFiltersStaff(fetching_result.data))
            }
        }
        const fetch_halls = async () => {
            const fetching_result = await dispatch(common_orders_filters_halls_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setOrdersHorecaFiltersHalls(fetching_result.data))
            }
        }
        const fetch_workplace = async () => {
            const fetching_result = await dispatch(common_orders_filters_workplace_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setOrdersHorecaFiltersWorkPlaces(fetching_result.data))
            }
        }
        const fetch_kitchen_points = async () => {
            const fetching_result = await dispatch(horeca_orders_filters_kitchen_points_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setOrdersHorecaFiltersKitchenPoints(fetching_result.data))
            }
        }
        if (filial !== undefined) {
            fetch_staff()
            fetch_halls()
            fetch_workplace()
            fetch_kitchen_points()
        }
    }, [dispatch, filial])
}
