import { createSlice } from "@reduxjs/toolkit"
import { date_dayjs, NEW_EMPTY_ORDER } from "../service/advanced.js"
const initialState = {
    date: JSON.stringify(date_dayjs(new Date())),
    pre_order: NEW_EMPTY_ORDER(),
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
export const { setDate, setCurrentPreOrder } = ordersSlice.actions
export default ordersSlice.reducer