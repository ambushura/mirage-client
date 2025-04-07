import {useEffect, useState} from "react"
import {useFetchingArray} from "../common/useFetchingArray.js"
import {useSelector} from "react-redux"

export function useFetchOrdersCinema() {

    const [urls, set_urls] = useState([])
    const fetch_data = useFetchingArray(urls)

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined && param_date_admin !== undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `http://${filial.ip}:${filial.port}/api/get_orders_cinema?uid_filial=${filial.uid}&date_shift=${param_date_admin}`
                })
            })
        } else if (city !== undefined && filial !== undefined && param_date_admin !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}/api/get_orders_cinema?uid_filial=${filial.uid}&date_shift=${param_date_admin}`
            })
        }
        set_urls(urls_new)
    }, [city, filial, param_date_admin])

    return fetch_data
}