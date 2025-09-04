import {useEffect, useState} from "react"
import {useFetchingArray} from "../../../service/useFetchingArray.js"
import {useDispatch, useSelector} from "react-redux"
import {setFilm} from "../../../redux/scheduleReducer.js"
import {ROUTE_CINEMA_FILM_GET_SEANCES} from "../../../service/fetch_routes.js"

export function useSetFilm() {

    const dispatch = useDispatch()

    const [urls, set_urls] = useState([])
    const fetch_data = useFetchingArray(urls)

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)
    const uid_film = useSelector(state => state.interface.params.uid_film)

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
        if (city !== undefined && filial === undefined && uid_film !== undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `http://${filial.ip}:${filial.port}/${ROUTE_CINEMA_FILM_GET_SEANCES}`,
                    params: {
                        date_shift: param_date,
                        uid_film: uid_film,
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
        } else if (city !== undefined && filial !== undefined && uid_film !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILM_GET_SEANCES}`,
                params: {
                    date_shift: param_date,
                    uid_film: uid_film,
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
        set_urls(urls_new)
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
        seance_time,
        uid_film])

    useEffect(() => {
        let film_new = undefined
        fetch_data.forEach(filial_data => {
            if (filial_data.data !== null) {
                film_new = filial_data.data.film
            }
        })
        dispatch(setFilm({film: film_new, data: fetch_data}))
        return () => {
            dispatch(setFilm({film: undefined, data: []}))
        }
    }, [fetch_data])

}