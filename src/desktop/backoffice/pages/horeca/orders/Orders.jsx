import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { ruRU } from '@mui/x-data-grid/locales'
import { setOrdersHorecaFilter, setOrdersHorecaPagination } from '../../../../../redux/desktop/backoffice/centerHorecaReducer.js'
import { NormalizeFilterModel, useTableColumns } from '../../../hooks/useTableColumns.js'
import { center_horeca_orders_get } from '../../../../../service/fetch_service.js'

// region СТРУКТУРА
export default function Orders() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Данные из хранилища
    const { filial, date_shift } = useSelector((state) => state.center)
    const { orders_horeca, orders_horeca_settings, orders_horeca_loading } = useSelector((state) => state.center_horeca)

    // Пагинация
    const { page, pageSize } = useSelector((state) => state.center_horeca.orders_horeca_settings.pagination)

    // Сортировка
    const sort = orders_horeca_settings.sort

    // Фильтр
    const filter = orders_horeca_settings.filter

    // Загрузка данных
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

    // Функционал таблицы
    const onPaginationModelChange = (model) => {
        if (model.page === page && model.pageSize === pageSize) return
        dispatch(setOrdersHorecaPagination(model))
    }

    const onFilterModelChange = (model) => {
        if (JSON.stringify(model) === JSON.stringify(filter)) return
        dispatch(
            setOrdersHorecaPagination({
                page: 0,

                pageSize: pageSize,
            })
        )
        dispatch(setOrdersHorecaFilter(NormalizeFilterModel(model)))
    }

    const onRowClick = ({ row }) => {
        navigate(`/backoffice/horeca/orders/${row.id}`)
    }

    return (
        <DocView
            orders_horeca_loading={orders_horeca_loading}
            orders_horeca={orders_horeca}
            orders_horeca_settings={orders_horeca_settings}
            columns={columns}
            page={page}
            pageSize={pageSize}
            onPaginationModelChange={onPaginationModelChange}
            onFilterModelChange={onFilterModelChange}
            onRowClick={onRowClick}
        />
    )
}
// endregion

// region ВИД

const DocView = ({
    orders_horeca_loading,
    orders_horeca,
    orders_horeca_settings,
    columns,
    page,
    pageSize,
    onPaginationModelChange,
    onFilterModelChange,
    onRowClick,
}) => {
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
                paginationModel={{ page: page, pageSize: pageSize }}
                pageSizeOptions={[10, 20, 50, 100]}
                // Сортировка
                sortingMode="server"
                sortModel={orders_horeca_settings.sort}
                onSortModelChange={() => {}}
                // Фильтры
                filterMode="server"
                filterModel={orders_horeca_settings.filter}
                // События
                loading={orders_horeca_loading.loading}
                // Дополнительно
                density="compact"
                editMode="cell"
                hideFooterSelectedRowCount
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                // Функционал
                onPaginationModelChange={onPaginationModelChange}
                onFilterModelChange={onFilterModelChange}
                onRowClick={onRowClick}
            />
        </Box>
    )
}

// endregion
