import {createSlice} from "@reduxjs/toolkit"
import {date_dayjs} from "../ui/hooks/common_functions.js"

const now = new Date()
const current_date = date_dayjs(now.getHours() >= 0 && now.getHours() < 7 ? new Date(now.setDate(now.getDate() - 1)) : now)

export const PAYMENT_STATE_CANCELED = 'Заказ отменен'
export const PAYMENT_STATE_WAITING = 'Ожидает оплаты'
export const PAYMENT_STATE_SLIP_WITHOUT_RECEIPT = 'Списали деньги с карты, но не пробили чек'
export const RETURNING_STATE_WAITING = 'Успешно оплачено, доступен возврат'
export const RETURNING_STATE_SLIP_WITHOUT_RECEIPT = 'Вернули деньги на карту, но не пробили кассовый чек'
export const RETURNING_STATE_SUCCESS = 'Успешно оформлен возврат'
export const ITEMS_TYPE_ITEMS = 'Товары'
export const ITEMS_TYPE_SERVICE = 'Услуги'
export const ITEMS_TYPE_MARK_EGAIS = 'Товары ЧЗ, ЕГАИС'
export const MOBILE_WIDTH = 1024
export const HEADER_HEIGHT = [200, 70]
export const FOOTER_HEIGHT = [50, 50]
export const PARAM_DATE_SHIFT = ["films", "film", "schedule", "second_screen"]
export const PARAM_DATA_ADMIN_SHIFT = ['kitchen', "admin/orders/cinema", "admin/orders/horeca", "admin/egais", "admin/zbooks", "admin/operations", "admin/halls", "admin/scheme", "admin/staff", "admin/acquiring", 'admin/reports']
export const TOP_MENU = [[{id: "films", name: "Фильмы", path: ""}, {
    id: "schedule", name: "Расписание", path: ""
},], [{id: "films", name: "Фильмы", path: ""}, {id: "schedule", name: "Расписание", path: ""}, {
    id: "menu", name: "Меню", path: ""
}, {id: "kitchen", name: "Кухня", path: ""}, {
    id: "admin", name: "Кинокомплекс", path: [{id: "admin/orders/cinema", name: "Заказы (услуги)", path: ""}, {
        id: "admin/orders/horeca", name: "Заказы (товары)", path: ""
    }, {id: "admin/egais", name: "ЕГАИС", path: ""}, {id: "admin/reports", name: "Отчеты", path: ""}, {
        id: "admin/zbooks", name: "Кассовые документы", path: ""
    }, {id: "admin/acquiring", name: "Эквайринг", path: ""}, {
        id: "admin/operations", name: "Операции по кассам", path: ""
    }, {id: "admin/staff", name: "Табели", path: ""}, {
        id: "admin/halls", name: "Схемы залов", path: ""
    }, {id: "admin/scheme", name: "Управление", path: ""},]
},],]

const initialState = {
    its_second_screen: false,
    wp: null,
    version: '1.001',
    need_update: false,
    dev: true,
    app_width: undefined,
    app_height: undefined,
    auth_opened: false,
    current_page: 'films',
    modal_opened: false,
    modal_type: null,
    modal_props: {},
    search_params: {},
    params: {
        param_city: undefined,
        param_filial: undefined,
        param_date: `${current_date.year()}-${current_date.month() + 1}-${current_date.date()}`,
        param_date_admin: `${current_date.year()}-${current_date.month() + 1}-${current_date.date()}`,
        uid_film: undefined,
        uid_seance: undefined,
        uid: undefined,
    },
    top_menu: TOP_MENU,
    kiosk_checkout: 0,

    // Работа с рабочими местами
    reset_wp: null,
    turn_on_wp: null,
    turn_off_wp: null,

    // Киоск
    kiosk: false,
    inactivity_time: 0,
}

const interfaceSlice = createSlice({
    name: "interface", initialState, reducers: {
        setDev: (state, action) => {
            state.dev = action.payload
        }, setKiosk: (state, action) => {
            state.kiosk = action.payload
        }, setAppWidth: (state, {payload}) => {
            state.app_width = payload
        }, setAppHeight: (state, {payload}) => {
            state.app_height = payload
        }, setAuthOpened: (state, {payload}) => {
            state.auth_opened = payload
        }, setCurrentPage: (state, {payload}) => {
            state.current_page = payload
        }, setTopMenu: (state, {payload}) => {
            state.top_menu = payload
        }, setParams: (state, {payload}) => {
            Object.assign(state.params, payload)
        }, setSearchParams: (state, {payload}) => {
            state.search_params = JSON.parse(payload)
            if (state.search_params.wp !== undefined) {
                state.wp = state.search_params.wp
            } else {
                state.wp = null
            }
            state.kiosk = state.search_params.kiosk !== undefined
        }, openModal: (state, {payload}) => {
            state.modal_opened = true
            state.modal_type = payload.type
            state.modal_props = payload.props
        }, closeModal: (state) => {
            state.modal_opened = false
            state.modal_type = null
            state.modal_props = {}
        }, setWP: (state, {payload}) => {
            state.wp = payload
        }, setSecondScreen: (state) => {
            state.its_second_screen = true
        }, setNeedUpdate: (state, {payload}) => {
            state.need_update = payload
        }, setKioskCheckout(state, {payload}) {
            state.kiosk_checkout = payload
        }, resetWP: (state, {payload}) => {
            state.reset_wp = payload
        }, turnOnWP: (state, {payload}) => {
            state.turn_on_wp = payload
        }, turnOffWP: (state, {payload}) => {
            state.turn_off_wp = payload
        },

        // Киоск
        setInactivityTime: (state, {payload}) => {
            state.inactivity_time = payload
        }, decrementInactivityTime(state) {
            if (state.inactivity_time > 0) {
                state.inactivity_time--
            }
        },
    },
})

export const {
    setKiosk,
    setWP,
    setSecondScreen,
    setAppWidth,
    setAppHeight,
    setAuthOpened,
    setCurrentPage,
    setTopMenu,
    setParams,
    setSearchParams,
    openModal,
    closeModal,
    setDev,
    setNeedUpdate,
    setKioskCheckout,
    resetWP,
    turnOnWP,
    turnOffWP,
    setInactivityTime,
    decrementInactivityTime,
} = interfaceSlice.actions

export default interfaceSlice.reducer
export const TIMEOUT = 130