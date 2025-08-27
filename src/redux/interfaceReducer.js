import {createSlice} from "@reduxjs/toolkit"
import {date_dayjs} from "../service/advanced.js"

const now = new Date()
const current_date = date_dayjs(
    now.getHours() >= 0 && now.getHours() < 7
        ? new Date(now.setDate(now.getDate() - 1))
        : now
)

export const PAYMENT_STATE_CANCELED = 'Заказ отменен'
export const PAYMENT_STATE_WAITING = 'Ожидает оплаты'
export const PAYMENT_STATE_SLIP_WITHOUT_RECEIPT = 'Списали деньги с карты, но не пробили чек'
export const RETURNING_STATE_WAITING = 'Успешно оплачено'
export const RETURNING_STATE_SLIP_WITHOUT_RECEIPT = 'Вернули деньги на карту, но не пробили кассовый чек'
export const RETURNING_STATE_SUCCESS = 'Успешно оформлен возврат'
export const ITEMS_TYPE_ITEMS = 'Товары'
export const ITEMS_TYPE_SERVICE = 'Услуги'
export const ITEMS_TYPE_MARK_EGAIS = 'Товары ЧЗ, ЕГАИС'
export const MOBILE_WIDTH = 1024
export const HEADER_HEIGHT = [200, 70]
export const FOOTER_HEIGHT = [50, 50]
export const PARAM_DATE_SHIFT = ["films", "film", "schedule"]
export const PARAM_DATA_ADMIN_SHIFT = ['kitchen', "admin/orders/cinema", "admin/orders/horeca", "admin/egais", "admin/zbooks", "admin/operations", "admin/halls", "admin/equipment", "admin/staff", "admin/acquiring"]
export const TOP_MENU = [
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
                {id: "admin/orders/cinema", name: "Заказы (услуги)", path: ""},
                {id: "admin/orders/horeca", name: "Заказы (товары)", path: ""},
                {id: "admin/egais", name: "ЕГАИС", path: ""},
                {id: "admin/zbooks", name: "Кассовые книги", path: ""},
                {id: "admin/acquiring", name: "Эквайринг", path: ""},
                {id: "admin/operations", name: "Операции по кассам", path: ""},
                {id: "admin/staff", name: "Табели", path: ""},
                {id: "admin/halls", name: "Схемы залов", path: ""},
                {id: "admin/equipment", name: "Оборудование", path: ""},
            ]
        },
    ],
]

const initialState = {
    kiosk: true,
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
    top_menu: TOP_MENU,
}

const interfaceSlice = createSlice({
    name: "interface",
    initialState,
    reducers: {
        setKiosk: (state, action) => {
            state.kiosk = action.payload
        },
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
        },
    },
})

export const {
    setKiosk,
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