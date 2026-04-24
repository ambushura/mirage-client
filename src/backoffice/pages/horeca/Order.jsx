import {center_horeca_order_get} from "../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {useDocument} from "../../hooks/useDocument.js"
import {Box, Tab} from "@mui/material"
import ControlledDateTimePicker from "../../../ui/ControlledDateTimePicker.jsx"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import {sxTable} from "../../../ui/ThemeContext.jsx"
import {useState} from "react"
import {TabContext, TabList, TabPanel} from "@mui/lab"
import {Footer, Title} from "../../Common.jsx"

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
    const {loading, control, watch, reset, tables, footer} = useDocument(props.uid,

        // Документ
        {number: '', date_create: null, date_update: null},

        // Табличные части
        [{
            id: 'items',
            label: 'Товары',
            data: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []}
        }],

        // Функция загрузки
        load)

    // Реквизиты формы
    const number = watch('number')

    // Табличные части
    const [currentTable, setCurrentTable] = useState('items')

    return <Box
        id="modal-order"
        component="form"
        noValidate
        autoComplete="off">

        {/* Заголовок */}
        <Title title={`Заказ ${number}`}/>

        {/* Шапка */}

        {/* Табличные части */}
        <Box sx={{width: '100%', mb: '10px', minHeight: 450, maxHeight: 450}}>
            <TabContext value={currentTable} sx={{overflowY: 'auto'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList variant='scrollable' onChange={(e, v) => {
                        setCurrentTable(v)
                    }}>
                        {tables.map(table => <Tab key={table.id} value={table.id} label={table.label}/>)}
                    </TabList>
                </Box>
                {tables.map(table => {
                    const data = table.data
                    return <TabPanel value={table.id} key={table.id}>
                        <Box sx={{maxHeight: 400, overflowY: 'auto'}}>
                            <DataGridPro
                                key={table.id}
                                sortingMode="server"
                                disableColumnSorting
                                editMode='cell'
                                checkboxSelection
                                rows={data.rows}
                                columns={data.columns}
                                columnGroupingModel={data.column_grouping_model}
                                columnVisibilityModel={data.column_visibility_model}
                                treeData
                                getRowClassName={(params) => params.row.is_leaf === false ? 'center-horeca-order-ref' : ''}
                                getTreeDataPath={(row) => {
                                    return row.path ? row.path.split(".") : [row.path]
                                }}
                                density="compact"
                                hideFooter
                                disableRowSelectionOnClick
                                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                                groupingColDef={{width: 100, minWidth: 100, headerName: "№"}}
                                sx={{...sxTable, mb: '10px'}}
                            />
                        </Box>
                    </TabPanel>
                })}
            </TabContext>
        </Box>

        {/* Подвал */}
        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex'}}>
                {[{f: 'date_create', n: 'Создан'}, {f: 'date_change', n: 'Изменен'}].map((el, i) =>
                    <ControlledDateTimePicker
                        key={i}
                        readOnly={true}
                        control={control}
                        name={el.f}
                        label={el.n}
                        rules={{required: 'Укажите дату создания'}}
                        sx={{width: '190px', mr: '10px'}}
                    />)}
            </Box>
            <Footer/>
        </Box>

    </Box>
}

export default Order