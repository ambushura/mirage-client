import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    schedule: [],
}

export const secondScreenSlice = createSlice({
    name: "second_screen",
    initialState,
    reducers: {
        setSchedule: (state, action) => {
            state.schedule = action.payload
        }
    },
})

export const {setSchedule} = secondScreenSlice.actions
export default secondScreenSlice.reducer