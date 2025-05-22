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
    orders_cinema: [],
    orders_cinema_filial_seance: {current_filial: null, current_uid_seance: null},
    orders_horeca: [],
    orders_horeca_filters_staff: [],
    orders_horeca_filters_state: [
        {uid: 0, title: 'Ожидают оплаты'},
        {uid: 1, title: 'Пробить кассовый чек'},
        {uid: 2, title: 'Успешно оплачены'},
        {uid: 3, title: 'Отмененные'}],
    orders_horeca_filters_halls: [],
    orders_horeca_filters_workplaces: [],
    orders_horeca_filters_kitchen_points: [],
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
        }
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
} = ordersSlice.actions
export default ordersSlice.reducer