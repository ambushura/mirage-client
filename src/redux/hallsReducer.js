import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    halls: [],
    uid_hall: null,
    hall: null,
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
        setUidHall: (state, {payload}) => {
            state.uid_hall = payload
        },
        setHall: (state, {payload}) => {
            state.hall = payload
        }
    },
})

export const {addHall, setUidHall, setHall} = hallsSlice.actions
export default hallsSlice.reducer