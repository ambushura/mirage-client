import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {NEW_EMPTY_HORDER, NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../../redux/ordersReducer.js"

export function useReset() {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const uid_user = useSelector(state => state.auth.uid)

    const [clear, set_clear] = useState(0)

    // Очищаем по старым реквизитам данные
    useEffect(() => {
        set_clear(prevState => prevState + 1)
    }, [dispatch, filial, uid_user])

    // Создаем по новым реквизитам данные
    useEffect(() => {
        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
    }, [dispatch, clear])

}