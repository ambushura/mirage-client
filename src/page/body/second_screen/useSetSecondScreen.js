import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {
    ROUTE_SECOND_SCREEN_BOOKING_GET,
    ROUTE_SECOND_SCREEN_HORDER_GET,
    ROUTE_SECOND_SCREEN_PRE_ORDER_GET,
    ROUTE_SECOND_SCREEN_SCHEDULE_GET, ROUTE_SECOND_SCREEN_SEANCE_GET
} from "../../../service/fetch_routes.js"
import {useFetching} from "../../../hooks/common/useFetching.js"
import {
    setSSBooking,
    setSSHorder,
    setSSPreOrder,
    setSSSchedule,
    setSSSeance
} from "../../../redux/secondScreenReducer.js"

export function useSetSecondScreen() {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const current_page = useSelector(state => state.second_screen.current_page)
    const date_shift = useSelector(state => state.second_screen.date_shift)
    const uid_seance = useSelector(state => state.second_screen.uid_seance)
    const uid_pre_order = useSelector(state => state.second_screen.uid_pre_order)
    const uid_horder = useSelector(state => state.second_screen.uid_horder)
    const show_pre_order = useSelector(state => state.second_screen.show_pre_order)
    const show_horder = useSelector(state => state.second_screen.show_horder)
    const ver_pre_order = useSelector(state => state.second_screen.ver_pre_order)
    const ver_horder = useSelector(state => state.second_screen.ver_horder)

    const [url_schedule, set_url_schedule] = useState(undefined)
    const [data_schedule, errors_schedule, loading_schedule] = useFetching(url_schedule)

    const [url_seance, set_url_seance] = useState(undefined)
    const [data_seance, errors_seance, loading_seance] = useFetching(url_seance)

    const [url_pre_order, set_url_pre_order] = useState(undefined)
    const [data_pre_order, errors_pre_order, loading_pre_order] = useFetching(url_pre_order)

    const [url_horder, set_url_horder] = useState(undefined)
    const [data_horder, errors_horder, loading_horder] = useFetching(url_horder)

    const [url_booking, set_url_booking] = useState(undefined)
    const [data_booking, errors_booking, loading_booking] = useFetching(url_booking)

    useEffect(() => {
        if (filial !== undefined && !['seance'].includes(current_page)) {
            set_url_schedule({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_SCHEDULE_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        date_shift: date_shift
                    }
                }
            )
        } else {
            set_url_schedule(undefined)
        }
    }, [filial, current_page, date_shift])

    useEffect(() => {
        if (filial !== undefined && ['seance'].includes(current_page)) {
            set_url_seance({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_SEANCE_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        uid_seance: uid_seance
                    }
                }
            )
        } else {
            set_url_seance(undefined)
        }
    }, [filial, current_page, uid_seance])

    useEffect(() => {
        if (filial !== undefined && uid_pre_order !== null && show_pre_order) {
            set_url_pre_order({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_PRE_ORDER_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        uid_order: uid_pre_order,
                        ver: ver_pre_order,
                    }
                }
            )
        } else {
            set_url_pre_order(undefined)
        }
    }, [filial, uid_pre_order, ver_pre_order])

    useEffect(() => {
        if (filial !== undefined && uid_horder !== null && show_horder) {
            set_url_horder({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_HORDER_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        uid_order: uid_horder,
                        ver: ver_horder,
                    }
                }
            )
        } else {
            set_url_horder(undefined)
        }
    }, [filial, uid_horder, ver_horder])

    useEffect(() => {
        if (filial !== undefined && uid_seance !== null) {
            set_url_booking({
                    url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_BOOKING_GET}`,
                    uid_filial: filial.uid,
                    params: {
                        uid_seance: uid_seance,
                        uid_order: uid_pre_order
                    }
                }
            )
        } else {
            set_url_booking(undefined)
        }
    }, [filial, uid_pre_order, uid_seance])

    useEffect(() => {
        if (data_schedule !== null) {
            dispatch(setSSSchedule(data_schedule))
        }
    }, [dispatch, data_schedule])

    useEffect(() => {
        if (data_seance !== null) {
            dispatch(setSSSeance(data_seance))
        }
    }, [dispatch, data_seance])

    useEffect(() => {
        if (data_pre_order !== null) {
            dispatch(setSSPreOrder(data_pre_order))
        }
    }, [dispatch, data_pre_order])

    useEffect(() => {
        if (data_horder !== null) {
            dispatch(setSSHorder(data_horder))
        }
    }, [dispatch, data_horder])

    useEffect(() => {
        if (data_booking !== null) {
            dispatch(setSSBooking(data_booking))
        }
    }, [dispatch, data_booking])

}