import React from 'react'
import {Box} from "@mui/material"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import {useSelector} from "react-redux"

const ReportSchedule = () => {

    const filial = useSelector(state => state.data.filial)

    const {report_variant} = useSelector(state => state.reports)

    const schedule_columns = useSelector(state => state.reports.schedule.columns)
    const schedule_rows = useSelector(state => state.reports.schedule.rows)
    const schedule_columnGroupingModel = useSelector(state => state.reports.schedule.columnGroupingModel)
    const schedule_columnVisibilityModel = useSelector(state => state.reports.schedule_columnVisibilityModel)

    return <Box sx={{minHeight: '100%'}}>
        {schedule_rows.length > 1 ? <DataGridPro
            hideFooter
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={schedule_rows}
            columns={schedule_columns}
            columnGroupingModel={schedule_columnGroupingModel}
            density="compact"
            disableSelectionOnClick
            hideFooterSelectedRowCount
            experimentalFeatures={{columnGrouping: true}}
            columnVisibilityModel={schedule_columnVisibilityModel}
            onColumnVisibilityModelChange={setColumnVisibilityModel}
        /> : <Box className='empty-box' sx={{height: '100%'}}>Расписание отсутствует в смене...</Box>}
    </Box>
}

export default ReportSchedule