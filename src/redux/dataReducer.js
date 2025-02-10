import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    cities: [],
    city: undefined,
    filial: undefined,
}
export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setCities: (state, action) => {
            state.cities = action.payload === null ? [] : action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload === null ? undefined : action.payload
        },
        setFilial: (state, action) => {
            state.filial = action.payload === null ? undefined : action.payload
        },
    },
})
export const {setCities, setCity, setFilial} = dataSlice.actions
export default dataSlice.reducer