import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    cities: [], city: undefined, filial: undefined, candy: {wp: null, candy: null},
}

export const dataSlice = createSlice({
    name: "data", initialState, reducers: {
        setCities: (state, {payload}) => {
            state.cities = payload ?? []
        }, setCity: (state, {payload}) => {
            state.city = payload ?? undefined
        }, setFilial: (state, {payload}) => {
            state.filial = payload ?? {wp: null, candy: null}
        }, setCandy: (state, {payload}) => {
            state.candy = payload ?? {wp: null, candy: null}
        }
    },
})

export const {setCities, setCity, setFilial, setCandy} = dataSlice.actions
export default dataSlice.reducer