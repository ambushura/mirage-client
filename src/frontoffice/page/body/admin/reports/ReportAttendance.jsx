import React, {useEffect} from 'react'
import {Box} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {ruRU} from '@mui/x-data-grid/locales'
import {DataGridPro} from '@mui/x-data-grid-pro'
import {cleanAttendance, setAttendance} from '../../../../../redux/reportsReducer.js'
import {common_reports_attendance_get} from '../../../../../service/fetch_service.js'

const ReportAttendance = () => {
    const dispatch = useDispatch()

    const filial = useSelector((state) => state.data.filial)
    const param_date_admin = useSelector((state) => state.interface.params.param_date_admin)

    const {report_variant, update} = useSelector((state) => state.reports)

    const columns = useSelector((state) => state.reports.attendance.columns)
    const rows = useSelector((state) => state.reports.attendance.rows)
    const column_grouping_model = useSelector(
        (state) => state.reports.attendance.column_grouping_model
    )
    const column_visibility_model = useSelector(
        (state) => state.reports.attendance.column_visibility_model
    )

    // Загрузка данных
    useEffect(() => {
        const fetch = async () => {
            dispatch(cleanAttendance())
            const fetching_result = await dispatch(
                common_reports_attendance_get(filial, param_date_admin, param_date_admin, 0)
            )
            if (fetching_result.data !== null) {
                dispatch(setAttendance(fetching_result.data))
            }
        }
        if (filial !== undefined && report_variant !== null) fetch()
    }, [dispatch, filial, param_date_admin, report_variant, update])

    return (
        <Box sx={{height: '100%', display: 'flex'}}>
            <DataGridPro
                hideFooter
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                columnGroupingModel={column_grouping_model}
                disableSelectionOnClick
                hideFooterSelectedRowCount
                experimentalFeatures={{columnGrouping: true, treeData: true}}
                treeData
                density="compact"
                getTreeDataPath={(row) => row.path}
                getRowId={(row) => row.id}
                columnVisibilityModel={column_visibility_model}
                onColumnVisibilityModelChange={() => {
                }}
                pinnedColumns={{
                    left: ['beginning', 'ending'],
                }}
                sx={{flex: 1}}
                getRowClassName={(params) => {
                    if (params.row.percent <= 30) {
                        return 'row-attendance-30'
                    } else if (params.row.percent <= 70) {
                        return 'row-attendance-70'
                    } else if (params.row.percent >= 70) {
                        return 'row-attendance-71'
                    }
                }}
                defaultGroupingExpansionDepth={1}
            />
    </Box>
    )
}

export default ReportAttendance
