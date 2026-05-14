import axios from 'axios'
import {
    NEW_EMPTY_HORDER,
    NEW_EMPTY_ORDER,
    pushKitchenPositions,
    setCurrentHorder,
    setCurrentPreOrder,
    setHorderPreparing,
    setKioskPaymentError,
    setKitchenPointsList,
    setOrdersCinemaUpdate,
    setOrdersHorecaUpdate,
    setPreOrderPreparing,
} from '../redux/frontoffice/ordersReducer.js'
import { setBooking, setSeance } from '../redux/frontoffice/scheduleReducer.js'
import { addNotification } from '../redux/frontoffice/notifierReducer.js'
import { loginSuccess, logout } from '../redux/frontoffice/authReducer.js'
import { fillHosts } from '../redux/frontoffice/markirovkaReducer.js'
import { setHall } from '../redux/frontoffice/hallsReducer.js'
import { setKKTList, setPinpadList, setZBooksUpdate, setZPinpadsUpdate } from '../redux/frontoffice/documentsReducer.js'
import { setSSBooking, setSSHorder, setSSPreOrder, setSSSchedule, setSSSeance } from '../redux/frontoffice/secondScreenReducer.js'
import { setNeedUpdate } from '../redux/frontoffice/interfaceReducer.js'
import { setCandy } from '../redux/frontoffice/dataReducer.js'
import { jwtDecode } from 'jwt-decode'
import {
    setGoods,
    setGoodsLoading,
    setGoodsRecipe,
    setGoodsRecipeLoading,
    setGoodsRecipes,
    setGoodsRecipesLoading,
    setOrderHorecaCenter,
    setOrderHorecaLoadingState,
    setOrdersHorecaCenter,
    setOrdersHorecaLoadingState,
    setProductionState,
    setProductionStateLoadingState,
    setShiftState,
    setShiftStateLoadingState,
    setStoreState,
    setStoreStateLoadingState,
    setTree,
    setTreeLoading,
} from '../redux/backoffice/centerHorecaReducer.js'
import { fill_name_map } from '../backoffice/page/Common.jsx'

export const ROUTE_MAIN_HOST = {
    ip: '10.101.3.88',
    port: 60000,
    payment_port: 60001,
    ws_port: 60002,
}

// region FRONT / КОНСТАНТЫ

export const ROUTE_COMMON_LOGIN = '/api/common/login'
export const ROUTE_COMMON_CITIES_GET = '/api/common/cities/get'
export const ROUTE_COMMON_ORDER_ADD_CONTACT = '/api/common/order/add/contact'
export const ROUTE_COMMON_ORDERS_GET_RECEIPTS = '/api/common/orders/get_receipts'
export const ROUTE_COMMON_PAYMENT_METHODS_GET = '/api/common/payment_methods/get'
export const ROUTE_COMMON_ORDERS_FILTERS_STAFF_GET = '/api/common/orders/filters/staff/get'
export const ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET = '/api/common/orders/filters/halls/get'
export const ROUTE_COMMON_ORDERS_FILTERS_WORKPLACES_GET = '/api/common/orders/filters/workplaces/get'
export const ROUTE_COMMON_PAYMENT_MAP_GET = '/api/common/payment_map/get'
export const ROUTE_COMMON_ORDER_FIND = '/api/common/order/find'
export const ROUTE_COMMON_ORDER_PAYMENT = '/api/common/order/payment'
export const ROUTE_COMMON_ORDER_PAYMENT_KIOSK = '/api/common/order/payment_kiosk'
export const ROUTE_EQUIPMENT_KKT_OPEN_BOX = '/api/equipment/kkt/open_box'
export const ROUTE_EQUIPMENT_KKT_X = '/api/equipment/kkt/x'
export const ROUTE_EQUIPMENT_KKT_Z = '/api/equipment/kkt/z'
export const ROUTE_EQUIPMENT_KKT_CLOCK_RESET = '/api/equipment/kkt/clock_reset'
export const ROUTE_EQUIPMENT_KKT_BILL_PRINT = '/api/equipment/kkt/bill/print'
export const ROUTE_EQUIPMENT_KKT_TICKETS_PRINT = '/api/equipment/kkt/tickets/print'
export const ROUTE_EQUIPMENT_PINPAD_X = '/api/equipment/pinpad/x'
export const ROUTE_EQUIPMENT_PINPAD_Z = '/api/equipment/pinpad/z'
export const ROUTE_EQUIPMENT_WORKPLACE_RESET = '/api/equipment/workplace/reset'
export const ROUTE_EQUIPMENT_WORKPLACE_TURN_OFF = '/api/equipment/workplace/turn_off'
export const ROUTE_EQUIPMENT_WORKPLACE_TURN_ON = '/api/equipment/workplace/turn_on'
export const ROUTE_EQUIPMENT_KKT_REBOOT = '/api/equipment/kkt/reboot'
export const ROUTE_EQUIPMENT_KKT_CANCEL_LAST_DOCUMENT = '/api/equipment/kkt/cancel_last_document'
export const ROUTE_MARKIROVKA_CDN_INFO_GET = '/api/markirovka/cdn/info/get'
export const ROUTE_MARKIROVKA_CDN_INFO_UPDATE = '/api/markirovka/cdn/info/update'
export const ROUTE_CINEMA_DISCOUNTS_GET = '/api/cinema/discounts/get'
export const ROUTE_CINEMA_DISCOUNTS_GROUPS_GET = '/api/cinema/discounts/groups/get'
export const ROUTE_CINEMA_DISCOUNTS_APPLY = '/api/cinema/discounts/apply'
export const ROUTE_CINEMA_ORDERS_GET = '/api/cinema/orders/get'
export const ROUTE_CINEMA_ORDER_GET = '/api/cinema/order/get'
export const ROUTE_CINEMA_ORDER_DELETE = '/api/cinema/order/delete'
export const ROUTE_CINEMA_ORDER_ADD_COMMENT = '/api/cinema/order/add/comment'
export const ROUTE_CINEMA_ORDER_DELETE_COMMENT = '/api/cinema/order/delete/comment'
export const ROUTE_CINEMA_ORDERS_FILTERS_SCHEDULE_GET = '/api/cinema/orders/filters/schedule/get'
export const ROUTE_CINEMA_SEANCE_CREATE7 = '/api/cinema/seance/create7'
export const ROUTE_CINEMA_SEANCE_CLOSE = '/api/cinema/seance/close'
export const ROUTE_CINEMA_SEANCE_GET = '/api/cinema/seance/get'
export const ROUTE_CINEMA_SEANCE_GET_BOOKING = '/api/cinema/seance/get_booking'
export const ROUTE_CINEMA_PLACE_BLOCK = '/api/cinema/place/block'
export const ROUTE_CINEMA_POSITION_ADD = '/api/cinema/position/add'
export const ROUTE_CINEMA_POSITION_ADD_COMMENT = '/api/cinema/position/add/comment'
export const ROUTE_CINEMA_POSITION_DELETE_COMMENT = '/api/cinema/position/delete/comment'
export const ROUTE_CINEMA_FILMS_GET = '/api/cinema/films/get'
export const ROUTE_CINEMA_FILM_GET_SEANCES = '/api/cinema/film/get_seances'
export const ROUTE_CINEMA_SCHEDULE_GET_HALLS = '/api/cinema/schedule/get_halls'
export const ROUTE_CINEMA_HALL_GET = '/api/cinema/hall/get'
export const ROUTE_CINEMA_FILTERS_FILMS_GET = '/api/cinema/filters/films/get'
export const ROUTE_HORECA_ORDER_GET = '/api/horeca/order/get'
export const ROUTE_HORECA_ORDERS_GET = '/api/horeca/orders/get'
export const ROUTE_HORECA_ORDER_ADD_TABLE = '/api/horeca/order/add_table'
export const ROUTE_HORECA_ORDER_DELETE = '/api/horeca/order/delete'
export const ROUTE_HORECA_ORDER_DELETE_TABLE = '/api/horeca/order/delete_table'
export const ROUTE_HORECA_ORDER_SEPARATE = '/api/horeca/order/separate'
export const ROUTE_HORECA_ORDER_ADD_COMMENT = '/api/horeca/order/add/comment'
export const ROUTE_HORECA_ORDER_DELETE_COMMENT = '/api/horeca/order/delete/comment'
export const ROUTE_HORECA_ORDER_CHANGE_CREATOR = '/api/horeca/order/change_creator'
export const ROUTE_HORECA_MENU_GET = '/api/horeca/menu/get'
export const ROUTE_HORECA_MODIFICATIONS_GET = '/api/horeca/modifications/get'
export const ROUTE_HORECA_POSITION_ADD = '/api/horeca/position/add'
export const ROUTE_HORECA_POSITION_ADD_QUANTITY = '/api/horeca/position/add/quantity'
export const ROUTE_HORECA_POSITION_ADD_EGAIS = '/api/horeca/position/add/egais'
export const ROUTE_HORECA_POSITION_ADD_MARK = '/api/horeca/position/add/mark'
export const ROUTE_HORECA_POSITION_DELETE = '/api/horeca/position/delete'
export const ROUTE_HORECA_POSITION_ADD_COMMENT = '/api/horeca/position/add/comment'
export const ROUTE_HORECA_POSITION_DELETE_COMMENT = '/api/horeca/position/delete/comment'
export const ROUTE_HORECA_KITCHEN_GET = '/api/horeca/kitchen/get'
export const ROUTE_HORECA_KITCHEN_ORDER_GET = '/api/horeca/kitchen/order/get'
export const ROUTE_HORECA_KITCHEN_PUSH = '/api/horeca/kitchen/push'
export const ROUTE_HORECA_POSITION_AWAY = '/api/horeca/position/away'
export const ROUTE_HORECA_POSITION_COOK = '/api/horeca/position/cook'
export const ROUTE_HORECA_POSITION_COURSE = '/api/horeca/position/course'
export const ROUTE_COMMON_CATALOG_GET = '/api/common/catalog/get'
export const ROUTE_PL_ESTIMATE_DISCOUNTS = '/api/pl/estimate_discounts'
export const ROUTE_COMMON_DOCUMENTS_ZBOOKS_GET = '/api/common/documents/zbooks/get'
export const ROUTE_COMMON_DOCUMENTS_ZBOOK_GET = '/api/common/documents/zbook/get'
export const ROUTE_COMMON_DOCUMENTS_ZBOOK_SAVE = '/api/common/documents/zbook/save'
export const ROUTE_COMMON_DOCUMENTS_ZBOOK_DELETE = '/api/common/documents/zbook/delete'
export const ROUTE_COMMON_DOCUMENTS_ZPINPADS_GET = '/api/common/documents/zpinpads/get'
export const ROUTE_COMMON_DOCUMENTS_OPERATIONS_GET = '/api/common/documents/operations/get'
export const ROUTE_COMMON_DOCUMENTS_OPERATION_GET = '/api/common/documents/operation/get'
export const ROUTE_COMMON_DOCUMENTS_OPERATION_SAVE = '/api/common/documents/operation/save'
export const ROUTE_COMMON_DOCUMENTS_OPERATION_DELETE = '/api/common/documents/operation/delete'
export const ROUTE_COMMON_DOCUMENTS_OPERATIONS_CLOSE_SHIFT = '/api/common/documents/operations/close_shift'
export const ROUTE_COMMON_LIST_GET = '/api/common/list/get'
export const ROUTE_SECOND_SCREEN_SCHEDULE_GET = '/api/second_screen/schedule/get'
export const ROUTE_SECOND_SCREEN_SEANCE_GET = '/api/second_screen/seance/get'
export const ROUTE_SECOND_SCREEN_PRE_ORDER_GET = '/api/second_screen/pre_order/get'
export const ROUTE_SECOND_SCREEN_HORDER_GET = '/api/second_screen/horder/get'
export const ROUTE_SECOND_SCREEN_BOOKING_GET = '/api/second_screen/booking/get'
export const COMMON_PRINTERS_GET = '/api/common/printers/get'
export const ROUTE_HORECA_POSITION_ADD_BARCODE = '/api/horeca/position/add/barcode'
export const ROUTE_COMMON_DOCUMENTS_RECEIPTS_GET = '/api/common/documents/receipts/get'
export const ROUTE_COMMON_DOCUMENTS_RECEIPT_GET = '/api/common/documents/receipt/get'
export const ROUTE_COMMON_DOCUMENTS_RECEIPT_SAVE = '/api/common/documents/receipt/save'
export const ROUTE_COMMON_DOCUMENTS_RECEIPT_DELETE = '/api/common/documents/receipt/delete'
export const ROUTE_COMMON_DOCUMENTS_SLIPS_GET = '/api/common/documents/slips/get'
export const ROUTE_COMMON_DOCUMENTS_SLIP_GET = '/api/common/documents/slip/get'
export const ROUTE_EQUIPMENT_CANDY_STATE_GET = '/api/equipment/candy/state/get'
export const ROUTE_EQUIPMENT_PRINTER_BILL_PRINT = '/api/equipment/printer/bill/print'
export const ROUTE_HALL_RENT = '/pl/hs/pl/RentSum'
export const ROUTE_COMMON_REPORTS_SALES_GET = '/api/common/reports/sales/get'
export const ROUTE_COMMON_REPORTS_SHIFT_GET = '/api/common/reports/shift/get'
export const ROUTE_COMMON_REPORTS_SCHEDULE_GET = '/api/common/reports/schedule/get'
export const ROUTE_EQUIPMENT_PRINTER_KITCHEN_PRINT = '/api/equipment/printer/kitchen_print'
export const ROUTE_COMMON_REPORTS_ATTENDANCE_GET = '/api/common/reports/attendance/get'

// endregion

// region BACK / КОНСТАНТЫ

export const ROUTE_CENTER_HORECA_GOODS_TREE_GET = '/api/center/horeca/goods/tree/get'
export const ROUTE_CENTER_HORECA_GOODS_GET = '/api/center/horeca/goods/get'
export const ROUTE_CENTER_HORECA_GOODS_RECIPES_GET = '/api/center/horeca/goods/recipes/get'
export const ROUTE_CENTER_HORECA_GOODS_RECIPE_GET = '/api/center/horeca/goods/recipe/get'
export const ROUTE_CENTER_HORECA_ORDERS_GET = '/api/center/horeca/orders/get'
export const ROUTE_CENTER_HORECA_ORDER_GET = '/api/center/horeca/order/get'
export const ROUTE_CENTER_HORECA_STORE_STATE_GET = '/api/center/horeca/store_state/get'
export const ROUTE_CENTER_HORECA_PRODUCTION_STATE_GET = '/api/center/horeca/production_state/get'
export const ROUTE_CENTER_HORECA_SHIFT_STATE_GET = '/api/center/horeca/shift_state/get'
export const ROUTE_CENTER_HORECA_STORE_REST_GET = '/api/center/horeca/store_rest/get'

export const ROUTE_CENTER_CATALOG_LOAD = '/api/catalog/load'
export const ROUTE_CENTER_CATALOG_SEARCH = '/api/catalog/search'

// endregion

// region ЯДРО ЗАПРОСА

export const TIMEOUT = 30000

export const makeRequest = async (dispatch, config, onSuccess) => {
    const state = {
        loading: true,
        error: null,
        data: null,
    }

    try {
        const { wp, filial, kiosk, version, center } = config
        const token = localStorage.getItem('token')
        const headers = {
            ...config.headers,
            Authorization: token,
            uid_filial: filial?.uid !== undefined ? filial.uid : null,
            wp,
            kiosk: String(kiosk),
            version,
            center: String(center),
        }

        const res = await axios({
            ...config,
            headers,
            timeout: config.timeout || TIMEOUT,
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

        if (!config.kiosk && show_message && !config.center) {
            dispatch(
                addNotification({
                    message,
                    severity: 'error',
                    autoHide: true,
                })
            )
        }

        state.loading = false
        state.error = message
        state.data = null
    }

    return state
}

// endregion

// region BACK / FRONT / АВТОРИЗАЦИЯ
export const common_cities_filials_get = () => async (dispatch, getState) => {
    const origin = window.location.origin
    const { wp, kiosk, version, dev } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: dev
                ? `http://${ROUTE_MAIN_HOST.ip}:${ROUTE_MAIN_HOST.port}${ROUTE_COMMON_CITIES_GET}`
                : `${origin}${ROUTE_COMMON_CITIES_GET}`,
            params: {},
            filial: {},
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const login = (filial, login_auth, pincode_auth, username, password) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return new Promise((resolve, reject) => {
        makeRequest(
            dispatch,
            {
                method: 'post',
                url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_LOGIN}`,
                data: { login_auth, pincode_auth, username, password },
                wp,
                filial,
                kiosk,
                version,
                center,
            },
            (data) => {
                try {
                    const decode = jwtDecode(data)
                    dispatch(loginSuccess([data, decode]))
                    resolve(decode)
                } catch (err) {
                    reject(err)
                }
            }
        )
    })
}

// endregion

// region FRONT / ОБЩЕЕ

export const common_list_get = (filial, type) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_LIST_GET}`,
            params: { type },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            switch (type) {
                case 'kkt':
                    dispatch(setKKTList(data))
                    dispatch(setZBooksUpdate())
                    break
                case 'pinpad':
                    dispatch(setPinpadList(data))
                    dispatch(setZPinpadsUpdate())
                    break
                case 'kitchen_points':
                    dispatch(setKitchenPointsList(data))
                    break
            }
        }
    )
}

export const common_lazy_list_get = (filial, type) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    const res = await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_LIST_GET}`,
        params: { type },
        wp,
        filial,
        kiosk,
        version,
        center,
    })
    return res?.data || []
}

export const common_catalog_get = (filial, type, uid, date_shift) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_CATALOG_GET}`,
            params: { type, uid, date_shift },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_order_find = (filial, type, value) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDER_FIND}`,
            params: { type, value },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_contact_add =
    (filial, order_type, uid_order, buyer_s, buyer_n, buyer_o, buyer_phone_number, buyer_email, ver) => async (dispatch, getState) => {
        const { wp, kiosk, version } = getState().interface
        const { center } = getState().auth
        await makeRequest(
            dispatch,
            {
                method: 'get',
                url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDER_ADD_CONTACT}`,
                params: {
                    order_type,
                    uid_order,
                    buyer_s,
                    buyer_n,
                    buyer_o,
                    buyer_phone_number,
                    buyer_email,
                    ver,
                },
                wp,
                filial,
                kiosk,
                version,
                center,
            },
            (data) => {
                dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
                dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
            }
        )
    }

export const common_order_add_comment = (filial, order_type, uid_order, comment, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_ORDER_ADD_COMMENT : ROUTE_HORECA_ORDER_ADD_COMMENT}`,
            params: { uid_order, comment, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
            dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
        }
    )
}

export const common_order_delete_comment = (filial, order_type, uid_order, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_ORDER_DELETE_COMMENT : ROUTE_HORECA_ORDER_DELETE_COMMENT}`,
            params: { uid_order, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
            dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
        }
    )
}

export const common_position_add_comment =
    (filial, order_type, uid_order, uid_position, comment, modifications, ver) => async (dispatch, getState) => {
        const { wp, kiosk, version } = getState().interface
        const { center } = getState().auth
        await makeRequest(
            dispatch,
            {
                method: 'get',
                url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_POSITION_ADD_COMMENT : ROUTE_HORECA_POSITION_ADD_COMMENT}`,
                params: {
                    uid_order,
                    uid_position,
                    comment,
                    modifications: order_type === 'horeca' ? modifications : [],
                    ver,
                },
                wp,
                filial,
                kiosk,
                version,
                center,
            },
            (data) => {
                dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
                dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
            }
        )
    }

export const common_position_delete_comment = (filial, order_type, uid_order, uid_position, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${order_type === 'cinema' ? ROUTE_CINEMA_POSITION_DELETE_COMMENT : ROUTE_HORECA_POSITION_DELETE_COMMENT}`,
            params: { uid_order, uid_position, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(order_type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
            dispatch(order_type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
        }
    )
}

export const common_order_pay =
    (filial, pm, uid_order, ver, type, payment_group, return_before, uid_return_reason, comment_return_reason) =>
    async (dispatch, getState) => {
        const { wp, kiosk, version } = getState().interface
        const { center } = getState().auth
        await makeRequest(
            dispatch,
            {
                method: 'post',
                url: kiosk
                    ? `http://${filial.ip}:${ROUTE_MAIN_HOST.payment_port}${ROUTE_COMMON_ORDER_PAYMENT_KIOSK}`
                    : `http://${filial.ip}:${ROUTE_MAIN_HOST.payment_port}${ROUTE_COMMON_ORDER_PAYMENT}`,
                data: kiosk
                    ? {
                          uid_filial: filial.uid,
                          uid_order,
                          type,
                          ver,
                          payment_group,
                          uid_return_reason: uid_return_reason === '' ? null : uid_return_reason,
                          comment_return_reason: comment_return_reason === '' ? null : comment_return_reason,
                          return_before,
                      }
                    : {
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
                          return_before,
                      },
                timeout: TIMEOUT * 6 * 2,
                wp,
                filial,
                kiosk,
                version,
                center,
            },
            (data) => {
                // Киоск
                if (kiosk) {
                    if (type === 'cinema') {
                        if (data.errors.length === 0) {
                            dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                        } else {
                            if (data.order !== null) {
                                dispatch(setCurrentPreOrder(data.order))
                            }
                        }
                        data.errors.forEach((error) => {
                            dispatch(setKioskPaymentError(error))
                        })
                    }
                } else {
                    // Рабочее место
                    if (data.errors.length === 0) {
                        dispatch(type === 'cinema' ? setCurrentPreOrder(NEW_EMPTY_ORDER()) : setCurrentHorder(NEW_EMPTY_HORDER()))
                        dispatch(type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
                    } else {
                        if (data.order !== null) {
                            dispatch(type === 'cinema' ? setCurrentPreOrder(data.order) : setCurrentHorder(data.order))
                            dispatch(type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
                        }
                        data.errors.forEach((error) => {
                            dispatch(
                                addNotification({
                                    message: error,
                                    severity: 'error',
                                    autoHide: true,
                                })
                            )
                        })
                    }
                }
            }
        )
    }

export const common_payment_methods_get = (filial, uid_order, type, remote) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_PAYMENT_METHODS_GET}`,
            params: { uid_order, type, remote },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_payment_map_get = (filial, date_shift) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_PAYMENT_MAP_GET}`,
            params: { date_shift },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_orders_receipts_get = (filial, type, uid_order) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_GET_RECEIPTS}`,
            params: { uid_order: uid_order, type },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            if (type === 'cinema') {
                dispatch(setCurrentPreOrder(data))
                dispatch(setPreOrderPreparing(true))
            } else if (type === 'horeca') {
                dispatch(setCurrentHorder(data))
                dispatch(setHorderPreparing(true))
            }
        }
    )
}

export const common_orders_filters_staff_get = (filial) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_STAFF_GET}`,
            params: {},
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_orders_filters_halls_get = (filial) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET}`,
            params: {},
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_orders_filters_workplace_get = (filial) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_WORKPLACES_GET}`,
            params: {},
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

// endregion

// region FRONT / КИНО / ЗАКАЗЫ

export const cinema_order_fetch = (filial, uid_order) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDER_GET}`,
            params: { uid_order },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCurrentPreOrder(data))
        }
    )
}

export const cinema_order_delete = (filial, uid_order, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDER_DELETE}`,
            params: { uid_order, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        () => {
            dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
            dispatch(setOrdersCinemaUpdate())
        }
    )
}

export const cinema_position_add = (city, filial, uid_seance, uid_order, uid_place, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_POSITION_ADD}`,
            params: { uid_city: city.uid, uid_seance, uid_order, uid_place, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        async (data) => {
            dispatch(setCurrentPreOrder(data || NEW_EMPTY_ORDER()))
            await makeRequest(
                dispatch,
                {
                    method: 'get',
                    url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_GET_BOOKING}`,
                    params: { uid_seance, uid_order },
                    wp,
                    filial,
                    kiosk,
                    version,
                    center,
                },
                (booking) => dispatch(setBooking(booking))
            )
        }
    )
}

export const cinema_discount_apply =
    (filial, uid_order, uid_discount, uid_group_discount, comment, uid_positions, ver) => async (dispatch, getState) => {
        const { wp, kiosk, version } = getState().interface
        const { center } = getState().auth
        await makeRequest(
            dispatch,
            {
                method: 'get',
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_APPLY}`,
                params: { uid_order, uid_discount, uid_group_discount, uid_positions, comment, ver },
                wp,
                filial,
                kiosk,
                version,
                center,
            },
            (data) => {
                dispatch(setCurrentPreOrder(data))
                dispatch(setOrdersCinemaUpdate())
            }
        )
    }

export const cinema_place_block = (filial, hall, uid_place) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_PLACE_BLOCK}`,
            params: { uid_hall: hall.uid, uid_place },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            const hallN = JSON.parse(JSON.stringify(hall))
            hallN.nodes = hallN.nodes.map((node) => {
                if (node.id === data.id) {
                    return {
                        ...data,
                    }
                }
                return node
            })
            dispatch(setHall(hallN))
        }
    )
}

// endregion

// region FRONT / КИНО / СЕАНС

export const cinema_seance_get = (filial, uid_seance) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_GET}`,
            params: { uid_seance },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const cinema_seance_booking_get = (filial, uid_seance, uid_order, full) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_GET_BOOKING}`,
            params: { uid_seance, uid_order, full },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const cinema_seance_discounts_get = (filial, uid_seance) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_GET}`,
            params: { uid_seance },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const cinema_seance_discounts_groups_get = (filial) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_DISCOUNTS_GROUPS_GET}`,
            params: {},
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const cinema_seance_close = (filial, uid_seance, reason, comment, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_CLOSE}`,
            params: { uid_seance, reason, comment, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setSeance(data))
        }
    )
}

export const cinema_seance_create7 = (filial, seance) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'post',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SEANCE_CREATE7}`,
            data: seance,
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

// endregion

// region FRONT / КИНО / РАСПИСАНИЕ

export const cinema_schedule_filters_get = (filial, date_shift) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILTERS_FILMS_GET}`,
            params: { date_shift },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const cinema_schedule_halls_get =
    (
        filial,
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
    ) =>
    async (dispatch, getState) => {
        const { wp, kiosk, version } = getState().interface
        const { center } = getState().auth
        return await makeRequest(
            dispatch,
            {
                method: 'get',
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_SCHEDULE_GET_HALLS}`,
                params: {
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
                    film_types,
                },
                filial,
                wp,
                kiosk,
                version,
                center,
            },
            (data) => data
        )
    }

export const cinema_films_get =
    (
        filial,
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
    ) =>
    async (dispatch, getState) => {
        const { wp, kiosk, version } = getState().interface
        const { center } = getState().auth
        return await makeRequest(
            dispatch,
            {
                method: 'get',
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILMS_GET}`,
                params: {
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
                    film_types,
                },
                filial,
                wp,
                kiosk,
                version,
                center,
            },
            (data) => data
        )
    }

export const cinema_film_seances_get =
    (
        filial,
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
    ) =>
    async (dispatch, getState) => {
        const { wp, kiosk, version } = getState().interface
        const { center } = getState().auth
        return await makeRequest(
            dispatch,
            {
                method: 'get',
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_FILM_GET_SEANCES}`,
                params: {
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
                    film_types,
                },
                filial,
                wp,
                kiosk,
                version,
                center,
            },
            (data) => data
        )
    }

export const cinema_halls_filters_get = (filial, date_shift) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_ORDERS_FILTERS_HALLS_GET}`,
            params: { date_shift },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const cinema_hall_get = (filial, uid_hall, type) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_HALL_GET}`,
            params: { uid_hall, type },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

// endregion

// region FRONT / КИНО / СПИСОК ЗАКАЗОВ

export const cinema_orders_get =
    (
        filial,
        update,
        page,
        date_shift,
        staff,
        state,
        seances,
        halls,
        workplaces,
        buyer_emails,
        buyer_phone_number,
        from_site,
        from_kiosk,
        from_wp
    ) =>
    async (dispatch, getState) => {
        const { wp, kiosk, version } = getState().interface
        const { center } = getState().auth
        return await makeRequest(
            dispatch,
            {
                method: 'get',
                url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDERS_GET}`,
                params: {
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
                    from_wp,
                },
                filial,
                wp,
                kiosk,
                version,
                center,
            },
            (data) => data
        )
    }

export const common_orders_filters_schedule_get = (filial, date_shift) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CINEMA_ORDERS_FILTERS_SCHEDULE_GET}`,
            params: { date_shift },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

// endregion

// region FRONT / ХОРЕКА / ЗАКАЗЫ

export const horeca_orders_get =
    (filial, update, page, date_shift, staff, state, halls, workplaces, kitchen_points, kitchen_state) => async (dispatch, getState) => {
        const { wp, kiosk, version } = getState().interface
        const { center } = getState().auth
        return await makeRequest(
            dispatch,
            {
                method: 'get',
                url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDERS_GET}`,
                params: {
                    update,
                    page,
                    date_shift,
                    staff,
                    state,
                    halls,
                    workplaces,
                    kitchen_points,
                    kitchen_state,
                },
                filial,
                wp,
                kiosk,
                version,
                center,
            },
            (data) => data
        )
    }

export const horeca_order_fetch = (filial, uid_order) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_GET}`,
            params: { uid_order },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => dispatch(setCurrentHorder(data))
    )
}

export const horeca_order_delete = (filial, uid_order, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_DELETE}`,
            params: { uid_order, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            if (data.canceled) {
                dispatch(setCurrentHorder(data))
            } else {
                dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
            }
            dispatch(setOrdersHorecaUpdate())
        }
    )
}

export const horeca_order_change_creator = (filial, uid_order, uid_creator, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_CHANGE_CREATOR}`,
            params: { uid_order, uid_creator, ver },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCurrentHorder(data))
            dispatch(setOrdersHorecaUpdate())
        }
    )
}

export const horeca_position_add = (filial, uid_order, ver, uid_menu) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD}`,
            params: { uid_order, ver, uid_menu },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => dispatch(setCurrentHorder(data))
    )
}

export const horeca_position_delete = (filial, uid_order, uid_position, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_DELETE}`,
            params: { uid_order, uid_position, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCurrentHorder(data))
            dispatch(setOrdersHorecaUpdate())
        }
    )
}

export const horeca_position_add_quantity = (filial, uid_order, uid_position, quantity, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_QUANTITY}`,
            params: { uid_order, uid_position, quantity, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCurrentHorder(data))
            dispatch(setOrdersHorecaUpdate())
        }
    )
}

export const horeca_position_change_state = (filial, uid_order, uid_position, action, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    const routes = {
        away: ROUTE_HORECA_POSITION_AWAY,
        course: ROUTE_HORECA_POSITION_COURSE,
        cook: ROUTE_HORECA_POSITION_COOK,
    }
    const route = routes[action]
    if (!route) return
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${route}`,
            params: { uid_order, uid_position, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCurrentHorder(data))
            dispatch(setOrdersHorecaUpdate())
        }
    )
}

export const horeca_position_add_mark = (filial, uid_order, uid_position, mark) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_MARK}`,
            params: { uid_order, uid_position, mark },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCurrentHorder(data))
            dispatch(setOrdersHorecaUpdate())
        }
    )
}

export const horeca_position_add_egais_mark = (filial, uid_order, uid_position, mark) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_EGAIS}`,
            params: { uid_order, uid_position, mark },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCurrentHorder(data))
            dispatch(setOrdersHorecaUpdate())
        }
    )
}

export const horeca_position_add_barcode = (filial, uid_order, mark) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_POSITION_ADD_BARCODE}`,
            params: { uid_order, mark },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCurrentHorder(data))
            dispatch(setOrdersHorecaUpdate())
        }
    )
}

export const horeca_table_add = (filial, uid_order, uid_hall, uid_table, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_ADD_TABLE}`,
            params: { uid_order, uid_hall, uid_table, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCurrentHorder(data))
            dispatch(setOrdersHorecaUpdate())
        }
    )
}

export const horeca_table_delete = (filial, uid_order, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_ORDER_DELETE_TABLE}`,
            params: { uid_order, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCurrentHorder(data))
            dispatch(setOrdersHorecaUpdate())
        }
    )
}

export const horeca_kitchen_push = (filial, uid_order, uid_position, uid_kitchen_points_selected, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_KITCHEN_PUSH}`,
            params: {
                uid_order,
                uid_position,
                uid_kitchen_points_selected,
                ver,
            },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(pushKitchenPositions(data))
        }
    )
}

// endregion

// region FRONT / ХОРЕКА / МЕНЮ

export const horeca_menu_get = (filial, uid_folder, date_shift) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_MENU_GET}`,
            params: { uid_folder, date_shift },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const horeca_modifications_get = (filial, uid_menu) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_MODIFICATIONS_GET}`,
            params: { uid_menu },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

// endregion

// region FRONT / ХОРЕКА / КУХНЯ

export const horeca_kitchen_get = (filial, date_shift, uid_kitchen_points_selected) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_KITCHEN_GET}`,
            params: { date_shift, uid_kitchen_points_selected },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const horeca_kitchen_order_get = (filial, date_shift, uid_order, uid_kitchen_points_selected) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_HORECA_KITCHEN_ORDER_GET}`,
            params: { date_shift, uid_order, uid_kitchen_points_selected },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const horeca_orders_filters_kitchen_points_get = (filial) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_LIST_GET}`,
            params: { type: 'kitchen_points' },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

// endregion

// region FRONT / ХОРЕКА / СПИСОК ЗАКАЗОВ

// endregion

// region FRONT / ВТОРОЙ ЭКРАН

export const second_screen_schedule_get = (filial, date_shift) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_SCHEDULE_GET}`,
            params: { date_shift },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setSSSchedule(data))
        }
    )
}

export const second_screen_seance_get = (filial, uid_seance) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_SEANCE_GET}`,
            params: { uid_seance },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setSSSeance(data))
        }
    )
}

export const second_screen_pre_order_get = (filial, uid_order, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_PRE_ORDER_GET}`,
            params: { uid_order, ver },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setSSPreOrder(data))
        }
    )
}

export const second_screen_horder_get = (filial, uid_order, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_HORDER_GET}`,
            params: { uid_order, ver },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setSSHorder(data))
        }
    )
}

export const second_screen_booking_get = (filial, uid_seance, uid_order, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_SECOND_SCREEN_BOOKING_GET}`,
            params: { uid_seance, uid_order, ver },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setSSBooking(data))
        }
    )
}

// endregion

// region FRONT / ДОКУМЕНТЫ

export const common_documents_operations_get = (filial, page, update, details) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_OPERATIONS_GET}`,
            params: { page, update, details },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_operation_get = (filial, uid) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_OPERATION_GET}`,
            params: { uid },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_operation_delete = (filial, uid) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_OPERATION_DELETE}`,
            params: { uid },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_operation_save = (filial, operation) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'post',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_OPERATION_SAVE}`,
            data: operation,
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_operations_close_shift = (filial, date_shift) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_OPERATIONS_CLOSE_SHIFT}`,
            params: { date_shift },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_zbooks_get = (filial, date_shift, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_ZBOOKS_GET}`,
            params: { date_shift, update },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_z_book_get = (filial, uid) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_ZBOOK_GET}`,
            params: { uid },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_z_book_delete = (filial, uid) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_ZBOOK_DELETE}`,
            params: { uid },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_z_book_save = (filial, z_book) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'post',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_ZBOOK_SAVE}`,
            data: z_book,
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_pinpads_get = (filial, date_shift, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_ZPINPADS_GET}`,
            params: { date_shift, update },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_receipts_get = (filial, date_shift, uid_kkt) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_RECEIPTS_GET}`,
            params: { date_shift, uid_kkt },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_receipt_get = (filial, uid) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_RECEIPT_GET}`,
            params: { uid },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_receipt_save = (filial, receipt) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'post',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_RECEIPT_SAVE}`,
            data: receipt,
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_receipt_delete = (filial, uid) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_RECEIPT_DELETE}`,
            params: { uid },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_slips_get = (filial, date_shift, uid_pinpad) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_SLIPS_GET}`,
            params: { date_shift, uid_pinpad },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_documents_slip_get = (filial, uid) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_DOCUMENTS_SLIP_GET}`,
            params: { uid },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

// endregion

// region FRONT / ОБОРУДОВАНИЕ

export const equipment_action = (filial, route, params) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${ROUTE_MAIN_HOST.payment_port}${route}`,
            params: params,
            timeout: TIMEOUT * 6 * 2,
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
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
                case ROUTE_EQUIPMENT_PRINTER_BILL_PRINT:
                    dispatch(setCurrentHorder(data))
                    dispatch(setOrdersHorecaUpdate())
                    break
                case ROUTE_EQUIPMENT_KKT_TICKETS_PRINT:
                    dispatch(setCurrentPreOrder(data))
                    dispatch(setOrdersCinemaUpdate())
                    break
                case ROUTE_EQUIPMENT_WORKPLACE_TURN_ON:
                    break
                case ROUTE_EQUIPMENT_WORKPLACE_RESET:
                    break
                case ROUTE_EQUIPMENT_WORKPLACE_TURN_OFF:
                    break
                case ROUTE_EQUIPMENT_PRINTER_KITCHEN_PRINT:
                    break
            }
        }
    )
}

export const equipment_candy_state_get = (filial) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${ROUTE_MAIN_HOST.payment_port}${ROUTE_EQUIPMENT_CANDY_STATE_GET}`,
            params: {},
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(setCandy(data))
        }
    )
}

export const common_printers_get = (filial) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${COMMON_PRINTERS_GET}`,
            params: {},
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

// endregion

// region FRONT / ОТЧЕТЫ

export const common_reports_sales_get = (filial, date_shift_beginning, date_shift_ending, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_REPORTS_SALES_GET}`,
            params: { date_shift_beginning, date_shift_ending, update },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_reports_shift_get = (filial, date_shift, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_REPORTS_SHIFT_GET}`,
            params: { date_shift, update },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_reports_schedule_get = (filial, date_shift, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_REPORTS_SCHEDULE_GET}`,
            params: { date_shift, update },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const common_reports_attendance_get = (filial, date_shift_beginning, date_shift_ending, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_REPORTS_ATTENDANCE_GET}`,
            params: { date_shift_beginning, date_shift_ending, update },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

// endregion

// region FRONT / МАРКИРОВКА

export const markirovka_cdn_info_get = (filial) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_MARKIROVKA_CDN_INFO_GET}`,
            params: {},
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => dispatch(fillHosts(data))
    )
}

export const markirovka_cdn_info_update = (filial) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_MARKIROVKA_CDN_INFO_UPDATE}`,
            params: {},
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => dispatch(fillHosts(data))
    )
}

// endregion

// region FRONT / ПРОЧЕЕ

export const get_hall_rent_sum = (filial, film_uid, start, end, its_card, premiere) => async () => {
    const params = {
        film_uid,
        start,
        end,
        its_card,
        premiere,
    }
    try {
        const response = await axios.get(`http://10.101.2.21${ROUTE_HALL_RENT}`, {
            params,
            timeout: 10000,
        })
        return response.data
    } catch (error) {
        return { error: error.message || 'Ошибка запроса стоимости сеанса' }
    }
}

export const pl_estimate_discounts = (filial, uid_order, type, card, ver) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_PL_ESTIMATE_DISCOUNTS}`,
            params: { uid_order, type, card, ver },
            wp,
            filial,
            kiosk,
            version,
            center,
        },
        (data) => {
            dispatch(type === 'cinema' ? setCurrentPreOrder(data) : setCurrentHorder(data))
            dispatch(type === 'cinema' ? setOrdersCinemaUpdate() : setOrdersHorecaUpdate())
        }
    )
}

// endregion

// region BACK / ХОРЕКА

export const center_horeca_goods_tree_get = (filial, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    dispatch(setTreeLoading({ loading: true, error: null }))
    const res = await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_HORECA_GOODS_TREE_GET}`,
        params: { update },
        filial,
        wp,
        kiosk,
        version,
        center,
    })
    dispatch(
        setTreeLoading({
            loading: false,
            error: res.error,
        })
    )
    if (!res.error) {
        dispatch(setTree(res.data))
    }
}

export const center_horeca_goods_get = (filial, uid_folder, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    dispatch(setGoodsLoading({ loading: true, error: null }))
    const res = await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_HORECA_GOODS_GET}`,
        params: { uid_folder, update },
        filial,
        wp,
        kiosk,
        version,
        center,
    })
    dispatch(
        setGoodsLoading({
            loading: false,
            error: res.error,
        })
    )
    if (!res.error) {
        dispatch(setGoods(res.data))
    }
}

export const center_horeca_goods_recipes_get = (filial, uid_good, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    dispatch(setGoodsRecipesLoading({ loading: true, error: null }))
    const res = await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_HORECA_GOODS_RECIPES_GET}`,
        params: { uid_good, update },
        filial,
        wp,
        kiosk,
        version,
        center,
    })
    dispatch(
        setGoodsRecipesLoading({
            loading: false,
            error: res.error,
        })
    )
    if (!res.error) {
        dispatch(setGoodsRecipes(res.data))
    }
}

export const center_horeca_goods_recipe_get = (filial, ref, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    dispatch(setGoodsRecipeLoading({ loading: true, error: null }))
    const res = await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_HORECA_GOODS_RECIPE_GET}`,
        params: { ref, update },
        filial,
        wp,
        kiosk,
        version,
        center,
    })
    dispatch(setGoodsRecipeLoading({ loading: false, error: res.error }))
    if (!res.error) {
        await dispatch(setGoodsRecipe(res.data))
        const ids = await fill_name_map(res.data.tables)
        if (ids.length !== 0) {
            return await dispatch(center_catalog_load(filial, ids))
        }
    }
}

export const center_horeca_orders_get = (filial, date_shift, orders_horeca_settings, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    dispatch(setOrdersHorecaLoadingState({ loading: true, error: null }))
    const res = await makeRequest(dispatch, {
        method: 'post',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_HORECA_ORDERS_GET}`,
        data: { ...orders_horeca_settings, date_shift },
        filial,
        wp,
        kiosk,
        version,
        center,
    })
    dispatch(setOrdersHorecaLoadingState({ loading: false, error: res.error }))
    if (!res.error) {
        dispatch(setOrdersHorecaCenter(res.data))
        const ids = await fill_name_map([res.data])
        if (ids.length !== 0) {
            return await dispatch(center_catalog_load(filial, ids))
        }
    }
}

export const center_horeca_order_get = (filial, uid_order, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    await dispatch(setOrderHorecaLoadingState({ loading: true, error: null }))
    const res = await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_HORECA_ORDER_GET}`,
        params: { update, uid_order },
        filial,
        wp,
        kiosk,
        version,
        center,
    })
    await dispatch(
        setOrderHorecaLoadingState({
            loading: false,
            error: res.error,
        })
    )
    if (!res.error) {
        await dispatch(setOrderHorecaCenter(res.data))
        const ids = await fill_name_map(res.data.tables)
        if (ids.length !== 0) {
            return await dispatch(center_catalog_load(filial, ids))
        }
    }
}

export const center_horeca_store_rest_get = (filial, date_shift, uid_store, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_HORECA_STORE_REST_GET}`,
            params: { update, date_shift, uid_store },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const center_horeca_store_state_get = (filial, date_shift, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    dispatch(setStoreStateLoadingState({ loading: true, error: null }))
    const res = await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_HORECA_STORE_STATE_GET}`,
        params: { update, date_shift },
        filial,
        wp,
        kiosk,
        version,
        center,
    })
    dispatch(
        setStoreStateLoadingState({
            loading: false,
            error: res.error,
        })
    )
    if (!res.error) {
        dispatch(setStoreState(res.data))
    }
}

export const center_horeca_shift_state_get = (filial, date_shift, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    dispatch(setShiftStateLoadingState({ loading: true, error: null }))
    const res = await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_HORECA_SHIFT_STATE_GET}`,
        params: { update, date_shift },
        filial,
        wp,
        kiosk,
        version,
        center,
    })
    dispatch(
        setShiftStateLoadingState({
            loading: false,
            error: res.error,
        })
    )
    if (!res.error) {
        dispatch(setShiftState(res.data))
    }
}

export const center_horeca_production_state_get = (filial, date_shift, update) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    dispatch(setProductionStateLoadingState({ loading: true, error: null }))
    const res = await makeRequest(dispatch, {
        method: 'get',
        url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_HORECA_PRODUCTION_STATE_GET}`,
        params: { update, date_shift },
        filial,
        wp,
        kiosk,
        version,
        center,
    })
    dispatch(
        setProductionStateLoadingState({
            loading: false,
            error: res.error,
        })
    )
    if (!res.error) {
        dispatch(setProductionState(res.data))
    }
}

// endregion

// region BACK / ОБЩЕЕ

export const center_catalog_load = (filial, ids) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'post',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_CATALOG_LOAD}`,
            data: ids,
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

export const center_catalog_search = (filial, type, value, limit) => async (dispatch, getState) => {
    const { wp, kiosk, version } = getState().interface
    const { center } = getState().auth
    return await makeRequest(
        dispatch,
        {
            method: 'get',
            url: `http://${filial.ip}:${filial.port}${ROUTE_CENTER_CATALOG_SEARCH}`,
            params: { type, value, limit },
            filial,
            wp,
            kiosk,
            version,
            center,
        },
        (data) => data
    )
}

// endregion
