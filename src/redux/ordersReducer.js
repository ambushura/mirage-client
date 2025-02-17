import {createSlice} from "@reduxjs/toolkit"
import {date_dayjs} from "../service/advanced.js"
import {v4} from "uuid"
export const NEW_EMPTY_ORDER = () => {return {in_base: false, uid: v4(), number: undefined, price: 0, quantity: 0, booking: []}}
export const NEW_EMPTY_HORDER = () => {return {
    in_base: false,
    uid: v4(),
    number: undefined,
    price: 0,
    quantity: 0,
    items_kitchen: [],
    items_mark: [],
    items_others: []
}}
export const ORDER_TIME_OUT = 1000
const initialState = {
    date: JSON.stringify(date_dayjs(new Date())),
    pre_order: NEW_EMPTY_ORDER(),
    horder: NEW_EMPTY_HORDER()
}
export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload
        },
        setCurrentPreOrder: (state, action) => {
            state.pre_order = action.payload
        },
    },
})
export const {setDate, setCurrentPreOrder} = ordersSlice.actions
export default ordersSlice.reducer