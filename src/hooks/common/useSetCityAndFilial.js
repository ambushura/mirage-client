import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useFetching} from "./useFetching.js"
import {setCities, setCity, setFilial} from "../../redux/dataReducer.js"
import {ROUTE_COMMON_CITIES_GET, ROUTE_MAIN_HOST} from "../../service/fetch_routes.js"
import {common_settings_get} from "../../service/fetch_service.js"

export function useSetCityAndFilial() {

    const dispatch = useDispatch()

    const filial = structuredClone(ROUTE_MAIN_HOST)
    const [fetch_data, loading, error] = useFetching({
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_CITIES_GET}`,
        uid_filial: filial.uid,
        params: {}
    })
    const cities = useSelector(state => state.data.cities)
    const param_city = useSelector(state => state.interface.params.param_city)
    const param_filial = useSelector(state => state.interface.params.param_filial)
    const wp = useSelector(state => state.interface.wp)
    const settings = useSelector(state => state.data.settings)

    useEffect(() => {
        if (fetch_data !== null && !loading && error !== null) {
            dispatch(setCities(fetch_data))
        }
        return () => {
            dispatch(setCities([]))
        }
    }, [fetch_data, loading, error, dispatch])

    useEffect(() => {
        if (param_city !== undefined && param_filial !== undefined) {
            cities.forEach(city => {
                if (city.code === param_city) {
                    dispatch(setCity(city))
                    if (param_filial !== "all") {
                        const filial = city.filials.find(filial => filial.eais === param_filial)
                        dispatch(setFilial(filial))
                    }
                }
            })
        }
        return () => {
            dispatch(setFilial(undefined))
        }
    }, [dispatch, cities, param_city, param_filial])

    useEffect(() => {
        if (filial !== undefined && settings === null) {
            dispatch(common_settings_get(filial, wp))
        }
    }, [dispatch, filial, wp])
}