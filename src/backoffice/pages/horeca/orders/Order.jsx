import {center_horeca_order_get} from "../../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {useDocument} from "../../../hooks/useDocument.js"
import {Box, Button, Tab} from "@mui/material"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import {sxTable} from "../../../../ui/ThemeContext.jsx"
import {useState} from "react"
import {TabContext, TabList, TabPanel} from "@mui/lab"
import {Footer, LoaderOrder, Title} from "../../../Common.jsx"
import {v4} from "uuid"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"
import ControlledFieldSwitch from "../../../../ui/ControlledFieldSwitch.jsx"
import ControlledMoneyField from "../../../../ui/ControlledMoneyField.jsx"
import CachedIcon from '@mui/icons-material/Cached'

const Order = ({props}) => {

    // Служебные функции
    const dispatch = useDispatch()

    // Источники запросов
    const {filial} = useSelector(state => state.center)

    // Загрузка документа
    const load = async () => {
        return dispatch(center_horeca_order_get(filial, props.uid, 0))
    }

    // Форма документа
    const {loading, control, watch, reset, tables} = useDocument(props.uid,

        // Документ
        {
            // Покупатель
            buyer_uid: null,
            buyer_card_number: null,
            buyer_phone_number: null,
            buyer_email: null,
            buyer_n: null,
            buyer_o: null,
            buyer_s: null,

            // Общие
            uid: v4(),
            number: '',
            date_create: null,
            date_change: null,
            uid_creator: null,
            name_creator: null,
            date_shift: null,

            // Дополнительные
            current_number: 0,

            // Технические
            canceled: false,
            deleted: false,

            // Суммовые
            price: 0,
            quantity: 0,
            sum_discount: 0,
            sum: 0,

            // Технические
            ver: ''
        },

        // Табличные части
        [{
            id: 'sales',
            label: 'Товары',
            data: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []}
        }, {
            id: 'payments',
            label: 'Оплаты',
            data: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []}
        }, {
            id: 'returns',
            label: 'Возвраты',
            data: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []}
        }, {
            id: 'kitchen',
            label: 'Кухня',
            data: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []}
        }, {
            id: 'mark',
            label: 'Маркировка',
            data: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []}
        }, {
            id: 'egais',
            label: 'ЕГАИС',
            data: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []}
        }, {
            id: 'store',
            label: 'Производство',
            data: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []}
        }],

        // Функция загрузки
        load)

    // Реквизиты формы

    // Табличные части
    const [currentTable, setCurrentTable] = useState('sales')

    if (loading) {
        return <LoaderOrder/>
    } else {
        return <Box
            id="modal-order"
            component="form"
            noValidate
            autoComplete="off"
            sx={{maxWidth: '960px'}}>

            {/* Заголовок */}
            <Title title={'Заказ (horeca)'}/>

            {/* Табличные части */}
            <Box sx={{width: '100%', mb: '10px', minHeight: 450, maxHeight: 450}}>
                <TabContext value={currentTable} sx={{overflowY: 'auto'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList variant='scrollable' onChange={(e, v) => {
                            setCurrentTable(v)
                        }}>
                            <Tab value={'common'} label={'Общие'}></Tab>
                            {tables.map(table => <Tab key={table.id} value={table.id} label={table.label}/>)}
                            <Tab value={'buyer'} label={'Покупатель'}></Tab>
                        </TabList>
                    </Box>
                    <TabPanel value={'common'}>
                        <Box sx={{maxHeight: 400, overflowY: 'auto', p: '10px 0'}}>
                            <ControlledTextField
                                control={control}
                                name="number"
                                label="Номер счета"
                                sx={{flex: 1, mr: '10px'}}
                                numeric
                            />
                            <ControlledTextField
                                control={control}
                                name={'current_number'}
                                label={'Номер счета'}
                                sx={{mr: 2}}
                            />
                            <ControlledFieldSwitch
                                name={'canceled'}
                                label={'Отменен'}
                                control={control}
                            />
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <ControlledTextField
                                    control={control}
                                    name="quantity"
                                    label="Количество"
                                    sx={{flex: 1, mr: '10px'}}
                                    numeric
                                />
                                <ControlledMoneyField
                                    control={control}
                                    name="price"
                                    label="Цена"
                                    sx={{flex: 1, mr: '10px'}}
                                />
                                <ControlledMoneyField
                                    control={control}
                                    name="sum_discount"
                                    label="Сумма скидки"
                                    sx={{flex: 1, mr: '10px'}}
                                />
                                <ControlledMoneyField
                                    control={control}
                                    name="sum"
                                    label="Сумма со скидкой"
                                    readOnly={true}
                                    sx={{flex: 1, mr: '10px'}}
                                />
                            </Box>
                        </Box>
                    </TabPanel>
                    {tables.map(table => {
                        const data = table.data
                        return <TabPanel value={table.id} key={table.id}>
                            <Box sx={{maxHeight: 400, overflowY: 'auto'}}>
                                <DataGridPro
                                    treeData={table.id === 'store'}
                                    loading={loading}
                                    showToolbar
                                    slots={{
                                        toolbar: TableToolbar
                                    }}
                                    autoHeight
                                    key={table.id}
                                    sortingMode="server"
                                    disableColumnSorting
                                    editMode='cell'
                                    checkboxSelection
                                    rows={data.rows}
                                    columns={data.columns}
                                    columnGroupingModel={data.column_grouping_model}
                                    columnVisibilityModel={data.column_visibility_model}
                                    density="compact"
                                    disableRowSelectionOnClick
                                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                                    groupingColDef={{width: 100, minWidth: 100, headerName: "№"}}
                                    sx={{...sxTable, mb: '10px'}}
                                    getRowClassName={(params) => params.row.is_leaf === false ? 'center-horeca-order-ref' : ''}
                                    getTreeDataPath={(row) => {
                                        return row.path ? row.path.split(".") : [row.path]
                                    }}
                                    slotProps={{
                                        toolbar: getToolbarProps(table.id)
                                    }}
                                />
                            </Box>
                        </TabPanel>
                    })}
                    <TabPanel value={'buyer'}>
                        <Box className='center-scroll' sx={{
                            display: 'flex', flexDirection: 'column', maxHeight: 400, overflowY: 'auto', p: '10px 0'
                        }}>
                            {[['buyer_email', 'Email'], ['buyer_phone_number', 'Номер телефона'], ['buyer_card_number', 'Номер карты'], ['buyer_s', 'Фамилия'], ['buyer_n', 'Имя'], ['buyer_o', 'Отчество', ['buyer_uid', 'UID']]].map((el, i) =>
                                <ControlledTextField
                                    key={i}
                                    control={control}
                                    name={el[0]}
                                    label={el[1]}
                                    sx={{mr: 1}}
                                />)}
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>

            {/* Подвал */}
            <Footer
                control={control}
                saveButton
                deleteButton/>

        </Box>
    }
}

export default Order

// Табличные части
export function TableToolbar({left = [], right = []}) {
    return <Box className='center-toolbar'>
        <Box>
            {left.map((btn, i) => <Button
                key={i}
                onClick={btn.onClick}
                variant={btn.variant || 'tb_add'}
                size="small"
                startIcon={btn.icon}
                sx={{mr: 1}}>
                {btn.label}
            </Button>)}
        </Box>
        <Box>
            {right.map((btn, i) => <Button
                key={i}
                onClick={btn.onClick}
                variant={btn.variant || 'tb_delete'}
                size="small"
                startIcon={btn.icon}
                sx={{ml: 1}}>
                {btn.label}
            </Button>)}
        </Box>
    </Box>
}

export function PaymentsRebuild() {

}

export function ReturnsRebuild() {

}

export function IngredientsRebuild() {

}

const getToolbarProps = (id) => {
    switch (id) {
        case 'store':
            return {
                left: [{
                    label: 'Пересобрать', icon: <CachedIcon/>, onClick: IngredientsRebuild
                }]
            }
        case 'payments':
            return {
                left: [{
                    label: 'Подобрать', icon: <CachedIcon/>, onClick: PaymentsRebuild
                }], right: []
            }
        case 'returns':
            return {
                left: [{
                    label: 'Подобрать', icon: <CachedIcon/>, onClick: ReturnsRebuild
                }], right: []
            }
        default:
            return {left: [], right: []}
    }
}