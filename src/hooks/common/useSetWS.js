import {useEffect} from "react"
import useWebSocket from "react-use-websocket"
import {useDispatch, useSelector} from "react-redux"
import {setSSState} from "../../redux/secondScreenReducer.js"
import {ROUTE_MAIN_HOST} from "../../service/fetch_routes.js"
import {
    horeca_position_add_barcode,
    horeca_position_add_egais_mark,
    horeca_position_add_mark,
    login
} from "../../service/fetch_service.js";
import {addNotification} from "../../redux/notifierReducer.js"

export function useSetWS() {

    const hostname = window.location.hostname

    const dispatch = useDispatch()
    const wp = useSelector(state => state.interface.wp)
    const uid_user = useSelector(state => state.auth.uid)
    const its_second_screen = useSelector(state => state.interface.its_second_screen)
    const dev = useSelector(state => state.interface.dev)

    const filial = useSelector(state => state.data.filial)
    const current_page = useSelector(state => state.interface.current_page)
    const param_date = useSelector(state => state.interface.params.param_date)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const seance = useSelector(state => state.schedule.seance)
    const uid_horeca_selected = useSelector(state => state.orders.uid_horeca_selected)
    const kiosk = useSelector(state => state.interface.kiosk)

    const {
        sendMessage, lastMessage
    } = useWebSocket(dev ? `ws://${ROUTE_MAIN_HOST.ip}:${ROUTE_MAIN_HOST.ws_port}/?wp=${wp}${its_second_screen ? '&ss=true' : ''}` : `ws://${hostname}:${ROUTE_MAIN_HOST.ws_port}/ws?wp=${wp}${its_second_screen ? '&ss=true' : ''}`, {
        shouldReconnect: () => true,
    })

    useEffect(() => {
        if (lastMessage) {
            try {
                const data = JSON.parse(lastMessage.data)
                switch (data.type) {
                    case 0:
                        dispatch(setSSState(data.second_screen))
                        break
                    case 1:
                        // 0 - Неизвестно
                        // 1 - Товарный штрихкод
                        // 2 - Честный знак
                        // 3 - Акцизная марка
                        // 4 - Уникальный идентификатор
                        if (filial === undefined) {
                            dispatch(addNotification({message: 'Выберите филиал', severity: 'error', autoHide: true}))
                            return
                        }
                        switch (data.code_type) {
                            case 0:
                                if (uid_user === null && !kiosk) {
                                    dispatch(login(filial, false, true, '', data.value))
                                } else {

                                }
                                break
                            case 1:
                                dispatch(horeca_position_add_barcode(filial, horder.uid, data.value))
                                break
                            case 2:
                                if (uid_horeca_selected.length === 0) {
                                    dispatch(horeca_position_add_mark(filial, horder.uid, null, data.value))
                                } else {
                                    dispatch(horeca_position_add_mark(filial, horder.uid, uid_horeca_selected[0], data.value))
                                }
                                break
                            case 3:
                                if (uid_horeca_selected.length === 0) {
                                    dispatch(horeca_position_add_egais_mark(filial, horder.uid, null, data.value))
                                } else {
                                    dispatch(horeca_position_add_egais_mark(filial, horder.uid, uid_horeca_selected[0], data.value))
                                }
                                break
                            case 4:
                                break
                        }
                }
            } catch (e) {
                console.error(e)
            }
        }
    }, [lastMessage, dispatch, sendMessage])

    useEffect(() => {
        if ((current_page === 'seance' && seance !== undefined) || current_page !== 'seance') {
            sendMessage(JSON.stringify({
                type: 0, second_screen: {
                    current_page: current_page,
                    date_shift: param_date,
                    uid_seance: seance !== undefined ? seance.uid : null,
                    show_pre_order: pre_order.in_base,
                    show_horder: horder.in_base,
                    uid_pre_order: pre_order.uid,
                    uid_horder: horder.uid,
                    ver_pre_order: pre_order.ver,
                    ver_horder: horder.ver,
                }
            }))
        }
    }, [current_page, param_date, sendMessage, pre_order, horder, seance])

}