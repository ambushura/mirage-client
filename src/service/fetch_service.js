import {NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../redux/ordersReducer.js"
import {setBooking} from "../redux/scheduleReducer.js"
import axios from "axios"
import {addNotification} from "../redux/notifierReducer.js"
import {loginSuccess} from "../redux/authReducer.js"
import {
    ROUTE_CINEMA_DISCOUNTS_APPLY,
    ROUTE_CINEMA_KIOSK_POSITION_ADD,
    ROUTE_CINEMA_ORDER_ADD_COMMENT,
    ROUTE_CINEMA_ORDER_DELETE,
    ROUTE_CINEMA_ORDER_GET,
    ROUTE_CINEMA_POSITION_ADD,
    ROUTE_CINEMA_POSITION_ADD_COMMENT,
    ROUTE_CINEMA_SEANCE_GET_BOOKING,
    ROUTE_COMMON_LOGIN,
    ROUTE_COMMON_ORDER_ADD_CONTACT,
    ROUTE_HORECA_ORDER_ADD_COMMENT,
    ROUTE_HORECA_ORDER_GET,
    ROUTE_HORECA_POSITION_ADD,
    ROUTE_HORECA_POSITION_ADD_COMMENT,
    ROUTE_HORECA_POSITION_ADD_QUANTITY,
    ROUTE_HORECA_POSITION_AWAY, ROUTE_HORECA_POSITION_COOK,
    ROUTE_HORECA_POSITION_COURSE
} from "./fetch_routes.js"

export const login = (filial, wp, login_auth, pincode_auth, username, password) => {
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            const response = await axios.post(`http://${filial.ip}:${filial.port}${ROUTE_COMMON_LOGIN}`,
                {login_auth, pincode_auth, username, password},
                {
                    headers: {
                        "Content-Type": "application/json",
                        uid_filial: filial.uid,
                        wp: wp,
                    },
                })
            dispatch(loginSuccess(response.data))
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const cinema_order_fetch = (filial, wp, uid_order) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            const response = await axios.get(`http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDER_GET}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp
                },
                params: {
                    uid_order: uid_order,
                }
            })
            dispatch(setCurrentPreOrder(response.data))
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const horeca_order_fetch = (filial, wp, uid_order) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        if (wp === undefined || wp.length === 0) {
            throw new Error("не указано рабочее место")
        }
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_GET}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                },
                params: {
                    uid_order: uid_order,
                }
            })
            dispatch(setCurrentHorder(response.data))
        } catch (e) {
            dispatch(addNotification({
                message: e.message,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const cinema_order_delete = (filial, wp, uid_order) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            await axios.get(`http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDER_DELETE}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp
                },
                params: {
                    uid_order: uid_order,
                }
            })
            dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const cinema_position_add = (city, filial, wp, uid_seance, uid_order, uid_place, ver) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            const response = await axios.get(`http://${filial.ip}:${filial.port}${token !== null ? ROUTE_CINEMA_POSITION_ADD : ROUTE_CINEMA_KIOSK_POSITION_ADD}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                },
                params: {
                    uid_city: city.uid,
                    uid_seance: uid_seance,
                    uid_order: uid_order,
                    uid_place: uid_place,
                    ver: ver,
                }
            })
            if (response.data === null) {
                dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
            } else {
                dispatch(setCurrentPreOrder(response.data))
            }
            const booking = await axios.get(`http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_GET_BOOKING}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                },
                params: {
                    uid_seance: uid_seance,
                    uid_order: uid_order,
                }
            })
            dispatch(setBooking(booking.data))
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const horeca_position_add = (filial, wp, uid_order, ver, uid_menu) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            const response = await axios.get(`http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                },
                params: {
                    uid_order: uid_order,
                    ver: ver,
                    uid_menu: uid_menu,
                }
            })
            dispatch(setCurrentHorder(response.data))
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const common_order_pay = (filial, wp, pm, uid_order, ver, type, for_payment) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            const response = await axios.post(`http://${filial.ip}:8081/api/payment-server/payment`, {
                uid_payment_type: pm.uid_payment_type,
                uid_kkt: pm.uid_kkt,
                uid_pinpad: pm.uid_pinpad,
                uid_work_place: pm.uid_work_place,
                uid_order: uid_order,
                type: type,
                ver: ver,
                for_payment: for_payment,
            }, {
                timeout: TIMEOUT * 2,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                }
            })
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const cinema_discount_apply = (filial, wp, uid_order, uid_discount, uid_group_discount, comment, uid_positions) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        if (wp === undefined || wp.length === 0) {
            throw new Error("не указано рабочее место")
        }
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_APPLY}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                },
                params: {
                    uid_order: uid_order,
                    uid_discount: uid_discount,
                    uid_group_discount: uid_group_discount,
                    uid_positions: uid_positions,
                    comment: comment,
                },
            })
            dispatch(setCurrentPreOrder(response.data))
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const common_contact_add = (filial, wp, order_type, uid_order, buyer_s, buyer_n, buyer_o, buyer_phone_number, buyer_email) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        if (wp === undefined || wp.length === 0) {
            throw new Error("не указано рабочее место")
        }
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDER_ADD_CONTACT}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                },
                params: {
                    order_type: order_type,
                    uid_order: uid_order,
                    buyer_s: buyer_s,
                    buyer_n: buyer_n,
                    buyer_o: buyer_o,
                    buyer_phone_number: buyer_phone_number,
                    buyer_email: buyer_email,
                },
            })
            if (order_type === 'cinema') {
                dispatch(setCurrentPreOrder(response.data))
            } else {
                dispatch(setCurrentHorder(response.data))
            }
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const common_order_add_comment = (filial, wp, order_type, uid_order, comment) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        if (wp === undefined || wp.length === 0) {
            throw new Error("не указано рабочее место")
        }
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_ORDER_ADD_COMMENT : ROUTE_HORECA_ORDER_ADD_COMMENT}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                },
                params: {
                    uid_order: uid_order,
                    comment: comment,
                },
            })
            if (order_type === 'cinema') {
                dispatch(setCurrentPreOrder(response.data))
            } else {
                dispatch(setCurrentHorder(response.data))
            }
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const common_position_add_comment = (filial, wp, order_type, uid_order, uid_position, comment) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        if (wp === undefined || wp.length === 0) {
            throw new Error("не указано рабочее место")
        }
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_POSITION_ADD_COMMENT : ROUTE_HORECA_POSITION_ADD_COMMENT}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                },
                params: {
                    uid_order: uid_order,
                    uid_position: uid_position,
                    comment: comment,
                },
            })
            if (order_type === 'cinema') {
                dispatch(setCurrentPreOrder(response.data))
            } else {
                dispatch(setCurrentHorder(response.data))
            }
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const horeca_position_add_quantity = (filial, wp, uid_order, uid_position, quantity) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        if (wp === undefined || wp.length === 0) {
            throw new Error("не указано рабочее место")
        }
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_QUANTITY}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                },
                params: {
                    uid_order: uid_order,
                    uid_position: uid_position,
                    quantity: quantity,
                },
            })
            dispatch(setCurrentHorder(response.data))
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const horeca_position_change_state = (filial, wp, uid_order, uid_position, action) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        if (wp === undefined || wp.length === 0) {
            throw new Error("не указано рабочее место")
        }
        let request = ''
        switch (action) {
            case 'away':
                request = ROUTE_HORECA_POSITION_AWAY
                break
            case 'course':
                request = ROUTE_HORECA_POSITION_COURSE
                break
            case 'cook':
                request = ROUTE_HORECA_POSITION_COOK
                break
            default:
                return
        }
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}${request}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    uid_filial: filial.uid,
                    wp: wp,
                },
                params: {
                    uid_order: uid_order,
                    uid_position: uid_position,
                },
            })
            dispatch(setCurrentHorder(response.data))
        } catch (e) {
            dispatch(addNotification({
                message: e.response.data,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const TIMEOUT = 10000