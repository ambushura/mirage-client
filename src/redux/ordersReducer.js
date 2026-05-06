import {createSlice} from '@reduxjs/toolkit'
import {date_dayjs} from '../ui/hooks/common_functions.js'
import {v4} from 'uuid'
import {
    PAYMENT_STATE_CANCELED,
    PAYMENT_STATE_SLIP_WITHOUT_RECEIPT,
    PAYMENT_STATE_WAITING,
    RETURNING_STATE_SLIP_WITHOUT_RECEIPT,
    RETURNING_STATE_SUCCESS,
    RETURNING_STATE_WAITING,
} from './interfaceReducer.js'

export const ORDER_TIME_REMAINING = 100
export const ORDER_TIME_OUT = 1000

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

const initialState = {
    date: JSON.stringify(date_dayjs(new Date())),
    pre_order: NEW_EMPTY_ORDER(),
    horder: NEW_EMPTY_HORDER(),
    total: 0,
    cash: 0,
    change: 0,
    pre_order_time_remaining: ORDER_TIME_REMAINING,
    pre_order_preparing: false,
    horder_preparing: false,
    pre_order_paying: false,
    horder_paying: false,
    orders_cinema_schedule: [],
    order_search_value: null,

    // ЗАКАЗЫ КИНО
    orders_cinema_update: 0,
    orders_cinema: {orders: [], total_count: 0},
    orders_cinema_page: 1, // Фильтры кино (загруженные)
    orders_cinema_filters_staff: [],
    orders_cinema_filters_state: [
        {
            uid: 'payment_waiting',
            title: PAYMENT_STATE_WAITING,
        },
        {uid: 'payment_slip_without_receipt', title: PAYMENT_STATE_SLIP_WITHOUT_RECEIPT},
        {
            uid: 'returning_waiting',
            title: RETURNING_STATE_WAITING,
        },
        {uid: 'returning_slip_without_receipt', title: RETURNING_STATE_SLIP_WITHOUT_RECEIPT},
        {
            uid: 'returning_success',
            title: RETURNING_STATE_SUCCESS,
        },
        {uid: 'undefined', title: PAYMENT_STATE_CANCELED},
    ],
    orders_cinema_filters_seances: [],
    orders_cinema_filters_halls: [],
    orders_cinema_filters_workplaces: [], // Фильтры кино (выбранные)
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
    orders_horeca_page: 1, // Фильтры общепит (загруженные)
    orders_horeca_filters_staff: [],
    orders_horeca_filters_state: [
        {
            uid: 'payment_waiting',
            title: PAYMENT_STATE_WAITING,
        },
        {uid: 'payment_slip_without_receipt', title: PAYMENT_STATE_SLIP_WITHOUT_RECEIPT},
        {
            uid: 'returning_waiting',
            title: RETURNING_STATE_WAITING,
        },
        {uid: 'returning_slip_without_receipt', title: RETURNING_STATE_SLIP_WITHOUT_RECEIPT},
        {
            uid: 'returning_success',
            title: RETURNING_STATE_SUCCESS,
        },
        {uid: 'undefined', title: PAYMENT_STATE_CANCELED},
    ],
    orders_horeca_filters_halls: [],
    orders_horeca_filters_workplaces: [],
    orders_horeca_filters_kitchen_points: [],
    orders_horeca_filters_kitchen_state: [
        {uid: 0, title: 'Не готовить'},
        {uid: 1, title: 'Готовить'},
        {
            uid: 2,
            title: 'Готовится',
        },
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
    kitchen_points_list: [],
    uid_kitchen_points_selected: [],
    kitchen_orders: null,

    // КИОСК
    kiosk_payment_error: null,

    uid_horeca_selected: [],
    uid_cinema_selected: [],
}

export const ordersSlice = createSlice({
    name: 'orders',
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
        updateOrdersCinema(state, {payload}) {
            const incomingOrders = payload.orders || []
            if (!state.orders_cinema) {
                state.orders_cinema = payload
                return
            }
            const currentOrders = state.orders_cinema.orders || []
            const ordersMap = new Map(currentOrders.map((order) => [order.uid, order]))
            for (const order of incomingOrders) {
                const prev = ordersMap.get(order.uid)
                if (!prev || prev.ver !== order.ver) {
                    ordersMap.set(order.uid, order)
                }
            }
            state.orders_cinema.orders = Array.from(ordersMap.values())
            state.orders_cinema.total_count = payload.total_count
        },
        setOrdersCinemaPage(state, {payload}) {
            state.orders_cinema_page = payload
        },
        setOrdersHoreca(state, {payload}) {
            state.orders_horeca = payload
        },
        updateOrdersHoreca(state, {payload}) {
            const incoming = payload.orders || []
            if (!state.orders_horeca) {
                state.orders_horeca = payload
                return
            }
            const current = state.orders_horeca.orders || []
            const currentMap = new Map(current.map((order) => [order.uid, order]))
            const result = []
            for (const order of incoming) {
                const prev = currentMap.get(order.uid)
                if (!prev) {
                    result.push(order)
                } else if (prev.ver !== order.ver) {
                    result.push(order)
                } else {
                    result.push(prev)
                }
                currentMap.delete(order.uid)
            }
            state.orders_horeca.orders = result
            state.orders_horeca.total_count = payload.total_count
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
            state.orders_cinema_filters_from_site_selected =
                !state.orders_cinema_filters_from_site_selected
        },
        setOrdersCinemaFiltersFromKioskSelect(state) {
            state.orders_cinema_filters_from_kiosk_selected =
                !state.orders_cinema_filters_from_kiosk_selected
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
            const data = JSON.parse(JSON.stringify(payload))
            if (data !== null) {
                data.cooking.sort((a, b) => {
                    return new Date(a.date_create) - new Date(b.date_create)
                })
                data.completed.sort((a, b) => {
                    return new Date(a.date_create) - new Date(b.date_create)
                })
                state.kitchen_orders = data
            }
        },
        updateKitchenOrder(state, {payload}) {
            if (!payload) return
            const sections = ['cooking', 'completed']
            sections.forEach((section) => {
                const currentOrders = state.kitchen_orders?.[section] || []
                const updatedOrders = payload[section] || []
                const currentMap = new Map(currentOrders.map((o) => [o.uid, o]))
                updatedOrders.forEach((order) => {
                    if (currentMap.has(order.uid)) {
                        const index = currentOrders.findIndex((o) => o.uid === order.uid)
                        currentOrders[index] = order
                    } else {
                        currentOrders.push(order)
                    }
                })
                state.kitchen_orders[section] = currentOrders.filter(
                    (o) => Array.isArray(o.items) && o.items.length > 0
                )
            })
        },
        pushKitchenPositions(state, {payload}) {
            const kitchen_orders_copied = JSON.parse(JSON.stringify(state.kitchen_orders))
            if (kitchen_orders_copied !== null) {
                if (kitchen_orders_copied.uid_filial === payload.uid_filial) {
                    const cooking = JSON.parse(JSON.stringify(kitchen_orders_copied.cooking)).filter(
                        (order_deleted) => order_deleted.uid !== payload.uid_order
                    )
                    const completed = JSON.parse(JSON.stringify(kitchen_orders_copied.completed)).filter(
                        (order_deleted) => order_deleted.uid !== payload.uid_order
                    )
                    payload.cooking.length > 0 ? cooking.push(payload.cooking[0]) : null
                    payload.completed.length > 0 ? completed.push(payload.completed[0]) : null
                    kitchen_orders_copied.cooking = cooking
                    kitchen_orders_copied.completed = completed
                    kitchen_orders_copied.cooking.sort((a, b) => {
                        return new Date(a.date_create) - new Date(b.date_create)
                    })
                    kitchen_orders_copied.completed.sort((a, b) => {
                        return new Date(a.date_create) - new Date(b.date_create)
                    })
                }
            }
            state.kitchen_orders = kitchen_orders_copied
        },
        setKitchenPointsList(state, {payload}) {
            state.kitchen_points_list = payload
        },
        setUidKitchenPointsSelected(state, {payload}) {
            state.uid_kitchen_points_selected = payload
        },
        setOrderSearchValue(state, {payload}) {
            state.order_search_value = payload
        },
        setKioskPaymentError(state, {payload}) {
            state.kiosk_payment_error = payload
        },
        selectUidHoreca(state, {payload}) {
            state.uid_horeca_selected = payload
        },
        selectUidCinema(state, {payload}) {
            state.uid_cinema_selected = payload
        },
        setPreOrderTimeRemaining(state, {payload}) {
            state.pre_order_time_remaining = payload
        },
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
    updateKitchenOrder,
    pushKitchenPositions,
    setOrderSearchValue,
    setKioskPaymentError,
    selectUidHoreca,
    selectUidCinema,
    setPreOrderTimeRemaining,
    setKitchenPointsList,
    setUidKitchenPointsSelected,
    updateOrdersCinema,
    updateOrdersHoreca,
} = ordersSlice.actions
export default ordersSlice.reducer
