import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    booking: [],
    films: [],
    film_seances: {film: undefined, data: []},
    schedule: [],
    seance: undefined,
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
            state.film_seances = action.payload
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
    setSeance,
    setBooking
} = scheduleSlice.actions
export default scheduleSlice.reducer