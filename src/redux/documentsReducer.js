import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    zbooks: {
        uid_kkt_current: null,
        kkt_list: null,
        date_shift: '',
        z_books: [],
        update: 0,
    },
    zpinpads: {
        uid_pinpad_current: null,
        pinpad_list: null,
        z_pinpads: [],
        update: 0,
    },
    operations: {
        wallets: [],
        columns: [],
        rows: [],
        pages: 0,
        page: 1,
        date_shift_beginning: undefined,
        date_shift_ending: undefined,
        update: 0,
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
        setZBooksUpdate(state) {
            state.zbooks.update += 1
        },
        setCurrentPinpad: (state, {payload}) => {
            state.zpinpads.uid_pinpad_current = payload
        },
        setPinpadList: (state, {payload}) => {
            state.zpinpads.pinpad_list = payload
        },
        setZPinpadsUpdate(state) {
            state.zpinpads.update += 1
        },
        setOperations: (state, {payload}) => {
            state.operations = {...state.operations, ...payload}
        },
        setOperationsPage: (state, {payload}) => {
            state.operations.page = payload
        },
    },
})

export const {
    setOperations,
    setOperationsPage,
    setCurrentKKT,
    setKKTList,
    setCurrentPinpad,
    setPinpadList,
    setZBooksUpdate,
    setZPinpadsUpdate,
} = dataSlice.actions
export default dataSlice.reducer