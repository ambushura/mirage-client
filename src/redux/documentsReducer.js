import {createSlice} from "@reduxjs/toolkit"

const initialState = {

    // Кассовые книги
    kkt_list: [],
    uid_kkt_current: '',
    zbooks: {date_shift: '', zbooks: []},
    zbooks_update: 0,
    trigger_submit_zBook: false,
    trigger_delete_zBook: false,
    caption_zBook: null,

    // Чеки
    receipts: {date_shift: '', uid_kkt: '', receipts: []},
    receipts_update: 0,
    trigger_submit_receipt: false,
    trigger_delete_receipt: false,
    caption_receipt: null,
    receipt_order: null,

    // Эквайринг
    uid_pinpad_current: '',
    pinpad_list: [],
    zpinpads: {date_shift: '', zpinpads: []},
    zpinpads_update: 0,
    caption_z_acquiring: null,

    // Слипы
    slips: {date_shift: '', uid_pinpad: '', slips: []},
    slips_update: 0,
    trigger_submit_slip: false,
    trigger_delete_slip: false,
    caption_slip: null,
    slip_order: null,

    // Операции по кассе
    operations_pages: 0,
    operations_page: 1,
    operations_update: 0,
    operations_details: false,
    operations: {wallets: [], columns: [], rows: [], date_shift_beginning: undefined, date_shift_ending: undefined},

    // Операция по кассе
    trigger_submit_operation: false,
    trigger_delete_operation: false,
    caption_operation: null,

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
        }, setTriggerSubmitZBook(state, {payload}) {
            state.trigger_submit_zBook = payload
        }, setTriggerDeleteZBook(state, {payload}) {
            state.trigger_delete_zBook = payload
        }, setTriggerSubmitReceipt(state, {payload}) {
            state.trigger_submit_receipt = payload
        }, setTriggerDeleteReceipt(state, {payload}) {
            state.trigger_delete_receipt = payload
        }, setCaptionZBook(state, {payload}) {
            state.caption_zBook = payload
        }, setCaptionReceipt(state, {payload}) {
            state.caption_receipt = payload
        }, setReceiptOrder(state, {payload}) {
            state.receipt_order = payload
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
        }, setOperationsUpdate: (state) => {
            state.operations_update += 1
        }, setZPinpads(state, {payload}) {
            state.zpinpads = payload
        }, cleanZPinpads(state) {
            state.zpinpads = {date_shift: '', zpinpads: []}
        }, setReceipts: (state, {payload}) => {
            state.receipts = payload
        }, cleanReceipts: (state) => {
            state.receipts = {date_shift: '', uid_kkt: '', receipts: []}
        }, setReceiptsUpdated: (state) => {
            state.receipts_update += 1
        }, setSlips: (state, {payload}) => {
            state.slips = payload
        }, cleanSlips: (state) => {
            state.slips = {date_shift: '', uid_pinpad: '', slips: []}
        }, setCaptionZAcquiring(state, {payload}) {
            state.caption_z_acquiring = payload
        }, setTriggerSubmitSlip(state, {payload}) {
            state.trigger_submit_slip = payload
        }, setTriggerDeleteSlip(state, {payload}) {
            state.trigger_delete_slip = payload
        }, setCaptionSlip(state, {payload}) {
            state.caption_slip = payload
        }, setSlipOrder(state, {payload}) {
            state.slip_order = payload
        }, setTriggerSubmitOperation(state, {payload}) {
            state.trigger_submit_operation = payload
        }, setTriggerDeleteOperation(state, {payload}) {
            state.trigger_delete_operation = payload
        }, setCaptionOperation(state, {payload}) {
            state.caption_operation = payload
        }
    },
})

export const {
    setZPinpads,
    cleanZPinpads,
    cleanZBooks,
    setZBooks,
    setCaptionZBook,
    setCaptionReceipt,
    setTriggerSubmitZBook,
    setTriggerDeleteZBook,
    setTriggerSubmitReceipt,
    setTriggerDeleteReceipt,
    setReceiptOrder,
    cleanOperations,
    setOperations,
    setOperationsPage,
    setOperationsUpdate,
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
    setTriggerSubmitSlip,
    setTriggerDeleteSlip,
    setCaptionSlip,
    setSlipOrder,
    setTriggerSubmitOperation,
    setTriggerDeleteOperation,
    setCaptionOperation,
} = dataSlice.actions
export default dataSlice.reducer