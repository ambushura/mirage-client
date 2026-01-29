import React, {useEffect} from 'react'
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {cleanShift1, set_shift1ColumnVisibilityModel, setShift1} from "../../../../redux/reportsReducer.js"
import {common_reports_shift_get} from "../../../../service/fetch_service.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"

const ReportShift = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    const {report_variant, update} = useSelector(state => state.reports)

    const shift_1_columns = useSelector(state => state.reports.shift_1.columns)
    const shift_1_rows = useSelector(state => state.reports.shift_1.rows)
    const shift_1_columnGroupingModel = useSelector(state => state.reports.shift_1.columnGroupingModel)
    const shift_1_columnVisibilityModel = useSelector(state => state.reports.shift_1_columnVisibilityModel)

    // Загрузка данных
    useEffect(() => {
        const fetch = async () => {
            dispatch(cleanShift1())
            const fetching_result = await dispatch(common_reports_shift_get(filial, param_date_admin, 0))
            if (fetching_result.data !== null) {
                dispatch(setShift1(fetching_result.data))
            }
        }
        if (filial !== undefined && report_variant !== null) fetch()
    }, [dispatch, filial, param_date_admin, report_variant, update])

    return <Box
        sx={{
            minHeight: '100%', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'flex-start'
        }}>
        {shift_1_rows.length > 0 ? <DataGridPro
            hideFooter
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={shift_1_rows.map((r, i) => ({...r, id: i}))}
            columns={shift_1_columns}
            columnGroupingModel={shift_1_columnGroupingModel}
            density="compact"
            disableSelectionOnClick
            hideFooterSelectedRowCount
            experimentalFeatures={{columnGrouping: true}}
            columnVisibilityModel={shift_1_columnVisibilityModel}
            onColumnVisibilityModelChange={set_shift1ColumnVisibilityModel}
            getRowClassName={(params) => params.row.diff_nal !== 0 || params.row.diff_bn !== 0 ? 'row-diff-red' : ''}
            sx={{
                width: '100%', margin: '0 4px 4px 0', '& .row-diff-red': {
                    backgroundColor: 'rgba(255, 0, 0, 0.2)', '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.3)',
                    },
                },
            }}
            pinnedColumns={{
                left: ['number_kkt'],
            }}
        /> : <Box className='empty-box' sx={{height: '100%'}}>Нет данных для формирования суточного отчета...</Box>}
        {shift_1_rows.length > 0 ? <DataGridPro
            hideFooter
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={shift_1_rows.map((r, i) => ({...r, id: i}))}
            columns={shift_1_columns}
            columnGroupingModel={shift_1_columnGroupingModel}
            density="compact"
            disableSelectionOnClick
            hideFooterSelectedRowCount
            experimentalFeatures={{columnGrouping: true}}
            columnVisibilityModel={shift_1_columnVisibilityModel}
            onColumnVisibilityModelChange={set_shift1ColumnVisibilityModel}
            getRowClassName={(params) => params.row.diff_nal !== 0 || params.row.diff_bn !== 0 ? 'row-diff-red' : ''}
            sx={{
                width: '100%', margin: '0 4px 4px 0', '& .row-diff-red': {
                    backgroundColor: 'rgba(255, 0, 0, 0.2)', '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.3)',
                    },
                },
            }}
        /> : <Box className='empty-box' sx={{height: '100%'}}>Нет данных для формирования суточного отчета...</Box>}
    </Box>
}

export default ReportShift