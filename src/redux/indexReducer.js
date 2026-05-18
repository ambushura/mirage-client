import { configureStore } from '@reduxjs/toolkit'
import scheduleSlice from './desktop/frontoffice/scheduleReducer.js'
import ordersSlice from './desktop/frontoffice/ordersReducer.js'
import dataSlice from './desktop/frontoffice/dataReducer.js'
import hallsSlice from './desktop/frontoffice/hallsReducer.js'
import interfaceSlice from './desktop/frontoffice/interfaceReducer.js'
import authSlice from './desktop/frontoffice/authReducer.js'
import notifierReducer from './desktop/frontoffice/notifierReducer.js'
import wsReducer from './desktop/frontoffice/wsReducer.js'
import markirovkaReducer from './desktop/frontoffice/markirovkaReducer.js'
import documentsReducer from './desktop/frontoffice/documentsReducer.js'
import secondScreen from './desktop/frontoffice/secondScreenReducer.js'
import equipmentReducer from './desktop/frontoffice/equipmentReducer.js'
import reportsReducer from './desktop/frontoffice/reportsReducer.js'
import centerReducer from './desktop/backoffice/centerReducer.js'
import centerCinemaReducer from './desktop/backoffice/centerCinemaReducer.js'
import centerHorecaReducer from './desktop/backoffice/centerHorecaReducer.js'
import frontMobileSlice from './mobile/frontoffice/frontMobileSlice.js'

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
        front_mobile: frontMobileSlice,
    },
})

export default store
