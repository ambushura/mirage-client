import {createSlice} from "@reduxjs/toolkit"

const initialState = {

    report_variant: 'schedule',
    update: 0,

    // Выручка
    sales: {columns: [], rows: [], columnGroupingModel: []},
    sales_columnVisibilityModel: {type: false, level: false},

    // Суточный 1 раздел
    shift_1: {columns: [], rows: [], columnGroupingModel: []},
    shift_1_columnVisibilityModel: {type: false, level: false},

    // Расписание
    schedule: {columns: [], rows: [], columnGroupingModel: []},
    schedule_columnVisibilityModel: {type: false, level: false},
}

export const dataSlice = createSlice({
    name: "documents", initialState, reducers: {
        setReportVariant(state, {payload}) {
            state.report_variant = payload
        }, setUpdate(state, {payload}) {
            state.update += 1
        },

        // Выручка
        setSales: (state, {payload}) => {
            state.sales = payload
        }, cleanSales: (state) => {
            state.sales = {columns: [], rows: [], columnGroupingModel: []}
        }, set_salesColumnVisibilityModel: (state, {payload}) => {
            state.sales_columnVisibilityModel = payload
        },

        // Суточный
        setShift1: (state, {payload}) => {
            state.shift_1 = payload
        }, cleanShift1: (state) => {
            state.shift_1 = {columns: [], rows: [], columnGroupingModel: []}
        }, set_shift1ColumnVisibilityModel: (state, {payload}) => {
            state.shift_1_columnVisibilityModel = payload
        },

        // Расписание
        setSchedule: (state, {payload}) => {
            state.schedule = payload
        }, cleanSchedule: (state) => {
            state.schedule = {columns: [], rows: [], columnGroupingModel: []}
        }, set_scheduleColumnVisibilityModel: (state, {payload}) => {
            state.schedule_columnVisibilityModel = payload
        }
    },
})

export const {
    setReportVariant, setUpdate,

    // Выручка
    setSales, cleanSales, set_salesColumnVisibilityModel,

    // Суточный
    setShift1, cleanShift1, set_shift1ColumnVisibilityModel,

    // Расписаниe
    setSchedule, cleanSchedule, set_scheduleColumnVisibilityModel
} = dataSlice.actions
export default dataSlice.reducer