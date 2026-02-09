import {createSlice} from "@reduxjs/toolkit"
import dayjs from "dayjs"

const main_menu = [{
    id: 'shift', title: 'Смена', icon: 0, submenu: [{
        id: 'revenue', title: 'Выручка', icon: 3
    }, {id: 'results', title: 'Сверка', icon: 3}]
}, {
    id: 'cinema', title: 'Кино', icon: 1, submenu: [{
        id: 'orders', title: 'Заказы', icon: 4
    }]
}, {
    id: 'horeca', title: 'Общепит', icon: 2, submenu: [{
        id: 'orders', title: 'Заказы', icon: 4
    }, {
        id: 'sales', title: 'Отчеты о розничных продажах', icon: 4
    }, {
        id: 'recipes', title: 'Калькуляции', icon: 0
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
    date_shift_beginning: dayjs(new Date()).format("YYYY-MM-DD"), date_ending: dayjs(new Date()).format("YYYY-MM-DD"),
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
            state.date_shift_beginning = action.payload[0].format('YYYY-MM-DD')
            state.date_shift_end = action.payload[1].format('YYYY-MM-DD')
        }
    },
})

export const {

    // Меню
    setCurrentPage,

    // Филиалы
    setFilial, setFilials, setFilialsSelected,

    // Периоды
    setPeriod
} = centerSlice.actions
export default centerSlice.reducer