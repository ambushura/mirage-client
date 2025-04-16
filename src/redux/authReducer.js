import { createSlice } from "@reduxjs/toolkit"
import {jwtDecode} from "jwt-decode"

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
    localStorage.removeItem("filials")
    localStorage.removeItem("user")
}

const initialState = {
    token: localStorage.getItem("token") || null,
    permissions: getStorageItem("permissions", []),
    filials: getStorageItem("filials", []),
    user: localStorage.getItem("user") || null
}

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, {payload}) => {
            const decode = jwtDecode(payload)
            state.token = payload
            state.user = decode.user
            state.permissions = decode.permissions
            state.filials = decode.filials
            setStorageItem("token", decode.token)
            setStorageItem("permissions", decode.permissions)
            setStorageItem("filials", decode.filials)
            setStorageItem("user", decode.user)
        },
        logout: (state) => {
            state.token = null
            state.user = null
            state.filial = []
            state.permissions = []
            removeStorageItems()
        }
    }
})

export const { loginSuccess, logout } = authReducer.actions
export default authReducer.reducer