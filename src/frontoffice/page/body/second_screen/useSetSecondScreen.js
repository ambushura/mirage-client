import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
    second_screen_booking_get,
    second_screen_horder_get,
    second_screen_pre_order_get,
    second_screen_schedule_get,
    second_screen_seance_get,
} from '../../../../service/fetch_service.js'

export function useSetSecondScreen() {
    const dispatch = useDispatch()

    const filial = useSelector((state) => state.data.filial)
    const current_page = useSelector((state) => state.second_screen.current_page)
    const date_shift = useSelector((state) => state.second_screen.date_shift)
    const uid_seance = useSelector((state) => state.second_screen.uid_seance)
    const uid_pre_order = useSelector((state) => state.second_screen.uid_pre_order)
    const uid_horder = useSelector((state) => state.second_screen.uid_horder)
    const show_pre_order = useSelector((state) => state.second_screen.show_pre_order)
    const show_horder = useSelector((state) => state.second_screen.show_horder)
    const ver_pre_order = useSelector((state) => state.second_screen.ver_pre_order)
    const ver_horder = useSelector((state) => state.second_screen.ver_horder)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(second_screen_schedule_get(filial, date_shift))
            if (fetching_result.loading) {
                // TODO Крутилка
            }
        }
        if (filial !== undefined && !['seance'].includes(current_page)) {
            fetch()
        }
    }, [current_page, date_shift, dispatch, filial])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(second_screen_seance_get(filial, uid_seance))
            if (fetching_result.loading) {
                // TODO Крутилка
            }
        }
        if (filial !== undefined && ['seance'].includes(current_page)) {
            fetch()
        }
    }, [dispatch, filial, current_page, uid_seance])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(second_screen_pre_order_get(filial, uid_pre_order, ver_pre_order))
            if (fetching_result.loading) {
                // TODO Крутилка
            }
        }
        if (filial !== undefined && uid_pre_order !== null && show_pre_order) {
            fetch()
        }
    }, [dispatch, filial, show_pre_order, uid_pre_order, ver_pre_order])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(second_screen_horder_get(filial, uid_horder, ver_horder))
            if (fetching_result.loading) {
                // TODO Крутилка
            }
        }
        if (filial !== undefined && uid_horder !== null && show_horder) {
            fetch()
        }
    }, [dispatch, filial, show_horder, uid_horder, ver_horder])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(second_screen_booking_get(filial, uid_seance, uid_pre_order, ver_pre_order))
            if (fetching_result.loading) {
                // TODO Крутилка
            }
        }
        if (filial !== undefined && uid_seance !== null) {
            fetch()
        }
    }, [dispatch, filial, uid_pre_order, uid_seance, ver_pre_order, current_page])
}
