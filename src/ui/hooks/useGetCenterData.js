import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setFilials, setOrganizations, setParams, setSearchParams } from '../../redux/desktop/backoffice/centerReducer.js'
import {
    center_horeca_goods_tree_get,
    center_horeca_production_state_get,
    center_horeca_shift_state_get,
    center_horeca_store_state_get,
    common_lazy_list_get,
} from '../../service/fetch_service.js'
import { useParams, useSearchParams } from 'react-router-dom'

export function useGetCenterData() {
    const dispatch = useDispatch()

    const params = useParams()
    const [search_params] = useSearchParams()

    const cities = useSelector((state) => state.data.cities)

    const { root_filial, filial, date_shift } = useSelector((state) => state.center)

    // Параметры строки
    useEffect(() => {
        dispatch(setParams(params))
    }, [dispatch, params])

    // Параметры поиска
    useEffect(() => {
        const obj = Object.fromEntries(search_params.entries())
        dispatch(setSearchParams(obj))
    }, [dispatch, search_params])

    // Филиалы
    useEffect(() => {
        if (!cities) return

        const filials_list = []
        cities.forEach((city) => {
            city.filials.forEach((filial) => {
                filials_list.push({
                    uid: filial.uid,
                    title: filial.name,
                })
            })
        })
        dispatch(setFilials(filials_list))
    }, [cities, dispatch])

    // Организации
    useEffect(() => {
        const fetch = async () => {
            const data = await dispatch(common_lazy_list_get(root_filial, 'organizations'))
            if (Array.isArray(data)) dispatch(setOrganizations(data))
        }

        fetch()
    }, [cities, dispatch, filial, root_filial])

    // Хорека / папки
    useEffect(() => {
        if (!root_filial) return

        dispatch(center_horeca_goods_tree_get(root_filial, 0))
    }, [root_filial, dispatch])

    // Хорека / наличие на складах
    useEffect(() => {
        if (!filial) return

        dispatch(center_horeca_store_state_get(filial, date_shift, 0))
    }, [filial, date_shift, dispatch])

    // Хорека / производство
    useEffect(() => {
        if (!filial) return

        dispatch(center_horeca_production_state_get(filial, date_shift, 0))
    }, [filial, date_shift, dispatch])

    // Хорека / ОРП
    useEffect(() => {
        if (!filial) return

        dispatch(center_horeca_shift_state_get(filial, date_shift, 0))
    }, [filial, date_shift, dispatch])
}
