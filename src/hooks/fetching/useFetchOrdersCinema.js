import {useEffect, useState} from "react"
import {useFetchingArray} from "../common/useFetchingArray.js"
import {useDispatch, useSelector} from "react-redux"
import {setOrdersCinema} from "../../redux/ordersReducer.js"

export function useFetchOrdersCinema() {

    const dispatch = useDispatch()
    const [urls, set_urls] = useState([])
    const fetch_data = useFetchingArray(urls)

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const {uid_seance} = useSelector(state => state.orders.orders_cinema_filial_seance)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined && param_date_admin !== undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `http://${filial.ip}:${filial.port}/api/get_orders_cinema?uid_filial=${filial.uid}&date_shift=${param_date_admin}${uid_seance !== null ? '&uid_seance=' + uid_seance : ''}`,
                })
            })
        } else if (city !== undefined && filial !== undefined && param_date_admin !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}/api/get_orders_cinema?uid_filial=${filial.uid}&date_shift=${param_date_admin}${uid_seance !== null ? '&uid_seance=' + uid_seance : ''}`
            })
        }
        set_urls(urls_new)
    }, [city, filial, param_date_admin, uid_seance])

    useEffect(() => {
        if (fetch_data.length > 0) {
            dispatch(setOrdersCinema(structuredClone(fetch_data)))
        }
        return () => {
            dispatch(setOrdersCinema([]))
        }
    }, [dispatch, fetch_data])
}