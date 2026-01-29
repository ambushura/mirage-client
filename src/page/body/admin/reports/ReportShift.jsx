import React, {useEffect} from 'react'
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {cleanShift, set_shiftColumnVisibilityModel, setShift} from "../../../../redux/reportsReducer.js"
import {common_reports_shift_get} from "../../../../service/fetch_service.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"

const ReportShift = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    const {report_variant, update} = useSelector(state => state.reports)

    const shift_columns = useSelector(state => state.reports.shift.columns)
    const shift_rows = useSelector(state => state.reports.shift.rows)
    const shift_columnGroupingModel = useSelector(state => state.reports.shift.columnGroupingModel)
    const shift_columnVisibilityModel = useSelector(state => state.reports.shift_columnVisibilityModel)

    // Загрузка данных
    useEffect(() => {
        const fetch = async () => {
            dispatch(cleanShift())
            const fetching_result = await dispatch(common_reports_shift_get(filial, param_date_admin, 0))
            if (fetching_result.data !== null) {
                dispatch(setShift(fetching_result.data))
            }
        }
        if (filial !== undefined && report_variant !== null) fetch()
    }, [dispatch, filial, param_date_admin, report_variant, update])

    return <Box sx={{minHeight: '100%', display: 'flex'}}>
        {shift_rows.length > 0 ? <DataGridPro
            hideFooter
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={shift_rows.map((r, i) => ({...r, id: i}))}
            columns={shift_columns}
            columnGroupingModel={shift_columnGroupingModel}
            density="compact"
            disableSelectionOnClick
            hideFooterSelectedRowCount
            experimentalFeatures={{columnGrouping: true}}
            columnVisibilityModel={shift_columnVisibilityModel}
            onColumnVisibilityModelChange={set_shiftColumnVisibilityModel}
            sx={{
                flex: 1,
            }}
        /> : <Box className='empty-box' sx={{height: '100%'}}>Нет данных для формирования суточного отчета...</Box>}
    </Box>
}

export default ReportShift