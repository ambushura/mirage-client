import {NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../redux/ordersReducer.js"
import {setBooking} from "../redux/scheduleReducer.js"
import axios from "axios"
import {addNotification} from "../redux/notifierReducer.js"

export const TIMEOUT = 130

export const fetchPreOrder = (filial, uid_order) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/get_preorder?uid_order=${uid_order}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token
                }})
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

export const deletePreOrder = (filial, uid_order) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
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

export const takeSeat = (city, filial, uid_seance, uid_order, uid_place, ver) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/${token !== null ? '' : 'kiosk/'}take_seat?uid_seance=${uid_seance}&uid_order=${uid_order}&uid_place=${uid_place}&ver=${ver}&uid_city=${city.uid}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token
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
                        Authorization: token
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

export const horeca_add = (filial, uid_order, ver_order, uid_menu, wp) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/horeca_add?uid_filial=${filial.uid}&uid_order=${uid_order}&ver=${ver_order}&uid_menu=${uid_menu}${wp !== undefined ? '&wp=' + wp : ''}`, {
                timeout: TIMEOUT,
                headers: {
                    Authorization: token
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

export const payment = (filial, pm, uid_order, ver, type, for_payment) => {
    const token = localStorage.getItem("token")
    return async (dispatch) => {
        try {
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