import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    booking: [],
    films: [],
    film_seances: {film: undefined, data: []},
    schedule: [],
    seance: undefined,

    // Фильтры расписания (загруженные)
    schedule_filters_films: [],
    schedule_filters_film_types: ['mirage', 'toKino', 'pushkarta'],
    schedule_filters_film_copy_types: ['2D', '3D'],
    schedule_filters_halls: [],

    // Фильтры расписания (загруженные)
    schedule_filters_seance_closed: false,
    schedule_filters_seance_canceled: false,
    schedule_filters_seance_opened: true,
    schedule_filters_films_selected: [],
    schedule_filters_film_types_selected: [],
    schedule_filters_film_copy_types_selected: [],
    schedule_filters_film_age: 0,
    schedule_filters_halls_selected: [],
    schedule_filters_hall_type_vip: true,
    schedule_filters_hall_type_regular: true,
    schedule_filters_beginning: undefined,
    schedule_filters_ending: undefined,
    schedule_filters_price_from: 0,
    schedule_filters_price_to: 100000,
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

        // Фильтры расписания (загрузка)
        setScheduleFiltersFilms: (state, action) => {
            state.schedule_filters_films = action.payload
        },
        setScheduleFiltersHalls: (state, action) => {
            state.schedule_filters_halls = action.payload
        },

        // Фильтры расписания (выбранные)
        setScheduleFiltersSeanceClosed: (state, action) => {
            state.schedule_filters_seance_closed = action.payload
        },
        setScheduleFiltersSeanceCanceled: (state, action) => {
            state.schedule_filters_seance_canceled = action.payload
        },
        setScheduleFiltersSeanceOpened: (state, action) => {
            state.schedule_filters_seance_opened = action.payload
        },
        setScheduleFiltersFilmsSelect: (state, action) => {
            state.schedule_filters_films_selected = action.payload
        },
        setScheduleFiltersFilmTypesSelect: (state, action) => {
            state.schedule_filters_film_types_selected = action.payload
        },
        setScheduleFiltersFilmAgeSelect: (state, action) => {
            state.schedule_filters_film_age = action.payload
        },
        setScheduleFiltersHallsSelect: (state, action) => {
            state.schedule_filters_halls_selected = action.payload
        },
        setScheduleFiltersHallTypeVip: (state, action) => {
            state.schedule_filters_hall_type_vip = action.payload
        },
        setScheduleFiltersHallTypeRegular: (state, action) => {
            state.schedule_filters_hall_type_regular = action.payload
        },
        setScheduleFiltersBeginning: (state, action) => {
            state.schedule_filters_beginning = action.payload
        },
        setScheduleFiltersEnding: (state, action) => {
            state.schedule_filters_ending = action.payload
        },
        setScheduleFiltersPriceFrom: (state, action) => {
            state.schedule_filters_price_from = action.payload
        },
        setScheduleFiltersPriceTo: (state, action) => {
            state.schedule_filters_price_to = action.payload
        },
    },
})

export const {
    setSchedule,
    setFilms,
    setFilm,
    setSeance,
    setBooking,
    setScheduleFiltersFilms,
    setScheduleFiltersHalls,
    setScheduleFiltersSeanceClosed,
    setScheduleFiltersSeanceCanceled,
    setScheduleFiltersSeanceOpened,
    setScheduleFiltersFilmsSelect,
    setScheduleFiltersFilmTypesSelect,
    setScheduleFiltersFilmAgeSelect,
    setScheduleFiltersHallsSelect,
    setScheduleFiltersHallTypeVip,
    setScheduleFiltersHallTypeRegular,
    setScheduleFiltersBeginning,
    setScheduleFiltersEnding,
    setScheduleFiltersPriceFrom,
    setScheduleFiltersPriceTo,
} = scheduleSlice.actions
export default scheduleSlice.reducer