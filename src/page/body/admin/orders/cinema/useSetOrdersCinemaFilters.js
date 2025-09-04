import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {
    common_orders_filters_halls_get,
    common_orders_filters_schedule_get,
    common_orders_filters_staff_get,
    common_orders_filters_workplace_get
} from "../../../../../service/fetch_service.js"
import {
    setOrdersCinemaFiltersHalls,
    setOrdersCinemaFiltersSeances,
    setOrdersCinemaFiltersStaff,
    setOrdersHorecaFiltersWorkPlaces
} from "../../../../../redux/ordersReducer.js"
import dayjs from "dayjs"

export function useSetOrdersCinemaFilters() {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    useEffect(() => {
        const fetch_staff = async () => {
            const fetching_result = await dispatch(common_orders_filters_staff_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setOrdersCinemaFiltersStaff(fetching_result.data))
            }
        }
        const fetch_halls = async () => {
            const fetching_result = await dispatch(common_orders_filters_halls_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setOrdersCinemaFiltersHalls(fetching_result.data))
            }
        }
        const fetch_schedule = async () => {
            const fetching_result = await dispatch(common_orders_filters_schedule_get(filial, param_date_admin))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                const schedule = fetching_result.data.map(({seance}) => {
                    const beginning = dayjs(seance.beginning)
                    const ending = dayjs(seance.ending)
                    return {
                        uid: seance.uid,
                        title: `${beginning.format("HH:mm")} - ${ending.format("HH:mm")} • ${seance.copy_type} • ${seance.rate_age}+ • Зал ${seance.name_hall} • ${seance.name_film}${seance.content_type === "toKino!" ? " ТоКино!" : ""}`
                    }
                })
                dispatch(setOrdersCinemaFiltersSeances(schedule))
            }
        }
        const fetch_workplace = async () => {
            const fetching_result = await dispatch(common_orders_filters_workplace_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setOrdersHorecaFiltersWorkPlaces(fetching_result.data))
            }
        }
        if (filial !== undefined) {
            fetch_staff()
            fetch_halls()
            fetch_workplace()
            if (param_date_admin !== undefined) {
                fetch_schedule()
            }
        }
    }, [dispatch, filial, param_date_admin])

}