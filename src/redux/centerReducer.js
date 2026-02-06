import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    main_menu: [{
        id: 'shift', title: 'Смена', icon: 0, submenu: [{
            id: 'revenue', title: 'Выручка', icon: 3
        }, {id: 'results', title: 'Сверка', icon: 4}]
    }, {
        id: 'cinema', title: 'Кино', icon: 1, submenu: [{
            id: 'orders', title: 'Заказы', icon: 0
        }]
    }, {
        id: 'horeca', title: 'Общепит', icon: 2, submenu: [{
            id: 'orders', title: 'Заказы', icon: 0
        }, {
            id: 'orp', title: 'Отчеты о розничных продажах', icon: 0
        }]
    },], current_page: ['shift', 'revenue'],
}

export const centerSlice = createSlice({
    name: 'center', initialState, reducers: {
        setCurrentPage: (state, action) => {
            state.current_page = action.payload
        }
    },
})

export const {setCurrentPage} = centerSlice.actions
export default centerSlice.reducer