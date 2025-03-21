import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {NEW_EMPTY_HORDER, NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../../redux/ordersReducer.js"

export function useReset() {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const [clear, set_clear] = useState(false)

    // Очищаем по старым реквизитам данные
    useEffect(() => {
        set_clear(true)
    }, [dispatch, filial])

    // Создаем по новым реквизитам данные
    useEffect(() => {
        if (clear) {
            dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
            dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
        }
    }, [dispatch, filial])
}