import {configureStore} from "@reduxjs/toolkit"
import scheduleSlice from "./scheduleReducer.js"
import ordersSlice from "./ordersReducer.js"
import dataSlice from "./dataReducer.js"
import hallsSlice from "./hallsReducer.js"
import interfaceSlice from "./interfaceReducer.js"
import authSlice from "./authReducer.js"
import notifierReducer from "./notifierReducer.js"
import wsReducer from "./wsReducer.js"

export const store = configureStore({
    reducer: {
        schedule: scheduleSlice,
        halls: hallsSlice,
        orders: ordersSlice,
        data: dataSlice,
        interface: interfaceSlice,
        auth: authSlice,
        notifier: notifierReducer,
        webSocket: wsReducer
    },
})

export default store