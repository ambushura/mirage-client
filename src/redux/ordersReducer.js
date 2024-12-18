import {date_dayjs} from "../func/functions"
import {v4} from "uuid"
export const SET_DATE = 'SET_DATE'
export const SET_VIEW = 'SET_VIEW'
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'
export const SET_CURRENT_PRE_ORDER = 'SET_PRE_ORDER'
const defaultState = {
    date: date_dayjs(new Date()),
    view: ['seances', 'list'][0],
    pre_order: {uid: v4(), price: 0, count: 0, books: []},
    order: {uid: v4(), price: 0, count: 0, books: []}
}
export const ordersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_DATE:
            return {...state, date: action.payload}
        case SET_VIEW:
            return {...state, view: action.payload}
        case SET_CURRENT_ORDER:
            return {...state, order: action.payload}
        case SET_CURRENT_PRE_ORDER:
            return {...state, pre_order: action.payload}
        default:
            return state
    }
}
export const setCurrentOrder = (payload) => ({type: SET_CURRENT_ORDER, payload})
export const setCurrentPreOrder = (payload) => ({type: SET_CURRENT_PRE_ORDER, payload})