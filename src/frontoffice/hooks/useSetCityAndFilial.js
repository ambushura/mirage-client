import {useDispatch, useSelector} from 'react-redux'
import {setCities, setCity, setFilial} from '../../redux/dataReducer.js'
import {common_cities_filials_get} from '../../service/fetch_service.js'
import {useEffect} from 'react'

export function useSetCityAndFilial() {
    const dispatch = useDispatch()
    const param_city = useSelector((state) => state.interface.params.param_city)
    const param_filial = useSelector((state) => state.interface.params.param_filial)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_cities_filials_get())
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.data !== null) {
                dispatch(setCities(fetching_result.data))
                fetching_result.data.forEach((city) => {
                    if (city.code === param_city) {
                        dispatch(setCity(city))
                        if (param_filial === 'all') {
                            dispatch(setFilial(undefined))
                        } else {
                            const filial = city.filials.find((filial) => filial.eais === param_filial)
                            dispatch(setFilial(filial))
                        }
                    }
                })
            }
        }
        fetch()
    }, [dispatch, param_city, param_filial])
}
