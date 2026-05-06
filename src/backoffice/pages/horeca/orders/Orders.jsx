import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { ruRU } from '@mui/x-data-grid/locales'
import { setOrdersHorecaPage, setOrdersHorecaPageSize } from '../../../../redux/center/centerHorecaReducer.js'
import { useEffect, useState } from 'react'
import { center_catalog_load } from '../../../../service/fetch_service.js'
import { FillNameMap } from '../../../Common.jsx'
import { useTableColumns } from '../../../hooks/useTableColumns.js'

const Orders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { orders_horeca, orders_horeca_loading, orders_horeca_page, orders_horeca_page_size } = useSelector(
        (state) => state.center_horeca
    )

    // Филиал
    const { filial } = useSelector((state) => state.center)

    // Словарь для значений
    const [catalog_map, set_catalog_map] = useState([])

    const columns = useTableColumns(orders_horeca, filial, catalog_map, set_catalog_map)

    // Заполнение карты наименований
    useEffect(() => {
        const loadMap = async () => {
            const ids = FillNameMap([orders_horeca])
            if (ids.length === 0) return
            const res = await dispatch(center_catalog_load(filial, ids))
            set_catalog_map((prev_state) => [...prev_state, ...res.data])
        }
        loadMap()
    }, [dispatch, filial, orders_horeca])

    return (
        <Box
            className="center-horeca-page"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                height: 'calc(100vh - var(--center-header-height) - var(--center-submenu-height) - 10px)',
                overflow: 'hidden',
            }}
        >
            <DataGridPro
                loading={orders_horeca_loading.loading}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={orders_horeca.rows}
                columns={columns}
                columnGroupingModel={orders_horeca.column_grouping_model}
                density="compact"
                hideFooterSelectedRowCount
                columnVisibilityModel={orders_horeca.column_visibility_model}
                onColumnVisibilityModelChange={() => {}}
                disableColumnSorting
                editMode="cell"
                paginationMode="server"
                pagination
                pageSize={orders_horeca_page_size || 20}
                rowsPerPageOptions={[10, 20, 50, 100]}
                onPaginationModelChange={(model) => {
                    dispatch(setOrdersHorecaPage(model.page + 1))
                    dispatch(setOrdersHorecaPageSize(model.pageSize))
                }}
                paginationModel={{
                    page: (orders_horeca_page || 1) - 1,
                    pageSize: orders_horeca_page_size || 20,
                }}
                pageSizeOptions={[10, 20, 50, 100]}
                rowCount={orders_horeca.total || 0}
                sx={{
                    minHeight: 'inherit',
                    flex: 1,
                    border: 0,
                    borderRadius: '0',
                    '& .MuiDataGrid-cellContent': {
                        pointerEvents: 'auto',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        fontSize: '12px',
                        fontWeight: 600,
                        backgroundColor: '#f0f0f0',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        whiteSpace: 'normal',
                        lineHeight: 1.2,
                    },
                }}
                onRowClick={(params) => {
                    navigate(`/center/horeca/orders/${params.row.id}`)
                }}
            />
        </Box>
    )
}

export default Orders
