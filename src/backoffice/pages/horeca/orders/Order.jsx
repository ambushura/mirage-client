import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { ruRU } from '@mui/x-data-grid/locales'
import CachedIcon from '@mui/icons-material/Cached'
import { useForm } from 'react-hook-form'
import { TableToolbar } from '../../../Common.jsx'
import ControlledTextField from '../../../../ui/ControlledTextField.jsx'
import ControlledFieldSwitch from '../../../../ui/ControlledFieldSwitch.jsx'
import ControlledMoneyField from '../../../../ui/ControlledMoneyField.jsx'
import { center_horeca_order_get } from '../../../../service/fetch_service.js'
import { useTableColumns } from '../../../hooks/useTableColumns.js'
import Loader from '../../../../ui/Loader.jsx'

////////////////////////////////////////////////////////////
// ДОПОЛНИТЕЛЬНО
////////////////////////////////////////////////////////////

const BUYER_FIELDS = [
    ['buyer_email', 'Email'],
    ['buyer_phone_number', 'Номер телефона'],
    ['buyer_card_number', 'Номер карты'],
    ['buyer_s', 'Фамилия'],
    ['buyer_n', 'Имя'],
    ['buyer_o', 'Отчество'],
]

const TOOLBAR_CONFIG = {
    store: { left: [{ label: 'Пересобрать', icon: <CachedIcon />, onClick: IngredientsRebuild }] },
    payments: { left: [{ label: 'Подобрать', icon: <CachedIcon />, onClick: PaymentsRebuild }] },
    returns: { left: [{ label: 'Подобрать', icon: <CachedIcon />, onClick: ReturnsRebuild }] },
}

const EMPTY_TOOLBAR = { left: [], right: [] }

////////////////////////////////////////////////////////////
// СТРУКТУРА ДОКУМЕНТА
////////////////////////////////////////////////////////////

export default function Order() {
    const dispatch = useDispatch()
    const form = useForm()

    const { filial } = useSelector((state) => state.center)
    const { order_horeca_loading, order_horeca } = useSelector((state) => state.center_horeca)
    const { uid_order } = useSelector((state) => state.center.params)

    const [catalog_map, set_catalog_map] = useState([])
    const [current_table, set_current_table] = useState('sales')

    // Загрузка заказа на клиент
    useEffect(() => {
        const load = async () => {
            const res = await dispatch(center_horeca_order_get(filial, uid_order, 0))
            set_catalog_map(res.data)
        }
        if (filial !== null && uid_order !== undefined) {
            load()
        }
    }, [dispatch, filial, uid_order])

    // Загрузка заказа в форму
    useEffect(() => {
        form.reset(structuredClone(order_horeca))
    }, [form, order_horeca])

    if (order_horeca_loading.loading) return <Loader />

    return (
        <DocView
            form={form}
            order={order_horeca}
            filial={filial}
            catalog_map={catalog_map}
            set_catalog_map={set_catalog_map}
            current_table={current_table}
            set_current_table={set_current_table}
            loading={order_horeca_loading.loading}
        />
    )
}

////////////////////////////////////////////////////////////
// ВИД ДОКУМЕНТА
////////////////////////////////////////////////////////////

function DocView(props) {
    const { form } = props
    return (
        <Box component="form" className="center-page">
            <TabsSection {...props} />
            <Summary control={form.control} />
        </Box>
    )
}

////////////////////////////////////////////////////////////
// СТРУКТУРА СТРАНИЦ
////////////////////////////////////////////////////////////

function TabsSection({ order, form, filial, catalog_map, set_catalog_map, current_table, set_current_table, loading }) {
    return (
        <Box sx={{ height: '100%' }}>
            <TabContext value={current_table}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1, position: 'sticky', top: 0, zIndex: 1 }}>
                    <TabList onChange={(_, v) => set_current_table(v)} variant="scrollable">
                        <Tab value="common" label="Общие" />
                        {order.tables.map((t) => (
                            <Tab key={t.id} value={t.id} label={t.title} />
                        ))}
                        <Tab value="buyer" label="Покупатель" />
                    </TabList>
                </Box>

                <TabPanel value="common" className="center-page-tab">
                    <CommonTab control={form.control} />
                </TabPanel>

                {order.tables.map((table) => (
                    <TabPanel key={table.id} value={table.id} className="center-page-tab">
                        <TableTab
                            table={table}
                            filial={filial}
                            loading={loading}
                            catalog_map={catalog_map}
                            set_catalog_map={set_catalog_map}
                        />
                    </TabPanel>
                ))}

                <TabPanel value="buyer" className="center-page-tab">
                    <BuyerTab control={form.control} />
                </TabPanel>
            </TabContext>
        </Box>
    )
}

////////////////////////////////////////////////////////////
// СТРАНИЦЫ СОДЕРЖИМОЕ
////////////////////////////////////////////////////////////

function TableTab({ table, filial, loading, catalog_map, set_catalog_map }) {
    const columns = useTableColumns(table, filial, catalog_map, set_catalog_map)
    const toolbarProps = TOOLBAR_CONFIG[table.id] ?? EMPTY_TOOLBAR

    return (
        <DataGridPro
            treeData={table.id === 'store'}
            loading={loading}
            rows={table.rows}
            columns={columns}
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            columnGroupingModel={table.column_grouping_model}
            columnVisibilityModel={table.column_visibility_model}
            slots={{ toolbar: TableToolbar }}
            slotProps={{ toolbar: toolbarProps }}
            groupingColDef={{
                width: 100,
                minWidth: 100,
                headerName: '№',
            }}
            density="compact"
            autoHeight
            showToolbar
            checkboxSelection
            editMode="cell"
            sortingMode="server"
            disableColumnSorting
            disableRowSelectionOnClick
            getRowClassName={({ row }) => (row.is_leaf === false ? 'center-horeca-order-ref' : '')}
            getTreeDataPath={(row) => row.path?.split('.') ?? [row.path]}
        />
    )
}

function CommonTab({ control }) {
    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <ControlledTextField control={control} name="number" label="Номер заказа" numeric />
            <ControlledTextField control={control} name="current_number" label="Номер счета" />
        </Box>
    )
}

function BuyerTab({ control }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: 400, overflowY: 'auto' }}>
            {BUYER_FIELDS.map(([name, label]) => (
                <ControlledTextField key={name} control={control} name={name} label={label} />
            ))}
        </Box>
    )
}

////////////////////////////////////////////////////////////
// ПРОЧИЕ
////////////////////////////////////////////////////////////

function Summary({ control }) {
    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <ControlledFieldSwitch control={control} name="deleted" label="Заказ удален" sx={{ flex: 1 }} />
            <ControlledFieldSwitch control={control} name="canceled" label="Заказ отменен" sx={{ flex: 1 }} />
            <ControlledTextField control={control} name="quantity" label="Количество" numeric sx={{ flex: 1 }} />
            <ControlledMoneyField control={control} name="price" label="Цена" sx={{ flex: 1 }} />
            <ControlledMoneyField control={control} name="sum_discount" label="Сумма скидки" sx={{ flex: 1 }} />
            <ControlledMoneyField control={control} name="sum" label="Сумма со скидкой" readOnly sx={{ flex: 1 }} />
        </Box>
    )
}

////////////////////////////////////////////////////////////
// ФУНКЦИОНАЛ
////////////////////////////////////////////////////////////

export function PaymentsRebuild() {}

export function ReturnsRebuild() {}

export function IngredientsRebuild() {}
