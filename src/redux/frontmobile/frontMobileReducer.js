import { createSlice } from '@reduxjs/toolkit'

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
