import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setFilials, setParams, setSearchParams} from "../../redux/center/centerReducer.js"
import {
    center_horeca_goods_tree_get,
    center_horeca_orders_get,
    center_horeca_production_state_get,
    center_horeca_shift_state_get,
    center_horeca_store_state_get
} from "../../service/fetch_service.js"
import {useParams, useSearchParams} from "react-router-dom"

export function useGetCenterData() {

    const dispatch = useDispatch()

    const params = useParams()
    const [search_params] = useSearchParams()

    const center = useSelector(state => state.auth.center)
    const cities = useSelector(state => state.data.cities)

    const {root_filial, filial, current_page, date_shift} = useSelector(state => state.center)
    const {orders_horeca_page, orders_horeca_page_size} = useSelector(state => state.center_horeca)

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

        if (!center) return
        if (!cities) return

        const filials_list = []
        cities.forEach(city => {
            city.filials.forEach(filial => {
                filials_list.push({
                    uid: filial.uid, title: filial.name
                })
            })
        })
        dispatch(setFilials(filials_list))

    }, [center, cities, dispatch])

    // Хорека / папки
    useEffect(() => {

        if (!center) return
        if (!root_filial) return
        if (current_page[0] !== 'horeca') return
        if (current_page[1] !== 'goods') return

        dispatch(center_horeca_goods_tree_get(root_filial, 0))

    }, [center, root_filial, current_page, dispatch])

    // Хорека / заказы
    useEffect(() => {

        if (!center) return
        if (!filial) return
        if (current_page[0] !== 'horeca') return
        if (current_page[1] !== 'orders') return

        dispatch(center_horeca_orders_get(filial, date_shift, 0, orders_horeca_page, orders_horeca_page_size))

    }, [center, filial, date_shift, orders_horeca_page, orders_horeca_page_size, current_page, dispatch])

    // Хорека / наличие на складах
    useEffect(() => {

        if (!center) return
        if (!filial) return
        if (current_page[0] !== 'horeca') return
        if (current_page[1] !== 'store_state') return

        dispatch(center_horeca_store_state_get(filial, date_shift, 0))

    }, [center, filial, date_shift, current_page, dispatch])

    // Хорека / производство
    useEffect(() => {

        if (!center) return
        if (!filial) return
        if (current_page[0] !== 'horeca') return
        if (current_page[1] !== 'store_production') return

        dispatch(center_horeca_production_state_get(filial, date_shift, 0))

    }, [center, filial, date_shift, current_page, dispatch])

    // Хорека / ОРП
    useEffect(() => {

        if (!center) return
        if (!filial) return
        if (current_page[0] !== 'horeca') return
        if (current_page[1] !== 'shift_state') return

        dispatch(center_horeca_shift_state_get(filial, date_shift, 0))

    }, [center, filial, date_shift, current_page, dispatch])

}