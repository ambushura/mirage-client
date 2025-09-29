import {Box} from "@mui/material"
import {DataGridPro} from '@mui/x-data-grid-pro'
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {cleanOperations, setOperations} from "../../../../redux/documentsReducer.js"
import {ruRU} from "@mui/x-data-grid/locales"
import {common_documents_operations_get} from "../../../../service/fetch_service.js"
import Loader from "../../../../ui/Loader.jsx"

const Operations = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const {columns, rows, column_grouping_model} = useSelector(state => state.documents.operations)
    const {operations_page, operations_details} = useSelector(state => state.documents)
    const {update} = useSelector(state => state.documents.operations)
    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_operations_get(filial, operations_page, update, operations_details))
            set_fetching(fetching_result)
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.data !== null) {
                dispatch(setOperations(fetching_result.data))
            }
        }
        dispatch(cleanOperations())
        if (filial !== undefined) {
            fetch()
        }
        return () => dispatch(cleanOperations())
    }, [dispatch, filial, operations_page, operations_details, update])

    if (filial === undefined) {
        return <Box className='empty-box'>Выберите филиал...</Box>
    } else if (fetching.loading && fetching.error === null && fetching.data === null) {
        return <Loader/>
    } else if (!fetching.loading && fetching.error !== null && fetching.data === null) {
        return <Box className='empty-box'>{fetching.error}</Box>
    } else if (!fetching.loading && fetching.error === null && fetching.data !== null) {
        if (rows.length === 0 || columns.length === 0 || column_grouping_model.length === 0) {
            return <Box className='empty-box'>Операции по кассе отсутствуют...</Box>
        } else {
            // Добавляем кастомный рендер для всех колонок
            const columnsWithCustomRender = columns.map(col => ({
                ...col, renderCell: (params) => {
                    const value = params.value
                    if (value === 0) return null
                    const style = value < 0 ? {color: 'red'} : {}
                    return <span style={style}>{value}</span>
                }
            }))

            return <DataGridPro
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                checkboxSelection
                rows={rows}
                columns={columnsWithCustomRender}
                hideFooter
                rowHeight={26}
                headerHeight={28}
                loading={fetching.loading}
                columnGroupingModel={column_grouping_model}
                experimentalFeatures={{columnGrouping: true}}
                getRowClassName={(params) => params.row.isTotalRow ? 'total-row' : ''}
                pinnedColumns={{
                    left: ['date_shift'],
                }}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        position: 'sticky', top: '500px', zIndex: 1000, backgroundColor: '#fff',
                    }, '& .MuiDataGrid-columnHeader--grouped': {
                        position: 'sticky', top: 0, zIndex: 1100, backgroundColor: '#f9f9f9',
                    }, '& .total-row': {
                        backgroundColor: '#f0f0f0', fontWeight: 'bold',
                    }, '& .MuiDataGrid-cell': {
                        padding: '0 4px', fontSize: '0.9rem',
                    }, '& .MuiDataGrid-columnHeaderTitle': {
                        fontSize: '0.9rem',
                    },
                }}
            />
        }
    }
}

export default Operations