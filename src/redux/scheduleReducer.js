import {date_dayjs} from "../func/functions"
export const SET_SCHEDULE_CITY = 'SET_SCHEDULE_CITY'
export const SET_SCHEDULE_FILIAL = 'SET_SCHEDULE_FILIAL'
export const SET_DATE = 'SET_DATE'
export const SET_FILMS = 'SET_FILMS'
export const SET_FILM = 'SET_FILM'
const current_date = date_dayjs(new Date())
const current_date_param = current_date.$y + '-' + (current_date.$M + 1) + '-' + current_date.$D
export const SET_SEANCE = 'SET_SEANCE'
export const GET_BOOKING = 'GET_BOOKING'
const defaultState = {
    date: current_date,
    date_param: current_date_param,
    films: [],
    film: undefined,
    schedule_city: [],
    schedule_filial: [],
    seance: undefined,
    booking: []
}
export const scheduleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_DATE:
            const current_date = action.payload
            return {...state, date: current_date, date_param: current_date.$y + '-' + (current_date.$M + 1) + '-' + current_date.$D}
        case SET_FILMS:
            return {...state, films: action.payload}
        case SET_FILM:
            return {...state, film: action.payload}
        case SET_SEANCE:
            return {...state, seance: action.payload}
        case GET_BOOKING:
            return {...state, booking: action.payload}
        case SET_SCHEDULE_CITY:
            return {...state, schedule_city: action.payload}
        case SET_SCHEDULE_FILIAL:
            return {...state, schedule_filial: action.payload}
        default:
            return state
    }
}
export const setScheduleFilial = (payload) => ({type: SET_SCHEDULE_FILIAL, payload})
export const setScheduleCity = (payload) => ({type: SET_SCHEDULE_CITY, payload})
export const setFilms = (payload) => ({type: SET_FILMS, payload})
export const setFilm = (payload) => ({type: SET_FILM, payload})
export const setScheduleDateShift = (payload) => ({type: SET_DATE, payload})
export const setSeance = (payload) => ({type: SET_SEANCE, payload})
export const getBooking = (payload) => ({type: GET_BOOKING, payload})