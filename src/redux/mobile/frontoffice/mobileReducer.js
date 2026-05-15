import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cities: [],
    city: null,
    filial: null,
    current_interface: null,
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
        setCurrentInterface: (state, action) => {
            state.current_interface = action.payload
        },
    },
})
export const { setCities, setCity, setFilial, setCurrentInterface } = mobileSlice.actions
export default mobileSlice.reducer
