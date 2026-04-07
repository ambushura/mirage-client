import {createSlice} from "@reduxjs/toolkit"

const initialState = {

    report_variant: 'schedule',
    update: 0,

    // Выручка
    sales: {columns: [], rows: [], columnGroupingModel: []},
    sales_columnVisibilityModel: {type: false, level: false},

    // Суточный
    shift_1: {columns: [], rows: [], columnGroupingModel: []},
    shift_1_columnVisibilityModel: {type: false, level: false},
    shift_2: {columns: [], rows: [], columnGroupingModel: []},
    shift_2_columnVisibilityModel: {type: false, level: false},
    shift_3: {columns: [], rows: [], columnGroupingModel: []},
    shift_3_columnVisibilityModel: {type: false, level: false},

    // Расписание
    schedule: {columns: [], rows: [], columnGroupingModel: []},
    schedule_columnVisibilityModel: {type: false, level: false},

    // Посещаемость
    attendance: {columns: [], rows: [], column_grouping_model: [], column_visibility_model: []},

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
        setShift: (state, {payload}) => {
            state.shift_1 = payload.chapter1
            state.shift_2 = payload.chapter2
            state.shift_3 = payload.chapter3
        }, cleanShift: (state) => {
            state.shift_1 = {columns: [], rows: [], columnGroupingModel: []}
            state.shift_2 = {columns: [], rows: [], columnGroupingModel: []}
            state.shift_3 = {columns: [], rows: [], columnGroupingModel: []}
        }, set_shiftColumnVisibilityModel: (state, {payload}) => {
            state.shift_1_columnVisibilityModel = payload
            state.shift_2_columnVisibilityModel = payload
            state.shift_3_columnVisibilityModel = payload
        },

        // Расписание
        setSchedule: (state, {payload}) => {
            state.schedule = payload
        }, cleanSchedule: (state) => {
            state.schedule = {columns: [], rows: [], columnGroupingModel: []}
        }, set_scheduleColumnVisibilityModel: (state, {payload}) => {
            state.schedule_columnVisibilityModel = payload
        },

        // Посещаемость
        setAttendance: (state, {payload}) => {
            state.attendance = payload
        }, cleanAttendance: (state) => {
            state.attendance = {columns: [], rows: [], columnGroupingModel: []}
        }
    },
})

export const {
    setReportVariant, setUpdate,

    // Выручка
    setSales, cleanSales, set_salesColumnVisibilityModel,

    // Суточный
    setShift, cleanShift, set_shiftColumnVisibilityModel,

    // Расписание
    setSchedule, cleanSchedule, set_scheduleColumnVisibilityModel,

    // Посещаемость
    setAttendance, cleanAttendance

} = dataSlice.actions
export default dataSlice.reducer