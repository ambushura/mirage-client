import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { cleanSales, set_salesColumnVisibilityModel, setSales } from '../../../../../redux/frontoffice/reportsReducer.js'
import { common_reports_sales_get } from '../../../../../service/fetch_service.js'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { ruRU } from '@mui/x-data-grid/locales'

const ReportSales = () => {
    const dispatch = useDispatch()

    const filial = useSelector((state) => state.data.filial)
    const param_date_admin = useSelector((state) => state.interface.params.param_date_admin)

    const { report_variant, update } = useSelector((state) => state.reports)

    const sales_columns = useSelector((state) => state.reports.sales.columns)
    const sales_rows = useSelector((state) => state.reports.sales.rows)
    const sales_columnGroupingModel = useSelector((state) => state.reports.sales.columnGroupingModel)
    const sales_columnVisibilityModel = useSelector((state) => state.reports.sales_columnVisibilityModel)

    // Загрузка данных
    useEffect(() => {
        const fetch = async () => {
            dispatch(cleanSales())
            const fetching_result = await dispatch(common_reports_sales_get(filial, param_date_admin, param_date_admin, 0))
            if (fetching_result.data !== null) {
                dispatch(setSales(fetching_result.data))
            }
        }
        if (filial !== undefined && report_variant !== null) fetch()
    }, [dispatch, filial, param_date_admin, report_variant, update])

    return (
        <Box sx={{ minHeight: '100%', display: 'flex' }}>
            {sales_rows.length > 1 ? (
                <DataGridPro
                    hideFooter
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    rows={sales_rows.map((r, i) => ({ ...r, id: i }))}
                    columns={sales_columns}
                    columnGroupingModel={sales_columnGroupingModel}
                    density="compact"
                    rowHeight={30}
                    headerHeight={30}
                    disableSelectionOnClick
                    hideFooterSelectedRowCount
                    experimentalFeatures={{ columnGrouping: true }}
                    columnVisibilityModel={sales_columnVisibilityModel}
                    onColumnVisibilityModelChange={set_salesColumnVisibilityModel}
                    getRowClassName={(params) => {
                        const label = params.row.label
                        // ВСЕГО
                        if (label === 'ВСЕГО') {
                            return 'row-total-grand'
                        }

                        // Организация
                        if (!label.startsWith('  └─') && !label.startsWith('    └─')) {
                            return 'row-total-owner'
                        }

                        // Пользователь
                        if (label.startsWith('  └─') && !label.startsWith('    └─')) {
                            return 'row-user'
                        }
                        // ККТ
                        if (label.startsWith('    └─')) {
                            return 'row-kkt'
                        }
                        return ''
                    }}
                    sx={{
                        flex: 1,
                    }}
                />
            ) : (
                <Box className="empty-box" sx={{ height: '100%' }}>
                    Выручка отсутствует в смене...
                </Box>
            )}
        </Box>
    )
}

export default ReportSales
