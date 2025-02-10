import {useEffect, useState} from "react"
import {useFetchingArray} from "./useFetchingArray.js"

export function useSetFilms(city, filial, param_date) {

    const [urls, set_urls] = useState([])
    const [fetch_data, fetch_errors, fetch_loading] = useFetchingArray(urls)
    const [data, set_data] = useState([])

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `http://${filial.ip}:${filial.port}/api/get_films?uid_filial=${filial.uid}&date_shift=${param_date}`
                })
            })
        } else if (city !== undefined && filial !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}/api/get_films?uid_filial=${filial.uid}&date_shift=${param_date}`
            })
        }
        set_urls(urls_new)
    }, [city, filial, param_date])

    useEffect(() => {
        if (fetch_data.length !== 0) {
            let films_new = []
            fetch_data.forEach(filial => {
                if (filial.data !== null) {
                    filial.data.forEach(film_new => {
                        if (films_new.find(film => film.uid === film_new.uid) === undefined) {
                            films_new.push(film_new)
                        }
                    })
                }
            })
            set_data(films_new)
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}