import {createSlice} from "@reduxjs/toolkit"
import {date_dayjs} from "../service/advanced.js"

const current_date = date_dayjs(new Date())

export const MOBILE_WIDTH = 1024
export const ANIMATION_SPEED = 250
export const HEADER_HEIGHT = [200, 70]
export const TOP_MENU_HEIGHT = [65, 65]
export const FOOTER_HEIGHT = [50, 50]
export const PARAM_DATE_SHIFT = ["films", "film", "schedule"]
export const PARAM_DATA_ADMIN_SHIFT = ["admin/orders/cinema", "admin/orders/horeca", "admin/orders/egais", "admin/total", "admin/halls", "admin/equipment"]

const initialState = {
    app_width: undefined,
    app_height: undefined,
    auth_opened: false,
    current_page: 'films',
    modal_opened: false,
    modal_type: null,
    modal_props: {},
    search_params: {},
    wp: 'mpopcorn2',
    params: {
        param_city: undefined,
        param_filial: undefined,
        param_date: `${current_date.year()}-${current_date.month() + 1}-${current_date.date()}`,
        param_date_admin: `${current_date.year()}-${current_date.month() + 1}-${current_date.date()}`,
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
            {id: "kitchen", name: "Кухня", path: ""},
            {
                id: "admin", name: "Кинокомплекс",
                path: [
                    {id: "admin/orders/cinema", name: "Кино", path: ""},
                    {id: "admin/orders/horeca", name: "Общепит", path: ""},
                    {id: "admin/egais", name: "ЕГАИС", path: ""},
                    {id: "admin/zbooks", name: "Кассовые книги", path: ""},
                    {id: "admin/operations", name: "Операции по кассам", path: ""},
                    {id: "admin/halls", name: "Схемы залов", path: ""},
                    {id: "admin/equipment", name: "Оборудование", path: ""},
                ]
            },
        ],
    ],
}

const interfaceSlice = createSlice({
    name: "interface",
    initialState,
    reducers: {
        setAppWidth: (state, {payload}) => {
            state.app_width = payload
        },
        setAppHeight: (state, {payload}) => {
            state.app_height = payload
        },
        setAuthOpened: (state, {payload}) => {
            state.auth_opened = payload
        },
        setCurrentPage: (state, {payload}) => {
            state.current_page = payload
        },
        setTopMenu: (state, {payload}) => {
            state.top_menu = payload
        },
        setParams: (state, {payload}) => {
            Object.assign(state.params, payload)
        },
        setSearchParams: (state, {payload}) => {
            state.search_params = JSON.parse(payload)
        },
        openModal: (state, {payload}) => {
            state.modal_opened = true
            state.modal_type = payload.type
            state.modal_props = payload.props
        },
        closeModal: (state) => {
            state.modal_opened = false
            state.modal_type = null
            state.modal_props = {}
        },
        setWP: (state, {payload}) => {
            state.wp = payload
        }
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
    openModal,
    closeModal,
    setWP,
} = interfaceSlice.actions

export default interfaceSlice.reducer
export const TIMEOUT = 130