import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {common_reports_sales_get} from "../../../../service/fetch_service.js"
import {cleanSales, set_sales_columnVisibilityModel, setSales} from "../../../../redux/reportsReducer.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {Box} from "@mui/material"
import {ruRU} from "@mui/x-data-grid/locales"

const Reports = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    const {report_variant, update} = useSelector(state => state.reports)

    // Выручка
    const sales_columns = useSelector(state => state.reports.sales.columns)
    const sales_rows = useSelector(state => state.reports.sales.rows)
    const sales_columnGroupingModel = useSelector(state => state.reports.sales.columnGroupingModel)
    const sales_columnVisibilityModel = useSelector(state => state.reports.sales_columnVisibilityModel)

    // Расписание
    const schedule_columns = useSelector(state => state.reports.schedule.columns)
    const schedule_rows = useSelector(state => state.reports.schedule.rows)
    const schedule_columnGroupingModel = useSelector(state => state.reports.schedule.columnGroupingModel)
    const schedule_columnVisibilityModel = useSelector(state => state.reports.schedule_columnVisibilityModel)

    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})

    // Загрузка данных
    useEffect(() => {
        const fetch = async () => {
            dispatch(cleanSales())
            switch (report_variant) {
                case 'sales':
                    const fetching_result = await dispatch(common_reports_sales_get(filial, param_date_admin, 0))
                    set_fetching(fetching_result)
                    if (fetching_result.data !== null) {
                        dispatch(setSales(fetching_result.data))
                    }
                    break
                default:
                    break
            }
        }
        if (filial !== undefined && report_variant !== null) fetch()
    }, [dispatch, filial, param_date_admin, report_variant, update])

    if (filial === undefined) {
        return <Box className='empty-box'>Выберите филиал...</Box>
    } else if (report_variant === 'sales') {
        return <Box sx={{minHeight: '100%'}}>
            {sales_rows.length > 1 ? <DataGridPro
                hideFooter
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={sales_rows}
                columns={sales_columns}
                columnGroupingModel={sales_columnGroupingModel}
                getRowId={(row) => {
                    return `${row.owner_uid || 'total'}|${row.kkt_uid || 'kkt'}|${row.type}|${row.level}`
                }}
                density="compact"
                disableSelectionOnClick
                hideFooterSelectedRowCount
                experimentalFeatures={{columnGrouping: true}}
                columnVisibilityModel={sales_columnVisibilityModel}
                onColumnVisibilityModelChange={set_sales_columnVisibilityModel}
                getRowClassName={(params) => {
                    const {is_total_owner, is_total_kkt} = params.row
                    if (is_total_owner && is_total_kkt) {
                        return 'row-total-grand'
                    }
                    if (is_total_owner) {
                        return 'row-total-owner'
                    }
                    if (is_total_kkt) {
                        return 'row-total-kkt'
                    }
                    return ''
                }}
            /> : <Box className='empty-box' sx={{height: '100%'}}>Выручка отсутствует в смене...</Box>}
        </Box>
    } else if (report_variant === 'schedule') {
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

}

export default Reports
