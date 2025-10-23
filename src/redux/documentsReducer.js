import {createSlice} from "@reduxjs/toolkit"

const initialState = {

    // Кассовые книги
    kkt_list: [],
    uid_kkt_current: '',
    zbooks: {date_shift: '', zbooks: []},
    zbooks_update: 0,

    // Чеки
    receipts: {date_shift: '', uid_kkt: '', receipts: []},
    receipts_update: 0,

    // Эквайринг
    uid_pinpad_current: '',
    pinpad_list: [],
    zpinpads: {date_shift: '', zpinpads: []},
    zpinpads_update: 0,

    // Слипы
    slips: {date_shift: '', uid_pinpad: '', slips: []},
    slips_update: 0,

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
            state.zpinpads_update += 1
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
            state.zpinpads = payload
        }, cleanZPinpads(state) {
            state.zpinpads = {date_shift: '', zpinpads: []}
        }, setReceipts: (state, {payload}) => {
            state.receipts = payload
        }, cleanReceipts: (state, {payload}) => {
            state.receipts = {date_shift: '', uid_kkt: '', receipts: []}
        }, setReceiptsUpdated: (state) => {
            state.receipts_update += 1
        }, setSlips: (state, {payload}) => {
            state.slips = payload
        }, cleanSlips: (state, {payload}) => {
            state.slips = {date_shift: '', uid_pinpad: '', slips: []}
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
    setReceiptsUpdated,
    cleanReceipts,
    setSlips,
    cleanSlips,
} = dataSlice.actions
export default dataSlice.reducer