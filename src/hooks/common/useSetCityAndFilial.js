import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useFetching} from "./useFetching.js"
import {HOST} from "../../redux/index.js"
import {setCities, setCity, setFilial} from "../../redux/dataReducer.js"

export function useSetCityAndFilial() {

    const dispatch = useDispatch()
    const [fetch_data, loading, error] = useFetching(`http://${HOST}/api/get_cities`)
    const cities = useSelector(state => state.data.cities)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_city = useSelector(state => state.interface.params.param_city)
    const param_filial = useSelector(state => state.interface.params.param_filial)

    useEffect(() => {
        if (fetch_data !== null && !loading && error !== null) {
            if (cities.length === 0) {
                dispatch(setCities(fetch_data))
            }
            if (param_city !== undefined && param_filial !== undefined) {
                if (city === undefined || filial === undefined) {
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
            }
        }
        return () => {
            dispatch(setFilial(undefined))
        }
    }, [dispatch, cities, fetch_data, param_city, param_filial])
}