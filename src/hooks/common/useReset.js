import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
    NEW_EMPTY_HORDER,
    NEW_EMPTY_ORDER,
    setCurrentHorder,
    setCurrentPreOrder,
    setHorderPaying, setPreOrderPaying
} from "../../redux/ordersReducer.js"
import {setShowFreeSpace} from "../../redux/scheduleReducer.js"

export function useReset() {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const uid_user = useSelector(state => state.auth.uid)

    const [clear, set_clear] = useState(0)

    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)

    const pre_order_paying = useSelector(state => state.orders.pre_order_paying)
    const horder_paying = useSelector(state => state.orders.horder_paying)

    // Очищаем по старым реквизитам данные
    useEffect(() => {
        set_clear(prevState => prevState + 1)
    }, [dispatch, filial, uid_user])

    // Создаем по новым реквизитам данные
    useEffect(() => {
        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
    }, [dispatch, clear])

    // При изменении текущего заказа убираем режим оплаты
    useEffect(() => {
        if (horder_paying) {
            dispatch(setHorderPaying(false))
        }
        if (pre_order_paying) {
            dispatch(setPreOrderPaying(false))
        }
    }, [pre_order.uid, horder.uid, pre_order.in_base, horder.in_base, dispatch])

    useEffect(() => {
        dispatch(setShowFreeSpace(false))
    }, [dispatch, uid_user])

}