import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    zbooks: {
        date_shift: '',
        z_books: [],
    },
}

export const dataSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {
        setZBooks: (state, {payload}) => {
            state.zbooks = payload
        },
    },
})

export const {setZBooks} = dataSlice.actions
export default dataSlice.reducer