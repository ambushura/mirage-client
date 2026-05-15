import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setScheduleFiltersFilms, setScheduleFiltersHalls } from '../../../../redux/desktop/frontoffice/scheduleReducer.js'
import { cinema_halls_filters_get, cinema_schedule_filters_get } from '../../../../service/fetch_service.js'

export function useSetScheduleFilters() {
    const dispatch = useDispatch()
    const filial = useSelector((state) => state.data.filial)
    const param_date = useSelector((state) => state.interface.params.param_date)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result_schedule = await dispatch(cinema_schedule_filters_get(filial, param_date))
            if (fetching_result_schedule.loading) {
                // TODO Загрузка расписания
            } else if (fetching_result_schedule.data !== null) {
                dispatch(setScheduleFiltersFilms(fetching_result_schedule.data))
            }
            const fetching_result_halls = await dispatch(cinema_halls_filters_get(filial, param_date))
            if (fetching_result_halls.loading) {
                // TODO Загрузка залов
            } else if (fetching_result_halls.data !== null) {
                dispatch(setScheduleFiltersHalls(fetching_result_halls.data))
            }
        }
        fetch()
    }, [dispatch, filial, param_date])
}
