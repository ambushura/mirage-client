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
    show_pre_order: false,
    show_horder: false,
    ver_pre_order: '',
    ver_horder: '',

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
            state.uid_pre_order = action.payload.uid_pre_order
            state.uid_horder = action.payload.uid_horder
            state.uid_seance = action.payload.uid_seance
            state.show_pre_order = action.payload.show_pre_order
            state.ver_pre_order = action.payload.ver_pre_order
            state.ver_horder = action.payload.ver_horder
            if (!action.payload.show_pre_order) {
                state.pre_order = null
            }
            state.show_horder = action.payload.show_horder
            if (!action.payload.show_horder) {
                state.horder = null
            }
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