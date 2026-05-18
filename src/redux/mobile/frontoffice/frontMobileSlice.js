import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cities: [],
    city: null,
    filial: null,
    current_interface: null,
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
        setCurrentInterface: (state, action) => {
            state.current_interface = action.payload
        },
    },
})
export const { setCities, setCity, setFilial, setCurrentInterface } = frontMobileSlice.actions
export default frontMobileSlice.reducer
