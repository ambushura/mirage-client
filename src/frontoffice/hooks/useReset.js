import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NEW_EMPTY_HORDER, NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder } from '../../redux/ordersReducer.js'
import { setShowFreeSpace } from '../../redux/scheduleReducer.js'
import { setUidHall } from '../../redux/hallsReducer.js'
import { logout } from '../../redux/authReducer.js'

export function useReset() {
    const dispatch = useDispatch()

    const filial = useSelector((state) => state.data.filial)
    const uid_user = useSelector((state) => state.auth.uid)
    const { kiosk, wp } = useSelector((state) => state.interface)

    const [clear, set_clear] = useState(0)

    // Очищаем по старым реквизитам данные
    useEffect(() => {
        set_clear((prevState) => prevState + 1)
    }, [dispatch, filial, uid_user])

    // Создаем по новым реквизитам данные
    useEffect(() => {
        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
    }, [dispatch, clear])

    useEffect(() => {
        dispatch(setShowFreeSpace(false))
    }, [dispatch, uid_user])

    useEffect(() => {
        dispatch(setUidHall(null))
    }, [dispatch, filial])

    useEffect(() => {
        if (kiosk) {
            dispatch(logout())
        }
    }, [kiosk])
}
