import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {NEW_EMPTY_HORDER, NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../redux/ordersReducer.js"
import {deletePreOrder} from "../service/fetch_service.js"

export function useReset() {

    const dispatch = useDispatch()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    const [clear, set_clear] = useState(false)
    const pre_order = useSelector(state => state.orders.pre_order)

    // Очищаем по старым реквизитам данные
    useEffect(() => {
        if (filial !== undefined) {
            dispatch(deletePreOrder(filial, pre_order.uid))
        }
        set_clear(true)
    }, [dispatch, filial])

    // Создаем по новым реквизитам данные
    useEffect(() => {
        if (clear) {
            dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
            dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
        }
    }, [dispatch, city, filial])
}