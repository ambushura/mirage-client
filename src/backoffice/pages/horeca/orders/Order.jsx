import {center_horeca_order_get} from "../../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {useDocument} from "../../../hooks/useDocument.js"
import {Box, Tab} from "@mui/material"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import {sxTable} from "../../../../ui/ThemeContext.jsx"
import {useState} from "react"
import {TabContext, TabList, TabPanel} from "@mui/lab"
import {Footer, LoaderOrder, TableToolbar, Title} from "../../../Common.jsx"
import {v4} from "uuid"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"
import ControlledFieldSwitch from "../../../../ui/ControlledFieldSwitch.jsx";
import ControlledMoneyField from "../../../../ui/ControlledMoneyField.jsx";

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
        },

        // Табличные части
        [{
            id: 'sale',
            label: 'Товары',
            data: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []}
        }, {
            id: 'store',
            label: 'Производство',
            data: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []}
        }],

        // Функция загрузки
        load)

    // Реквизиты формы
    const number = watch('number')

    // Табличные части
    const [currentTable, setCurrentTable] = useState('sale')

    if (loading) {
        return <LoaderOrder/>
    } else {
        return <Box
            id="modal-order"
            component="form"
            noValidate
            autoComplete="off">

            {/* Заголовок */}
            <Title title={`Заказ ${number}`}/>

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
                                name={'current_number'}
                                label={'Номер счета'}
                                sx={{mr: 2}}
                            />
                            <ControlledFieldSwitch
                                name={'canceled'}
                                label={'Отменен'}
                                control={control}
                            />
                            <ControlledMoneyField
                                control={control}
                                name="price"
                                label="Цена"
                            />
                            <ControlledMoneyField
                                control={control}
                                name="sum_discount"
                                label="Сумма скидки"
                            />
                            <ControlledMoneyField
                                control={control}
                                name="sum"
                                label="Сумма со скидкой"
                                readOnly={true}
                            />
                        </Box>
                    </TabPanel>
                    {tables.map(table => {
                        const data = table.data
                        return <TabPanel value={table.id} key={table.id}>
                            <Box sx={{maxHeight: 400, overflowY: 'auto'}}>
                                <DataGridPro
                                    treeData
                                    loading={loading}
                                    showToolbar
                                    slots={{toolbar: TableToolbar}}
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