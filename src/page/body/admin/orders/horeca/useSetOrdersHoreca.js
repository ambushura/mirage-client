import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {setOrdersHoreca} from "../../../../../redux/ordersReducer.js"
import {useFetchingArray} from "../../../../../hooks/common/useFetchingArray.js"
import {ROUTE_COMMON_ORDER_FIND, ROUTE_HORECA_ORDERS_GET} from "../../../../../service/fetch_routes.js"

export function useSetOrdersHoreca() {

    const dispatch = useDispatch()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    const [urls_orders, set_urls_orders] = useState([])
    const fetch_data_orders = useFetchingArray(urls_orders)

    const page = useSelector(state => state.orders.orders_horeca_page)
    const staff_selected = useSelector(state => state.orders.orders_horeca_filters_staff_selected)
    const state_selected = useSelector(state => state.orders.orders_horeca_filters_state_selected)
    const halls_selected = useSelector(state => state.orders.orders_horeca_filters_halls_selected)
    const workplaces_selected = useSelector(state => state.orders.orders_horeca_filters_workplaces_selected)
    const kitchen_points_selected = useSelector(state => state.orders.orders_horeca_filters_kitchen_points_selected)
    const kitchen_state_selected = useSelector(state => state.orders.orders_horeca_filters_kitchen_state_selected)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const order_search_value = useSelector(state => state.orders.order_search_value)

    const update = useSelector(state => state.orders.orders_horeca_update)

    useEffect(() => {
        let urls_new = []
        if (order_search_value === null) {
            if (city !== undefined && filial !== undefined && param_date_admin !== undefined) {
                urls_new.push({
                    filial: filial,
                    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDERS_GET}`,
                    params: {
                        page: page,
                        date_shift: param_date_admin,
                        staff: staff_selected.map(({uid}) => uid),
                        state: state_selected.map(({uid}) => uid),
                        halls: halls_selected.map(({uid}) => uid),
                        workplaces: workplaces_selected.map(({uid}) => uid),
                        kitchen_points: kitchen_points_selected.map(({uid}) => uid),
                        kitchen_state: kitchen_state_selected.map(({uid}) => uid)
                    }
                })
            }
        } else {
            if (city !== undefined && filial !== undefined) {
                urls_new.push({
                    filial: filial,
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDER_FIND}`,
                    params: {
                        order_type: 'horeca',
                        value: order_search_value,
                    }
                })
            }
        }
        set_urls_orders(urls_new)
    }, [city, filial, param_date_admin, staff_selected, state_selected, halls_selected, workplaces_selected, kitchen_points_selected, kitchen_state_selected, page, update, order_search_value])

    useEffect(() => {
        if (fetch_data_orders.length > 0) {
            dispatch(setOrdersHoreca(fetch_data_orders))
        }
        return () => {
            dispatch(setOrdersHoreca([]))
        }
    }, [dispatch, fetch_data_orders])

}