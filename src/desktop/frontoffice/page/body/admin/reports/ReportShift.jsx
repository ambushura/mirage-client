import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { cleanShift, set_shiftColumnVisibilityModel, setShift } from '../../../../../../redux/desktop/frontoffice/reportsReducer.js'
import { common_reports_shift_get } from '../../../../../../service/fetch_service.js'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { ruRU } from '@mui/x-data-grid/locales'

const ReportShift = () => {
    const dispatch = useDispatch()

    const filial = useSelector((state) => state.data.filial)
    const param_date_admin = useSelector((state) => state.interface.params.param_date_admin)

    const { report_variant, update } = useSelector((state) => state.reports)

    const shift_1_columns = useSelector((state) => state.reports.shift_1.columns)
    const shift_1_rows = useSelector((state) => state.reports.shift_1.rows)
    const shift_1_columnGroupingModel = useSelector((state) => state.reports.shift_1.columnGroupingModel)
    const shift_1_columnVisibilityModel = useSelector((state) => state.reports.shift_1_columnVisibilityModel)

    const shift_2_columns = useSelector((state) => state.reports.shift_2.columns)
    const shift_2_rows = useSelector((state) => state.reports.shift_2.rows)
    const shift_2_columnGroupingModel = useSelector((state) => state.reports.shift_2.columnGroupingModel)
    const shift_2_columnVisibilityModel = useSelector((state) => state.reports.shift_2_columnVisibilityModel)

    const shift_3_columns = useSelector((state) => state.reports.shift_3.columns)
    const shift_3_rows = useSelector((state) => state.reports.shift_3.rows)
    const shift_3_columnGroupingModel = useSelector((state) => state.reports.shift_3.columnGroupingModel)
    const shift_3_columnVisibilityModel = useSelector((state) => state.reports.shift_3_columnVisibilityModel)

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

    return (
        <Box
            sx={{
                minHeight: '100%',
                overflowX: 'auto',
            }}
        >
            <Box className="report-title glass">1. РАЗДЕЛ CВЕРКА (продажи и ОФД)</Box>
            {shift_1_rows.length > 0 ? (
                <DataGridPro
                    hideFooter
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    rows={shift_1_rows.map((r, i) => ({ ...r, id: i }))}
                    columns={shift_1_columns}
                    columnGroupingModel={shift_1_columnGroupingModel}
                    density="compact"
                    rowHeight={30}
                    headerHeight={30}
                    disableSelectionOnClick
                    hideFooterSelectedRowCount
                    experimentalFeatures={{ columnGrouping: true }}
                    columnVisibilityModel={shift_1_columnVisibilityModel}
                    onColumnVisibilityModelChange={set_shiftColumnVisibilityModel}
                    getRowClassName={(params) => (params.row.diff_nal !== 0 || params.row.diff_bn !== 0 ? 'row-diff-red' : '')}
                    sx={{
                        width: 'calc(100% - 8px)',
                        margin: '0 4px 4px 4px',
                        '& .row-diff-red': {
                            backgroundColor: 'rgba(255, 0, 0, 0.2)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                            },
                        },
                    }}
                    pinnedColumns={{
                        left: ['number_kkt'],
                    }}
                />
            ) : (
                <Box className="report-title-text">Нет данных...</Box>
            )}
            <Box className="report-title glass">2. РАЗДЕЛ СВЕРКА (продажи и банк)</Box>
            {shift_2_rows.length > 0 ? (
                <DataGridPro
                    hideFooter
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    rows={shift_2_rows.map((r, i) => ({ ...r, id: i }))}
                    columns={shift_2_columns}
                    columnGroupingModel={shift_2_columnGroupingModel}
                    density="compact"
                    rowHeight={30}
                    headerHeight={30}
                    disableSelectionOnClick
                    hideFooterSelectedRowCount
                    experimentalFeatures={{ columnGrouping: true }}
                    columnVisibilityModel={shift_2_columnVisibilityModel}
                    onColumnVisibilityModelChange={set_shiftColumnVisibilityModel}
                    getRowClassName={(params) => {
                        switch (params.row.status) {
                            case 'РУЧНАЯ ПРОВЕРКА':
                                return 'row-diff-orange'
                            case 'СВЕРКА ВЫПОЛНЕНА':
                                return ''
                            default:
                                return 'row-diff-red'
                        }
                    }}
                    sx={{
                        width: 'calc(100% - 8px)',
                        margin: '0 4px 4px 4px',
                        '& .row-diff-red': {
                            backgroundColor: '#FF000033',
                            '&:hover': {
                                backgroundColor: '#FF00004C',
                            },
                        },
                        '& .row-diff-orange': {
                            backgroundColor: '#FF730033',
                            '&:hover': {
                                backgroundColor: 'rgba(234,106,1,0.2)',
                            },
                        },
                    }}
                    pinnedColumns={{
                        left: ['number'],
                    }}
                />
            ) : (
                <Box className="report-title-text">Нет данных...</Box>
            )}
            <Box className="report-title glass">3. РАЗДЕЛ ВЫРУЧКА</Box>
            {shift_3_rows.length > 3 ? (
                <DataGridPro
                    hideFooter
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    rows={shift_3_rows.map((r, i) => ({ ...r, id: i }))}
                    columns={shift_3_columns}
                    columnGroupingModel={shift_3_columnGroupingModel}
                    density="compact"
                    rowHeight={30}
                    headerHeight={30}
                    disableSelectionOnClick
                    hideFooterSelectedRowCount
                    experimentalFeatures={{ columnGrouping: true }}
                    columnVisibilityModel={shift_3_columnVisibilityModel}
                    onColumnVisibilityModelChange={set_shiftColumnVisibilityModel}
                    pinnedColumns={{
                        left: ['label'],
                    }}
                />
            ) : (
                <Box className="report-title-text">Нет данных...</Box>
            )}
        </Box>
    )
}

export default ReportShift
