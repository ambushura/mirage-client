import {ruRU} from "@mui/x-data-grid/locales"
import {useEffect, useState} from "react"
import {common_documents_receipts_get, common_documents_zbooks_get} from "../../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {cleanReceipts, cleanZBooks, setReceipts, setZBooks} from "../../../../redux/documentsReducer.js"
import {Box} from "@mui/material"
import dayjs from "dayjs"
import CakeIcon from '@mui/icons-material/Cake'
import {DataGridPro} from "@mui/x-data-grid-pro"

const Zbooks = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const {rows, update} = useSelector(state => state.documents.zbooks)
    const uid_kkt_current = useSelector(state => state.documents.zbooks.uid_kkt_current)
    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})
    const [fetching_receipts, set_fetching_receipts] = useState({loading: false, error: null, data: null})
    const {rows_receipts} = useSelector(state => state.documents.receipts)
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_zbooks_get(filial, param_date_admin, update))
            set_fetching(fetching_result)
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setZBooks(fetching_result.data))
            }
        }
        dispatch(cleanZBooks())
        if (filial !== undefined && param_date_admin !== undefined) {
            fetch()
        }
        return () => dispatch(cleanZBooks())
    }, [dispatch, filial, param_date_admin, update])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_receipts_get(filial, param_date_admin, uid_kkt_current))
            set_fetching_receipts(fetching_result)
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setReceipts(fetching_result.data))
            }
        }
        dispatch(cleanReceipts())
        if (filial !== undefined && param_date_admin !== undefined) {
            fetch()
        }
        return () => dispatch(cleanReceipts())
    }, [dispatch, filial, param_date_admin, uid_kkt_current])

    const columns = [{field: 'id', headerName: 'ID', width: 10}, {
        field: 'name_organization', headerName: 'Организация', width: 100
    }, {field: 'inn', headerName: 'ИНН', width: 100}, {
        field: 'number_kkt', headerName: 'ЗН ККТ', width: 130
    }, {
        field: 'date_ofd', headerName: 'ОФД', width: 130, type: 'dateTime', valueGetter: (param) => {
            return param ? dayjs(param).toDate() : null
        }
    }, {
        field: 'last_fd', headerName: 'ФД', width: 50
    }, {
        field: 'date_shift', headerName: 'Смена', width: 90, type: 'date', valueGetter: (param) => {
            return param ? dayjs(param).toDate() : null
        }
    }, {
        field: 'number_shift', headerName: '№', width: 60
    }, {field: 'sum_in_cash', headerName: 'Н +', type: 'number', width: 100}, {
        field: 'sum_in_electron', headerName: 'БН +', type: 'number', width: 100
    }, {field: 'sum_out_cash', headerName: 'Н -', type: 'number', width: 100}, {
        field: 'sum_out_electron', headerName: 'БН -', type: 'number', width: 100
    }, {field: 'sum_nds', headerName: 'НДС', type: 'number', width: 90}, {
        field: 'sum_collection', headerName: 'Инкассация', type: 'number', width: 90
    }, {field: 'sum_electron', headerName: 'Б ∑', type: 'number', width: 100}, {
        field: 'revenue', headerName: 'В ∑', type: 'number', width: 100
    }, {
        field: 'sum_total_of_income', headerName: 'П смены', type: 'number', width: 100
    }, {
        field: 'sum_non_zero_total_of_income', headerName: 'НС +', type: 'number', width: 100
    }, {field: 'sum_non_zero_total_of_outcome', headerName: 'НС -', type: 'number', width: 100},]

    const columns_receipts = [{field: 'id', headerName: 'ID', width: 10}, {
        field: 'number_kkt', headerName: 'ЗН ККТ', width: 130
    }, {
        field: 'date_shift', headerName: 'Дата смены', width: 100, type: 'date', valueGetter: (param) => {
            return param ? dayjs(param).toDate() : null
        }
    }, {
        field: 'date_create',
        headerName: 'Создан',
        width: 140,
        type: 'dateTime',
        valueGetter: (param) => param ? dayjs(param).toDate() : null
    }, {field: 'copy', headerName: '', width: 100, type: 'boolean', renderHeader: () => <CakeIcon fontSize="small"/>}, {
        field: 'type', headerName: 'Тип', width: 100, valueGetter: (param) => {
            switch (param) {
                case 1:
                    return 'ПРИХОД'
                case 2:
                    return 'ВОЗВРАТ'
            }
        }
    }, {field: 'price', headerName: 'Цена', width: 100, type: 'number'}, {
        field: 'sum_discount', headerName: 'Скидка', width: 100, type: 'number'
    }, {field: 'sum', headerName: 'Сумма', width: 100, type: 'number'}, {
        field: 'name_payment_type', headerName: 'Вид оплаты', width: 140
    }, {field: 'number', headerName: '№', width: 50}, {field: 'rn', headerName: 'РН', width: 140}, {
        field: 'fn', headerName: 'ФН', width: 140
    }, {field: 'fd', headerName: 'ФД', width: 50}, {field: 'fp', headerName: 'ФП', width: 100}, {
        field: 'moment', headerName: 'Пробитие', width: 150, type: 'dateTime', valueGetter: (param) => {
            return param ? dayjs(param).toDate() : null
        }
    }, {field: 'shift_number', headerName: 'Номер смены', width: 70}, {
        field: 'uid_cashier', headerName: '', width: 100
    }, {field: 'name_cashier', headerName: 'Кассир', width: 120}, {
        field: 'uid_kkt', headerName: '', width: 100
    }, {field: 'uid_order_cinema', headerName: '', width: 100}, {
        field: 'uid_order_food', headerName: '', width: 100
    }, {field: 'uid_organization', headerName: '', width: 100}, {
        field: 'uid_payment_type', headerName: '', width: 100
    }, {field: 'uid_channel', headerName: '', width: 100}, {
        field: 'name_channel', headerName: 'Канал продажи', width: 140
    }, {field: 'uid_store', headerName: '', width: 100}, {
        field: 'name_organization', headerName: 'Организация', width: 100
    }, {field: 'inn_organization', headerName: 'ИНН', width: 100}, {
        field: 'sno', headerName: 'СНО', width: 100, valueGetter: (param) => {
            switch (param) {
                case 1:
                    return 'ОБЩАЯ'
                case 2:
                    return 'УСН'
            }
        }
    }, {field: 'name_store', headerName: 'Торговая точка', width: 140}, {
        field: 'uid_work_place', headerName: '', width: 100
    }, {field: 'uid_creator', headerName: '', width: 100}, {
        field: 'name_creator', headerName: 'Автор', width: 100
    }, {field: 'printed', headerName: 'Напечатан', width: 100, type: 'boolean'}, {
        field: 'date_shift_claim', headerName: 'Подтверждение возврата', width: 100
    }]

    if (filial === undefined) {
        return <Box className='empty-box'>Выберите филиал...</Box>
    } else {
        return <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{minHeight: '50%'}}>
                {rows.length > 0 ? <DataGridPro
                    loading={fetching.loading}
                    hideFooter
                    checkboxSelection
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    pageSizeOptions={[10, 25, 50]}
                    rowHeight={26}
                    headerHeight={28}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    columnVisibilityModel={{id: false}}
                    sx={{
                        '& .total-row': {
                            backgroundColor: '#f0f0f0', fontWeight: 'bold',
                        }, '& .MuiDataGrid-cell': {
                            padding: '0 4px', fontSize: '0.9rem',
                        }, '& .MuiDataGrid-columnHeaderTitle': {
                            fontSize: '0.9rem',
                        },
                    }}
                /> : <Box className='empty-box' sx={{height: '100%'}}>Кассовые книги отсутствуют в смене...</Box>}
            </Box>
            <Box sx={{minHeight: '50%'}}>
                {rows_receipts.length > 0 ? <DataGridPro
                    loading={fetching_receipts.loading}
                    hideFooter
                    checkboxSelection
                    rows={rows_receipts}
                    columns={columns_receipts}
                    pageSize={20}
                    pageSizeOptions={[10, 25, 50]}
                    rowHeight={26}
                    headerHeight={28}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    columnVisibilityModel={{
                        id: false,
                        uid_creator: false,
                        uid_cashier: false,
                        uid_kkt: false,
                        uid_order_cinema: false,
                        uid_order_food: false,
                        uid_organization: false,
                        uid_payment_type: false,
                        uid_channel: false,
                        uid_store: false,
                        uid_work_place: false,

                    }}
                    sx={{
                        '& .total-row': {
                            backgroundColor: '#f0f0f0', fontWeight: 'bold',
                        }, '& .MuiDataGrid-cell': {
                            padding: '0 4px', fontSize: '0.9rem',
                        }, '& .MuiDataGrid-columnHeaderTitle': {
                            fontSize: '0.9rem',
                        },
                    }}
                    pinnedColumns={{
                        left: ['date_shift', 'date_create', 'number_kkt'], right: ['type', 'name_payment_type', 'sum']
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [{field: 'date_create', sort: 'desc'}],
                        },
                    }}
                /> : <Box className='empty-box' sx={{height: '100%'}}>Чеки отсутствуют в смене...</Box>}
            </Box>
        </Box>
    }
}

export default Zbooks