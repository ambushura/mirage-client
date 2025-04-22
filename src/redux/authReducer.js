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
    localStorage.removeItem("uid")
    localStorage.removeItem("name")
    localStorage.removeItem("login")
    localStorage.removeItem("tips")
    localStorage.removeItem("god")
    localStorage.removeItem("token")
    localStorage.removeItem("filials")
    localStorage.removeItem("permissions")
}

const initialState = {
    uid: localStorage.getItem("uid") || null,
    name: localStorage.getItem("name") || null,
    login: localStorage.getItem("login") || null,
    tips: localStorage.getItem("tips") || null,
    god: localStorage.getItem("god") || false,
    token: localStorage.getItem("token") || null,
    filials: getStorageItem("filials", []),
    permissions: getStorageItem("permissions", []),
}

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, {payload}) => {
            const decode = jwtDecode(payload)
            state.uid = decode.uid
            state.name = decode.name
            state.login = decode.login
            state.tips = decode.tips
            state.god = decode.god
            state.token = payload
            state.filials = decode.filials
            state.permissions = decode.permissions

            setStorageItem("uid", decode.uid)
            setStorageItem("name", decode.name)
            setStorageItem("login", decode.login)
            setStorageItem("tips", decode.tips)
            setStorageItem("god", decode.god)
            setStorageItem("token", payload)
            setStorageItem("filials", decode.filials)
            setStorageItem("permissions", decode.permissions)
        },
        logout: (state) => {
            state.uid = null
            state.name = null
            state.login = null
            state.tips = null
            state.god = false
            state.token = null
            state.filials = []
            state.permissions = []
            removeStorageItems()
        }
    }
})

export const { loginSuccess, logout } = authReducer.actions
export default authReducer.reducer