import { createSlice } from "@reduxjs/toolkit"

const getStorageItem = (key, fallback = null) => {
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : fallback
    } catch {
        return localStorage.getItem(key) || fallback
    }
}

const setStorageItem = (key, value) => {
    if (typeof value === "string") {
        localStorage.setItem(key, value)
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

const removeStorageItems = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("permissions")
    localStorage.removeItem("username")
}

const initialState = {
    token: localStorage.getItem("token") || null,
    permissions: getStorageItem("permissions", []),
    username: localStorage.getItem("username") || null
}

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, {payload}) => {
            state.token = payload.token
            state.permissions = payload.permissions
            state.username = payload.username

            setStorageItem("token", payload.token)
            setStorageItem("permissions", payload.permissions)
            setStorageItem("username", payload.username)
        },
        logout: (state) => {
            state.token = null
            state.permissions = []
            state.username = null
            removeStorageItems()
        }
    }
})

export const { loginSuccess, logout } = authReducer.actions
export default authReducer.reducer