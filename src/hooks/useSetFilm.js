import {useEffect, useState} from "react"
import {useFetchingArray} from "./useFetchingArray.js"

export function useSetFilm(city, filial, param_date, uid_film) {

    const [urls, set_urls] = useState([])
    const fetch_data = useFetchingArray(urls)
    const [film, set_film] = useState(undefined)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `http://${filial.ip}:${filial.port}/api/get_film_seances?uid_filial=${filial.uid}&date_shift=${param_date}&uid_film=${uid_film}`
                })
            })
        } else if (city !== undefined && filial !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}/api/get_film_seances?uid_filial=${filial.uid}&date_shift=${param_date}&uid_film=${uid_film}`
            })
        }
        set_urls(urls_new)
    }, [city, filial, param_date, uid_film])

    useEffect(() => {
        let film_new = undefined
        fetch_data.forEach(filial_data => {
            if (filial_data.data !== null) {
                film_new = filial_data.data.film
             }
        })
        set_film(film_new)
    }, [fetch_data])

    return [film, fetch_data]
}