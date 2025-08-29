import {createSlice} from "@reduxjs/toolkit"
import {date_dayjs} from "../service/advanced.js"

const now = new Date()
const current_date = date_dayjs(
    now.getHours() >= 0 && now.getHours() < 7
        ? new Date(now.setDate(now.getDate() - 1))
        : now
)

const initialState = {

    // Запрошено
    current_page: 'films',
    date_shift: `${current_date.year()}-${current_date.month() + 1}-${current_date.date()}`,
    uid_order: null,

    // Загружено
    schedule: [],
    pre_order: null,
}

export const secondScreenSlice = createSlice({
    name: "second_screen",
    initialState,
    reducers: {
        setSSSchedule: (state, action) => {
            state.schedule = action.payload
        },
        setSSState: (state, action) => {
            state.current_page = action.payload.current_page
            state.date_shift = action.payload.date_shift
            state.uid_order = action.payload.uid
        },
        setSSPreOrder: (state, action) => {
            state.pre_order = action.payload
        }
    },
})

export const {setSSSchedule, setSSState, setSSPreOrder} = secondScreenSlice.actions
export default secondScreenSlice.reducer