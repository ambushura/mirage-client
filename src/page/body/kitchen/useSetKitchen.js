import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetchingArray} from "../../../hooks/common/useFetchingArray.js"
import {ROUTE_HORECA_KITCHEN_GET} from "../../../service/fetch_routes.js"
import {setKitchenOrders} from "../../../redux/ordersReducer.js"
import {date_dayjs} from "../../../service/advanced.js"

export function useSetKitchen() {

    const dispatch = useDispatch()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    const [urls_orders, set_urls_orders] = useState([])
    const fetch_data_orders = useFetchingArray(urls_orders)

    useEffect(() => {
        const now = new Date()
        const date_shift = date_dayjs(
            now.getHours() >= 0 && now.getHours() < 7
                ? new Date(now.setDate(now.getDate() - 1))
                : now
        )
        let urls_new = []
        if (city !== undefined && filial === undefined && date_shift !== undefined) {
            city.filials.forEach(current_filial => {
                urls_new.push({
                    filial: current_filial,
                    url: `http://${current_filial.ip}:${current_filial.port}${ROUTE_HORECA_KITCHEN_GET}`,
                    params: {
                        date_shift: date_shift.format('YYYY-MM-DD'),
                    }
                })
            })
        } else if (city !== undefined && filial !== null && date_shift !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_KITCHEN_GET}`,
                params: {
                    date_shift: date_shift.format('YYYY-MM-DD'),
                }
            })
        }
        set_urls_orders(urls_new)
    }, [city, filial])

    useEffect(() => {
        if (fetch_data_orders.length > 0) {
            dispatch(setKitchenOrders(fetch_data_orders))
        }
        return () => {
            dispatch(setKitchenOrders([]))
        }
    }, [dispatch, fetch_data_orders])

}