import { createSlice } from '@reduxjs/toolkit'

// Боковое меню
export const DRAWER_MENU = [
    {
        surface: 'waiter',
        menu: [
            {
                title: 'Основное',
                items: [
                    { id: 'my-orders', text: 'Мои заказы', icon: 0, accent: true },
                    { id: 'all-orders', text: 'Все заказы', icon: 1, accent: true },
                    { id: 'stop-lists', text: 'Стоп-листы', icon: 2, accent: true },
                ],
            },
            {
                title: 'Система',
                items: [
                    { id: 'settings', text: 'Настройки', icon: 3, accent: false },
                    { id: 'logout', text: 'Выход', icon: 4, accent: false },
                ],
            },
        ],
    },
]

// Официант - нижнее меню
const waiter_menu = [{ id: 'new_order', iconIdx: 0, title: 'Новый' }]

// Нижнее меню
export const bottom_menu = { waiter: waiter_menu, controller: [], urm: [], back: [] }

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
