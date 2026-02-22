import {createSlice} from "@reduxjs/toolkit"
import dayjs from "dayjs"

const today = dayjs().format('YYYY-MM-DD')

const main_menu = [{
    id: 'shift', title: 'Смена', icon: 0, submenu: [{
        id: 'revenue', title: 'Выручка', icon: 3
    }, {id: 'results', title: 'Отчет управляющего', icon: 3}]
}, {
    id: 'horeca', title: 'Общепит', icon: 2, submenu: [{
        id: 'goods', title: 'Номенклатура', icon: 4
    }, {
        id: 'orders', title: 'Заказы', icon: 4
    }, {
        id: 'sales', title: 'Итоги смены (товары)', icon: 3
    }, {
        id: 'revenue', title: 'Итоги смены (выручка)', icon: 3
    }]
}, {
    id: 'cinema', title: 'Кино', icon: 1, submenu: [{
        id: 'orders', title: 'Заказы', icon: 4
    }]
},]

const initialState = {

    // Параметры
    search_params: {},
    params: {
        uid_horeca_order: null,
    },

    // Центральный филиал
    root_filial: {ip: '10.101.3.88', port: '60000'},

    // Отладка
    //root_filial: {ip: '10.101.2.21', port: '60000'},

    // Меню
    main_menu: main_menu,
    current_page: ['shift', 'revenue'],

    // Филиалы
    filials: [],
    filials_selected: [],

    // Филиал
    filial: null,
    filial_selected: '',

    // Периоды
    date_shift_beginning: today,
    date_shift_end: today,
    date_shift_valid: true,
    date_shift_accepted: 0,

    // Дата смены
    date_shift: today,

    // Папки
    tree: [],
    expanded_tree: [],
    uid_current_folder: null,

    // Номенклатура
    goods: [],
    uid_current_good: null,

    // Хорека заказы
    orders_horeca: {columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}},
    order_horeca: null,
    order_horeca_items_expended: [],
}

export const centerSlice = createSlice({

    name: 'center', initialState, reducers: {

        // Параментры
        setParams: (state, {payload}) => {
            Object.assign(state.params, payload)
        }, setSearchParams: (state, {payload}) => {
            state.search_params = payload
        },

        // Центральный филиал
        setRootFilial: (state, action) => {
            state.root_filial = action.payload
        },

        // Меню
        setCurrentPage: (state, action) => {
            state.current_page = action.payload
        },

        // Филиалы
        setFilial: (state, action) => {
            state.filial_selected = action.payload[0]
            state.filial = action.payload[1]
        }, setFilials(state, action) {
            state.filials = action.payload
        }, setFilialsSelected(state, action) {
            state.filials_selected = action.payload
        },

        // Периода
        setPeriod(state, action) {
            const [start, end] = action.payload
            state.date_shift_beginning = start
            state.date_shift_end = end
            state.date_shift_valid = true
        }, clearPeriod(state) {
            state.date_shift_beginning = null
            state.date_shift_end = null
            state.date_shift_valid = false
        }, dateShiftAccepted(state) {
            if (!state.date_shift_valid) return
            state.date_shift_accepted += 1
        },

        // Дата смены
        setDateShift(state, action) {
            state.date_shift = action.payload
            // Очищаем заказ хорека
            state.uid_current_order_horeca = null
            state.order_horeca = null
        },

        // Папки
        setTree(state, action) {
            state.tree = action.payload
        }, setExpandedTree(state, action) {
            state.expanded_tree = action.payload
        }, setUidCurrentFolder(state, action) {
            state.uid_current_folder = action.payload
        },

        // Номенклатура
        setGoods(state, action) {
            state.goods = action.payload
        }, setUidCurrentGood(state, action) {
            state.uid_current_good = action.payload
        },

        // Заказы хорека
        cleanOrdersHoreca(state) {
            state.orders_horeca = {columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}}
        }, setOrdersHoreca(state, action) {
            state.orders_horeca = action.payload
        },

        // Текущий заказ хорека
        setOrderHoreca(state, {payload}) {
            state.order_horeca = payload
        }, cleanOrderHoreca(state) {
            state.order_horeca = null
            state.params.uid_horeca_order = null
        }, setHorecaOrderItemsExpended(state, {payload}) {
            state.order_horeca_items_expended = payload
        }
    },
})

export const {

    // Параметры
    setParams, setSearchParams,

    // Центральный филиал
    setRootFilial,

    // Меню
    setCurrentPage,

    // Филиалы
    setFilial, setFilials, setFilialsSelected,

    // Периоды
    setPeriod, dateShiftAccepted, clearPeriod,

    // Дата смены
    setDateShift,

    // Папки
    setTree, setExpandedTree, setUidCurrentFolder,

    // Номенклатура
    setGoods, setUidCurrentGood,

    // Заказы хорека
    cleanOrdersHoreca, setOrdersHoreca,

    // Текущий заказ хорека
    setOrderHoreca, cleanOrderHoreca, setHorecaOrderItemsExpended,

} = centerSlice.actions
export default centerSlice.reducer