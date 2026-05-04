import {useEffect, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Box, Tab} from "@mui/material"
import {TabContext, TabList, TabPanel} from "@mui/lab"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import CachedIcon from "@mui/icons-material/Cached"
import {sxTable} from "../../../../ui/ThemeContext.jsx"
import {EnhanceColumn, Footer, LoaderOrder, TableToolbar} from "../../../Common.jsx"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"
import ControlledFieldSwitch from "../../../../ui/ControlledFieldSwitch.jsx"
import ControlledMoneyField from "../../../../ui/ControlledMoneyField.jsx"
import {useForm} from "react-hook-form"
import {center_catalog_load, center_horeca_order_get} from "../../../../service/fetch_service.js"
import {fillNameMap, transformData} from "../../../../ui/hooks/common_functions.js"

export default function Order() {

    // Технические функции
    const dispatch = useDispatch()

    // Филиал
    const {filial} = useSelector(state => state.center)

    // Данные из стора
    const {order_horeca_loading, order_horeca} = useSelector(state => state.center_horeca)

    // Словарь для значений
    const [catalog_map, set_catalog_map] = useState([])

    // Таблица по умолчанию
    const [currentTable, setCurrentTable] = useState("sales")

    // Форма
    const {handleSubmit, setValue, control, reset, watch} = useForm()

    const uid_order = useSelector(state => state.center.params.uid_order)

    // Загрузка данных с сервера
    useEffect(() => {
        if (uid_order === undefined) return
        dispatch(center_horeca_order_get(filial, uid_order, 0))
    }, [dispatch, filial, uid_order])

    // Заполнение карты наименований
    useEffect(() => {
        transformData(order_horeca)
        const loadMap = async () => {
            const ids = fillNameMap(order_horeca.tables)
            if (ids.length === 0) return
            const res = await dispatch(center_catalog_load(filial, ids))
            set_catalog_map(prev_state => [...prev_state, ...res.data])
        }
        loadMap()
    }, [dispatch, filial, order_horeca])

    // Загрузка данных в форму
    useEffect(() => {
        if (order_horeca) {
            reset(structuredClone(order_horeca))
        }
    }, [order_horeca, reset])

    if (order_horeca_loading.loading) {
        return <LoaderOrder/>
    }

    return <Box
        component="form"
        noValidate
        autoComplete="off">

        <Box
            sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", mb: "10px"}}>

            <Box>

                <TabContext value={currentTable}>
                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                        <TabList
                            variant="scrollable"
                            onChange={(_, value) => setCurrentTable(value)}>
                            <Tab value="common" label="Общие"/>
                            {order_horeca.tables.map(table => <Tab
                                key={table.id}
                                value={table.id}
                                label={table.title}/>)}
                            <Tab value="buyer" label="Покупатель"/>
                        </TabList>
                    </Box>

                    <TabPanel value="common">
                        <CommonTab control={control}/>
                    </TabPanel>

                    {order_horeca.tables.map(table => <TabPanel
                        key={table.id}
                        value={table.id}>
                        <TableTab
                            table={table}
                            filial={filial}
                            loading={order_horeca_loading.loading}
                            catalogMap={catalog_map}
                            setCatalogMap={set_catalog_map}/>
                    </TabPanel>)}

                    <TabPanel value="buyer">
                        <BuyerTab control={control}/>
                    </TabPanel>

                </TabContext>

            </Box>

            <Summary control={control}/>

        </Box>

        <Footer
            control={control}
            creator={true}
            saveButton
            deleteButton/>

    </Box>
}

function CommonTab({control}) {
    return <Box sx={{display: "flex", gap: 1, p: "10px 0"}}>
        <ControlledTextField
            control={control}
            name="number"
            label="Номер заказа"
            numeric/>
        <ControlledTextField
            control={control}
            name="current_number"
            label="Номер счета"/>
    </Box>
}

function BuyerTab({control}) {
    const buyerFields = [["buyer_email", "Email"], ["buyer_phone_number", "Номер телефона"], ["buyer_card_number", "Номер карты"], ["buyer_s", "Фамилия"], ["buyer_n", "Имя"], ["buyer_o", "Отчество"]]
    return <Box
        className="center-scroll"
        sx={{display: "flex", flexDirection: "column", gap: 1, maxHeight: 400, overflowY: "auto", p: "10px 0"}}>
        {buyerFields.map(([name, label]) => <ControlledTextField
            key={name}
            control={control}
            name={name}
            label={label}
        />)}
    </Box>
}

function TableTab({table, filial, loading, catalogMap, setCatalogMap}) {
    const columns = useMemo(() => table.columns.map(column => EnhanceColumn(filial, column, catalogMap, setCatalogMap)), [table.columns, filial, catalogMap, setCatalogMap])
    const toolbarProps = useMemo(() => getToolbarProps(table.id), [table.id])
    return <Box sx={{overflowY: "auto"}}>
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
            rows={table.rows}
            columns={columns}
            columnGroupingModel={table.column_grouping_model}
            columnVisibilityModel={table.column_visibility_model}
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

function Summary({control}) {
    return <Box sx={{display: "flex", gap: 1}}>
        <ControlledFieldSwitch
            control={control}
            name="deleted"
            label="Заказ удален"
            sx={{flex: 1}}/>

        <ControlledFieldSwitch
            control={control}
            name="canceled"
            label="Заказ отменен"
            sx={{flex: 1}}/>

        <ControlledTextField
            control={control}
            name="quantity"
            label="Количество"
            numeric
            sx={{flex: 1}}/>

        <ControlledMoneyField
            control={control}
            name="price"
            label="Цена"
            sx={{flex: 1}}/>

        <ControlledMoneyField
            control={control}
            name="sum_discount"
            label="Сумма скидки"
            sx={{flex: 1}}/>

        <ControlledMoneyField
            control={control}
            name="sum"
            label="Сумма со скидкой"
            readOnly
            sx={{flex: 1}}/>
    </Box>
}

export function PaymentsRebuild() {
}

export function ReturnsRebuild() {
}

export function IngredientsRebuild() {
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