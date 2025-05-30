import {useEffect, useState} from "react"
import {useFetchingArray} from "../../../hooks/common/useFetchingArray.js"
import {useDispatch, useSelector} from "react-redux"
import {setSchedule} from "../../../redux/scheduleReducer.js"
import {ROUTE_CINEMA_SCHEDULE_GET_HALLS} from "../../../service/fetch_routes.js"

export function useSetSchedule() {

    const dispatch = useDispatch()

    const [urls, set_urls] = useState([])
    const fetch_data = useFetchingArray(urls)

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined && param_date !== undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SCHEDULE_GET_HALLS}`,
                    params: {
                        date_shift: param_date,
                    }
                })
            })
        } else if (city !== undefined && filial !== undefined && param_date !== undefined) {
            urls_new.push({
                filial: filial,
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SCHEDULE_GET_HALLS}`,
                params: {
                    date_shift: param_date,
                }
            })
        }
        set_urls(urls_new)
    }, [city, filial, param_date])

    useEffect(() => {
        dispatch(setSchedule(fetch_data))
        return () => {
            dispatch(setSchedule([]))
        }
    }, [dispatch, fetch_data])

}