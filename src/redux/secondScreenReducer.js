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
    uid_seance: null,
    uid_pre_order: null,
    uid_horder: null,

    // Загружено
    schedule: [],
    pre_order: null,
    horder: null,
    seance: null,
    hall: null,
    booking: [],
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
            state.uid_seance = action.payload.uid_seance
        },
        setSSSeance: (state, action) => {
            state.seance = action.payload.seance
            state.hall = action.payload.hall
            state.booking = action.payload.booking
        },
        setSSPreOrder: (state, action) => {
            state.pre_order = action.payload
        },
        setSSHorder: (state, action) => {
            state.horder = action.payload
        },
        setSSBooking: (state, action) => {
            state.booking = action.payload
        }
    },
})

export const {
    setSSSchedule,
    setSSState,
    setSSPreOrder,
    setSSSeance,
    setSSHorder,
    setSSBooking
} = secondScreenSlice.actions
export default secondScreenSlice.reducer