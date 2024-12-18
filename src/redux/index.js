import {createStore, combineReducers, applyMiddleware} from "redux"
import {composeWithDevTools} from "@redux-devtools/extension"
import {thunk} from "redux-thunk"
import {scheduleReducer} from "./scheduleReducer"
import {ordersReducer} from "./ordersReducer"
import {dataReducer} from "./dataReducer"
import {hallsReducer} from "./hallsReducer"
import {interfaceReducer} from "./interfaceReducer"
const rootReducer = combineReducers({
    schedule: scheduleReducer,
    halls: hallsReducer,
    orders: ordersReducer,
    data: dataReducer,
    interface: interfaceReducer
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export const HOST = '10.101.3.88:8080'