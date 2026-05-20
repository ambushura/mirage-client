import { createSlice } from '@reduxjs/toolkit'

// Боковое меню
export const DRAWER_MENU = [
    {
        surface: 'waiter',
        pages: [
            {
                name: ['all-orders', 'my-orders'],
                menu: [
                    {
                        title: 'Основное',
                        items: [
                            { id: 'my-orders', text: 'Мои заказы', icon: 0 },
                            { id: 'all-orders', text: 'Все заказы', icon: 1 },
                            { id: 'stop-list', text: 'Стоп-листы', icon: 2 },
                        ],
                    },
                    {
                        title: 'Система',
                        items: [
                            { id: 'settings', text: 'Настройки', icon: 3 },
                            { id: 'logout', text: 'Выход', icon: 4 },
                        ],
                    },
                ],
            },
            {
                name: ['stop-list'],
                menu: [
                    {
                        title: 'Основное',
                        items: [
                            { id: 'my-orders', text: 'Мои заказы', icon: 0 },
                            { id: 'all-orders', text: 'Все заказы', icon: 1 },
                        ],
                    },
                    {
                        title: 'Система',
                        items: [
                            { id: 'settings', text: 'Настройки', icon: 3 },
                            { id: 'logout', text: 'Выход', icon: 4 },
                        ],
                    },
                ],
            },
        ],
    },
]

// Официант - нижнее меню
const WAITER_MENU = [{ id: 'order', text: 'Новый', icon: 0 }]

// Заказ - нижнее  меню
const ORDER_MENU = [
    { id: 'close-menu', text: '', icon: 2 },
    { id: 'back', text: 'Назад', icon: 1 },
]

// Нижнее меню
export const BOTTOM_MENU = [
    {
        name: 'waiter',
        pages: [
            { name: ['all-orders', 'my-orders'], menu: WAITER_MENU },
            { name: ['order'], menu: ORDER_MENU },
        ],
    },
    { name: 'controller', menu: [] },
    { name: 'urm', menu: [] },
    { name: 'back', menu: [] },
]

const initialState = {
    cities: [],
    city: null,
    filial: null,
}

export const frontMobileSlice = createSlice({
    name: 'front_mobile',
    initialState,
    reducers: {
        setCities: (state, action) => {
            state.cities = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
        },
        setFilial: (state, action) => {
            state.filial = action.payload
        },
    },
})
export const { setCities, setCity, setFilial } = frontMobileSlice.actions
export default frontMobileSlice.reducer
