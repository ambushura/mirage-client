import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    halls: [],
}
export const hallsSlice = createSlice({
    name: "halls",
    initialState,
    reducers: {
        addHall: (state, action) => {
            if (!state.halls.find(hall => hall.uid === action.payload.uid)) {
                state.halls.push(action.payload)
            }
        },
    },
})
export const { addHall } = hallsSlice.actions
export default hallsSlice.reducer