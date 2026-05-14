import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const today = dayjs().format('YYYY-MM-DD')

const main_menu = [
    {
        id: 'shift',
        title: 'Кинокомплекс',
        icon: 7,
        submenu: [
            {
                id: 'revenue',
                title: 'Выручка',
                icon: 3,
            },
            { id: 'results', title: 'Отчет управляющего', icon: 3 },
            {
                id: 'operations',
                title: 'Операции по кассе',
                icon: 3,
            },
        ],
    },
    {
        id: 'horeca',
        title: 'Общепит',
        icon: 6,
        submenu: [
            {
                id: 'goods',
                title: 'Калькуляции',
                icon: 4,
            },
            {
                id: 'orders',
                title: 'Заказы',
                icon: 4,
            },
            {
                id: 'store_state',
                title: 'Обеспечение производства',
                icon: 5,
            },
            {
                id: 'store_production',
                title: 'Производство',
                icon: 5,
            },
            {
                id: 'shift_state',
                title: 'Отчеты о розничных продажах',
                icon: 5,
            },
            {
                id: 'store_diff',
                title: 'Отклонения',
                icon: 5,
            },
        ],
    },
    {
        id: 'cinema',
        title: 'Кино',
        icon: 6,
        submenu: [
            {
                id: 'orders',
                title: 'Заказы',
                icon: 4,
            },
        ],
    },
    {
        id: 'results',
        title: 'Регламенты',
        icon: 9,
        submenu: [
            {
                id: 'cashbox',
                title: 'Касса',
                icon: 4,
            },
        ],
    },
    {
        id: 'halls',
        title: 'Схемы залов',
        icon: 8,
        submenu: [
            {
                id: 'maps',
                title: 'Залы',
                icon: 4,
            },
        ],
    },
]

const initialState = {
    // Параметры
    search_params: {},
    params: {
        uid_order: undefined,
    },

    // Отладка
    root_filial: { ip: '10.101.3.88', port: '60000' },

    // Центральный филиал
    //root_filial: { ip: '10.101.2.21', port: '60000' },

    // Меню
    main_menu: main_menu,
    current_page: ['shift', 'revenue'],

    // Филиалы
    filials: [],
    filials_selected: [],

    // Филиал
    filial: null,
    filial_selected: '',

    // Организации
    organizations: [],
    organizations_selected: [],

    // Периоды
    date_shift_beginning: today,
    date_shift_end: today,
    date_shift_valid: true,
    date_shift_accepted: 0,

    // Дата смены
    date_shift: today,
}

export const centerSlice = createSlice({
    name: 'center',
    initialState,
    reducers: {
        // Параметры
        setParams: (state, { payload }) => {
            Object.assign(state.params, payload)
        },
        setSearchParams: (state, { payload }) => {
            state.search_params = payload
        },

        // Меню
        setCurrentPage: (state, action) => {
            state.current_page = action.payload
        },

        // Филиалы
        setFilial: (state, action) => {
            state.filial_selected = action.payload[0]
            state.filial = action.payload[1]
        },
        setFilials(state, action) {
            state.filials = action.payload
        },
        setFilialsSelected(state, action) {
            state.filials_selected = action.payload
        },

        // Организации
        setOrganizations: (state, action) => {
            state.organizations = action.payload
        },
        setOrganizationsSelected(state, action) {
            state.organizations_selected = action.payload
        },

        // Периода
        setPeriod(state, action) {
            const [start, end] = action.payload
            state.date_shift_beginning = start
            state.date_shift_end = end
            state.date_shift_valid = true
        },
        clearPeriod(state) {
            state.date_shift_beginning = null
            state.date_shift_end = null
            state.date_shift_valid = false
        },
        dateShiftAccepted(state) {
            if (!state.date_shift_valid) return
            state.date_shift_accepted += 1
        },

        // Дата смены
        setDateShift(state, action) {
            state.date_shift = action.payload
        },
    },
})

export const {
    // Параметры
    setParams,
    setSearchParams,

    // Меню
    setCurrentPage,

    // Филиалы
    setFilial,
    setFilials,
    setFilialsSelected,

    // Организации
    setOrganizations,
    setOrganizationsSelected,

    // Периоды
    setPeriod,
    dateShiftAccepted,
    clearPeriod,

    // Дата смены
    setDateShift,
} = centerSlice.actions
export default centerSlice.reducer
