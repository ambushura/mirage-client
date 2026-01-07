import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {common_reports_sales_get} from "../../../../service/fetch_service.js"
import {cleanSales, setSales} from "../../../../redux/documentsReducer.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {Box} from "@mui/material"
import {ruRU} from "@mui/x-data-grid/locales"

const Reports = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const {columns, rows, columnGroupingModel} = useSelector(state => state.documents.sales)
    const {report_variant} = useSelector(state => state.documents)
    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        type: false, level: false
    })

    // Загрузка данных
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_reports_sales_get(filial, param_date_admin, report_variant, 0))
            set_fetching(fetching_result)
            if (fetching_result.data !== null) {
                dispatch(setSales(fetching_result.data))
            }
        }
        dispatch(cleanSales())
        if (filial !== undefined) fetch()
    }, [dispatch, filial, param_date_admin, report_variant])

    if (filial === undefined) {
        return <Box className='empty-box'>Выберите филиал...</Box>
    } else if (report_variant === 'sales_full') {
        return <Box sx={{minHeight: '100%'}}>
            {rows.length > 1 ? <DataGridPro
                hideFooter
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                columnGroupingModel={columnGroupingModel}
                getRowId={(row) => {
                    return `${row.owner_uid || 'total'}|${row.kkt_uid || 'kkt'}|${row.type}|${row.level}`
                }}
                density="compact"
                disableSelectionOnClick
                hideFooterSelectedRowCount
                experimentalFeatures={{columnGrouping: true}}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={setColumnVisibilityModel}
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
    }

}

export default Reports
