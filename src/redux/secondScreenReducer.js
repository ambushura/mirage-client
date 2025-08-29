import {createSlice} from "@reduxjs/toolkit"
import {date_dayjs} from "../service/advanced.js"

const now = new Date()
const current_date = date_dayjs(
    now.getHours() >= 0 && now.getHours() < 7
        ? new Date(now.setDate(now.getDate() - 1))
        : now
)

const initialState = {
    current_page: 'films',
    date_shift: `${current_date.year()}-${current_date.month() + 1}-${current_date.date()}`,
    schedule: [],
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
        }
    },
})

export const {setSSSchedule, setSSState} = secondScreenSlice.actions
export default secondScreenSlice.reducer