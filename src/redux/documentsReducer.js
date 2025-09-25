import {createSlice} from "@reduxjs/toolkit"
import dayjs from "dayjs";

const initialState = {
    zbooks: {
        uid_kkt_current: '',
        kkt_list: [],
        date_shift: '',
        columns: [{field: 'id', headerName: 'ID', width: 10}, {
            field: 'name_organization', headerName: 'Организация', width: 100
        }, {field: 'inn', headerName: 'ИНН', width: 100}, {
            field: 'number_kkt', headerName: 'ЗН ККТ', width: 130
        }, {field: 'date_ofd', headerName: 'ОФД', width: 130}, {
            field: 'last_fd', headerName: 'ФД', width: 50
        }, {field: 'date_shift', headerName: 'Смена', width: 90}, {
            field: 'number_shift', headerName: '№', width: 60
        }, {field: 'sum_in_cash', headerName: 'Н +', type: 'number', width: 100}, {
            field: 'sum_in_electron', headerName: 'БН +', type: 'number', width: 100
        }, {field: 'sum_out_cash', headerName: 'Н -', type: 'number', width: 100}, {
            field: 'sum_out_electron', headerName: 'БН -', type: 'number', width: 100
        }, {field: 'sum_nds', headerName: 'НДС', type: 'number', width: 100}, {
            field: 'sum_collection', headerName: 'Инкассация', type: 'number', width: 100
        }, {field: 'sum_electron', headerName: 'Б ∑', type: 'number', width: 100}, {
            field: 'revenue', headerName: 'В ∑', type: 'number', width: 100
        }, {
            field: 'sum_total_of_income', headerName: 'П смены', type: 'number', width: 100
        }, {
            field: 'sum_non_zero_total_of_income', headerName: 'НС +', type: 'number', width: 100
        }, {field: 'sum_non_zero_total_of_outcome', headerName: 'НС -', type: 'number', width: 100},],
        rows: [],
        update: 0,
    }, zpinpads: {
        uid_pinpad_current: '', pinpad_list: [], columns: [{field: 'id', headerName: 'ID', width: 10}, {
            field: 'name_organization', headerName: 'Организация', width: 100
        }, {field: 'inn', headerName: 'ИНН', width: 100}, {
            field: 'number_pinpad', headerName: 'ID', width: 130
        }, {field: 'date_shift', headerName: 'Смена', width: 90}, {
            field: 'slip_15', headerName: '15', type: 'number', width: 100
        }, {field: 'slip_19', headerName: '19', type: 'number', width: 100}, {
            field: 'slip_25', headerName: '25', type: 'number', width: 100
        }, {field: 'slip_39', headerName: '39', type: 'number', width: 100}, {
            field: 'slip_65', headerName: '65', type: 'number', width: 100
        }, {field: 'slip_67', headerName: '67', type: 'number', width: 100}, {
            field: 'slip_90', headerName: '90', width: 100
        }, {field: 'type', headerName: 'Т', type: 'number', width: 100},], rows: [], update: 0,
    }, operations_pages: 0, operations_page: 1, operations_update: 0, operations_details: false, operations: {
        wallets: [], columns: [], rows: [], date_shift_beginning: undefined, date_shift_ending: undefined
    }
}

export const dataSlice = createSlice({
    name: "documents", initialState, reducers: {
        cleanZBooks(state) {
            state.zbooks = {...state.zbooks, rows: []}
        }, setZBooks: (state, {payload}) => {
            const rows = []
            payload.z_books.forEach(zbook => {
                rows.push({
                    id: zbook.uid,
                    inn: zbook.inn,
                    name_organization: zbook.name_organization,
                    number_kkt: zbook.number_kkt,
                    date_ofd: dayjs(zbook.date_ofd).format('DD.MM.YYYY HH:mm'),
                    last_fd: zbook.last_fd,
                    date_shift: dayjs(zbook.date_shift).format('DD.MM.YYYY'),
                    number_shift: zbook.number_shift,
                    sum_in_cash: zbook.sum_in_cash,
                    sum_in_electron: zbook.sum_in_electron,
                    sum_out_cash: zbook.sum_out_cash,
                    sum_out_electron: zbook.sum_out_electron,
                    sum_nds: zbook.sum_nds,
                    sum_collection: zbook.sum_collection,
                    sum_electron: zbook.sum_electron,
                    revenue: zbook.revenue,
                    sum_total_of_income: zbook.sum_total_of_income,
                    sum_non_zero_total_of_income: zbook.sum_non_zero_total_of_income,
                    sum_non_zero_total_of_outcome: zbook.sum_non_zero_total_of_outcome,
                    hide: true
                })
            })
            state.zbooks = {...state.zbooks, rows: rows}
        }, setCurrentKKT: (state, {payload}) => {
            state.zbooks = {...state.zbooks, uid_kkt_current: payload}
        }, setKKTList: (state, {payload}) => {
            state.zbooks = {...state.zbooks, kkt_list: payload || []}
        }, setZBooksUpdate(state) {
            state.zbooks = {...state.zbooks, update: state.update += 1}
        }, setCurrentPinpad: (state, {payload}) => {
            state.zpinpads = {...state.zpinpads, uid_pinpad_current: payload}
        }, setPinpadList: (state, {payload}) => {
            state.zpinpads = {...state.zpinpads, pinpad_list: payload || []}
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
            state.zpinpads = {...state.zpinpads, rows: []}
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
} = dataSlice.actions
export default dataSlice.reducer