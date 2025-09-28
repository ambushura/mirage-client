import {createSlice} from "@reduxjs/toolkit"
import dayjs from "dayjs";

const initialState = {
    // Кассовые книги
    kkt_list: [],
    uid_kkt_current: '',
    zbooks_update: 0,
    zbooks: {date_shift: '', rows: []},
    // Чеки
    receipts: {date_shift: '', uid_kkt: '', rows_receipts: [], update: 0},
    // Эквайринг
    uid_pinpad_current: '',
    pinpad_list: [],
    zpinpads: {rows: [], update: 0,},
    // Операции по кассе
    operations_pages: 0,
    operations_page: 1,
    operations_update: 0,
    operations_details: false,
    operations: {wallets: [], columns: [], rows: [], date_shift_beginning: undefined, date_shift_ending: undefined},
}

export const dataSlice = createSlice({
    name: "documents", initialState, reducers: {
        cleanZBooks(state) {
            state.zbooks = {date_shift: '', rows: []}
        }, setZBooks: (state, {payload}) => {
            state.zbooks = payload
        }, setCurrentKKT: (state, {payload}) => {
            state.uid_kkt_current = payload
        }, setKKTList: (state, {payload}) => {
            state.kkt_list = payload
        }, setZBooksUpdate(state) {
            state.zbooks_update += 1
        }, setCurrentPinpad: (state, {payload}) => {
            state.uid_pinpad_current = payload
        }, setPinpadList: (state, {payload}) => {
            state.pinpad_list = payload
        }, setZPinpadsUpdate(state) {
            state.zpinpads = {...state.zpinpads, update: state.update += 1}
        }, cleanOperations(state) {
            state.operations = {
                wallets: [], columns: [], rows: [], date_shift_beginning: undefined, date_shift_ending: undefined
            }
        }, setOperations: (state, {payload}) => {
            state.operations = {...state.operations, ...payload}
            state.operations_pages = payload.pages
        }, setOperationsPage: (state, {payload}) => {
            state.operations_page = payload
        }, setOperationsDetails: (state, {payload}) => {
            state.operations_details = payload
        }, setZPinpads(state, {payload}) {
            const rows = []
            payload.z_pinpads.forEach(zpinpad => {
                rows.push({
                    id: zpinpad.uid,
                    inn: zpinpad.inn,
                    name_organization: zpinpad.name_organization,
                    number_pinpad: zpinpad.number_pinpad,
                    date_shift: dayjs(zpinpad.date_shift).format('DD.MM.YYYY'),
                    slip_15: zpinpad.slip_15,
                    slip_19: zpinpad.slip_19,
                    slip_25: zpinpad.slip_25,
                    slip_39: zpinpad.slip_39,
                    slip_65: zpinpad.slip_65,
                    slip_67: zpinpad.slip_67,
                    slip_90: zpinpad.slip_90,
                    type: zpinpad.type,
                    hide: true
                })
            })
            state.zpinpads = {...state.zpinpads, rows: rows}
        }, cleanZPinpads(state) {
            state.zpinpads = {rows: [], update: 0}
        }, setReceipts: (state, {payload}) => {
            state.receipts = payload
        }, cleanReceipts: (state, {payload}) => {
            state.receipts = {date_shift: '', uid_kkt: '', rows_receipts: [], update: 0}
        }
    },
})

export const {
    setZPinpads,
    cleanZPinpads,
    cleanZBooks,
    setZBooks,
    cleanOperations,
    setOperations,
    setOperationsPage,
    setCurrentKKT,
    setKKTList,
    setCurrentPinpad,
    setPinpadList,
    setZBooksUpdate,
    setZPinpadsUpdate,
    setOperationsDetails,
    setReceipts,
    cleanReceipts,
} = dataSlice.actions
export default dataSlice.reducer