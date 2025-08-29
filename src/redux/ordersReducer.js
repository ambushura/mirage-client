import {createSlice} from "@reduxjs/toolkit"
import {date_dayjs} from "../service/advanced.js"
import {v4} from "uuid"
import {
    PAYMENT_STATE_CANCELED,
    PAYMENT_STATE_SLIP_WITHOUT_RECEIPT,
    PAYMENT_STATE_WAITING, RETURNING_STATE_SLIP_WITHOUT_RECEIPT, RETURNING_STATE_SUCCESS,
    RETURNING_STATE_WAITING
} from "./interfaceReducer.js"

export const NEW_EMPTY_ORDER = () => ({
    in_base: false,
    uid: v4(),
    ver: v4(),
    number: undefined,
    price: 0,
    quantity: 0,
    sum: 0,
    sum_discount: 0,
    items: [],
    for_payment: null,
    for_returning: null,
})

export const NEW_EMPTY_HORDER = () => ({
    in_base: false,
    uid: v4(),
    ver: v4(),
    number: undefined,
    price: 0,
    quantity: 0,
    sum: 0,
    sum_discount: 0,
    items: [],
    for_payment: null,
    for_returning: null,
})

export const ORDER_TIME_OUT = 1000

const initialState = {

    date: JSON.stringify(date_dayjs(new Date())),
    pre_order: NEW_EMPTY_ORDER(),
    horder: NEW_EMPTY_HORDER(),
    total: 0,
    cash: 0,
    change: 0,
    pre_order_preparing: false,
    horder_preparing: false,
    pre_order_paying: false,
    horder_paying: false,
    orders_cinema_schedule: [],
    order_search_value: null,

    // ЗАКАЗЫ КИНО
    orders_cinema_update: 0,
    orders_cinema: {orders: [], total_count: 0},
    orders_cinema_page: 1,
    // Фильтры кино (загруженные)
    orders_cinema_filters_staff: [],
    orders_cinema_filters_state: [
        {uid: 'payment_waiting', title: PAYMENT_STATE_WAITING},
        {uid: 'payment_slip_without_receipt', title: PAYMENT_STATE_SLIP_WITHOUT_RECEIPT},
        {uid: 'returning_waiting', title: RETURNING_STATE_WAITING},
        {uid: 'returning_slip_without_receipt', title: RETURNING_STATE_SLIP_WITHOUT_RECEIPT},
        {uid: 'returning_success', title: RETURNING_STATE_SUCCESS},
        {uid: 'undefined', title: PAYMENT_STATE_CANCELED}],
    orders_cinema_filters_seances: [],
    orders_cinema_filters_halls: [],
    orders_cinema_filters_workplaces: [],
    // Фильтры кино (выбранные)
    orders_cinema_filters_staff_selected: [],
    orders_cinema_filters_state_selected: [],
    orders_cinema_filters_seances_selected: [],
    orders_cinema_filters_halls_selected: [],
    orders_cinema_filters_workplaces_selected: [],
    orders_cinema_filters_buyer_emails_selected: '',
    orders_cinema_filters_buyer_phone_numbers_selected: '',
    orders_cinema_filters_from_site_selected: false,
    orders_cinema_filters_from_kiosk_selected: true,
    orders_cinema_filters_from_wp_selected: true,

    // ЗАКАЗЫ ОБЩЕПИТ
    orders_horeca_update: 0,
    orders_horeca: {orders: [], total_count: 0},
    orders_horeca_page: 1,
    // Фильтры общепит (загруженные)
    orders_horeca_filters_staff: [],
    orders_horeca_filters_state: [
        {uid: 'payment_waiting', title: PAYMENT_STATE_WAITING},
        {uid: 'payment_slip_without_receipt', title: PAYMENT_STATE_SLIP_WITHOUT_RECEIPT},
        {uid: 'returning_waiting', title: RETURNING_STATE_WAITING},
        {uid: 'returning_slip_without_receipt', title: RETURNING_STATE_SLIP_WITHOUT_RECEIPT},
        {uid: 'returning_success', title: RETURNING_STATE_SUCCESS},
        {uid: 'undefined', title: PAYMENT_STATE_CANCELED}],
    orders_horeca_filters_halls: [],
    orders_horeca_filters_workplaces: [],
    orders_horeca_filters_kitchen_points: [],
    orders_horeca_filters_kitchen_state: [
        {uid: 0, title: 'Не готовить'},
        {uid: 1, title: 'Готовить'},
        {uid: 2, title: 'Готовится'},
        {uid: 3, title: 'Отдать гостю'},
    ],

    // Фильтры общепит (выбранные)
    orders_horeca_filters_staff_selected: [],
    orders_horeca_filters_state_selected: [],
    orders_horeca_filters_halls_selected: [],
    orders_horeca_filters_workplaces_selected: [],
    orders_horeca_filters_kitchen_points_selected: [],
    orders_horeca_filters_kitchen_state_selected: [],

    // КУХНЯ
    kitchen_orders: [],

    // КИОСК
    kiosk_payment_error: null
}

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setDate: (state, {payload}) => {
            state.date = payload
        },
        setCurrentPreOrder: (state, {payload}) => {
            state.pre_order = payload
        },
        setCurrentHorder: (state, {payload}) => {
            state.horder = payload
        },
        setTotal: (state, {payload}) => {
            state.total = payload
        },
        setCash: (state, {payload}) => {
            if (payload[0] === 'clean') {
                state.cash = 0
                state.change = payload[1]
            } else {
                state.cash = parseFloat(`${state.cash}${payload[0]}`)
                state.change = payload[1] - state.cash
            }
        },
        setPreOrderPreparing: (state, {payload}) => {
            state.pre_order_preparing = payload
        },
        setHorderPreparing(state, {payload}) {
            state.horder_preparing = payload
        },
        setPreOrderPaying: (state, {payload}) => {
            state.pre_order_paying = payload
        },
        setHorderPaying(state, {payload}) {
            state.horder_paying = payload
        },
        setOrdersCinema(state, {payload}) {
            state.orders_cinema = payload
        },
        setOrdersCinemaPage(state, {payload}) {
            state.orders_cinema_page = payload
        },
        setOrdersHoreca(state, {payload}) {
            state.orders_horeca = payload
        },
        setOrdersHorecaPage(state, {payload}) {
            state.orders_horeca_page = payload
        },
        // Фильтры общепит (загрузка)
        setOrdersHorecaFiltersStaff(state, {payload}) {
            state.orders_horeca_filters_staff = payload
        },
        setOrdersHorecaFiltersHalls(state, {payload}) {
            state.orders_horeca_filters_halls = payload
        },
        setOrdersHorecaFiltersWorkPlaces(state, {payload}) {
            state.orders_horeca_filters_workplaces = payload
        },
        setOrdersHorecaFiltersKitchenPoints(state, {payload}) {
            state.orders_horeca_filters_kitchen_points = payload
        },
        // Фильтры общепит (выбор)
        setOrdersHorecaFiltersStateSelect(state, {payload}) {
            state.orders_horeca_filters_state_selected = payload
        },
        setOrdersHorecaFiltersStaffSelect(state, {payload}) {
            state.orders_horeca_filters_staff_selected = payload
        },
        setOrdersHorecaFiltersHallsSelect(state, {payload}) {
            state.orders_horeca_filters_halls_selected = payload
        },
        setOrdersHorecaFiltersWorkPlacesSelect(state, {payload}) {
            state.orders_horeca_filters_workplaces_selected = payload
        },
        setOrdersHorecaFiltersKitchenPointsSelect(state, {payload}) {
            state.orders_horeca_filters_kitchen_points_selected = payload
        },
        setOrdersHorecaFiltersKitchenStateSelect(state, {payload}) {
            state.orders_horeca_filters_kitchen_state_selected = payload
        },
        // Фильтры кино (загрузка)
        setOrdersCinemaFiltersStaff(state, {payload}) {
            state.orders_cinema_filters_staff = payload
        },
        setOrdersCinemaFiltersSeances(state, {payload}) {
            state.orders_cinema_filters_seances = payload
        },
        setOrdersCinemaFiltersHalls(state, {payload}) {
            state.orders_cinema_filters_halls = payload
        },
        setOrdersCinemaFiltersWorkplaces(state, {payload}) {
            state.orders_cinema_filters_workplaces = payload
        },
        setOrdersCinemaFiltersBuyerEmails(state, {payload}) {
            state.orders_cinema_filters_buyer_emails = payload
        },
        setOrdersCinemaFiltersBuyerPhoneNumbers(state, {payload}) {
            state.orders_cinema_filters_buyer_phone_numbers = payload
        },
        // Фильтры кино (выбор)
        setOrdersCinemaFiltersStaffSelect(state, {payload}) {
            state.orders_cinema_filters_staff_selected = payload
        },
        setOrdersCinemaFiltersStateSelect(state, {payload}) {
            state.orders_cinema_filters_state_selected = payload
        },
        setOrdersCinemaFiltersSeancesSelect(state, {payload}) {
            state.orders_cinema_filters_seances_selected = payload
        },
        setOrdersCinemaFiltersHallsSelect(state, {payload}) {
            state.orders_cinema_filters_halls_selected = payload
        },
        setOrdersCinemaFiltersWorkplacesSelect(state, {payload}) {
            state.orders_cinema_filters_workplaces_selected = payload
        },
        setOrdersCinemaFiltersBuyerEmailsSelect(state, {payload}) {
            state.orders_cinema_filters_buyer_emails_selected = payload
        },
        setOrdersCinemaFiltersBuyerPhoneNumbersSelect(state, {payload}) {
            state.orders_cinema_filters_buyer_phone_numbers_selected = payload
        },
        setOrdersCinemaFiltersFromSiteSelect(state) {
            state.orders_cinema_filters_from_site_selected = !state.orders_cinema_filters_from_site_selected
        },
        setOrdersCinemaFiltersFromKioskSelect(state) {
            state.orders_cinema_filters_from_kiosk_selected = !state.orders_cinema_filters_from_kiosk_selected
        },
        setOrdersCinemaFiltersFromWPSelect(state) {
            state.orders_cinema_filters_from_wp_selected = !state.orders_cinema_filters_from_wp_selected
        },
        setOrdersCinemaUpdate(state) {
            state.orders_cinema_update = state.orders_cinema_update + 1
        },
        setOrdersHorecaUpdate(state) {
            state.orders_horeca_update = state.orders_horeca_update + 1
        },
        // Кухня
        setKitchenOrders(state, {payload}) {
            const kitchen_orders_copied = JSON.parse(JSON.stringify(payload))
            kitchen_orders_copied.forEach((filial_data, i) => {
                if (kitchen_orders_copied[i].data !== null) {
                    kitchen_orders_copied[i].data.waiting.sort((a, b) => {
                        return new Date(a.date_create) - new Date(b.date_create)
                    })
                    kitchen_orders_copied[i].data.cooking.sort((a, b) => {
                        return new Date(a.date_create) - new Date(b.date_create)
                    })
                    kitchen_orders_copied[i].data.completed.sort((a, b) => {
                        return new Date(a.date_create) - new Date(b.date_create)
                    })
                }
            })
            state.kitchen_orders = kitchen_orders_copied
        },
        pushKitchenPositions(state, {payload}) {
            const kitchen_orders_copied = JSON.parse(JSON.stringify(state.kitchen_orders))
            kitchen_orders_copied.forEach((filial_data, i) => {
                if (filial_data.data !== null) {
                    if (filial_data.data.uid_filial === payload.uid_filial) {
                        if (kitchen_orders_copied[i].data !== null) {
                            const waiting = JSON.parse(JSON.stringify(kitchen_orders_copied[i].data.waiting)).filter(order_deleted => order_deleted.uid !== payload.uid_order)
                            const cooking = JSON.parse(JSON.stringify(kitchen_orders_copied[i].data.cooking)).filter(order_deleted => order_deleted.uid !== payload.uid_order)
                            const completed = JSON.parse(JSON.stringify(kitchen_orders_copied[i].data.completed)).filter(order_deleted => order_deleted.uid !== payload.uid_order)
                            payload.waiting.length > 0 ? waiting.push(payload.waiting[0]) : null
                            payload.cooking.length > 0 ? cooking.push(payload.cooking[0]) : null
                            payload.completed.length > 0 ? completed.push(payload.completed[0]) : null
                            kitchen_orders_copied[i].data.waiting = waiting
                            kitchen_orders_copied[i].data.cooking = cooking
                            kitchen_orders_copied[i].data.completed = completed
                            kitchen_orders_copied[i].data.waiting.sort((a, b) => {
                                return new Date(a.date_create) - new Date(b.date_create)
                            })
                            kitchen_orders_copied[i].data.cooking.sort((a, b) => {
                                return new Date(a.date_create) - new Date(b.date_create)
                            })
                            kitchen_orders_copied[i].data.completed.sort((a, b) => {
                                return new Date(a.date_create) - new Date(b.date_create)
                            })
                        }
                    }
                }
            })
            state.kitchen_orders = kitchen_orders_copied
        },
        setOrderSearchValue(state, {payload}) {
            state.order_search_value = payload
        },
        setKioskPaymentError(state, {payload}) {
            state.kiosk_payment_error = payload
        }
    },
})

export const {
    setDate,
    setCurrentPreOrder,
    setCurrentHorder,
    setCash,
    setTotal,
    setPreOrderPreparing,
    setHorderPreparing,
    setPreOrderPaying,
    setHorderPaying,
    setOrdersCinemaSchedule,
    setOrdersCinema,
    setOrdersCinemaFilialSeance,
    setOrdersHoreca,
    setOrdersHorecaFiltersStaff,
    setOrdersHorecaFiltersHalls,
    setOrdersHorecaFiltersWorkPlaces,
    setOrdersHorecaFiltersKitchenPoints,
    setOrdersHorecaFiltersStateSelect,
    setOrdersHorecaFiltersStaffSelect,
    setOrdersHorecaFiltersHallsSelect,
    setOrdersHorecaFiltersWorkPlacesSelect,
    setOrdersHorecaFiltersKitchenPointsSelect,
    setOrdersHorecaFiltersKitchenStateSelect,
    setOrdersHorecaPage,
    setOrdersCinemaPage,
    setOrdersCinemaFiltersStaff,
    setOrdersCinemaFiltersSeances,
    setOrdersCinemaFiltersHalls,
    setOrdersCinemaFiltersWorkplaces,
    setOrdersCinemaFiltersBuyerEmails,
    setOrdersCinemaFiltersBuyerPhoneNumbers,
    setOrdersCinemaFiltersStaffSelect,
    setOrdersCinemaFiltersStateSelect,
    setOrdersCinemaFiltersSeancesSelect,
    setOrdersCinemaFiltersHallsSelect,
    setOrdersCinemaFiltersWorkplacesSelect,
    setOrdersCinemaFiltersBuyerEmailsSelect,
    setOrdersCinemaFiltersBuyerPhoneNumbersSelect,
    setOrdersCinemaFiltersFromSiteSelect,
    setOrdersCinemaFiltersFromKioskSelect,
    setOrdersCinemaFiltersFromWPSelect,
    setOrdersCinemaUpdate,
    setOrdersHorecaUpdate,
    setKitchenOrders,
    pushKitchenPositions,
    setOrderSearchValue,
    setKioskPaymentError,
} = ordersSlice.actions
export default ordersSlice.reducer