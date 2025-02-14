import {useEffect, useState} from "react"
import {useFetchingArray} from "./useFetchingArray.js"

export function useSetSchedule(city, filial, param_date) {

    const [urls, set_urls] = useState([])
    const fetch_data = useFetchingArray(urls)

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

    return fetch_data
}