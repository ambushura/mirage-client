import {createSlice} from "@reduxjs/toolkit"
import {date_dayjs} from "../service/advanced.js"
import {v4} from "uuid"

export const NEW_EMPTY_ORDER = () => ({
    in_base: false,
    uid: v4(),
    ver: v4(),
    number: undefined,
    price: 0,
    quantity: 0,
    sum: 0,
    sum_discount: 0,
    items: []
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
    items: []
})

export const ORDER_TIME_OUT = 1000

const initialState = {
    date: JSON.stringify(date_dayjs(new Date())),
    pre_order: NEW_EMPTY_ORDER(),
    horder: NEW_EMPTY_HORDER(),
    total: 0,
    cash: 0,
    change: 0,
    pre_order_paying: false,
    horder_paying: false,
    orders_cinema_schedule: [],

    // Заказы кино
    orders_cinema: [],
    orders_cinema_filial_seance: {current_filial: null, current_uid_seance: null},
    orders_cinema_page: 1,
    // Фильтры кино (загруженные)
    orders_cinema_filters_staff: [],
    orders_cinema_filters_state: [
        {uid: 0, title: 'Ожидают оплаты'},
        {uid: 1, title: 'Пробить кассовый чек'},
        {uid: 2, title: 'Успешно оплачены'},
        {uid: 3, title: 'Отмененные'}],
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

    // Заказы общепита
    orders_horeca: {orders: [], total_count: 0},
    orders_horeca_page: 1,
    // Фильтры общепит (загруженные)
    orders_horeca_filters_staff: [],
    orders_horeca_filters_state: [
        {uid: 0, title: 'Ожидают оплаты'},
        {uid: 1, title: 'Пробить кассовый чек'},
        {uid: 2, title: 'Успешно оплачены'},
        {uid: 3, title: 'Отмененные'}],
    orders_horeca_filters_halls: [],
    orders_horeca_filters_workplaces: [],
    orders_horeca_filters_kitchen_points: [],
    orders_horeca_filters_kitchen_state: [
        {uid: 0, title: 'Готовить'},
        {uid: 1, title: 'Готовится'},
        {uid: 2, title: 'Готов'},
    ],
    // Фильтры общепит (выбранные)
    orders_horeca_filters_staff_selected: [],
    orders_horeca_filters_state_selected: [],
    orders_horeca_filters_halls_selected: [],
    orders_horeca_filters_workplaces_selected: [],
    orders_horeca_filters_kitchen_points_selected: [],
    orders_horeca_filters_kitchen_state_selected: [],
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
        setPreOrderPaying: (state, {payload}) => {
            state.pre_order_paying = payload
        },
        setHorderPaying(state, {payload}) {
            state.horder_paying = payload
        },
        setOrdersCinemaSchedule(state, {payload}) {
            state.orders_cinema_schedule = payload
        },
        setOrdersCinema(state, {payload}) {
            state.orders_cinema = payload
        },
        setOrdersCinemaFilialSeance(state, {payload}) {
            state.orders_cinema_filial_seance = payload
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
    },
})

export const {
    setDate,
    setCurrentPreOrder,
    setCurrentHorder,
    setCash,
    setTotal,
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
    setOrdersCinemaFiltersBuyerPhoneNumbersSelect
} = ordersSlice.actions
export default ordersSlice.reducer