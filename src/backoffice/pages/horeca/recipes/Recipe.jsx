import {Box, Tab} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  center_catalog_load,
  center_horeca_goods_recipe_get,
} from '../../../../service/fetch_service.js'
import {DataGridPro} from '@mui/x-data-grid-pro'
import {ruRU} from '@mui/x-data-grid/locales'
import ControlledTextField from '../../../../ui/ControlledTextField.jsx'
import {FillNameMap, LoaderOrder, TableToolbar} from '../../../Common.jsx'
import CachedIcon from '@mui/icons-material/Cached'
import {IngredientsRebuild, PaymentsRebuild, ReturnsRebuild} from '../orders/Order.jsx'
import {Controller, useForm} from 'react-hook-form'
import AsyncAutocomplete from '../../../../ui/AsyncAutocomplete.jsx'
import ControlledDateTimePicker from '../../../../ui/ControlledDateTimePicker.jsx'
import {useTableColumns} from '../../../hooks/useTableColumns.js'
import {TabContext, TabList, TabPanel} from '@mui/lab'

////////////////////////////////////////////////////////////
// КОНФИГ
////////////////////////////////////////////////////////////

const TOOLBAR_CONFIG = {
  store: {left: [{label: 'Пересобрать', icon: <CachedIcon/>, onClick: IngredientsRebuild}]},
  payments: {left: [{label: 'Подобрать', icon: <CachedIcon/>, onClick: PaymentsRebuild}]},
  returns: {left: [{label: 'Подобрать', icon: <CachedIcon/>, onClick: ReturnsRebuild}]},
}

const EMPTY_TOOLBAR = {left: [], right: []}

////////////////////////////////////////////////////////////
// СТРУКТУРА
////////////////////////////////////////////////////////////

export default function Recipe() {
  const dispatch = useDispatch()
  const form = useForm()

  const filial = useSelector((state) => state.center.root_filial)
  const {goods_recipe_loading, goods_recipe} = useSelector((state) => state.center_horeca)
  const {ref} = useSelector((state) => state.center.params)

  const [catalog_map, set_catalog_map] = useState([])
  const [current_table, set_current_table] = useState('ingredients')

  // загрузка заказа на клиент
  useEffect(() => {
    if (filial === null || ref === undefined) return
    dispatch(center_horeca_goods_recipe_get(filial, ref, 0))
  }, [dispatch, filial, ref])

  // загрузка заказа в форму
  useEffect(() => {
    form.reset(structuredClone(goods_recipe))
  }, [form, goods_recipe])

  // загрузка справочников
  useEffect(() => {
    const ids = FillNameMap(goods_recipe.tables)
    if (!ids.length) return
    dispatch(center_catalog_load(filial, ids)).then((res) => {
      set_catalog_map((prev) => {
        const map = new Map(prev.map((i) => [i.uid, i]))
        res.data.forEach((i) => map.set(i.uid, i))
        return Array.from(map.values())
      })
    })
  }, [dispatch, filial, goods_recipe])

  // Наблюдаемые переменные
  //const {fields: filials} = useFieldArray({control, name: "filials"})
  //const {fields: organizations} = useFieldArray({control, name: "organizations"})

  if (goods_recipe_loading.loading) return <LoaderOrder/>

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
// ТАБЫ
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
                     }) {
  return (
      <Box>
        <TabContext value={current_table}>
          <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 1}}>
            <TabList onChange={(_, v) => set_current_table(v)} variant="scrollable">
              <Tab value="common" label="Общие"/>

              {obj?.tables.map((t) => (
                  <Tab key={t.id} value={t.id} label={t.title}/>
              ))}
            </TabList>
          </Box>

          <TabPanel value="common">
            <CommonTab control={form.control} filial={filial}/>
          </TabPanel>

          {obj?.tables.map((table) => (
              <TabPanel key={table.id} value={table.id}>
                <TableTab
                    table={table}
                    filial={filial}
                    loading={loading}
                    catalog_map={catalog_map}
                    set_catalog_map={set_catalog_map}
                />
              </TabPanel>
          ))}
        </TabContext>
    </Box>
  )
}

function CommonTab({control, filial}) {
  return (
      <Box sx={{display: 'flex', gap: 1, p: '10px 0'}}>
        <ControlledTextField control={control} name="code" label="Код 1С" numeric/>
        <Controller
            name="uid_good"
            control={control}
            render={({field}) => (
                <AsyncAutocomplete
                    value={field.value}
                    onChange={field.onChange}
                    filial={filial}
                    type="goods"
                    label="Блюдо"
                    variant="filled"
                    sx={{flex: 3, mr: '10px'}}
                />
            )}
        />
        <ControlledTextField
            control={control}
            name="out_good"
            label="Выход блюда"
            sx={{flex: 1, mr: '10px'}}
        />
        <ControlledDateTimePicker
            control={control}
            name="period"
            label="Применять от"
            rules={{required: 'Укажите дату применения'}}
            sx={{flex: 1}}
        />
    </Box>
  )
}

////////////////////////////////////////////////////////////
// ТАБЛИЧНЫЕ ЧАСТИ
////////////////////////////////////////////////////////////
function TableTab({table, filial, loading, catalog_map, set_catalog_map}) {
  const columns = useTableColumns(table, filial, catalog_map, set_catalog_map)
  const toolbarProps = TOOLBAR_CONFIG[table.id] ?? EMPTY_TOOLBAR

  return (
      <Box sx={{overflowY: 'auto'}}>
        <DataGridPro
            loading={loading}
            showToolbar
            autoHeight
            editMode="cell"
            checkboxSelection
            disableColumnSorting
            disableRowSelectionOnClick
            sortingMode="server"
            density="compact"
            rows={table.rows}
            columns={columns}
            columnGroupingModel={table.column_grouping_model}
            columnVisibilityModel={table.column_visibility_model}
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            getRowClassName={(params) =>
                params.row.is_leaf === false ? 'center-horeca-recipe-ref' : ''
            }
            getTreeDataPath={(row) => (row.path ? row.path.split('.') : [row.path])}
            slots={{toolbar: TableToolbar}}
            slotProps={{toolbar: toolbarProps}}
            groupingColDef={{width: 100, minWidth: 100, headerName: '№'}}
        />
    </Box>
  )
}

////////////////////////////////////////////////////////////
// СТРАНИЦЫ
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// ФУНКЦИОНАЛ
////////////////////////////////////////////////////////////
