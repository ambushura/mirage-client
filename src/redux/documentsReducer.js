import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    zbooks: {
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
            state.zbooks = payload
        },
        setOperations: (state, {payload}) => {
            state.operations = payload
        },
        setOperationsPage: (state, {payload}) => {
            state.operations.page = payload
        }
    },
})

export const {setZBooks, setOperations, setOperationsPage} = dataSlice.actions
export default dataSlice.reducer