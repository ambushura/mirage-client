import {NEW_EMPTY_ORDER, setCurrentPreOrder} from "../redux/ordersReducer.js"
import {setBooking} from "../redux/scheduleReducer.js"
export const fetchPreOrder = (filial, uid_order) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://${filial.ip}:${filial.port}/api/get_preorder?uid_order=${uid_order}`)
            const response_json = await response.json()
            dispatch(setCurrentPreOrder(response_json.data))
        } catch (e) {
            console.error(e)
        }
    }
}
export const deletePreOrder = (filial, uid_order) => {
    return async (dispatch) => {
        try {
            await fetch(`http://${filial.ip}:${filial.port}/api/delete_preorder?uid_order=${uid_order}`).then(
                () => {
                    dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                }
            )
        } catch (e) {
            console.error(e)
        }
    }
}
export const takeSeat = (filial, uid_seance, uid_order, uid_place) => {
    return async (dispatch) => {
        try {
            await fetch(`http://${filial.ip}:${filial.port}/api/take_seat?uid_seance=${uid_seance}&uid_order=${uid_order}&uid_place=${uid_place}`)
            const booking_result = await fetch(`http://${filial.ip}:${filial.port}/api/get_booking?uid_seance=${uid_seance}&uid_order=${uid_order}`)
            const booking = await booking_result.json()
            dispatch(setBooking(booking.data))
            dispatch(fetchPreOrder(filial, uid_order))
        } catch (e) {
            console.error(e)
        }
     }
}
export const payment = (filial, uid_order, name_workplace) => {
    return async () => {
        try {
            await fetch(`http://${filial.ip}:8081/api/payment-server/payment?uid_filial=${filial.uid}&uid_order=${uid_order}&name_workplace=${name_workplace}`)
        } catch (e) {
            console.error(e)
        }
    }
}
export const horeca_add = (filial, uid_order, uid_item) => {
    return async () => {
        try {
            await fetch(`http://${filial.ip}:${filial.port}/api/horeca_add?uid_filial=${filial.uid}&uid_order=${uid_order}&uid_item=${uid_item}`)
        } catch (e) {
            console.error(e)
        }
    }
}