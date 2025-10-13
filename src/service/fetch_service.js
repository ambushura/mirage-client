import axios from "axios"
import {
    NEW_EMPTY_HORDER,
    NEW_EMPTY_ORDER,
    pushKitchenPositions,
    setCurrentHorder,
    setCurrentPreOrder,
    setHorderPaying,
    setHorderPreparing,
    setKioskPaymentError,
    setKitchenPointsList,
    setOrdersCinemaUpdate,
    setOrdersHorecaUpdate,
    setPreOrderPaying,
    setPreOrderPreparing,
    setReturnReasonsList,
    setStaffList
} from "../redux/ordersReducer.js"
import {setBooking, setSeance} from "../redux/scheduleReducer.js"
import {addNotification} from "../redux/notifierReducer.js"
import {loginSuccess, logout} from "../redux/authReducer.js"
import {
    COMMON_PRINTERS_GET,
    ROUTE_CINEMA_DISCOUNTS_APPLY,
    ROUTE_CINEMA_DISCOUNTS_GET,
    ROUTE_CINEMA_DISCOUNTS_GROUPS_GET,
    ROUTE_CINEMA_FILM_GET_SEANCES,
    ROUTE_CINEMA_FILMS_GET,
    ROUTE_CINEMA_FILTERS_FILMS_GET,
    ROUTE_CINEMA_HALL_GET,
    ROUTE_CINEMA_ORDER_ADD_COMMENT,
    ROUTE_CINEMA_ORDER_DELETE,
    ROUTE_CINEMA_ORDER_DELETE_COMMENT,
    ROUTE_CINEMA_ORDER_GET,
    ROUTE_CINEMA_ORDERS_FILTERS_SCHEDULE_GET,
    ROUTE_CINEMA_ORDERS_GET,
    ROUTE_CINEMA_PLACE_BLOCK,
    ROUTE_CINEMA_POSITION_ADD,
    ROUTE_CINEMA_POSITION_ADD_COMMENT,
    ROUTE_CINEMA_POSITION_DELETE_COMMENT,
    ROUTE_CINEMA_SCHEDULE_GET_HALLS,
    ROUTE_CINEMA_SEANCE_CLOSE,
    ROUTE_CINEMA_SEANCE_GET,
    ROUTE_CINEMA_SEANCE_GET_BOOKING,
    ROUTE_COMMON_CATALOG_GET,
    ROUTE_COMMON_CITIES_GET,
    ROUTE_COMMON_DOCUMENTS_OPERATIONS_GET,
    ROUTE_COMMON_DOCUMENTS_RECEIPTS_GET,
    ROUTE_COMMON_DOCUMENTS_SLIPS_GET,
    ROUTE_COMMON_DOCUMENTS_ZBOOK_GET,
    ROUTE_COMMON_DOCUMENTS_ZBOOKS_GET,
    ROUTE_COMMON_DOCUMENTS_ZPINPADS_GET,
    ROUTE_COMMON_LIST_GET,
    ROUTE_COMMON_LOGIN,
    ROUTE_COMMON_ORDER_ADD_CONTACT,
    ROUTE_COMMON_ORDER_FIND,
    ROUTE_COMMON_ORDER_PAYMENT,
    ROUTE_COMMON_ORDER_PAYMENT_KIOSK,
    ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET,
    ROUTE_COMMON_ORDERS_FILTERS_STAFF_GET,
    ROUTE_COMMON_ORDERS_FILTERS_WORKPLACES_GET,
    ROUTE_COMMON_ORDERS_GET_RECEIPTS,
    ROUTE_COMMON_PAYMENT_MAP_GET,
    ROUTE_COMMON_PAYMENT_METHODS_GET,
    ROUTE_EQUIPMENT_KKT_BILL_PRINT,
    ROUTE_EQUIPMENT_KKT_TICKETS_PRINT,
    ROUTE_EQUIPMENT_KKT_Z,
    ROUTE_EQUIPMENT_PINPAD_X,
    ROUTE_EQUIPMENT_PINPAD_Z,
    ROUTE_HORECA_KITCHEN_GET,
    ROUTE_HORECA_KITCHEN_PUSH,
    ROUTE_HORECA_MENU_GET,
    ROUTE_HORECA_MODIFICATIONS_GET,
    ROUTE_HORECA_ORDER_ADD_COMMENT,
    ROUTE_HORECA_ORDER_ADD_TABLE,
    ROUTE_HORECA_ORDER_CHANGE_CREATOR,
    ROUTE_HORECA_ORDER_DELETE,
    ROUTE_HORECA_ORDER_DELETE_COMMENT,
    ROUTE_HORECA_ORDER_DELETE_TABLE,
    ROUTE_HORECA_ORDER_GET,
    ROUTE_HORECA_ORDERS_GET,
    ROUTE_HORECA_POSITION_ADD,
    ROUTE_HORECA_POSITION_ADD_BARCODE,
    ROUTE_HORECA_POSITION_ADD_COMMENT,
    ROUTE_HORECA_POSITION_ADD_EGAIS,
    ROUTE_HORECA_POSITION_ADD_MARK,
    ROUTE_HORECA_POSITION_ADD_QUANTITY,
    ROUTE_HORECA_POSITION_AWAY,
    ROUTE_HORECA_POSITION_COOK,
    ROUTE_HORECA_POSITION_COURSE,
    ROUTE_HORECA_POSITION_DELETE,
    ROUTE_HORECA_POSITION_DELETE_COMMENT,
    ROUTE_MAIN_HOST,
    ROUTE_MARKIROVKA_CDN_INFO_GET,
    ROUTE_MARKIROVKA_CDN_INFO_UPDATE,
    ROUTE_PL_ESTIMATE_DISCOUNTS,
    ROUTE_SECOND_SCREEN_BOOKING_GET,
    ROUTE_SECOND_SCREEN_HORDER_GET,
    ROUTE_SECOND_SCREEN_PRE_ORDER_GET,
    ROUTE_SECOND_SCREEN_SCHEDULE_GET,
    ROUTE_SECOND_SCREEN_SEANCE_GET
} from "./fetch_routes.js"
import {fillHosts} from "../redux/markirovkaReducer.js"
import {setHall} from "../redux/hallsReducer.js"
import {setKKTList, setPinpadList, setZBooksUpdate, setZPinpadsUpdate} from "../redux/documentsReducer.js"
import {setSSBooking, setSSHorder, setSSPreOrder, setSSSchedule, setSSSeance} from "../redux/secondScreenReducer.js"
import {setNeedUpdate} from "../redux/interfaceReducer.js"

export const TIMEOUT = 10000

export const makeRequest = async (dispatch, config, onSuccess) => {

    const state = {
        loading: true, error: null, data: null,
    }

    try {
        const {wp, filial, kiosk, version} = config
        const token = localStorage.getItem("token")
        const headers = {
            ...config.headers,
            Authorization: token,
            uid_filial: filial?.uid !== undefined ? filial.uid : null,
            wp,
            kiosk: String(kiosk),
            version
        }

        const res = await axios({
            ...config, headers, timeout: config.timeout || TIMEOUT,
        })

        const data = onSuccess ? onSuccess(res.data) : res.data

        state.loading = false
        state.error = null
        state.data = data

    } catch (e) {

        let message
        let show_message = true
        if (e.status === 401) {
            dispatch(logout())
            message = e.response.data
        } else if (e.status === 409) {
            show_message = false
            dispatch(setNeedUpdate(true))
        } else if (e.code === 'ERR_NETWORK') {
            message = 'Сервер не отвечает, проверьте соединение'
        } else if (e.code === 'ECONNABORTED') {
            message = `Превышено время ожидания ответа от сервера (${TIMEOUT} секунд)`
        } else if (e.response?.data) {
            message = e.response.data
        } else {
            message = e.message
        }

        if (!config.kiosk && show_message) {
            dispatch(addNotification({
                message, severity: 'error', autoHide: true
            }))
        }

        state.loading = false
        state.error = message
        state.data = null
    }

    return state
}

export const cinema_order_fetch = (filial, uid_order) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDER_GET}`,
        params: {uid_order},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(setCurrentPreOrder(data))
    })
}

export const horeca_order_fetch = (filial, uid_order) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_GET}`,
        params: {uid_order},
        wp,
        filial,
        kiosk,
        version
    }, data => dispatch(setCurrentHorder(data)))
}

export const common_orders_receipts_get = (filial, type, uid_order) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_GET_RECEIPTS}`,
        params: {uid_order: uid_order, type},
        wp,
        filial,
        kiosk,
        version
    }, data => {
        if (type === 'cinema') {
            dispatch(setCurrentPreOrder(data))
            dispatch(setPreOrderPreparing(true))
        } else if (type === 'horeca') {
            dispatch(setCurrentHorder(data))
            dispatch(setHorderPreparing(true))
        }
    })
}

export const cinema_order_delete = (filial, uid_order, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDER_DELETE}`,
        params: {uid_order, ver},
        wp,
        filial,
        kiosk,
        version
    }, () => {
        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        dispatch(setOrdersCinemaUpdate())
    })
}

export const horeca_order_delete = (filial, uid_order, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_DELETE}`,
        params: {uid_order, ver},
        wp,
        filial,
        kiosk,
        version
    }, (data) => {
        if (data.canceled) {
            dispatch(setCurrentHorder(data))
        } else {
            dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
        }
        dispatch(setOrdersHorecaUpdate())
    })
}

export const cinema_position_add = (city, filial, uid_seance, uid_order, uid_place, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_POSITION_ADD}`,
        params: {uid_city: city.uid, uid_seance, uid_order, uid_place, ver},
        wp,
        filial,
        kiosk,
        version
    }, async (data) => {
        dispatch(setCurrentPreOrder(data || NEW_EMPTY_ORDER()))
        await makeRequest(dispatch, {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_GET_BOOKING}`,
            params: {uid_seance, uid_order},
            wp,
            filial,
            kiosk,
            version
        }, (booking) => dispatch(setBooking(booking)))
    })
}

export const horeca_position_add = (filial, uid_order, ver, uid_menu) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD}`,
        params: {uid_order, ver, uid_menu},
        wp,
        filial,
        kiosk,
        version
    }, data => dispatch(setCurrentHorder(data)))
}

export const cinema_discount_apply = (filial, uid_order, uid_discount, uid_group_discount, comment, uid_positions, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_APPLY}`,
        params: {uid_order, uid_discount, uid_group_discount, uid_positions, comment, ver},
        wp,
        filial,
        kiosk,
        version
    }, data => {
        dispatch(setCurrentPreOrder(data))
        dispatch(setOrdersCinemaUpdate())
    })
}

export const common_contact_add = (filial, order_type, uid_order, buyer_s, buyer_n, buyer_o, buyer_phone_number, buyer_email, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDER_ADD_CONTACT}`,
        params: {order_type, uid_order, buyer_s, buyer_n, buyer_o, buyer_phone_number, buyer_email, ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
        dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
    })
}

export const common_order_add_comment = (filial, order_type, uid_order, comment, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_ORDER_ADD_COMMENT : ROUTE_HORECA_ORDER_ADD_COMMENT}`,
        params: {uid_order, comment, ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
        dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
    })
}

export const common_order_delete_comment = (filial, order_type, uid_order, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_ORDER_DELETE_COMMENT : ROUTE_HORECA_ORDER_DELETE_COMMENT}`,
        params: {uid_order, ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
        dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
    })
}

export const common_position_add_comment = (filial, order_type, uid_order, uid_position, comment, modifications, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_POSITION_ADD_COMMENT : ROUTE_HORECA_POSITION_ADD_COMMENT}`,
        params: {uid_order, uid_position, comment, modifications: order_type === 'horeca' ? modifications : [], ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
        dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
    })
}

export const common_position_delete_comment = (filial, order_type, uid_order, uid_position, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_POSITION_DELETE_COMMENT : ROUTE_HORECA_POSITION_DELETE_COMMENT}`,
        params: {uid_order, uid_position, ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
        dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
    })
}

export const horeca_position_add_quantity = (filial, uid_order, uid_position, quantity, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_QUANTITY}`,
        params: {uid_order, uid_position, quantity, ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(setCurrentHorder(data))
        dispatch(setOrdersHorecaUpdate())
    })
}

export const horeca_position_change_state = (filial, uid_order, uid_position, action, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    const routes = {
        away: ROUTE_HORECA_POSITION_AWAY, course: ROUTE_HORECA_POSITION_COURSE, cook: ROUTE_HORECA_POSITION_COOK
    }
    const route = routes[action]
    if (!route) return
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${route}`,
        params: {uid_order, uid_position, ver},
        wp,
        filial,
        kiosk,
        version
    }, data => {
        dispatch(setCurrentHorder(data))
        dispatch(setOrdersHorecaUpdate())
    })
}

export const horeca_position_add_mark = (filial, uid_order, uid_position, mark) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_MARK}`,
        params: {uid_order, uid_position, mark},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(setCurrentHorder(data))
        dispatch(setOrdersHorecaUpdate())
    })
}

export const horeca_position_add_egais_mark = (filial, uid_order, uid_position, mark) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_EGAIS}`,
        params: {uid_order, uid_position, mark},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(setCurrentHorder(data))
        dispatch(setOrdersHorecaUpdate())
    })
}

export const horeca_position_add_barcode = (filial, uid_order, mark) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_BARCODE}`,
        params: {uid_order, mark},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(setCurrentHorder(data))
        dispatch(setOrdersHorecaUpdate())
    })
}

export const markirovka_cdn_info_get = (filial) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_MARKIROVKA_CDN_INFO_GET}`,
        params: {},
        wp,
        filial,
        kiosk,
        version,
    }, data => dispatch(fillHosts(data)))
}

export const markirovka_cdn_info_update = (filial) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_MARKIROVKA_CDN_INFO_UPDATE}`,
        params: {},
        wp,
        filial,
        kiosk,
        version,
    }, data => dispatch(fillHosts(data)))
}

export const horeca_position_delete = (filial, uid_order, uid_position, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_DELETE}`,
        params: {uid_order, uid_position, ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(setCurrentHorder(data))
        dispatch(setOrdersHorecaUpdate())
    })
}

export const horeca_table_add = (filial, uid_order, uid_hall, uid_table, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_ADD_TABLE}`,
        params: {uid_order, uid_hall, uid_table, ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(setCurrentHorder(data))
        dispatch(setOrdersHorecaUpdate())
    })
}

export const horeca_table_delete = (filial, uid_order, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_DELETE_TABLE}`,
        params: {uid_order, ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(setCurrentHorder(data))
        dispatch(setOrdersHorecaUpdate())
    })
}

export const horeca_kitchen_push = (filial, uid_order, uid_position, uid_kitchen_points_selected, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get', url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_KITCHEN_PUSH}`, params: {
            uid_order, uid_position, uid_kitchen_points_selected, ver
        }, wp, filial, kiosk, version,
    }, data => {
        dispatch(pushKitchenPositions(data))
    })
}

export const cinema_place_block = (filial, hall, uid_place) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_PLACE_BLOCK}`,
        params: {uid_hall: hall.uid, uid_place},
        wp,
        filial,
        kiosk,
        version
    }, data => {
        const hallN = JSON.parse(JSON.stringify(hall))
        hallN.nodes = hallN.nodes.map(node => {
            if (node.id === data.id) {
                return {
                    ...data,
                }
            }
            return node
        })
        dispatch(setHall(hallN))
    })
}

export const pl_estimate_discounts = (filial, uid_order, type, card, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_PL_ESTIMATE_DISCOUNTS}`,
        params: {uid_order, type, card, ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
        dispatch(type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
    })
}

export const cinema_seance_close = (filial, uid_seance, reason, comment, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_CLOSE}`,
        params: {uid_seance, reason, comment, ver},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        dispatch(setSeance(data))
    })
}

export const common_list_get = (filial, type) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_LIST_GET}`,
        params: {type},
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        switch (type) {
            case 'kkt':
                dispatch(setKKTList(data))
                dispatch(setZBooksUpdate())
                break
            case 'pinpad':
                dispatch(setPinpadList(data))
                dispatch(setZPinpadsUpdate())
                break
            case 'staff':
                dispatch(setStaffList(data))
                break
            case 'return_reasons':
                dispatch(setReturnReasonsList(data))
                break
            case 'kitchen_points':
                dispatch(setKitchenPointsList(data))
                break
        }
    })
}

export const common_lazy_list_get = (filial, type) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    const res = await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_LIST_GET}`,
        params: {type},
        wp,
        filial,
        kiosk,
        version,
    })
    return res?.data || []
}

export const common_order_pay = (filial, pm, uid_order, ver, type, payment_group, uid_return_reason, comment_return_reason) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'post',
        url: kiosk ? `http://${filial.ip}:${ROUTE_MAIN_HOST.payment_port}${ROUTE_COMMON_ORDER_PAYMENT_KIOSK}` : `http://${filial.ip}:${ROUTE_MAIN_HOST.payment_port}${ROUTE_COMMON_ORDER_PAYMENT}`,
        data: kiosk ? {
            uid_filial: filial.uid,
            uid_order,
            type,
            ver,
            payment_group,
            uid_return_reason: uid_return_reason === '' ? null : uid_return_reason,
            comment_return_reason: comment_return_reason === '' ? null : comment_return_reason
        } : {
            uid_filial: filial.uid,
            uid_payment_type: pm.uid_payment_type,
            uid_kkt: pm.uid_kkt,
            uid_pinpad: pm.uid_pinpad,
            uid_work_place: pm.uid_work_place,
            uid_printer: pm.uid_printer,
            uid_printer_kkt: pm.uid_printer_kkt,
            uid_order,
            type,
            ver,
            payment_group,
            uid_return_reason: uid_return_reason === '' ? null : uid_return_reason,
            comment_return_reason: comment_return_reason === '' ? null : comment_return_reason,
        },
        timeout: TIMEOUT * 6 * 3,
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        if (data.errors.length === 0) {
            dispatch(type === 'cinema' ? setCurrentPreOrder(NEW_EMPTY_ORDER()) : setCurrentHorder(NEW_EMPTY_HORDER()))
            dispatch(type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
        } else {
            data.errors.forEach(error => {
                if (kiosk) {
                    dispatch(setKioskPaymentError(error))
                } else {
                    dispatch(addNotification({
                        message: error, severity: 'error', autoHide: true
                    }))
                }
            })
            if (data.order !== null) {
                dispatch(type === 'cinema' ? setCurrentPreOrder(data.order) : setCurrentHorder(data.order))
                dispatch(type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
            }
        }
        dispatch(type === 'cinema' ? setPreOrderPaying(false) : setHorderPaying(false))
    })
}

export const equipment_action = (filial, route, params) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${ROUTE_MAIN_HOST.payment_port}${route}`,
        params: params,
        timeout: TIMEOUT * 6 * 3,
        wp,
        filial,
        kiosk,
        version,
    }, data => {
        switch (route) {
            case ROUTE_EQUIPMENT_KKT_Z:
                dispatch(setZBooksUpdate())
                break
            case ROUTE_EQUIPMENT_PINPAD_X:
                dispatch(setZPinpadsUpdate())
                break
            case ROUTE_EQUIPMENT_PINPAD_Z:
                dispatch(setZPinpadsUpdate())
                break
            case ROUTE_EQUIPMENT_KKT_BILL_PRINT:
                dispatch(setCurrentHorder(data))
                dispatch(setOrdersHorecaUpdate())
                break
            case ROUTE_EQUIPMENT_KKT_TICKETS_PRINT:
                dispatch(setCurrentPreOrder(data))
                dispatch(setOrdersCinemaUpdate())
                break
        }
    })
}

export const common_cities_filials_get = () => async (dispatch, getState) => {
    const origin = window.location.origin
    const {wp, kiosk, version, dev} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: dev ? `http://${ROUTE_MAIN_HOST.ip}:${ROUTE_MAIN_HOST.port}${ROUTE_COMMON_CITIES_GET}` : `${origin}${ROUTE_COMMON_CITIES_GET}`,
        params: {},
        filial: {},
        wp,
        kiosk,
        version,
    }, data => data)
}

export const login = (filial, login_auth, pincode_auth, username, password) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    await makeRequest(dispatch, {
        method: 'post',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_LOGIN}`,
        data: {login_auth, pincode_auth, username, password},
        wp,
        filial,
        kiosk,
        version
    }, data => {
        dispatch(loginSuccess(data))
    })
}

export const cinema_schedule_filters_get = (filial, date_shift) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILTERS_FILMS_GET}`,
        params: {date_shift},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const cinema_halls_filters_get = (filial, date_shift) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET}`,
        params: {date_shift},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const cinema_seance_booking_get = (filial, uid_seance, uid_order) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_GET_BOOKING}`,
        params: {uid_seance, uid_order},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const cinema_seance_discounts_get = (filial, uid_seance) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_GET}`,
        params: {uid_seance},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const cinema_seance_discounts_groups_get = (filial) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_GROUPS_GET}`,
        params: {},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const cinema_seance_get = (filial, uid_seance) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_GET}`,
        params: {uid_seance},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const cinema_hall_get = (filial, uid_hall, type) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_HALL_GET}`,
        params: {uid_hall, type},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const horeca_menu_get = (filial, uid_folder, date_shift) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_MENU_GET}`,
        params: {uid_folder, date_shift},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_orders_filters_staff_get = (filial) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_STAFF_GET}`,
        params: {},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_orders_filters_schedule_get = (filial, date_shift) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDERS_FILTERS_SCHEDULE_GET}`,
        params: {date_shift},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_orders_filters_halls_get = (filial) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET}`,
        params: {},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_orders_filters_workplace_get = (filial) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_WORKPLACES_GET}`,
        params: {},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const horeca_orders_filters_kitchen_points_get = (filial) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_LIST_GET}`,
        params: {type: 'kitchen_points'},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const second_screen_schedule_get = (filial, date_shift) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_SCHEDULE_GET}`,
        params: {date_shift},
        filial,
        wp,
        kiosk,
        version,
    }, data => {
        dispatch(setSSSchedule(data))
    })
}

export const second_screen_seance_get = (filial, uid_seance) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_SEANCE_GET}`,
        params: {uid_seance},
        filial,
        wp,
        kiosk,
        version,
    }, data => {
        dispatch(setSSSeance(data))
    })
}

export const second_screen_pre_order_get = (filial, uid_order, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_PRE_ORDER_GET}`,
        params: {uid_order, ver},
        filial,
        wp,
        kiosk,
        version,
    }, data => {
        dispatch(setSSPreOrder(data))
    })
}

export const second_screen_horder_get = (filial, uid_order, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_HORDER_GET}`,
        params: {uid_order, ver},
        filial,
        wp,
        kiosk,
        version,
    }, data => {
        dispatch(setSSHorder(data))
    })
}

export const second_screen_booking_get = (filial, uid_seance, uid_order, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_BOOKING_GET}`,
        params: {uid_seance, uid_order, ver},
        filial,
        wp,
        kiosk,
        version,
    }, data => {
        dispatch(setSSBooking(data))
    })
}

export const common_catalog_get = (filial, type, uid, date_shift) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_CATALOG_GET}`,
        params: {type, uid, date_shift},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_payment_map_get = (filial, date_shift) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_PAYMENT_MAP_GET}`,
        params: {date_shift},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_documents_operations_get = (filial, page, update, details) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_OPERATIONS_GET}`,
        params: {page, update, details},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_documents_zbooks_get = (filial, date_shift, update) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_ZBOOKS_GET}`,
        params: {date_shift, update},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_documents_zbook_get = (filial, uid) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_ZBOOK_GET}`,
        params: {uid},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_documents_pinpads_get = (filial, date_shift, update) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_ZPINPADS_GET}`,
        params: {date_shift, update},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const horeca_modifications_get = (filial, uid_menu) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_MODIFICATIONS_GET}`,
        params: {uid_menu},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_payment_methods_get = (filial, uid_order, type, remote) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_PAYMENT_METHODS_GET}`,
        params: {uid_order, type, remote},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const cinema_orders_get = (filial, update, page, date_shift, staff, state, seances, halls, workplaces, buyer_emails, buyer_phone_number, from_site, from_kiosk, from_wp) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get', url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDERS_GET}`, params: {
            update,
            page,
            date_shift,
            staff,
            state,
            halls,
            seances,
            workplaces,
            buyer_phone_number,
            buyer_emails,
            from_site,
            from_kiosk,
            from_wp
        }, filial, wp, kiosk, version,
    }, data => data)
}

export const horeca_orders_get = (filial, update, page, date_shift, staff, state, halls, workplaces, kitchen_points, kitchen_state) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get', url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDERS_GET}`, params: {
            update, page, date_shift, staff, state, halls, workplaces, kitchen_points, kitchen_state
        }, filial, wp, kiosk, version,
    }, data => data)
}

export const common_order_find = (filial, type, value) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDER_FIND}`,
        params: {type, value},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const horeca_kitchen_get = (filial, date_shift, uid_kitchen_points_selected) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_KITCHEN_GET}`,
        params: {date_shift, uid_kitchen_points_selected},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const cinema_schedule_halls_get = (filial, date_shift, closed, canceled, opened, films, copy_types, age, halls, hall_type_vip, hall_type_regular, time, price, film_types) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get', url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SCHEDULE_GET_HALLS}`, params: {
            date_shift,
            closed,
            canceled,
            opened,
            films,
            copy_types,
            age,
            halls,
            hall_type_vip,
            hall_type_regular,
            time,
            price,
            film_types
        }, filial, wp, kiosk, version,
    }, data => data)
}

export const cinema_films_get = (filial, date_shift, closed, canceled, opened, films, copy_types, age, halls, hall_type_vip, hall_type_regular, time, price, film_types) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get', url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILMS_GET}`, params: {
            date_shift,
            closed,
            canceled,
            opened,
            films,
            copy_types,
            age,
            halls,
            hall_type_vip,
            hall_type_regular,
            time,
            price,
            film_types
        }, filial, wp, kiosk, version,
    }, data => data)
}

export const cinema_film_seances_get = (filial, date_shift, uid_film, closed, canceled, opened, films, copy_types, age, halls, hall_type_vip, hall_type_regular, time, price, film_types) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get', url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILM_GET_SEANCES}`, params: {
            date_shift,
            uid_film,
            closed,
            canceled,
            opened,
            films,
            copy_types,
            age,
            halls,
            hall_type_vip,
            hall_type_regular,
            time,
            price,
            film_types
        }, filial, wp, kiosk, version,
    }, data => data)
}

export const horeca_order_change_creator = (filial, uid_order, uid_creator, ver) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_CHANGE_CREATOR}`,
        params: {uid_order, uid_creator, ver},
        filial,
        wp,
        kiosk,
        version,
    }, data => {
        dispatch(setCurrentHorder(data))
        dispatch(setOrdersHorecaUpdate())
    })
}

export const common_printers_get = (filial) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${COMMON_PRINTERS_GET}`,
        params: {},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_documents_receipts_get = (filial, date_shift, uid_kkt) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_RECEIPTS_GET}`,
        params: {date_shift, uid_kkt},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}

export const common_documents_slips_get = (filial, date_shift, uid_pinpad) => async (dispatch, getState) => {
    const {wp, kiosk, version} = getState().interface
    return await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_SLIPS_GET}`,
        params: {date_shift, uid_pinpad},
        filial,
        wp,
        kiosk,
        version,
    }, data => data)
}