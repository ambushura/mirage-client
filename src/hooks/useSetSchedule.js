import {useEffect, useState} from "react"
import {useFetchingArray} from "./useFetchingArray.js"

export function useSetSchedule(city, filial, param_date) {

    const [urls, set_urls] = useState([])
    const [fetch_data, fetch_errors, fetch_loading] = useFetchingArray(urls)
    const [data, set_data] = useState([])

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `http://${filial.ip}:${filial.port}/api/get_schedule_halls_seances?uid_filial=${filial.uid}&date_shift=${param_date}`
                })
            })
        } else if (city !== undefined && filial !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}/api/get_schedule_halls_seances?uid_filial=${filial.uid}&date_shift=${param_date}`
            })
        }
        set_urls(urls_new)
    }, [city, filial, param_date])

    useEffect(() => {
        const halls_seances = []
        fetch_data.forEach(filial_data => {
            if (filial_data.data !== null) {
                halls_seances.push({filial: filial_data.filial, hall_seances: filial_data.data})
            }
        })
        set_data(halls_seances)
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}