import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { ruRU } from '@mui/x-data-grid/locales'
import { setOrdersHorecaFilter, setOrdersHorecaPagination } from '../../../../redux/backoffice/centerHorecaReducer.js'
import { NormalizeFilterModel, useTableColumns } from '../../../hooks/useTableColumns.js'
import { center_horeca_orders_get } from '../../../../service/fetch_service.js'

const Orders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Данные из хранилища
    const { filial, date_shift } = useSelector((state) => state.center)
    const { orders_horeca, orders_horeca_settings, orders_horeca_loading } = useSelector((state) => state.center_horeca)

    // Пагинация
    const { page, pageSize } = useSelector((state) => state.center_horeca.orders_horeca_settings.pagination)

    const sort = orders_horeca_settings.sort
    const filter = orders_horeca_settings.filter

    // Загрузка данных в хранилище
    useEffect(() => {
        const load = async () => {
            const res = await dispatch(center_horeca_orders_get(filial, date_shift, orders_horeca_settings, 0))
            set_catalog_map(res.data)
        }
        if (filial !== null && date_shift !== undefined) {
            load()
        }
    }, [filial, date_shift, dispatch, orders_horeca_settings])

    // Словарь для значений
    const [catalog_map, set_catalog_map] = useState([])
    const columns = useTableColumns(orders_horeca, filial, catalog_map, set_catalog_map)

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
                // Данные
                rows={orders_horeca.rows}
                rowCount={orders_horeca.total_rows}
                columns={columns}
                columnGroupingModel={orders_horeca.column_grouping_model}
                columnVisibilityModel={orders_horeca.column_visibility_model}
                // Пагинация
                pagination
                paginationMode="server"
                paginationModel={{ page, pageSize }}
                onPaginationModelChange={(model) => {
                    if (model.page === page && model.pageSize === pageSize) return
                    dispatch(setOrdersHorecaPagination(model))
                }}
                pageSizeOptions={[10, 20, 50, 100]}
                // Сортировка
                sortingMode="server"
                sortModel={orders_horeca_settings.sort}
                onSortModelChange={() => {}}
                // Фильтры
                filterMode="server"
                filterModel={orders_horeca_settings.filter}
                onFilterModelChange={(model) => {
                    if (JSON.stringify(model) === JSON.stringify(filter)) return
                    dispatch(
                        setOrdersHorecaPagination({
                            page: 0,
                            pageSize,
                        })
                    )
                    dispatch(setOrdersHorecaFilter(NormalizeFilterModel(model)))
                }}
                // События
                loading={orders_horeca_loading.loading}
                onRowClick={({ row }) => {
                    navigate(`/center/horeca/orders/${row.id}`)
                }}
                // Дополнительно
                density="compact"
                editMode="cell"
                hideFooterSelectedRowCount
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    )
}

export default Orders
