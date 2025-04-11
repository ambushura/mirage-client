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
    orders_cinema: [],
    orders_cinema_filial_seance: {filial: null, uid_seance: null},
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
        setOrdersCinema(state, {payload}) {
            state.orders_cinema = JSON.parse(JSON.stringify(payload))
        },
        setOrdersCinemaFilialSeance(state, {payload}) {
            state.orders_cinema_filial_seance = payload
        }
    },
})

export const { setDate,
    setCurrentPreOrder,
    setCurrentHorder,
    setCash,
    setTotal,
    setPreOrderPaying,
    setHorderPaying,
    setOrdersCinema,
    setOrdersCinemaFilialSeance,} = ordersSlice.actions
export default ordersSlice.reducer