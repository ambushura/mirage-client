import { createSlice } from "@reduxjs/toolkit"
import { date_dayjs, NEW_EMPTY_ORDER } from "../components/service/advanced.js"
const initialState = {
    date: JSON.stringify(date_dayjs(new Date())),
    view: "seances",
    pre_order: NEW_EMPTY_ORDER(),
}
export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload
        },
        setView: (state, action) => {
            state.view = action.payload
        },
        setCurrentPreOrder: (state, action) => {
            state.pre_order = action.payload
        },
    },
})
export const { setDate, setView, setCurrentPreOrder } = ordersSlice.actions
export default ordersSlice.reducer