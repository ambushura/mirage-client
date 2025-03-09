import {useEffect, useState} from "react"
import {useFetchingArray} from "../common/useFetchingArray.js"
import {useSelector} from "react-redux"

export function useSetFilms() {

    const [urls, set_urls] = useState([])
    const fetch_data = useFetchingArray(urls)
    const [data, set_data] = useState([])

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)

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
        if (urls_new.length > 0) {
            set_urls(urls_new)
        }
    }, [city, filial, param_date])

    useEffect(() => {
        if (fetch_data.length !== 0) {
            let data_updated = []
            fetch_data.forEach(filial => {
                if (filial.data !== null) {
                    filial.data.forEach(film_new => {
                        if (data_updated.find(film => film.uid === film_new.uid) === undefined) {
                            data_updated.push(film_new)
                        }
                    })
                }
            })
            set_data(data_updated)
        }
        return () => {
            set_data([])
        }
    }, [fetch_data])

    return data
}