import { createSlice } from "@reduxjs/toolkit"
import { date_dayjs } from "../service/advanced.js"
import dayjs from "dayjs"
const current_date = date_dayjs(new Date())
const initialState = {
    date: current_date.toISOString(),
    param_date: `${current_date.year()}-${current_date.month() + 1}-${current_date.date()}`,
    films: [],
    film_seances: {film: undefined, seances: []},
    schedule: [],
    seance: undefined,
    booking: [],
}
export const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        setSchedule: (state, action) => {
            state.schedule = action.payload
        },
        setFilms: (state, action) => {
            state.films = action.payload
        },
        setFilm: (state, action) => {
            state.film_seances = {film: action.payload.film, seances: action.payload.seances}
        },
        setScheduleDateShift: (state, action) => {
            const current_date_new = dayjs(action.payload); // оставляем объект dayjs
            state.date = action.payload;
            state.param_date = `${current_date_new.year()}-${current_date_new.month() + 1}-${current_date_new.date()}`
        },
        setSeance: (state, action) => {
            state.seance = action.payload
        },
        setBooking: (state, action) => {
            state.booking = action.payload
        },
    },
})
export const {
    setSchedule,
    setFilms,
    setFilm,
    setScheduleDateShift,
    setSeance,
    setBooking
} = scheduleSlice.actions
export default scheduleSlice.reducer