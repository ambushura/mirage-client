import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {common_documents_sales_get} from "../../../../service/fetch_service.js"
import {cleanOperations, cleanSales, setSales} from "../../../../redux/documentsReducer.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import Loader from "../../../../ui/Loader.jsx"
import {Box} from "@mui/material"

const Sales = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const {columns, rows, columnGroupingModel} = useSelector(state => state.documents.sales)
    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({})

    // Загрузка данных
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_sales_get(filial, param_date_admin))
            set_fetching(fetching_result)
            if (fetching_result.data !== null) {
                dispatch(setSales(fetching_result.data))
            }
        }
        dispatch(cleanSales())
        if (filial !== undefined) fetch()
        return () => dispatch(cleanOperations())
    }, [dispatch, filial, param_date_admin])

    // Инициализация видимости колонок
    useEffect(() => {
        const initialModel = {
            uid_store: false,
            uid_kkt: false,
            uid_creator: false,
            name_store: false,
            number_kkt: false,
            name_creator: false
        }
        setColumnVisibilityModel(initialModel)
    }, [])

    if (filial === undefined) {
        return <Box className='empty-box'>Выберите филиал...</Box>
    } else {
        return <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            {fetching.loading && fetching.error === null && fetching.data === null && <Loader/>}
            {!fetching.loading && fetching.error !== null && fetching.data === null &&
                <Box sx={{minHeight: '100%'}}><Box sx={{minHeight: '100%'}} className='empty-box'>{fetching.error}</Box></Box>}
            {!fetching.loading && fetching.error === null && fetching.data !== null && <Box sx={{height: '100%'}}>
                {rows.length > 1 ? <DataGridPro
                    treeData
                    disableRowSelectionOnClick
                    defaultGroupingExpansionDepth={1}
                    columns={columns}
                    rows={rows.filter(r => r.id !== 'TOTAL')}
                    pinnedRows={{bottom: rows.filter(r => r.id === 'TOTAL')}}
                    rowHeight={28}
                    columnGroupingModel={columnGroupingModel}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={setColumnVisibilityModel}
                    getTreeDataPath={row => row.path_label ?? row.path}
                    getRowId={row => row.id}
                    getRowTreeDataLabel={row => row.path_label?.at(-1) ?? row.name_store ?? ''}
                    groupingColDef={{headerName: 'Продажи', width: 400, flex: 0}}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    pinnedColumns={{
                        left: ['__tree_data_group__'], right: columns
                            .filter(c => c.field === 'grand_total')
                            .map(c => c.field)
                    }}
                    getRowClassName={(params) => params.row.is_group ? 'group-row' : ''}
                /> : <Box className='empty-box' sx={{height: '100%'}}>Выручка отсутствует в смене...</Box>}
            </Box>}
        </Box>
    }

}

export default Sales
