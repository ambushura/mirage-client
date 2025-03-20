import {NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../redux/ordersReducer.js"
import {setBooking} from "../redux/scheduleReducer.js"
import axios from "axios"
import {addNotification} from "../redux/notifierReducer.js"

export const TIMEOUT = 5000

export const fetchPreOrder = (filial, uid_order) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/get_preorder?uid_order=${uid_order}`, {timeout: TIMEOUT})
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
    return async (dispatch) => {
        try {
            await axios.get(`http://${filial.ip}:${filial.port}/api/delete_preorder?uid_order=${uid_order}`, {timeout: TIMEOUT}).then(
                () => {
                    dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                }
            )
        } catch (e) {
            dispatch(addNotification({
                message: e.message,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}

export const takeSeat = (filial, uid_seance, uid_order, uid_place, ver) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/take_seat?uid_seance=${uid_seance}&uid_order=${uid_order}&uid_place=${uid_place}&ver=${ver}`, {timeout: 5000})
            if (response.data.code === 200) {
                if (response.data.data === null) {
                    dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                } else {
                    dispatch(setCurrentPreOrder(response.data.data))
                }
                const booking = await axios.get(`http://${filial.ip}:${filial.port}/api/get_booking?uid_seance=${uid_seance}&uid_order=${uid_order}`, {timeout: 5000})
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
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/horeca_add?uid_filial=${filial.uid}&uid_order=${uid_order}&ver_order=${ver_order}&uid_menu=${uid_menu}${wp !== undefined ? '&wp=' + wp : ''}`, {timeout: TIMEOUT})
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

export const payment = (filial, uid_order, wp) => {
    return async (dispatch) => {
        try {
            await axios.get(`http://${filial.ip}:8081/api/payment-server/payment?uid_filial=${filial.uid}&uid_order=${uid_order}&wp=${wp}`, {timeout: 5000})
        } catch (e) {
            dispatch(addNotification({
                message: e.message,
                severity: 'error',
                autoHide: true
            }))
        }
    }
}