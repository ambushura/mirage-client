import { createSlice } from "@reduxjs/toolkit"
import {date_dayjs} from "../service/advanced.js"
const current_date = date_dayjs(new Date())
export const MOBILE_WIDTH = 1150
export const ANIMATION_SPEED = 250
export const HEADER_HEIGHT = [200, 70]
export const TOP_MENU_HEIGHT = [65, 65]
export const FOOTER_HEIGHT = [50, 50]
export const PARAM_DATE_SHIFT = ['films', 'film', 'schedule']
const initialState = {
    app_width: undefined,
    app_height: undefined,
    auth_opened: false,
    current_page: "films",
    search_params: {},
    params: {
        param_city: undefined,
        param_filial: undefined,
        param_date: `${current_date.year()}-${current_date.month() + 1}-${current_date.date()}`,
        uid_film: undefined,
        uid_seance: undefined,
    },
    top_menu: [
        [
            {id: "films", name: "Фильмы", path: ""},
            {id: "schedule", name: "Расписание", path: ""},
            {id: "mkitchen", name: "Mkitchen", path: ""},
        ],
        [
            {id: "films", name: "Фильмы", path: ""},
            {id: "schedule", name: "Расписание", path: ""},
            {id: "menu", name: "Меню", path: ""},
            {id: "admin", name: "Администрирование", path: ""},
        ],
    ],
}
const interfaceSlice = createSlice({
    name: "interface",
    initialState,
    reducers: {
        setAppWidth: (state, action) => {
            state.app_width = action.payload
        },
        setAppHeight: (state, action) => {
            state.app_height = action.payload
        },
        setAuthOpened: (state, action) => {
            state.auth_opened = action.payload
        },
        setCurrentPage: (state, action) => {
            state.current_page = action.payload
        },
        setTopMenu: (state, action) => {
            state.top_menu = action.payload
        },
        setParams: (state, action) => {
            state.params.param_city = action.payload.param_city
            state.params.param_filial = action.payload.param_filial
            state.params.param_date = action.payload.param_date
            state.params.uid_film = action.payload.uid_film
            state.params.uid_seance = action.payload.uid_seance
        },
        setSearchParams: (state, action) => {
            state.search_params = JSON.parse(action.payload)
        },
    },
})
export const {
    setAppWidth,
    setAppHeight,
    setAuthOpened,
    setCurrentPage,
    setTopMenu,
    setParams,
    setSearchParams,
} = interfaceSlice.actions
export default interfaceSlice.reducer