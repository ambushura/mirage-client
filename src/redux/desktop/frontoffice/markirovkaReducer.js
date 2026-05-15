import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    hosts: [],
}

const markirovkaSlice = createSlice({
    name: 'markirovka',
    initialState,
    reducers: {
        fillHosts: (state, { payload }) => {
            state.hosts = payload
        },
    },
})

export const { fillHosts } = markirovkaSlice.actions
export default markirovkaSlice.reducer
