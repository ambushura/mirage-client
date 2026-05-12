import { Box } from '@mui/material'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanOperations, setOperations } from '../../../../../redux/frontoffice/documentsReducer.js'
import { ruRU } from '@mui/x-data-grid/locales'
import { common_documents_operations_get } from '../../../../../service/fetch_service.js'
import Loader from '../../../../../ui/Loader.jsx'
import { useNavigate } from 'react-router-dom'

const Operations = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { city, filial } = useSelector((state) => state.data)
    const param_date_admin = useSelector((state) => state.interface.params.param_date_admin)
    const wp = useSelector((state) => state.interface.wp)

    const { columns, rows, column_grouping_model } = useSelector((state) => state.documents.operations)
    const { operations_page, operations_details, operations_update } = useSelector((state) => state.documents)
    const [fetching, set_fetching] = useState({ loading: false, error: null, data: null })

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(
                common_documents_operations_get(filial, operations_page, operations_update, operations_details)
            )
            set_fetching(fetching_result)
            if (fetching_result.data !== null) {
                dispatch(setOperations(fetching_result.data))
            }
        }
        dispatch(cleanOperations())
        if (filial !== undefined) {
            fetch()
        }
        return () => dispatch(cleanOperations())
    }, [dispatch, filial, operations_page, operations_details, operations_update])

    if (filial === undefined) {
        return <Box className="empty-box">Выберите филиал...</Box>
    } else if (fetching.loading && fetching.error === null) {
        return <Loader />
    } else if (!fetching.loading && fetching.error !== null) {
        return <Box className="empty-box">{fetching.error}</Box>
    } else if (!fetching.loading && fetching.error === null && fetching.data !== null) {
        if (rows.length === 0 || columns.length === 0 || column_grouping_model.length === 0) {
            return <Box className="empty-box">Операции по кассе отсутствуют...</Box>
        } else {
            // Добавляем кастомный рендер для всех колонок
            const columnsWithCustomRender = columns.map((col) => ({
                ...col,
                renderCell: (params) => {
                    const value = params.value
                    if (value === 0) return null
                    const style = value < 0 ? { color: 'red' } : {}
                    return <span style={style}>{value}</span>
                },
            }))

            return (
                <DataGridPro
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    checkboxSelection
                    rows={rows}
                    columns={columnsWithCustomRender}
                    hideFooter
                    rowHeight={30}
                    headerHeight={30}
                    loading={fetching.loading}
                    columnGroupingModel={column_grouping_model}
                    experimentalFeatures={{ columnGrouping: true }}
                    getRowClassName={(params) => (params.row.isTotalRow ? 'total-row' : '')}
                    pinnedColumns={{
                        left: ['date_shift'],
                    }}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            position: 'sticky',
                            top: '500px',
                            zIndex: 1000,
                            backgroundColor: '#fff',
                        },
                        '& .MuiDataGrid-columnHeader--grouped': {
                            position: 'sticky',
                            top: 0,
                            zIndex: 1100,
                            backgroundColor: '#f9f9f9',
                        },
                        '& .total-row': {
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-cell': {
                            padding: '0 4px',
                            fontSize: '0.9rem',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontSize: '0.9rem',
                        },
                    }}
                    onRowDoubleClick={(params) => {
                        if (!params.row.is_total_row) {
                            navigate(`/admin/operation/${city.code}/${filial.eais}/${params.row.id}/?${wp !== null ? 'wp=' + wp : ''}`)
                        }
                    }}
                />
            )
        }
    }
}

export default Operations
