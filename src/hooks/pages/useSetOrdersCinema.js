import {useEffect, useState} from "react"
import {useFetchingArray} from "../common/useFetchingArray.js"
import {useDispatch, useSelector} from "react-redux"
import {useFetching} from "../common/useFetching.js"
import {setOrdersCinema, setOrdersCinemaSchedule} from "../../redux/ordersReducer.js"

export function useSetOrdersCinema(update) {

    const dispatch = useDispatch()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    // Расписание филиалы-дата смены
    const [urls_schedule, set_urls_schedule] = useState([])
    const fetch_data_schedule = useFetchingArray(urls_schedule)

    // Заказы филиал-сеанс
    const [url_orders, set_url_orders] = useState('')
    const [fetch_data_orders, error_orders, loadind_orders] = useFetching(url_orders)

    const {current_filial, current_uid_seance} = useSelector(state => state.orders.orders_cinema_filial_seance)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined && param_date_admin !== undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `https://${filial.ip}/api/get_orders_schedule?uid_filial=${filial.uid}&date_shift=${param_date_admin}`,
                })
            })
        } else if (city !== undefined && filial !== null && param_date_admin !== undefined) {
            urls_new.push({
                filial: filial,
                url: `https://${filial.ip}/api/get_orders_schedule?uid_filial=${filial.uid}&date_shift=${param_date_admin}`
            })
        }
        set_urls_schedule(urls_new)
    }, [city, filial, param_date_admin, update])

    useEffect(() => {
        if (city !== undefined && current_filial !== null && current_uid_seance !== null) {
            set_url_orders(`https://${current_filial.ip}/api/get_orders_cinema?uid_filial=${current_filial.uid}&uid_seance=${current_uid_seance}`)
        }
    }, [city, current_filial, current_uid_seance, update])

    useEffect(() => {
        if (fetch_data_schedule.length > 0) {
            dispatch(setOrdersCinemaSchedule(fetch_data_schedule))
        }
        return () => {
            dispatch(setOrdersCinemaSchedule([]))
        }
    }, [dispatch, fetch_data_schedule])

    useEffect(() => {
        if (fetch_data_orders !== null) {
            dispatch(setOrdersCinema(fetch_data_orders))
        }
        return () => {
            dispatch(setOrdersCinema([]))
        }
    }, [dispatch, fetch_data_orders])

}