import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    notifications: []
}

const notifierSlice = createSlice({
    name: "notifier",
    initialState,
    reducers: {
        addNotification: (state, {payload}) => {
            state.notifications.push({
                id: Date.now(),
                message: payload.message,
                severity: payload.severity ?? "info",
                autoHide: payload.autoHide ?? true,
            })
        },
        removeNotification: (state, {payload}) => {
            state.notifications = state.notifications.filter(n => n.id !== payload)
        }
    }
})

export const {addNotification, removeNotification} = notifierSlice.actions
export default notifierSlice.reducer