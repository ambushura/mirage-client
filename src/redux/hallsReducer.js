import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    halls: [],
    uid_hall: null,
    hall: null,
    mode: 'block',
}

export const hallsSlice = createSlice({
    name: 'halls',
    initialState,
    reducers: {
        addHall: (state, { payload }) => {
            if (!state.halls.some((hall) => hall.uid === payload.uid)) {
                state.halls.push(payload)
            }
        },
        setUidHall: (state, { payload }) => {
            state.uid_hall = payload
        },
        setHall: (state, { payload }) => {
            state.hall = payload
        },
        setMode: (state, { payload }) => {
            state.mode = payload
        },
    },
})

export const { addHall, setUidHall, setHall, setMode } = hallsSlice.actions
export default hallsSlice.reducer
