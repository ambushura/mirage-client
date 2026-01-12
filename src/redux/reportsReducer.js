import {createSlice} from "@reduxjs/toolkit"

const initialState = {

    report_variant: 'schedule',

    // Выручка
    sales: {columns: [], rows: [], columnGroupingModel: []}, sales_columnVisibilityModel: {type: false, level: false},

    // Расписание
    schedule: {columns: [], rows: [], columnGroupingModel: []}, schedule_columnVisibilityModel: {},
}

export const dataSlice = createSlice({
    name: "documents", initialState, reducers: {
        setReportVariant(state, {payload}) {
            state.report_variant = payload
        },

        // Выручка
        setSales: (state, {payload}) => {
            state.sales = payload
        }, cleanSales: (state) => {
            state.sales = {columns: [], rows: [], columnGroupingModel: []}
        }, set_sales_columnVisibilityModel: (state, {payload}) => {
            state.sales_columnVisibilityModel = payload
        }
    },
})

export const {
    setReportVariant,

    // Выручка
    setSales, cleanSales, set_sales_columnVisibilityModel,
} = dataSlice.actions
export default dataSlice.reducer