import { Box, Tab } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { center_horeca_goods_recipe_get } from '../../../../service/fetch_service.js'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { ruRU } from '@mui/x-data-grid/locales'
import ControlledTextField from '../../../../ui/ControlledTextField.jsx'
import { TableToolbar } from '../../../Common.jsx'
import CachedIcon from '@mui/icons-material/Cached'
import { IngredientsRebuild, PaymentsRebuild, ReturnsRebuild } from '../orders/Order.jsx'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import AsyncAutocomplete from '../../../../ui/AsyncAutocomplete.jsx'
import ControlledDateTimePicker from '../../../../ui/ControlledDateTimePicker.jsx'
import { useTableColumns } from '../../../hooks/useTableColumns.js'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ControlledFieldSwitch from '../../../../ui/ControlledFieldSwitch.jsx'
import Loader from '../../../../ui/Loader.jsx'

////////////////////////////////////////////////////////////
// ДОПОЛНИТЕЛЬНО
////////////////////////////////////////////////////////////

const TOOLBAR_CONFIG = {
    store: { left: [{ label: 'Пересобрать', icon: <CachedIcon />, onClick: IngredientsRebuild }] },
    payments: { left: [{ label: 'Подобрать', icon: <CachedIcon />, onClick: PaymentsRebuild }] },
    returns: { left: [{ label: 'Подобрать', icon: <CachedIcon />, onClick: ReturnsRebuild }] },
}

const EMPTY_TOOLBAR = { left: [], right: [] }

////////////////////////////////////////////////////////////
// СТРУКТУРА ДОКУМЕНТА
////////////////////////////////////////////////////////////

export default function Recipe() {
    const dispatch = useDispatch()
    const form = useForm()

    const filial = useSelector((state) => state.center.root_filial)
    const { goods_recipe_loading, goods_recipe } = useSelector((state) => state.center_horeca)
    const { ref } = useSelector((state) => state.center.params)

    const [catalog_map, set_catalog_map] = useState([])
    const [current_table, set_current_table] = useState('ingredients')

    // Загрузка заказа на клиент
    useEffect(() => {
        const load = async () => {
            const res = await dispatch(center_horeca_goods_recipe_get(filial, ref, 0))
            set_catalog_map(res.data)
        }
        if (filial !== null && ref !== undefined) {
            load()
        }
    }, [dispatch, filial, ref])

    // Загрузка заказа в форму
    useEffect(() => {
        form.reset(structuredClone(goods_recipe))
    }, [form, goods_recipe])

    // Наблюдаемые переменные
    const { fields: filials } = useFieldArray({ control: form.control, name: 'filials' })
    const { fields: organizations } = useFieldArray({ control: form.control, name: 'organizations' })

    if (goods_recipe_loading.loading) return <Loader />

    return (
        <DocView
            form={form}
            obj={goods_recipe}
            filial={filial}
            catalog_map={catalog_map}
            set_catalog_map={set_catalog_map}
            current_table={current_table}
            set_current_table={set_current_table}
            loading={goods_recipe_loading.loading}
            filials={filials}
            organizations={organizations}
        />
    )
}

////////////////////////////////////////////////////////////
// ВИД ДОКУМЕНТА
////////////////////////////////////////////////////////////

function DocView(props) {
    return (
        <Box component="form" className="center-page">
            <TabsSection {...props} />
        </Box>
    )
}

////////////////////////////////////////////////////////////
// СТРУКТУРА СТРАНИЦ
////////////////////////////////////////////////////////////

function TabsSection({
    obj,
    form,
    filial,
    catalog_map,
    set_catalog_map,
    current_table,
    set_current_table,
    loading,
    filials,
    organizations,
}) {
    return (
        <Box sx={{ height: '100%' }}>
            <TabContext value={current_table}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
                    <TabList onChange={(_, v) => set_current_table(v)} variant="scrollable">
                        <Tab value="common" label="Общие" />

                        {obj?.tables.map((t) => (
                            <Tab key={t.id} value={t.id} label={t.title} />
                        ))}
                        <Tab value="filials" label="Филиалы" />
                        <Tab value="organizations" label="Организации" />
                    </TabList>
                </Box>

                <TabPanel value="common" className="center-page-tab">
                    <CommonTab control={form.control} filial={filial} />
                </TabPanel>

                {obj?.tables.map((table) => (
                    <TabPanel key={table.id} value={table.id}>
                        <TableTab
                            className="center-page-tab"
                            table={table}
                            filial={filial}
                            loading={loading}
                            catalog_map={catalog_map}
                            set_catalog_map={set_catalog_map}
                        />
                    </TabPanel>
                ))}

                <TabPanel value="filials" className="center-page-tab">
                    <FilialsTab filials={filials} control={form.control} />
                </TabPanel>

                <TabPanel value="organizations" className="center-page-tab">
                    <OrganizationsTab organizations={organizations} control={form.control} />
                </TabPanel>
            </TabContext>
        </Box>
    )
}

function CommonTab({ control, filial }) {
    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <ControlledTextField control={control} name="code" label="Код 1С" numeric />
            <Controller
                name="uid_good"
                control={control}
                render={({ field }) => (
                    <AsyncAutocomplete
                        value={field.value}
                        onChange={field.onChange}
                        filial={filial}
                        type="goods"
                        label="Блюдо"
                        variant="filled"
                        sx={{ flex: 3 }}
                    />
                )}
            />
            <ControlledTextField control={control} name="out_good" label="Выход блюда" sx={{ flex: 1 }} />
            <ControlledDateTimePicker
                control={control}
                name="period"
                label="Применять от"
                rules={{ required: 'Укажите дату применения' }}
                sx={{ flex: 1 }}
            />
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
        <Box sx={{ overflowY: 'auto' }}>
            <DataGridPro
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
                getRowClassName={({ row }) => (row.is_leaf === false ? 'center-horeca-recipe-ref' : '')}
                getTreeDataPath={(row) => (row.path ? row.path.split('.') : [row.path])}
            />
        </Box>
    )
}

////////////////////////////////////////////////////////////
// ПРОЧИЕ
////////////////////////////////////////////////////////////

function FilialsTab({ control, filials }) {
    return (
        <Box
            sx={{
                height: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
            }}
        >
            {filials.map((filial, index) => (
                <ControlledFieldSwitch key={index} control={control} name={`filials.${index}.value`} label={filial.name_filial} />
            ))}
        </Box>
    )
}

function OrganizationsTab({ control, organizations }) {
    return (
        <Box
            sx={{
                height: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
            }}
        >
            {organizations.map((organization, index) => (
                <ControlledFieldSwitch
                    key={index}
                    control={control}
                    name={`organizations.${index}.value`}
                    label={organization.name_organization}
                />
            ))}
        </Box>
    )
}

////////////////////////////////////////////////////////////
// ФУНКЦИОНАЛ
////////////////////////////////////////////////////////////
