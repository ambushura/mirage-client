import axios from "axios"
import {
    NEW_EMPTY_HORDER,
    NEW_EMPTY_ORDER,
    pushKitchenPositions,
    setCurrentHorder,
    setCurrentPreOrder, setHorderPaying, setHorderPreparing,
    setOrdersCinemaUpdate,
    setOrdersHorecaUpdate, setPreOrderPaying, setPreOrderPreparing
} from "../redux/ordersReducer.js"
import {setBooking, setSeance} from "../redux/scheduleReducer.js"
import {addNotification} from "../redux/notifierReducer.js"
import {loginSuccess} from "../redux/authReducer.js"
import {
    ROUTE_CINEMA_DISCOUNTS_APPLY,
    ROUTE_CINEMA_KIOSK_POSITION_ADD,
    ROUTE_CINEMA_ORDER_ADD_COMMENT,
    ROUTE_CINEMA_ORDER_DELETE,
    ROUTE_CINEMA_ORDER_DELETE_COMMENT,
    ROUTE_CINEMA_ORDER_GET,
    ROUTE_CINEMA_PLACE_BLOCK,
    ROUTE_CINEMA_POSITION_ADD,
    ROUTE_CINEMA_POSITION_ADD_COMMENT,
    ROUTE_CINEMA_POSITION_DELETE_COMMENT, ROUTE_CINEMA_SEANCE_CLOSE,
    ROUTE_CINEMA_SEANCE_GET_BOOKING,
    ROUTE_COMMON_LOGIN,
    ROUTE_COMMON_ORDER_ADD_CONTACT,
    ROUTE_COMMON_ORDER_PAYMENT,
    ROUTE_COMMON_ORDER_PAYMENT_KIOSK,
    ROUTE_COMMON_ORDERS_GET_RECEIPTS,
    ROUTE_EQUIPMENT_KKT_OPEN_BOX,
    ROUTE_EQUIPMENT_KKT_X,
    ROUTE_EQUIPMENT_KKT_Z,
    ROUTE_EQUIPMENT_PINPAD_X,
    ROUTE_EQUIPMENT_PINPAD_Z,
    ROUTE_EQUIPMENT_WORKPLACE_RESET, ROUTE_EQUIPMENT_WORKPLACE_TURN_OFF, ROUTE_EQUIPMENT_WORKPLACE_TURN_ON,
    ROUTE_HORECA_KITCHEN_PUSH,
    ROUTE_HORECA_ORDER_ADD_COMMENT,
    ROUTE_HORECA_ORDER_DELETE,
    ROUTE_HORECA_ORDER_DELETE_COMMENT,
    ROUTE_HORECA_ORDER_GET,
    ROUTE_HORECA_POSITION_ADD,
    ROUTE_HORECA_POSITION_ADD_COMMENT,
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
    ROUTE_PL_ESTIMATE_DISCOUNTS
} from "./fetch_routes.js"
import {fillHosts} from "../redux/markirovkaReducer.js"
import {setHall} from "../redux/hallsReducer.js"

export const TIMEOUT = 10000

const makeRequest = async (dispatch, config, onSuccess) => {
    try {
        const {wp, filial, errorMsg = 'не указано рабочее место'} = config
        if (!wp) throw new Error(errorMsg)
        const token = localStorage.getItem("token")
        const headers = {
            ...config.headers, Authorization: token, uid_filial: filial.uid, wp
        }
        const res = await axios({
            ...config, headers, timeout: config.timeout || TIMEOUT
        })
        if (onSuccess) onSuccess(res.data)
    } catch (e) {
        dispatch(addNotification({
            message: e?.response?.data || e.message, severity: 'error', autoHide: true
        }))
    }
}

export const login = (filial, wp, login_auth, pincode_auth, username, password) => async (dispatch) => {
    try {
        if (!wp) throw new Error("не указано рабочее место")
        const response = await axios.post(`http://${filial.ip}:${filial.port}${ROUTE_COMMON_LOGIN}`, {
            login_auth,
            pincode_auth,
            username,
            password
        }, {
            headers: {
                "Content-Type": "application/json", uid_filial: filial.uid, wp
            }
        })
        dispatch(loginSuccess(response.data))
    } catch (e) {
        dispatch(addNotification({
            message: e?.response?.data || e.message, severity: 'error', autoHide: true
        }))
    }
}

export const cinema_order_fetch = (filial, wp, uid_order) => async (dispatch) => makeRequest(dispatch, {
    method: 'get', url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDER_GET}`, params: {uid_order}, wp, filial
}, data => dispatch(setCurrentPreOrder(data)))

export const horeca_order_fetch = (filial, wp, uid_order) => async (dispatch) => makeRequest(dispatch, {
    method: 'get', url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_GET}`, params: {uid_order}, wp, filial
}, data => dispatch(setCurrentHorder(data)))

export const common_orders_receipts_get = (filial, wp, type, uid_order) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_GET_RECEIPTS}`,
    params: {uid_order: uid_order, type: type},
    wp,
    filial
}, data => {
    if (type === 'cinema') {
        dispatch(setCurrentPreOrder(data))
        dispatch(setPreOrderPreparing(true))
    } else if (type === 'horeca') {
        dispatch(setCurrentHorder(data))
        dispatch(setHorderPreparing(true))
    }
})

export const cinema_order_delete = (filial, wp, uid_order) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDER_DELETE}`,
    params: {uid_order},
    wp,
    filial
}, () => {
    dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
    dispatch(setOrdersCinemaUpdate())
})

export const horeca_order_delete = (filial, wp, uid_order) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_DELETE}`,
    params: {uid_order},
    wp,
    filial
}, () => {
    dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
    dispatch(setOrdersHorecaUpdate())
})

export const cinema_position_add = (city, filial, wp, uid_seance, uid_order, uid_place, ver) => async (dispatch) => {
    const token = localStorage.getItem("token")
    const url = `http://${filial.ip}:${filial.port}${token ? ROUTE_CINEMA_POSITION_ADD : ROUTE_CINEMA_KIOSK_POSITION_ADD}`

    await makeRequest(dispatch, {
        method: 'get', url, params: {uid_city: city.uid, uid_seance, uid_order, uid_place, ver}, wp, filial
    }, async (data) => {
        dispatch(setCurrentPreOrder(data || NEW_EMPTY_ORDER()))
        await makeRequest(dispatch, {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_GET_BOOKING}`,
            params: {uid_seance, uid_order},
            wp,
            filial
        }, (booking) => dispatch(setBooking(booking)))
    })
}

export const horeca_position_add = (filial, wp, uid_order, ver, uid_menu) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD}`,
    params: {uid_order, ver, uid_menu},
    wp,
    filial
}, data => dispatch(setCurrentHorder(data)))

export const common_order_pay = (filial, wp, pm, uid_order, ver, type, payment_group) => async (dispatch) => makeRequest(dispatch, {
    method: 'post', url: `http://${filial.ip}:${ROUTE_MAIN_HOST.payment_port}${ROUTE_COMMON_ORDER_PAYMENT}`, data: {
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
        kiosk: false
    }, timeout: TIMEOUT * 60,
    wp,
    filial
}, data => {
    if (data.order !== null) {
        if (data.errors.length === 0) {
            dispatch(type === 'cinema' ? setCurrentPreOrder(NEW_EMPTY_ORDER()) : setCurrentHorder(NEW_EMPTY_HORDER()))
            dispatch(type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
        } else {
            dispatch(type === 'cinema' ? setCurrentPreOrder(data.order) : setCurrentHorder(data.order))
            dispatch(type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
        }
    }
    data.errors.forEach(error => {
        dispatch(addNotification({
            message: error, severity: 'error', autoHide: true
        }))
    })
    dispatch(type === 'cinema' ? setPreOrderPaying(false) : setHorderPaying(false))
})

export const common_order_pay_kiosk = (filial, wp, uid_order, ver, type, payment_group) => async (dispatch) => makeRequest(dispatch, {
        method: 'post',
        url: `http://${filial.ip}:${ROUTE_MAIN_HOST.payment_port}${ROUTE_COMMON_ORDER_PAYMENT_KIOSK}`,
        data: {
            uid_filial: filial.uid,
            uid_work_place: wp,
            uid_order,
            type,
            ver,
            payment_group,
            kiosk: true
        },
        timeout: TIMEOUT * 60,
        wp,
        filial
    }, data => {
        if (data.order !== null) {
            if (data.errors.length === 0) {
                dispatch(type === 'cinema' ? setCurrentPreOrder(NEW_EMPTY_ORDER()) : setCurrentHorder(NEW_EMPTY_HORDER()))
                dispatch(type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
            } else {
                dispatch(type === 'cinema' ? setCurrentPreOrder(data.order) : setCurrentHorder(data.order))
                dispatch(type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
            }
        }
        data.errors.forEach(error => {
            alert(error)
        })
        dispatch(type === 'cinema' ? setPreOrderPaying(false) : setHorderPaying(false))
    }
)

export const cinema_discount_apply = (filial, wp, uid_order, uid_discount, uid_group_discount, comment, uid_positions) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_APPLY}`,
    params: {uid_order, uid_discount, uid_group_discount, uid_positions, comment},
    wp,
    filial
}, data => {
    dispatch(setCurrentPreOrder(data))
    dispatch(setOrdersCinemaUpdate())
})

export const common_contact_add = (filial, wp, order_type, uid_order, buyer_s, buyer_n, buyer_o, buyer_phone_number, buyer_email) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDER_ADD_CONTACT}`,
    params: {order_type, uid_order, buyer_s, buyer_n, buyer_o, buyer_phone_number, buyer_email},
    wp,
    filial
}, data => {
    dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
    dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
})

export const common_order_add_comment = (filial, wp, order_type, uid_order, comment) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_ORDER_ADD_COMMENT : ROUTE_HORECA_ORDER_ADD_COMMENT}`,
    params: {uid_order, comment},
    wp,
    filial
}, data => {
    dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
    dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
})

export const common_order_delete_comment = (filial, wp, order_type, uid_order) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_ORDER_DELETE_COMMENT : ROUTE_HORECA_ORDER_DELETE_COMMENT}`,
    params: {uid_order},
    wp,
    filial
}, data => {
    dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
    dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
})

export const common_position_add_comment = (filial, wp, order_type, uid_order, uid_position, comment) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_POSITION_ADD_COMMENT : ROUTE_HORECA_POSITION_ADD_COMMENT}`,
    params: {uid_order, uid_position, comment},
    wp,
    filial
}, data => {
    dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
    dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
})

export const common_position_delete_comment = (filial, wp, order_type, uid_order, uid_position) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_POSITION_DELETE_COMMENT : ROUTE_HORECA_POSITION_DELETE_COMMENT}`,
    params: {uid_order, uid_position},
    wp,
    filial
}, data => {
    dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
    dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
})

export const horeca_position_add_quantity = (filial, wp, uid_order, uid_position, quantity) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_QUANTITY}`,
    params: {uid_order, uid_position, quantity},
    wp,
    filial
}, data => {
    dispatch(setCurrentHorder(data))
    dispatch(setOrdersHorecaUpdate())
})

export const horeca_position_change_state = (filial, wp, uid_order, uid_position, action) => async (dispatch) => {
    const routes = {
        away: ROUTE_HORECA_POSITION_AWAY, course: ROUTE_HORECA_POSITION_COURSE, cook: ROUTE_HORECA_POSITION_COOK
    }
    const route = routes[action]
    if (!route) return
    await makeRequest(dispatch, {
        method: 'get', url: `http://${filial.ip}:${filial.port}${route}`, params: {uid_order, uid_position}, wp, filial
    }, data => {
        dispatch(setCurrentHorder(data))
        dispatch(setOrdersHorecaUpdate())
    })
}

export const horeca_position_add_mark = (filial, wp, uid_order, uid_position, mark) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_MARK}`,
    params: {uid_order: uid_order, uid_position: uid_position, mark: mark},
    wp,
    filial
}, data => {
    dispatch(setCurrentHorder(data))
    dispatch(setOrdersHorecaUpdate())
})

export const markirovka_cdn_info_get = (filial, wp) => async (dispatch) => makeRequest(dispatch, {
    method: 'get', url: `http://${filial.ip}:${filial.port}${ROUTE_MARKIROVKA_CDN_INFO_GET}`, params: {}, wp, filial
}, data => dispatch(fillHosts(data)))

export const markirovka_cdn_info_update = (filial, wp) => async (dispatch) => makeRequest(dispatch, {
    method: 'get', url: `http://${filial.ip}:${filial.port}${ROUTE_MARKIROVKA_CDN_INFO_UPDATE}`, params: {}, wp, filial
}, data => dispatch(fillHosts(data)))

export const horeca_position_delete = (filial, wp, uid_order, uid_position) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_DELETE}`,
    params: {uid_order: uid_order, uid_position: uid_position},
    wp,
    filial
}, data => {
    dispatch(setCurrentHorder(data))
    dispatch(setOrdersHorecaUpdate())
})

export const horeca_kitchen_push = (filial, wp, uid_order, uid_position) => async (dispatch) => {
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_KITCHEN_PUSH}`,
        params: {
            uid_order: uid_order,
            uid_position: uid_position
        },
        wp,
        filial
    }, data => {
        dispatch(pushKitchenPositions(data))
    })
}

export const cinema_place_block = (filial, wp, hall, uid_place) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_PLACE_BLOCK}`,
    params: {
        uid_hall: hall.uid,
        uid_place: uid_place
    },
    wp,
    filial
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

export const pl_estimate_discounts = (filial, wp, uid_order, order_type, card) => async (dispatch) => {
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_PL_ESTIMATE_DISCOUNTS}`,
        params: {
            uid_order: uid_order,
            type: order_type,
            card: card,
        },
        wp,
        filial
    }, data => {
        dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
        dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
    })
}

export const equipment_action = (filial, wp, route, params) => async (dispatch) => {
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${ROUTE_MAIN_HOST.payment_port}${route}`,
        params: params,
        wp,
        filial
    })
}

export const cinema_seance_close = (filial, wp, uid_seance, reason, comment) => async (dispatch) => {
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_CLOSE}`,
        params: {
            uid_seance: uid_seance,
            reason: reason,
            comment: comment
        },
        wp,
        filial
    }, data => {
        dispatch(setSeance(data))
    })
}