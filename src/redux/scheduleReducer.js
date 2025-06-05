import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    booking: [],
    films: [],
    film_seances: {film: undefined, data: []},
    schedule: [],
    seance: undefined,

    // Фильтры расписания (загруженные)
    schedule_filters_films: [],
    schedule_filters_halls: [],
    schedule_filters_film_types: [
        {uid: 'mirage', title: 'Мираж Синема'},
        {uid: 'toKino', title: 'То Кино!'},
        {uid: 'pushkarta', title: 'Пушкинская карта'}
    ],
    schedule_filters_film_copy_types: [
        {uid: '2D', title: '2D'},
        {uid: '3D', title: '3D'}
    ],

    // Фильтры расписания (загруженные)
    // Состояние сеансов
    schedule_filters_seance_closed: false,
    schedule_filters_seance_canceled: false,
    schedule_filters_seance_opened: true,

    schedule_filters_film_copy_types_selected: [],

    schedule_filters_films_selected: [],
    schedule_filters_halls_selected: [],

    // Тип залов
    schedule_filters_hall_type_vip: true,
    schedule_filters_hall_type_regular: true,

    // Внешний отбор
    schedule_filters_film_types_selected: [
        {uid: 'mirage', title: 'Мираж Синема'},
        {uid: 'toKino', title: 'То Кино!'},
        {uid: 'pushkarta', title: 'Пушкинская карта'}
    ],

    // Ползунки
    schedule_filters_film_age: [0, 100],
    schedule_filters_time: [0, 100],
    schedule_filters_price: [0, 100000],
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
            const exists = state.schedule_filters_film_types_selected.find(el => el.uid === action.payload.uid)
            state.schedule_filters_film_types_selected = exists
                ? state.schedule_filters_film_types_selected.filter(el => el.uid !== action.payload.uid)
                : [...state.schedule_filters_film_types_selected, action.payload]
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
        setScheduleFiltersTime: (state, action) => {
            state.schedule_filters_time = action.payload
        },
        setScheduleFiltersPrice: (state, action) => {
            state.schedule_filters_price = action.payload
        },
        setScheduleFiltersFilmCopyTypes: (state, action) => {
            state.schedule_filters_film_copy_types_selected = action.payload
        }
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
    setScheduleFiltersTime,
    setScheduleFiltersPrice,
    setScheduleFiltersFilmCopyTypes,
} = scheduleSlice.actions
export default scheduleSlice.reducer