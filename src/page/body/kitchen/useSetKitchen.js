import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetchingArray} from "../../../service/useFetchingArray.js"
import {ROUTE_HORECA_KITCHEN_GET} from "../../../service/fetch_routes.js"
import {setKitchenOrders} from "../../../redux/ordersReducer.js"

export function useSetKitchen() {

    const dispatch = useDispatch()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    const [urls_orders, set_urls_orders] = useState([])
    const fetch_data_orders = useFetchingArray(urls_orders)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined && param_date_admin !== undefined) {
            city.filials.forEach(current_filial => {
                urls_new.push({
                    filial: current_filial,
                    url: `http://${current_filial.ip}:${current_filial.port}${ROUTE_HORECA_KITCHEN_GET}`,
                    params: {
                        date_shift: param_date_admin,
                    }
                })
            })
        } else if (city !== undefined && filial !== null && param_date_admin !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_KITCHEN_GET}`,
                params: {
                    date_shift: param_date_admin,
                }
            })
        }
        set_urls_orders(urls_new)
    }, [city, filial, param_date_admin])

    useEffect(() => {
        if (fetch_data_orders.length > 0) {
            dispatch(setKitchenOrders(fetch_data_orders))
        }
        return () => {
            dispatch(setKitchenOrders([]))
        }
    }, [dispatch, fetch_data_orders])

}