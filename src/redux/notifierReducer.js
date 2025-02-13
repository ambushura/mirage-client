import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    notifications: []
}
const notifierSlice = createSlice({
    name: 'notifier',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push({
                id: Date.now(),
                message: action.payload.message,
                severity: action.payload.severity || 'info',
                autoHide: action.payload.autoHide ?? true,
            })
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload)
        }
    }
})
export const { addNotification, removeNotification } = notifierSlice.actions
export default notifierSlice.reducer