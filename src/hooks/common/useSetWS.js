import {useEffect, useMemo} from "react"
import useWebSocket from "react-use-websocket"
import {useDispatch, useSelector} from "react-redux"
import {setSSState} from "../../redux/secondScreenReducer.js"
import {ROUTE_MAIN_HOST} from "../../service/fetch_routes.js"
import useSound from "use-sound"
import sound_kitchen_add_positon from '../../sounds/kitchen_new_order.mp3'
import {
    cinema_seance_booking_get,
    horeca_kitchen_get,
    horeca_order_fetch,
    horeca_position_add_barcode,
    horeca_position_add_egais_mark,
    horeca_position_add_mark,
    login,
    pl_estimate_discounts
} from "../../service/fetch_service.js"
import {addNotification} from "../../redux/notifierReducer.js"
import {setKitchenOrders, setOrderSearchValue, setOrdersHorecaUpdate} from "../../redux/ordersReducer.js"
import {setBooking} from "../../redux/scheduleReducer.js"
import dayjs from "dayjs"
import {resetWP, turnOffWP, turnOnWP} from "../../redux/interfaceReducer.js"

export function useSetWS() {
    const dispatch = useDispatch()
    const wp = useSelector(state => state.interface.wp)
    const uid_user = useSelector(state => state.auth.uid)
    const its_second_screen = useSelector(state => state.interface.its_second_screen)
    const dev = useSelector(state => state.interface.dev)
    const filial = useSelector(state => state.data.filial)
    const current_page = useSelector(state => state.interface.current_page)
    const param_date = useSelector(state => state.interface.params.param_date)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const seance = useSelector(state => state.schedule.seance)
    const uid_horeca_selected = useSelector(state => state.orders.uid_horeca_selected)
    const kiosk = useSelector(state => state.interface.kiosk)
    const uid_kitchen_points_selected = useSelector(state => state.orders.uid_kitchen_points_selected)

    const wsUrl = useMemo(() => {
        if (!filial) return null
        const base = dev ? `ws://${ROUTE_MAIN_HOST.ip}:${ROUTE_MAIN_HOST.ws_port}` : `ws://${filial.ip}:${ROUTE_MAIN_HOST.ws_port}/ws`
        return `${base}?wp=${wp}${its_second_screen ? '&ss=true' : ''}`
    }, [filial, wp, its_second_screen, dev])

    const {
        sendMessage, lastMessage, readyState
    } = useWebSocket(wsUrl ?? 'ws://placeholder', {
        shouldReconnect: () => true, retryOnError: true, pause: !wsUrl
    })

    // Оповещения
    const [kitchen_add_position] = useSound(sound_kitchen_add_positon)

    // Работа с рабочими местами
    const {reset_wp, turn_on_wp, turn_off_wp} = useSelector(state => state.interface)

    // Обработка сообщений
    useEffect(() => {
        if (!lastMessage || !wsUrl) return
        try {
            const data = JSON.parse(lastMessage.data)

            switch (data.type) {
                case 0:
                    dispatch(setSSState(data.second_screen))
                    break

                case 1:
                    if (!filial) {
                        dispatch(addNotification({message: 'Выберите филиал', severity: 'error', autoHide: true}))
                        return
                    }

                    switch (data.code_type) {
                        case 0:
                            if (uid_user === null && !kiosk) {
                                dispatch(login(filial, false, true, '', data.value))
                            } else {
                                if (["admin/orders/cinema", "admin/orders/horeca"].includes(current_page)) {
                                    dispatch(setOrderSearchValue(data.value))
                                } else {
                                    if (pre_order.in_base) {
                                        dispatch(pl_estimate_discounts(filial, pre_order.uid, 'cinema', data.value, pre_order.ver))
                                    }
                                    if (horder.in_base) {
                                        dispatch(pl_estimate_discounts(filial, horder.uid, 'horeca', data.value, horder.ver))
                                    }
                                }
                            }
                            break

                        case 1:
                            dispatch(horeca_position_add_barcode(filial, horder.uid, data.value))
                            break

                        case 2:
                            dispatch(horeca_position_add_mark(filial, horder.uid, uid_horeca_selected[0] ?? null, data.value))
                            break

                        case 3:
                            dispatch(horeca_position_add_egais_mark(filial, horder.uid, uid_horeca_selected[0] ?? null, data.value))
                            break

                        case 4:
                            if (["admin/orders/cinema", "admin/orders/horeca"].includes(current_page)) {
                                dispatch(setOrderSearchValue(data.value))
                            } else {
                                if (pre_order.in_base) {
                                    dispatch(pl_estimate_discounts(filial, pre_order.uid, 'cinema', data.value, pre_order.ver))
                                }
                                if (horder.in_base) {
                                    dispatch(pl_estimate_discounts(filial, horder.uid, 'horeca', data.value, horder.ver))
                                }
                            }
                            break
                    }
                    break

                case 'cinema':
                    if (data.action === 'position_add' && current_page === 'seance' && seance.uid === data.uid_seance) {
                        (async () => {
                            const fetching_result = await dispatch(cinema_seance_booking_get(filial, data.uid_seance, pre_order.uid, false))
                            if (fetching_result.data) dispatch(setBooking(fetching_result.data))
                        })()
                    }
                    break

                case 'kitchen':
                    if (current_page === 'kitchen' && param_date === dayjs(data.date_shift).format('YYYY-M-D')) {
                        (async () => {
                            const fetching_result = await dispatch(horeca_kitchen_get(filial, param_date_admin, uid_kitchen_points_selected))
                            if (fetching_result.data) dispatch(setKitchenOrders(fetching_result.data))
                        })()
                        switch (data.action) {
                            case 'add_position':
                                dispatch(addNotification({
                                    message: data.exist ? `ИЗМЕНЕНИЕ ПОЗИЦИЙ В ЗАКАЗЕ ${data.number}` : `НОВЫЙ ЗАКАЗ ${data.number}`,
                                    severity: data.exist ? 'info' : 'info',
                                    autoHide: true
                                }))
                                if (!data.exist) kitchen_add_position()
                                break
                            case 'comment':
                                dispatch(addNotification({
                                    message: `КОММЕНТАРИЙ К ЗАКАЗУ ${data.number}`, severity: 'info', autoHide: true
                                }))
                                break
                            case 'order_canceled':
                                dispatch(addNotification({
                                    message: `ОТМЕНА ЗАКАЗА ${data.number}`, severity: 'error', autoHide: false
                                }))
                                break
                            case 'comment_deleted':
                                dispatch(addNotification({
                                    message: `КОММЕНТАРИЙ К ЗАКАЗУ УДАЛЕН ${data.number}`,
                                    severity: 'info',
                                    autoHide: true
                                }))
                                break
                            case 'away':
                                dispatch(addNotification({
                                    message: `С СОБОЙ в заказе ${data.number}`, severity: 'info', autoHide: true
                                }))
                                break
                            case 'course':
                                dispatch(addNotification({
                                    message: `НОВЫЙ КУРС в заказе ${data.number}`, severity: 'info', autoHide: true
                                }))
                                break
                            case 'comment_position':
                                dispatch(addNotification({
                                    message: `Комментарий к позиции заказа ${data.number}: ${data.comment}`,
                                    severity: 'info',
                                    autoHide: true
                                }))
                                break
                            case 'delete_comment_position':
                                dispatch(addNotification({
                                    message: `Удален комментарий к позиции заказа ${data.number}`,
                                    severity: 'info',
                                    autoHide: true
                                }))
                                break
                            case 'quantity_changed':
                                dispatch(addNotification({
                                    message: `Изменилось количество в заказе ${data.number}`,
                                    severity: 'info',
                                    autoHide: true
                                }))
                                break
                            case 'cook':
                                dispatch(addNotification({
                                    message: `Начните готовить позицию в заказе ${data.number}`,
                                    severity: 'info',
                                    autoHide: true
                                }))
                                break
                            case 'push':
                                dispatch(addNotification({
                                    message: `Изменилось состояние готовности позиции в заказе ${data.number}`,
                                    severity: 'info',
                                    autoHide: true
                                }))
                                break
                            case 'delete_position':
                                dispatch(addNotification({
                                    message: `ОТМЕНА позиции ${data.number}`, severity: 'info', autoHide: true
                                }))
                                break
                        }
                    }
                    break

                case 'horeca':
                    if (current_page === 'admin/orders/horeca') dispatch(setOrdersHorecaUpdate())
                    if (horder.uid === data.uid_order) dispatch(horeca_order_fetch(filial, horder.uid))
                    break
            }
        } catch (e) {
            console.error(e)
        }
    }, [lastMessage, wsUrl])

    useEffect(() => {
        if (!wsUrl) return
        if ((current_page === 'seance' && seance) || current_page !== 'seance') {
            sendMessage(JSON.stringify({
                type: 0, second_screen: {
                    current_page,
                    date_shift: param_date,
                    uid_seance: seance?.uid ?? null,
                    show_pre_order: pre_order.in_base,
                    show_horder: horder.in_base,
                    uid_pre_order: pre_order.uid,
                    uid_horder: horder.uid,
                    ver_pre_order: pre_order.ver,
                    ver_horder: horder.ver,
                }
            }))
        }
    }, [current_page, param_date, pre_order, horder, seance, wsUrl, sendMessage])

    useEffect(() => {
        if (reset_wp !== null) {
            sendMessage(JSON.stringify({type: 10, wp: reset_wp}))
            dispatch(resetWP(null))
        }
        if (turn_on_wp !== null) {
            sendMessage(JSON.stringify({type: 11, wp: turn_on_wp}))
            dispatch(turnOnWP(null))
        }
        if (turn_off_wp !== null) {
            sendMessage(JSON.stringify({type: 12, wp: turn_off_wp}))
            dispatch(turnOffWP(null))
        }
    }, [reset_wp, turn_on_wp, turn_off_wp, sendMessage])
}