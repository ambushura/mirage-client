import {useEffect, useState} from "react"
import {useFetchingArray} from "../common/useFetchingArray.js"
import {useDispatch, useSelector} from "react-redux"
import {
    ROUTE_CINEMA_ORDERS_GET
} from "../../service/fetch_routes.js"
import {setOrdersCinema} from "../../redux/ordersReducer.js"

export function useSetOrdersCinema() {

    const dispatch = useDispatch()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    const [urls_orders, set_urls_orders] = useState([])
    const fetch_data_orders = useFetchingArray(urls_orders)

    const page = useSelector(state => state.orders.orders_cinema_page)
    const staff_selected = useSelector(state => state.orders.orders_cinema_filters_staff_selected)
    const state_selected = useSelector(state => state.orders.orders_cinema_filters_state_selected)
    const seances_selected = useSelector(state => state.orders.orders_cinema_filters_seances_selected)
    const halls_selected = useSelector(state => state.orders.orders_cinema_filters_halls_selected)
    const workplaces_selected = useSelector(state => state.orders.orders_cinema_filters_workplaces_selected)
    const buyer_emails_selected = useSelector(state => state.orders.orders_cinema_filters_buyer_emails_selected)
    const buyer_phone_numbers_selected = useSelector(state => state.orders.orders_cinema_filters_buyer_phone_numbers_selected)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    const update = useSelector(state => state.orders.orders_cinema_update)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined && param_date_admin !== undefined) {
            city.filials.forEach(current_filial => {
                urls_new.push({
                    filial: filial,
                    url: `http://${current_filial.ip}:${current_filial.port}${ROUTE_CINEMA_ORDERS_GET}`,
                    params: {
                        page: page,
                        date_shift: param_date_admin,
                        staff: staff_selected.map(({uid}) => uid),
                        state: state_selected.map(({uid}) => uid),
                        halls: halls_selected.map(({uid}) => uid),
                        seances: seances_selected.map(({uid}) => uid),
                        workplaces: workplaces_selected.map(({uid}) => uid),
                        buyer_phone_number: buyer_phone_numbers_selected,
                        buyer_emails: buyer_emails_selected
                    }
                })
            })
        } else if (city !== undefined && filial !== null && param_date_admin !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDERS_GET}`,
                params: {
                    page: page,
                    date_shift: param_date_admin,
                    staff: staff_selected.map(({uid}) => uid),
                    state: state_selected.map(({uid}) => uid),
                    halls: halls_selected.map(({uid}) => uid),
                    seances: seances_selected.map(({uid}) => uid),
                    workplaces: workplaces_selected.map(({uid}) => uid),
                    buyer_phone_number: buyer_phone_numbers_selected,
                    buyer_emails: buyer_emails_selected
                }
            })
        }
        set_urls_orders(urls_new)
    }, [city, filial, param_date_admin, staff_selected, state_selected, seances_selected, halls_selected, workplaces_selected, page, buyer_phone_numbers_selected, buyer_emails_selected, update])

    useEffect(() => {
        if (fetch_data_orders.length > 0) {
            dispatch(setOrdersCinema(fetch_data_orders))
        }
        return () => {
            dispatch(setOrdersCinema([]))
        }
    }, [dispatch, fetch_data_orders])

}