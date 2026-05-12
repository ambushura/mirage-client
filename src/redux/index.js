import { configureStore } from '@reduxjs/toolkit'
import scheduleSlice from './frontoffice/scheduleReducer.js'
import ordersSlice from './frontoffice/ordersReducer.js'
import dataSlice from './frontoffice/dataReducer.js'
import hallsSlice from './frontoffice/hallsReducer.js'
import interfaceSlice from './frontoffice/interfaceReducer.js'
import authSlice from './frontoffice/authReducer.js'
import notifierReducer from './frontoffice/notifierReducer.js'
import wsReducer from './frontoffice/wsReducer.js'
import markirovkaReducer from './frontoffice/markirovkaReducer.js'
import documentsReducer from './frontoffice/documentsReducer.js'
import secondScreen from './frontoffice/secondScreenReducer.js'
import equipmentReducer from './frontoffice/equipmentReducer.js'
import reportsReducer from './frontoffice/reportsReducer.js'
import centerReducer from './backoffice/centerReducer.js'
import centerCinemaReducer from './backoffice/centerCinemaReducer.js'
import centerHorecaReducer from './backoffice/centerHorecaReducer.js'

export const store = configureStore({
    reducer: {
        schedule: scheduleSlice,
        halls: hallsSlice,
        orders: ordersSlice,
        data: dataSlice,
        interface: interfaceSlice,
        auth: authSlice,
        notifier: notifierReducer,
        webSocket: wsReducer,
        markirovka: markirovkaReducer,
        documents: documentsReducer,
        second_screen: secondScreen,
        equipment: equipmentReducer,
        reports: reportsReducer,
        center: centerReducer,
        center_cinema: centerCinemaReducer,
        center_horeca: centerHorecaReducer,
    },
})

export default store
