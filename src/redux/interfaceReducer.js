import { createSlice } from "@reduxjs/toolkit"
export const MOBILE_WIDTH = 768
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
    top_menu: [
        [
            { id: "films", name: "Фильмы", path: "" },
            { id: "schedule", name: "Расписание", path: "" },
            { id: "mkitchen", name: "Mkitchen", path: "" },
        ],
        [
            { id: "films", name: "Фильмы", path: "" },
            { id: "schedule", name: "Расписание", path: "" },
            { id: "menu", name: "Меню", path: "" },
            { id: "admin", name: "Администрирование", path: "" },
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
    },
})
export const {
    setAppWidth,
    setAppHeight,
    setAuthOpened,
    setCurrentPage,
    setTopMenu
} = interfaceSlice.actions
export default interfaceSlice.reducer