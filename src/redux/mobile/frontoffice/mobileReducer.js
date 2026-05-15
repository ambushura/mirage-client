import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cities: [],
    city: null,
    filial: null,
}

export const mobileSlice = createSlice({
    name: 'mobile',
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
export const { setCities, setCity, setFilial } = mobileSlice.actions
export default mobileSlice.reducer
