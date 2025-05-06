import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    halls: []
}

export const hallsSlice = createSlice({
    name: "halls",
    initialState,
    reducers: {
        addHall: (state, {payload}) => {
            if (!state.halls.some(hall => hall.uid === payload.uid)) {
                state.halls.push(payload)
            }
        },
    },
})

export const {addHall} = hallsSlice.actions
export default hallsSlice.reducer