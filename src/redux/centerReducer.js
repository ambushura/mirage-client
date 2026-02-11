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
        id: 'sales', title: 'Отчеты о розничных продажах', icon: 3
    }]
}, {
    id: 'cinema', title: 'Кино', icon: 1, submenu: [{
        id: 'orders', title: 'Заказы', icon: 4
    }]
},]

const initialState = {

    // Меню
    main_menu: main_menu, current_page: ['shift', 'revenue'],

    // Филиалы
    filials: [], filials_selected: [],

    // Филиал
    filial: null,

    // Периоды
    date_shift_beginning: today, date_shift_end: today, date_shift_valid: true, date_shift_accepted: 0,

    // Дата смены
    date_shift: today,

    // Папки
    tree: [], expanded_tree: [],
}

export const centerSlice = createSlice({

    name: 'center', initialState, reducers: {

        // Меню
        setCurrentPage: (state, action) => {
            state.current_page = action.payload
        },

        // Филиалы
        setFilial: (state, action) => {
            state.filial = action.payload
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
        },

        // Папки
        setTree(state, action) {
            state.tree = action.payload
        }, setExpendedTree(state, action) {
            state.expanded_tree = action.payload
        }
    },
})

export const {

    // Меню
    setCurrentPage,

    // Филиалы
    setFilial, setFilials, setFilialsSelected,

    // Периоды
    setPeriod, dateShiftAccepted, clearPeriod,

    // Дата смены
    setDateShift,

    // Папки
    setTree, setExpendedTree
} = centerSlice.actions
export default centerSlice.reducer