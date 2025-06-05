import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../../../hooks/common/useFetching.js"
import {ROUTE_CINEMA_FILTERS_FILMS_GET, ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET} from "../../../service/fetch_routes.js"
import {setScheduleFiltersFilms, setScheduleFiltersHalls} from "../../../redux/scheduleReducer.js"

export function useSetScheduleFilters() {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const [url_films, set_url_films] = useState(undefined)
    const [url_halls, set_url_halls] = useState(undefined)

    const [fetch_data_films, fetch_errors_films, fetch_loading_films] = useFetching(url_films)
    const [fetch_data_halls, fetch_errors_halls, fetch_loading_halls] = useFetching(url_halls)

    const param_date = useSelector(state => state.interface.params.param_date)

    useEffect(() => {
        if (filial !== undefined) {
            set_url_films({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILTERS_FILMS_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        date_shift: param_date
                    }
                }
            )
            set_url_halls({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        date_shift: param_date
                    }
                }
            )
        } else {
            set_url_halls(undefined)
            set_url_films(undefined)
        }
    }, [filial, param_date])

    useEffect(() => {
        if (fetch_data_films !== null) {
            dispatch(setScheduleFiltersFilms(fetch_data_films))
        }
        if (fetch_data_halls !== null) {
            dispatch(setScheduleFiltersHalls(fetch_data_halls))
        }
    }, [dispatch, fetch_data_films, fetch_data_halls])

}