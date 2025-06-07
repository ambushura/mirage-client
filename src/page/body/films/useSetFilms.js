import {useEffect, useState} from "react"
import {useFetchingArray} from "../../../hooks/common/useFetchingArray.js"
import {useDispatch, useSelector} from "react-redux"
import {setFilms} from "../../../redux/scheduleReducer.js"
import {ROUTE_CINEMA_FILMS_GET} from "../../../service/fetch_routes.js"

export function useSetFilms() {

    const dispatch = useDispatch()

    const [urls, set_urls] = useState([])
    const fetch_data = useFetchingArray(urls)

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)

    // Фильтры
    const seance_closed = useSelector(state => state.schedule.schedule_filters_seance_closed)
    const seance_canceled = useSelector(state => state.schedule.schedule_filters_seance_canceled)
    const seance_opened = useSelector(state => state.schedule.schedule_filters_seance_opened)
    const films_selected = useSelector(state => state.schedule.schedule_filters_films_selected)
    const film_copy_types_selected = useSelector(state => state.schedule.schedule_filters_film_copy_types_selected)
    const film_age = useSelector(state => state.schedule.schedule_filters_film_age)
    const halls_selected = useSelector(state => state.schedule.schedule_filters_halls_selected)
    const hall_type_vip = useSelector(state => state.schedule.schedule_filters_hall_type_vip)
    const hall_type_regular = useSelector(state => state.schedule.schedule_filters_hall_type_regular)
    const seance_time = useSelector(state => state.schedule.schedule_filters_time)
    const seance_price = useSelector(state => state.schedule.schedule_filters_price)
    const film_types_selected = useSelector(state => state.schedule.schedule_filters_film_types_selected)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined) {
            city.filials.forEach(current_filial => {
                urls_new.push({
                    filial: current_filial,
                    url: `http://${current_filial.ip}:${current_filial.port}${ROUTE_CINEMA_FILMS_GET}`,
                    params: {
                        date_shift: param_date,
                        closed: seance_closed,
                        canceled: seance_canceled,
                        opened: seance_opened,
                        films: films_selected.map(f => f.uid),
                        copy_types: film_copy_types_selected.map(f => f.uid),
                        age: film_age,
                        halls: halls_selected.map(f => f.uid),
                        hall_type_vip: hall_type_vip,
                        hall_type_regular: hall_type_regular,
                        time: seance_time,
                        price: seance_price,
                        film_types: film_types_selected.map(f => f.uid),
                    }
                })
            })
        } else if (city !== undefined && filial !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILMS_GET}`,
                params: {
                    date_shift: param_date,
                    closed: seance_closed,
                    canceled: seance_canceled,
                    opened: seance_opened,
                    films: films_selected.map(f => f.uid),
                    copy_types: film_copy_types_selected.map(f => f.uid),
                    age: film_age,
                    halls: halls_selected.map(f => f.uid),
                    hall_type_vip: hall_type_vip,
                    hall_type_regular: hall_type_regular,
                    time: seance_time,
                    price: seance_price,
                    film_types: film_types_selected.map(f => f.uid),
                }
            })
        }
        if (urls_new.length > 0) {
            set_urls(urls_new)
        }
    }, [city,
        filial,
        film_age,
        film_copy_types_selected,
        film_types_selected,
        films_selected,
        hall_type_regular,
        hall_type_vip,
        halls_selected,
        param_date,
        seance_canceled,
        seance_closed,
        seance_opened,
        seance_price,
        seance_time])

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