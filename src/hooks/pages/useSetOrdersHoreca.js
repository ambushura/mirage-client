import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {setOrdersHoreca} from "../../redux/ordersReducer.js"
import {useFetchingArray} from "../common/useFetchingArray.js"

export function useSetOrdersHoreca(update) {

    const dispatch = useDispatch()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    const [urls_orders, set_urls_orders] = useState([])
    const fetch_data_orders = useFetchingArray(urls_orders)

    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined && param_date_admin !== undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `https://${filial.ip}/api/get_orders_horeca?uid_filial=${filial.uid}&date_shift=${param_date_admin}`,
                })
            })
        } else if (city !== undefined && filial !== null && param_date_admin !== undefined) {
            urls_new.push({
                filial: filial,
                url: `https://${filial.ip}/api/get_orders_horeca?uid_filial=${filial.uid}&date_shift=${param_date_admin}`
            })
        }
        set_urls_orders(urls_new)
    }, [city, filial, param_date_admin, update])

    useEffect(() => {
        if (fetch_data_orders.length > 0) {
            dispatch(setOrdersHoreca(fetch_data_orders))
        }
        return () => {
            dispatch(setOrdersHoreca([]))
        }
    }, [dispatch, fetch_data_orders])

}