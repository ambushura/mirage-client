import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { common_cities_filials_get } from '../../service/fetch_service.js'
import { setCities, setCity, setFilial } from '../../redux/mobile/frontoffice/frontMobileSlice.js'
import { useParams } from 'react-router-dom'

export default function useSetCityAndFilial() {
    const dispatch = useDispatch()
    const params = useParams()

    const { cities, city } = useSelector((state) => state.front_mobile)

    const param_city = params?.param_city
    const param_filial = params?.param_filial

    useEffect(() => {
        const fetchCities = async () => {
            const res = await dispatch(common_cities_filials_get())
            if (res.error === null && !res.loading) {
                dispatch(setCities(res.data))
            }
        }

        if (cities.length === 0) {
            fetchCities()
            return
        }

        if (param_city) {
            const foundCity = cities.find((c) => c.code === param_city)
            if (foundCity) dispatch(setCity(foundCity))
        }

        if (param_filial && city) {
            const foundFilial = city.filials.find((f) => f.eais === param_filial)
            if (foundFilial) dispatch(setFilial(foundFilial))
        }
    }, [dispatch, cities, city, param_city, param_filial])
}
