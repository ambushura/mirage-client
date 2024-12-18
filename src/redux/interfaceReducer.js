export const MOBILE_WIDTH = 768
export const ANIMATION_SPEED = 250
export const GET_WIDTH_APP = 'GET_WIDTH_APP'
export const GET_HEIGHT_APP = 'GET_HEIGHT_APP'
export const SET_AUTH_OPENED = 'SET_AUTH_OPENED'
const defaultState = {
    app_width: undefined,
    app_height: undefined,
    auth_opened: false
}
export const interfaceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_WIDTH_APP:
            return {...state, app_width: action.payload}
        case GET_HEIGHT_APP:
            return {...state, app_height: action.payload}
        case SET_AUTH_OPENED:
            return {...state, auth_opened: action.payload}
        default:
            return state
    }
}
export const setAppWidth = (payload) => ({type: GET_WIDTH_APP, payload})
export const setAppHeight = (payload) => ({type: GET_HEIGHT_APP, payload})
export const setAuthOpened = (payload) => ({type: SET_AUTH_OPENED, payload})