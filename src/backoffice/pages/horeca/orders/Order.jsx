import {useCallback, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {v4} from "uuid"
import {Box, Tab} from "@mui/material"
import {TabContext, TabList, TabPanel} from "@mui/lab"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import CachedIcon from "@mui/icons-material/Cached"
import {center_horeca_order_get} from "../../../../service/fetch_service.js"
import {useDocument} from "../../../hooks/useDocument.js"
import {sxTable} from "../../../../ui/ThemeContext.jsx"
import {EnhanceColumn, Footer, LoaderOrder, TableToolbar, Title} from "../../../Common.jsx"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"
import ControlledFieldSwitch from "../../../../ui/ControlledFieldSwitch.jsx"
import ControlledMoneyField from "../../../../ui/ControlledMoneyField.jsx"

// Таблицы документа
const defaultTables = [{id: "sales", label: "Товары"}, {id: "payments", label: "Оплаты"}, {
    id: "returns", label: "Возвраты"
}, {id: "kitchen", label: "Кухня"}, {id: "mark", label: "Маркировка"}, {id: "egais", label: "ЕГАИС"}, {
    id: "store", label: "Производство"
}].map(item => ({
    ...item, data: {
        rows: [], columns: [], column_grouping_model: [], column_visibility_model: []
    }
}))

// Шапка документа
const defaultValues = {
    buyer_uid: null,
    buyer_card_number: null,
    buyer_phone_number: null,
    buyer_email: null,
    buyer_n: null,
    buyer_o: null,
    buyer_s: null,

    uid: v4(),
    number: "",
    date_create: null,
    date_change: null,
    uid_creator: null,
    name_creator: null,
    date_shift: null,

    current_number: 0,

    canceled: false,
    deleted: false,

    price: 0,
    quantity: 0,
    sum_discount: 0,
    sum: 0,

    ver: ""
}

// Дополнительные поля
const buyerFields = [["buyer_email", "Email"], ["buyer_phone_number", "Номер телефона"], ["buyer_card_number", "Номер карты"], ["buyer_s", "Фамилия"], ["buyer_n", "Имя"], ["buyer_o", "Отчество"]]

// Документ
export default function Order({props}) {

    // Технические функции
    const dispatch = useDispatch()

    // Филиал
    const {filial} = useSelector(state => state.center)

    // Словарь для значений
    const [catalogMap, setCatalogMap] = useState([])

    // Таблица по умолчанию
    const [currentTable, setCurrentTable] = useState("sales")

    // Функция загрузки документа
    const load = useCallback(() => {
        return dispatch(center_horeca_order_get(filial, props.uid, 0))
    }, [dispatch, filial, props.uid])

    // Движок
    const {
        loading, control, tables
    } = useDocument(props.uid, defaultValues, defaultTables, load, setCatalogMap)

    if (loading) {
        return <LoaderOrder/>
    }

    return <Box
        id="modal-order"
        component="form"
        noValidate
        autoComplete="off"
        sx={{maxWidth: 960, minWidth: 960}}>

        <Title title="Заказ HORECA"/>

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
                            <Tab value="buyer" label="Покупатель"/>
                        </TabList>
                    </Box>

                    <TabPanel value="common">
                        <CommonTab control={control}/>
                    </TabPanel>

                    {tables.map(table => <TabPanel
                        key={table.id}
                        value={table.id}>
                        <TableTab
                            table={table}
                            filial={filial}
                            loading={loading}
                            catalogMap={catalogMap}
                            setCatalogMap={setCatalogMap}/>
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