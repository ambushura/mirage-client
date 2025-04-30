import {useEffect, useState} from "react"
import {useFetchingArray} from "../common/useFetchingArray.js"
import {useDispatch, useSelector} from "react-redux"
import {setFilms} from "../../redux/scheduleReducer.js"
import {ROUTE_CINEMA_FILMS_GET} from "../../service/fetch_routes.js"

export function useSetFilms() {

    const dispatch = useDispatch()

    const [urls, set_urls] = useState([])
    const fetch_data = useFetchingArray(urls)

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILMS_GET}?uid_filial=${filial.uid}&date_shift=${param_date}`
                })
            })
        } else if (city !== undefined && filial !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILMS_GET}?uid_filial=${filial.uid}&date_shift=${param_date}`
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
            dispatch(setFilms(data_updated))
        }
        return () => {
            dispatch(setFilms([]))
        }
    }, [dispatch, fetch_data])

}