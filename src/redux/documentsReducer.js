import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    zbooks: {
        uid_kkt_current: null,
        kkt_list: null,
        uid_pinpad_current: null,
        pinpad_list: null,
        date_shift: '',
        z_books: [],
    },
    operations: {
        wallets: [],
        columns: [],
        rows: [],
        pages: 0,
        page: 1,
        date_shift_beginning: undefined,
        date_shift_ending: undefined,
    }
}

export const dataSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {
        setZBooks: (state, {payload}) => {
            state.zbooks = {...state.zbooks, ...payload}
        },
        setCurrentKKT: (state, {payload}) => {
            state.zbooks.uid_kkt_current = payload
        },
        setKKTList: (state, {payload}) => {
            state.zbooks.kkt_list = payload
        },
        setCurrentPinpad: (state, {payload}) => {
            state.zbooks.uid_pinpad_current = payload
        },
        setPinpadList: (state, {payload}) => {
            state.zbooks.pinpad_list = payload
        },
        setOperations: (state, {payload}) => {
            state.operations = {...state.operations, ...payload}
        },
        setOperationsPage: (state, {payload}) => {
            state.operations.page = payload
        }
    },
})

export const {
    setZBooks,
    setOperations,
    setOperationsPage,
    setCurrentKKT,
    setKKTList,
    setCurrentPinpad,
    setPinpadList,
} = dataSlice.actions
export default dataSlice.reducer