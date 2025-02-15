import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    token: localStorage.getItem("token") || null,
    permissions: JSON.parse(localStorage.getItem("permissions")) || [],
    username: localStorage.getItem("username") || null
}
const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token
            state.permissions = action.payload.permissions
            state.username = action.payload.username
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("permissions", JSON.stringify(action.payload.permissions))
            localStorage.setItem("username", action.payload.username)
        },
        logout: (state) => {
            state.token = null
            state.permissions = []
            state.username = null
            localStorage.removeItem("token")
            localStorage.removeItem("permissions")
            localStorage.removeItem("username")
        }
    }
})
export const {loginSuccess, logout} = authReducer.actions
export default authReducer.reducer