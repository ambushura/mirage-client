import axios from "axios"
import {
    NEW_EMPTY_ORDER,
    setCurrentHorder,
    setCurrentPreOrder
} from "../redux/ordersReducer.js"
import {setBooking} from "../redux/scheduleReducer.js"
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
    ROUTE_HORECA_POSITION_ADD_COMMENT, ROUTE_HORECA_POSITION_ADD_MARK,
    ROUTE_HORECA_POSITION_ADD_QUANTITY,
    ROUTE_HORECA_POSITION_AWAY,
    ROUTE_HORECA_POSITION_COOK,
    ROUTE_HORECA_POSITION_COURSE
} from "./fetch_routes.js"

export const TIMEOUT = 10000

const makeRequest = async (dispatch, config, onSuccess) => {
    try {
        const {wp, filial, errorMsg = 'не указано рабочее место'} = config
        if (!wp) throw new Error(errorMsg)
        const token = localStorage.getItem("token")
        const headers = {
            ...config.headers,
            Authorization: token,
            uid_filial: filial.uid,
            wp
        }
        const res = await axios({
            ...config,
            headers,
            timeout: config.timeout || TIMEOUT
        })
        if (onSuccess) onSuccess(res.data)
    } catch (e) {
        dispatch(addNotification({
            message: e?.response?.data || e.message,
            severity: 'error',
            autoHide: true
        }))
    }
}

export const login = (filial, wp, login_auth, pincode_auth, username, password) => async (dispatch) => {
    try {
        if (!wp) throw new Error("не указано рабочее место")
        const response = await axios.post(`http://${filial.ip}:${filial.port}${ROUTE_COMMON_LOGIN}`,
            {login_auth, pincode_auth, username, password},
            {
                headers: {
                    "Content-Type": "application/json",
                    uid_filial: filial.uid,
                    wp
                }
            })

        dispatch(loginSuccess(response.data))
    } catch (e) {
        dispatch(addNotification({
            message: e?.response?.data || e.message,
            severity: 'error',
            autoHide: true
        }))
    }
}

export const cinema_order_fetch = (filial, wp, uid_order) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDER_GET}`,
    params: {uid_order},
    wp,
    filial
}, data => dispatch(setCurrentPreOrder(data)))

export const horeca_order_fetch = (filial, wp, uid_order) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_GET}`,
    params: {uid_order},
    wp,
    filial
}, data => dispatch(setCurrentHorder(data)))

export const cinema_order_delete = (filial, wp, uid_order) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDER_DELETE}`,
    params: {uid_order},
    wp,
    filial
}, () => dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER())))

export const cinema_position_add = (city, filial, wp, uid_seance, uid_order, uid_place, ver) => async (dispatch) => {
    const token = localStorage.getItem("token")
    const url = `http://${filial.ip}:${filial.port}${token ? ROUTE_CINEMA_POSITION_ADD : ROUTE_CINEMA_KIOSK_POSITION_ADD}`

    await makeRequest(dispatch, {
        method: 'get',
        url,
        params: {uid_city: city.uid, uid_seance, uid_order, uid_place, ver},
        wp,
        filial
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

export const common_order_pay = (filial, wp, pm, uid_order, ver, type, for_payment) => async (dispatch) => makeRequest(dispatch, {
    method: 'post',
    url: `http://${filial.ip}:8081/api/payment-server/payment`,
    data: {
        uid_payment_type: pm.uid_payment_type,
        uid_kkt: pm.uid_kkt,
        uid_pinpad: pm.uid_pinpad,
        uid_work_place: pm.uid_work_place,
        uid_order,
        type,
        ver,
        for_payment
    },
    timeout: TIMEOUT * 2,
    wp,
    filial
})

export const cinema_discount_apply = (filial, wp, uid_order, uid_discount, uid_group_discount, comment, uid_positions) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_APPLY}`,
    params: {uid_order, uid_discount, uid_group_discount, uid_positions, comment},
    wp,
    filial
}, data => dispatch(setCurrentPreOrder(data)))

export const common_contact_add = (filial, wp, order_type, uid_order, buyer_s, buyer_n, buyer_o, buyer_phone_number, buyer_email) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDER_ADD_CONTACT}`,
    params: {order_type, uid_order, buyer_s, buyer_n, buyer_o, buyer_phone_number, buyer_email},
    wp,
    filial
}, data => dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data)))

export const common_order_add_comment = (filial, wp, order_type, uid_order, comment) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_ORDER_ADD_COMMENT : ROUTE_HORECA_ORDER_ADD_COMMENT}`,
    params: {uid_order, comment},
    wp,
    filial
}, data => dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data)))

export const common_position_add_comment = (filial, wp, order_type, uid_order, uid_position, comment) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_POSITION_ADD_COMMENT : ROUTE_HORECA_POSITION_ADD_COMMENT}`,
    params: {uid_order, uid_position, comment},
    wp,
    filial
}, data => dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data)))

export const horeca_position_add_quantity = (filial, wp, uid_order, uid_position, quantity) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_QUANTITY}`,
    params: {uid_order, uid_position, quantity},
    wp,
    filial
}, data => dispatch(setCurrentHorder(data)))

export const horeca_position_change_state = (filial, wp, uid_order, uid_position, action) => async (dispatch) => {
    const routes = {
        away: ROUTE_HORECA_POSITION_AWAY,
        course: ROUTE_HORECA_POSITION_COURSE,
        cook: ROUTE_HORECA_POSITION_COOK
    }
    const route = routes[action]
    if (!route) return
    await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${route}`,
        params: {uid_order, uid_position},
        wp,
        filial
    }, data => dispatch(setCurrentHorder(data)))
}

export const horeca_position_add_mark = (filial, wp, uid_order, uid_position, mark) => async (dispatch) => makeRequest(dispatch, {
    method: 'get',
    url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_MARK}`,
    params: {uid_order, uid_position, mark},
    wp,
    filial
}, data => dispatch(setCurrentHorder(data)))