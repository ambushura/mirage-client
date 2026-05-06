import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [],
}
const wsSlice = createSlice({
    name: 'ws',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
    },
})
export const { addMessage } = wsSlice.actions
export default wsSlice.reducer
