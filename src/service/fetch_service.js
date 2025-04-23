import {NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../redux/ordersReducer.js"
import {setBooking} from "../redux/scheduleReducer.js"
import axios from "axios"
import {addNotification} from "../redux/notifierReducer.js"
import {loginSuccess} from "../redux/authReducer.js"

export const login = (filial, wp, login_auth, pincode_auth, username, password) => {
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            const response = await fetch(`http://${filial.ip}:${filial.port}/api/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({login_auth, pincode_auth, username, password})
            })
            if (!response.ok) {
                throw new Error(response.message)
            }
            const data = await response.json()
            if (data.code === 200) {
                dispatch(loginSuccess(data.data))
            } else {
                throw new Error(data.data)
            }
        } catch (e) {
            dispatch(addNotification({
                message: e.message,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const fetchPreOrder = (filial, wp, uid_order) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/get_preorder?uid_order=${uid_order}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token
                }
            })
            dispatch(setCurrentPreOrder(response.data.data))
        } catch (e) {
            dispatch(addNotification({
                message: e.message,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const fetchHorder = (filial, wp, uid_order) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        if (wp === undefined || wp.length === 0) {
            throw new Error("не указано рабочее место")
        }
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/get_horder?uid_order=${uid_order}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token
                }})
            dispatch(setCurrentHorder(response.data.data))
        } catch (e) {
            dispatch(addNotification({
                message: e.message,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const deletePreOrder = (filial, wp, uid_order) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            await axios.get(`http://${filial.ip}:${filial.port}/api/delete_preorder?uid_order=${uid_order}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token
                }
            })
            dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        } catch (e) {
            dispatch(addNotification({
                message: e.message,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const takeSeat = (city, filial, wp, uid_seance, uid_order, uid_place, ver) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/${token !== null ? '' : 'kiosk/'}take_seat?uid_seance=${uid_seance}&uid_order=${uid_order}&uid_place=${uid_place}&ver=${ver}&uid_city=${city.uid}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    wp: wp,
                }})
            if (response.data.code === 200) {
                if (response.data.data === null) {
                    dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                } else {
                    dispatch(setCurrentPreOrder(response.data.data))
                }
                const booking = await axios.get(`http://${filial.ip}:${filial.port}/api/get_booking?uid_seance=${uid_seance}&uid_order=${uid_order}`, {
                    timeout: TIMEOUT,
                    headers: {
                        Authorization: token,
                        workplace: wp,
                    }})
                dispatch(setBooking(booking.data.data))
            } else {
                dispatch(addNotification({
                    message: response.data.data,
                    severity: 'error',
                    autoHide: true
                }))
            }
        } catch (e) {
            dispatch(addNotification({
                message: e.message,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const horeca_add = (filial, wp, uid_order, ver_order, uid_menu) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/horeca_add?uid_filial=${filial.uid}&uid_order=${uid_order}&ver=${ver_order}&uid_menu=${uid_menu}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token,
                    wp: wp,
                }})
            if (response.data.code === 200) {
                dispatch(setCurrentHorder(response.data.data))
            } else {
                dispatch(addNotification({
                    message: response.data.data,
                    severity: 'error',
                    autoHide: true
                }))
            }
        } catch (e) {
            dispatch(addNotification({
                message: e.message,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const payment = (filial, wp, pm, uid_order, ver, type, for_payment) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            if (wp === undefined || wp.length === 0) {
                throw new Error("не указано рабочее место")
            }
            const response = await axios.post(`http://${filial.ip}:8081/api/payment-server/payment`, {
                uid_filial: filial.uid,
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
                    Authorization: token
                }})
            if (response.data.code === 500) {
                dispatch(addNotification({
                    message: response.data.data,
                    severity: 'error',
                    autoHide: true
                }))
            }
        } catch (e) {
            dispatch(addNotification({
                message: e.message,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const TIMEOUT = 2000