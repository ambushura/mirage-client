import {createSlice} from "@reduxjs/toolkit"

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
    localStorage.removeItem("center")
    localStorage.removeItem("name")
    localStorage.removeItem("login")
    localStorage.removeItem("tips")
    localStorage.removeItem("god")
    localStorage.removeItem("alive")
    localStorage.removeItem("token")
    localStorage.removeItem("filials")
    localStorage.removeItem("permissions")

}

const initialState = {
    uid: getStorageItem("uid", null),
    center: getStorageItem("center", false),
    name: getStorageItem("name", null),
    login: getStorageItem("login", null),
    tips: getStorageItem("tips", null),
    god: getStorageItem("god", false),
    alive: getStorageItem("alive", false),
    token: getStorageItem("token", null),
    filials: getStorageItem("filials", []),
    permissions: getStorageItem("permissions", []),
}

const authReducer = createSlice({
    name: "auth", initialState, reducers: {
        loginSuccess: (state, {payload}) => {
            state.uid = payload[1].uid
            state.center = payload[1].center
            state.name = payload[1].name
            state.login = payload[1].login
            state.tips = payload[1].tips
            state.god = payload[1].god
            state.alive = payload[1].alive
            state.token = payload[0]
            state.filials = payload[1].filials
            state.permissions = payload[1].permissions

            setStorageItem("uid", payload[1].uid)
            setStorageItem("center", payload[1].center)
            setStorageItem("name", payload[1].name)
            setStorageItem("login", payload[1].login)
            setStorageItem("tips", payload[1].tips)
            setStorageItem("god", payload[1].god)
            setStorageItem("alive", payload[1].alive)
            setStorageItem("token", payload[0])
            setStorageItem("filials", payload[1].filials)
            setStorageItem("permissions", payload[1].permissions)

        }, logout: (state) => {
            state.uid = null
            state.center = false
            state.name = null
            state.login = null
            state.tips = null
            state.god = false
            state.alive = false
            state.token = null
            state.filials = []
            state.permissions = []
            removeStorageItems()
        }
    }
})

export const {loginSuccess, logout} = authReducer.actions
export default authReducer.reducer