import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"
import {
    ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET,
    ROUTE_COMMON_ORDERS_FILTERS_STAFF_GET,
    ROUTE_COMMON_ORDERS_FILTERS_WORKPLACES_GET,
    ROUTE_CINEMA_ORDERS_FILTERS_STAFF_GET
} from "../../service/fetch_routes.js"
import {
    setOrdersCinemaFiltersHalls, setOrdersCinemaFiltersSeances,
    setOrdersCinemaFiltersStaff, setOrdersCinemaFiltersWorkplaces,
} from "../../redux/ordersReducer.js"
import dayjs from "dayjs"

export function useSetOrdersCinemaFilters() {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const [url_staff, set_url_staff] = useState(undefined)
    const [url_seances, set_url_seances] = useState(undefined)
    const [url_halls, set_url_halls] = useState(undefined)
    const [url_workplaces, set_url_workplaces] = useState(undefined)

    const [fetch_data_staff, fetch_errors_staff, fetch_loading_staff] = useFetching(url_staff)
    const [fetch_data_seances, fetch_errors_seances, fetch_loading_seances] = useFetching(url_seances)
    const [fetch_data_halls, fetch_errors_halls, fetch_loading_halls] = useFetching(url_halls)
    const [fetch_data_workplaces, fetch_errors_workplaces, fetch_loading_workplaces] = useFetching(url_workplaces)

    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    useEffect(() => {
        if (filial !== undefined) {
            set_url_staff({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_STAFF_GET}`,
                    uid_filial: filial.uid,
                    params: {}
                }
            )
            set_url_seances({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDERS_FILTERS_STAFF_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        date_shift: param_date_admin
                    }
                }
            )
            set_url_halls({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET}`,
                    uid_filial: filial.uid,
                    params: {}
                }
            )
            set_url_workplaces({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_WORKPLACES_GET}`,
                    uid_filial: filial.uid,
                    params: {}
                }
            )
        } else {
            set_url_staff(undefined)
            set_url_seances(undefined)
            set_url_halls(undefined)
            set_url_workplaces(undefined)
        }
    }, [filial, param_date_admin])


    useEffect(() => {
        if (fetch_data_staff !== null) {
            dispatch(setOrdersCinemaFiltersStaff(fetch_data_staff))
        }
        if (fetch_data_seances !== null) {
            const schedule = []
            fetch_data_seances.forEach(seance_data => {
                const seance = seance_data.seance
                const beginning = dayjs(seance_data.seance.beginning)
                const ending = dayjs(seance_data.seance.ending)
                schedule.push({
                    uid: seance.uid,
                    title: `${String(beginning.$H).padStart(2, '0')}:${String(beginning.$m).padStart(2, '0')} - ${String(ending.$H).padStart(2, '0')}:${String(ending.$m).padStart(2, '0')} • ${seance.copy_type} • ${seance.rate_age}+  • Зал ${seance.name_hall} • ${seance.name_film} ${seance.content_type === 'toKino!' ? 'ТоКино!' : ''}`
                })
            })
            dispatch(setOrdersCinemaFiltersSeances(schedule))
        }
        if (fetch_data_halls !== null) {
            dispatch(setOrdersCinemaFiltersHalls(fetch_data_halls))
        }
        if (fetch_data_workplaces !== null) {
            dispatch(setOrdersCinemaFiltersWorkplaces(fetch_data_workplaces))
        }
    }, [dispatch, fetch_data_staff, fetch_data_halls, fetch_data_workplaces, fetch_data_seances])
}