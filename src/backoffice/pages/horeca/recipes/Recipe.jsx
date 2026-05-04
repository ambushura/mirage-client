import {Box, Tab} from "@mui/material"
import {useCallback, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {center_horeca_goods_recipe_get} from "../../../../service/fetch_service.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import {sxTable} from "../../../../ui/ThemeContext.jsx"
import {v4} from "uuid"
import {TabContext, TabList, TabPanel} from "@mui/lab"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"
import {EnhanceColumn, Footer, LoaderOrder, TableToolbar} from "../../../Common.jsx"
import CachedIcon from "@mui/icons-material/Cached"
import {IngredientsRebuild, PaymentsRebuild, ReturnsRebuild} from "../orders/Order.jsx"
import {Controller, useFieldArray} from "react-hook-form"
import AsyncAutocomplete from "../../../../ui/AsyncAutocomplete.jsx"
import ControlledDateTimePicker from "../../../../ui/ControlledDateTimePicker.jsx"
import ControlledFieldSwitch from "../../../../ui/ControlledFieldSwitch.jsx"

// Таблицы документа
const defaultTables = [{id: "ingredients", label: "Рецепт"}].map(item => ({
    ...item, data: {
        rows: [], columns: [], column_grouping_model: [], column_visibility_model: []
    }
}))

// Шапка документа
const defaultValues = {
    ref: v4(), ver: null, code: 'Новый', deleted: false, date_create: null, date_change: null,

    period: null,

    uid_good: null, name_good: '', out_good: '',

    design: '', cooking_method: '', comment: '',

    filials: [], organizations: []
}

export default function Recipe({props}) {


    // Технические функции
    const dispatch = useDispatch()

    // Филиал
    const {root_filial} = useSelector(state => state.center)

    // Словарь для значений
    const [catalogMap, setCatalogMap] = useState([])

    // Таблица по умолчанию
    const [currentTable, setCurrentTable] = useState("ingredients")

    // Функция загрузки документа
    const load = useCallback(() => {
        return dispatch(center_horeca_goods_recipe_get(root_filial, props.ref, 0))
    }, [dispatch, root_filial, props.ref])

    // Движок
    const {
        loading, control, tables
    } = useDocument(root_filial, props.ref, defaultValues, defaultTables, load, setCatalogMap)

    // Наблюдаемые переменные
    const {fields: filials} = useFieldArray({control, name: "filials"})
    const {fields: organizations} = useFieldArray({control, name: "organizations"})

    if (loading) {
        return <LoaderOrder/>
    } else {

        return <Box
            id="modal-recipe"
            component="form"
            noValidate
            autoComplete="off"
            sx={{maxWidth: 960, minWidth: 960}}>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    mb: "10px",
                    minHeight: 450,
                    maxHeight: 450
                }}>
                <Box>

                    <TabContext value={currentTable}>
                        <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                            <TabList
                                variant="scrollable"
                                onChange={(_, value) => setCurrentTable(value)}>
                                <Tab value="common" label="Общие"/>
                                {tables.map(table => <Tab
                                    key={table.id}
                                    value={table.id}
                                    label={table.label}/>)}
                                <Tab value="filials" label="Филиалы"/>
                                <Tab value="organizations" label="Организации"/>
                                <Tab value="advanced" label="Дополнительно"/>
                            </TabList>
                        </Box>

                        <TabPanel value="common">
                            <CommonTab control={control} filial={root_filial}/>
                        </TabPanel>

                        {tables.map(table => <TabPanel
                            key={table.id}
                            value={table.id}>
                            <TableTab
                                table={table}
                                filial={root_filial}
                                loading={loading}
                                catalogMap={catalogMap}
                                setCatalogMap={setCatalogMap}/>
                        </TabPanel>)}


                        <TabPanel value='filials'>
                            <Box className='checkbox-list'>
                                {filials.map((f, index) => <ControlledFieldSwitch
                                    key={f.uid_filial}
                                    name={`filials.${index}.value`}
                                    label={f.name_filial}
                                    control={control}
                                />)}
                            </Box>
                        </TabPanel>

                        <TabPanel value='organizations'>
                            <Box className='checkbox-list'>
                                {organizations.map((o, index) => <ControlledFieldSwitch
                                    key={o.inn}
                                    name={`organizations.${index}.value`}
                                    label={o.name_organization}
                                    control={control}
                                />)}
                            </Box>
                        </TabPanel>

                        <TabPanel value='advanced'>
                            <Box className='checkbox-list'>
                                {[{f: 'comment', n: 'Комментарий'}, {
                                    f: 'cooking_method', n: 'Способ приготовления'
                                }, {f: 'design', n: 'Оформление блюда'}].map((el, i) => <ControlledTextField
                                    key={i}
                                    control={control}
                                    name={el.f}
                                    label={el.n}
                                    multiline
                                    sx={{width: '100%'}}
                                />)}
                            </Box>
                        </TabPanel>

                    </TabContext>

                </Box>

            </Box>

            <Footer
                control={control}
                creator={false}
                saveButton
                deleteButton/>

        </Box>
    }
}

function TableTab({table, filial, loading, catalogMap, setCatalogMap}) {
    const data = table.data
    const columns = useMemo(() => data.columns.map(column => EnhanceColumn(filial, column, catalogMap, setCatalogMap)), [data.columns, filial, catalogMap, setCatalogMap])
    const toolbarProps = useMemo(() => getToolbarProps(table.id), [table.id])
    return <Box sx={{maxHeight: 400, overflowY: "auto"}}>
        <DataGridPro
            treeData={table.id === "store"}
            loading={loading}
            showToolbar
            autoHeight
            editMode="cell"
            checkboxSelection
            disableColumnSorting
            disableRowSelectionOnClick
            sortingMode="server"
            density="compact"
            rows={data.rows}
            columns={columns}
            columnGroupingModel={data.column_grouping_model}
            columnVisibilityModel={data.column_visibility_model}
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            getRowClassName={params => params.row.is_leaf === false ? "center-horeca-order-ref" : ""}
            getTreeDataPath={row => row.path ? row.path.split(".") : [row.path]}
            slots={{
                toolbar: TableToolbar
            }}
            slotProps={{
                toolbar: toolbarProps
            }}
            sx={{
                ...sxTable, mb: "10px"
            }}
            groupingColDef={{
                width: 100, minWidth: 100, headerName: "№"
            }}
        />
    </Box>
}

function CommonTab({control, filial}) {
    return <Box sx={{display: "flex", gap: 1, p: "10px 0"}}>
        <ControlledTextField
            control={control}
            name="code"
            label="Код 1С"
            numeric/>
        <Controller
            name="uid_good"
            control={control}
            render={({field}) => <AsyncAutocomplete
                value={field.value}
                onChange={field.onChange}
                filial={filial}
                type='goods'
                label='Блюдо'
                variant='filled'
                sx={{flex: 3, mr: '10px'}}
            />}
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
}

function getToolbarProps(id) {
    switch (id) {
        case "store":
            return {
                left: [{
                    label: "Пересобрать", icon: <CachedIcon/>, onClick: IngredientsRebuild
                }], right: []
            }

        case "payments":
            return {
                left: [{
                    label: "Подобрать", icon: <CachedIcon/>, onClick: PaymentsRebuild
                }], right: []
            }

        case "returns":
            return {
                left: [{
                    label: "Подобрать", icon: <CachedIcon/>, onClick: ReturnsRebuild
                }], right: []
            }

        default:
            return {
                left: [], right: []
            }
    }
}