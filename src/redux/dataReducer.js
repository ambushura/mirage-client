export const GET_CITIES = 'GET_CITIES'
export const SET_CITY = 'SET_CITY'
export const SET_FILIAL = 'SET_FILIAL'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_TOP_MENU = 'SET_TOP_MENU'
export const SET_CITIES_MENU = 'SET_CITIES_MENU'
export const SET_FILIALS_MENU = 'SET_FILIALS_MENU'
const defaultState = {
    cities: [],
    city: undefined,
    filial: undefined,
    current_page: 'films',
    top_menu: [
        {id: 'films', name: 'Фильмы', path: ''},
        {id: 'schedule', name: 'Расписание', path: ''},
        {id: 'mkitchen', name: 'Mkitchen', path: ''}
    ],
    cities_menu: [],
    filials_menu: []
}
export const dataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_CITIES:
            return {...state, cities: action.payload}
        case SET_CITY:
            return {...state, city: action.payload}
        case SET_FILIAL:
            return {...state, filial: action.payload}
        case SET_CURRENT_PAGE:
            return {...state, current_page: action.payload}
        case SET_TOP_MENU:
            return {...state, top_menu: action.payload}
        case SET_CITIES_MENU:
            return {...state, cities_menu: action.payload}
        case SET_FILIALS_MENU:
            return {...state, filials_menu: action.payload}
        default:
            return state
    }
}
export const getCities = (payload) => ({type: GET_CITIES, payload})
export const setCity = (payload) => ({type: SET_CITY, payload})
export const setFilial = (payload) => ({type: SET_FILIAL, payload})
export const setCurrentPage = (payload) => ({type: SET_CURRENT_PAGE, payload})
export const setTopMenu = (payload) => ({type: SET_TOP_MENU, payload})
export const setCitiesMenu = (payload) => ({type: SET_CITIES_MENU, payload})
export const setFilialsMenu = (payload) => ({type: SET_FILIALS_MENU, payload})