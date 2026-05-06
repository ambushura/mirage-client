import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { ruRU } from '@mui/x-data-grid/locales'
import { useDispatch, useSelector } from 'react-redux'
import { common_reports_schedule_get } from '../../../../../service/fetch_service.js'
import { cleanSchedule, set_scheduleColumnVisibilityModel, setSchedule } from '../../../../../redux/reportsReducer.js'

const ReportSchedule = () => {
    const dispatch = useDispatch()

    const filial = useSelector((state) => state.data.filial)
    const param_date_admin = useSelector((state) => state.interface.params.param_date_admin)

    const { report_variant, update } = useSelector((state) => state.reports)

    const schedule_columns = useSelector((state) => state.reports.schedule.columns)
    const schedule_rows = useSelector((state) => state.reports.schedule.rows)
    const schedule_columnGroupingModel = useSelector((state) => state.reports.schedule.columnGroupingModel)
    const schedule_columnVisibilityModel = useSelector((state) => state.reports.schedule_columnVisibilityModel)

    // Загрузка данных
    useEffect(() => {
        const fetch = async () => {
            dispatch(cleanSchedule())
            const fetching_result = await dispatch(common_reports_schedule_get(filial, param_date_admin, 0))
            if (fetching_result.data !== null) {
                dispatch(setSchedule(fetching_result.data))
            }
        }
        if (filial !== undefined && report_variant !== null) fetch()
    }, [dispatch, filial, param_date_admin, report_variant, update])

    return (
        <Box sx={{ height: '100%', display: 'flex' }}>
            {schedule_rows.length > 1 ? (
                <DataGridPro
                    hideFooter
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    rows={schedule_rows}
                    columns={schedule_columns}
                    columnGroupingModel={schedule_columnGroupingModel}
                    density="compact"
                    disableSelectionOnClick
                    hideFooterSelectedRowCount
                    experimentalFeatures={{ columnGrouping: true }}
                    columnVisibilityModel={set_scheduleColumnVisibilityModel}
                    onColumnVisibilityModelChange={set_scheduleColumnVisibilityModel}
                    getRowClassName={(params) => {
                        if (params.row.type === 'hall') return 'row-seance-hall'
                        switch (params.row.state) {
                            case 'Закрыт':
                                return 'row-seance-closed'
                            case 'Отменен':
                                return 'row-seance-canceled'
                            case 'В продаже':
                                return 'row-seance-sale'
                            default:
                                return ''
                        }
                    }}
                    pinnedColumns={{
                        left: ['beginning', 'ending'],
                    }}
                    sx={{
                        flex: 1,
                    }}
                />
            ) : (
                <Box className="empty-box" sx={{ height: '100%' }}>
                    Расписание отсутствует в смене...
                </Box>
            )}
        </Box>
    )
}

export default ReportSchedule
