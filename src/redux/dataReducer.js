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
        setCities: (state, {payload}) => {
            state.cities = payload ?? []
        },
        setCity: (state, {payload}) => {
            state.city = payload ?? undefined
        },
        setFilial: (state, {payload}) => {
            state.filial = payload ?? undefined
        },
    },
})

export const {setCities, setCity, setFilial} = dataSlice.actions
export default dataSlice.reducer