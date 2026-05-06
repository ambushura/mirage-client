import { ruRU } from '@mui/x-data-grid/locales'
import { useEffect, useState } from 'react'
import { common_documents_receipts_get, common_documents_zbooks_get } from '../../../../../service/fetch_service.js'
import { useDispatch, useSelector } from 'react-redux'
import { cleanReceipts, cleanZBooks, setReceipts, setZBooks } from '../../../../../redux/documentsReducer.js'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import CakeIcon from '@mui/icons-material/Cake'
import { DataGridPro } from '@mui/x-data-grid-pro'
import Loader from '../../../../../ui/Loader.jsx'
import { useNavigate } from 'react-router-dom'

const Zbooks = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { city, filial } = useSelector((state) => state.data)
    const param_date_admin = useSelector((state) => state.interface.params.param_date_admin)
    const wp = useSelector((state) => state.interface.wp)
    const uid_kkt_current = useSelector((state) => state.documents.uid_kkt_current)

    const [fetching_zbooks, set_fetching_zbooks] = useState({
        loading: false,
        error: null,
        data: null,
    })
    const zbooks = useSelector((state) => state.documents.zbooks.zbooks)
    const zbooks_update = useSelector((state) => state.documents.zbooks_update)

    const [fetching_receipts, set_fetching_receipts] = useState({
        loading: false,
        error: null,
        data: null,
    })
    const receipts = useSelector((state) => state.documents.receipts.receipts)
    const receipts_update = useSelector((state) => state.documents.receipts_update)

    const [columnVisibilityModelReceipts, setColumnVisibilityModelReceipts] = useState({
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
        deleted: false,
    })

    const [columnVisibilityModelZBooks, setColumnVisibilityModelZBooks] = useState({
        id: false,
        ver: false,
        automatic: false,
    })

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_zbooks_get(filial, param_date_admin, zbooks_update))
            set_fetching_zbooks(fetching_result)
            if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setZBooks(fetching_result.data))
            }
        }
        dispatch(cleanZBooks())
        if (filial !== undefined && param_date_admin !== undefined) {
            fetch()
        }
        return () => dispatch(cleanZBooks())
    }, [dispatch, filial, param_date_admin, zbooks_update])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_receipts_get(filial, param_date_admin, uid_kkt_current))
            set_fetching_receipts(fetching_result)
            if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setReceipts(fetching_result.data))
            }
        }
        dispatch(cleanReceipts())
        if (filial !== undefined && param_date_admin !== undefined) {
            fetch()
        }
        return () => dispatch(cleanReceipts())
    }, [dispatch, filial, param_date_admin, uid_kkt_current, receipts_update])

    if (filial === undefined) {
        return <Box className="empty-box">Выберите филиал...</Box>
    } else {
        return (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {fetching_receipts.loading && fetching_receipts.error === null && fetching_receipts.data === null && <Loader />}
                {!fetching_receipts.loading && fetching_receipts.error !== null && fetching_receipts.data === null && (
                    <Box sx={{ minHeight: '50%' }}>
                        <Box sx={{ minHeight: '50%' }} className="empty-box">
                            {fetching_receipts.error}
                        </Box>
                    </Box>
                )}
                {!fetching_receipts.loading &&
                    fetching_receipts.error === null &&
                    fetching_receipts.data !== null &&
                    receipts !== undefined && (
                        <Box sx={{ minHeight: '50%' }}>
                            {receipts.length > 0 ? (
                                <DataGridPro
                                    loading={fetching_receipts.loading}
                                    hideFooter
                                    checkboxSelection
                                    rows={receipts}
                                    columns={columns_receipts}
                                    pageSize={20}
                                    pageSizeOptions={[10, 25, 50]}
                                    rowHeight={30}
                                    headerHeight={30}
                                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                                    columnVisibilityModel={columnVisibilityModelReceipts}
                                    onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModelReceipts(newModel)}
                                    sx={{
                                        '& .total-row': {
                                            backgroundColor: '#f0f0f0',
                                            fontWeight: 'bold',
                                        },
                                        '& .MuiDataGrid-cell': {
                                            padding: '0 4px',
                                            fontSize: '0.9rem',
                                        },
                                        '& .MuiDataGrid-columnHeaderTitle': {
                                            fontSize: '0.9rem',
                                        },
                                    }}
                                    pinnedColumns={{
                                        left: ['date_shift', 'date_create', 'number_kkt'],
                                        right: ['type', 'name_payment_type', 'sum'],
                                    }}
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'date_create', sort: 'desc' }],
                                        },
                                    }}
                                    onRowDoubleClick={(params) => {
                                        navigate(
                                            `/admin/receipt/${city.code}/${filial.eais}/${params.row.id}/?${wp !== null ? 'wp=' + wp : ''}`
                                        )
                                    }}
                                />
                            ) : (
                                <Box className="empty-box" sx={{ height: '100%' }}>
                                    Чеки отсутствуют в смене...
                                </Box>
                            )}
                        </Box>
                    )}
                {fetching_zbooks.loading && fetching_zbooks.error === null && <Loader />}
                {!fetching_zbooks.loading && fetching_zbooks.error !== null && (
                    <Box sx={{ minHeight: '50%' }}>
                        <Box sx={{ minHeight: '50%' }} className="empty-box">
                            {fetching_zbooks.error}
                        </Box>
                    </Box>
                )}
                {!fetching_zbooks.loading && fetching_zbooks.error === null && fetching_zbooks.data !== null && zbooks !== undefined && (
                    <Box sx={{ minHeight: '50%' }}>
                        {zbooks.length > 0 ? (
                            <DataGridPro
                                loading={fetching_zbooks.loading}
                                hideFooter
                                checkboxSelection
                                rows={zbooks}
                                columns={columns}
                                pageSize={20}
                                pageSizeOptions={[10, 25, 50]}
                                rowHeight={30}
                                headerHeight={30}
                                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                                columnVisibilityModel={columnVisibilityModelZBooks}
                                onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModelZBooks(newModel)}
                                pinnedColumns={{
                                    left: ['date_shift', 'number_kkt'],
                                    right: ['sum_non_zero_total_of_income', 'sum_non_zero_total_of_outcome'],
                                }}
                                sx={{
                                    '& .total-row': {
                                        backgroundColor: '#f0f0f0',
                                        fontWeight: 'bold',
                                    },
                                    '& .MuiDataGrid-cell': {
                                        padding: '0 4px',
                                        fontSize: '0.9rem',
                                    },
                                    '& .MuiDataGrid-columnHeaderTitle': {
                                        fontSize: '0.9rem',
                                    },
                                }}
                                onRowDoubleClick={(params) => {
                                    navigate(`/admin/zbook/${city.code}/${filial.eais}/${params.row.id}/?${wp !== null ? 'wp=' + wp : ''}`)
                                }}
                            />
                        ) : (
                            <Box className="empty-box" sx={{ height: '100%' }}>
                                Кассовые книги отсутствуют в смене...
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        )
    }
}

export default Zbooks

export const columns = [
    { field: 'id', headerName: 'UID документ', width: 10 },
    {
        field: 'name_organization',
        headerName: 'Организация',
        width: 100,
    },
    { field: 'inn', headerName: 'ИНН', width: 100 },
    {
        field: 'number_kkt',
        headerName: 'ЗН ККТ',
        width: 130,
    },
    {
        field: 'date_ofd',
        headerName: 'ОФД',
        width: 100,
        type: 'date',
        valueGetter: (param) => {
            return param ? dayjs(param).toDate() : null
        },
    },
    {
        field: 'last_fd',
        headerName: 'ФД',
        width: 50,
    },
    {
        field: 'date_shift',
        headerName: 'Дата смены',
        width: 100,
        type: 'date',
        valueGetter: (param) => {
            return param ? dayjs(param).toDate() : null
        },
    },
    {
        field: 'number_shift',
        headerName: '№',
        width: 60,
    },
    { field: 'sum_in_cash', headerName: 'Н +', type: 'number', width: 100 },
    {
        field: 'sum_in_electron',
        headerName: 'БН +',
        type: 'number',
        width: 100,
    },
    { field: 'sum_out_cash', headerName: 'Н -', type: 'number', width: 100 },
    {
        field: 'sum_out_electron',
        headerName: 'БН -',
        type: 'number',
        width: 100,
    },
    { field: 'sum_nds', headerName: 'НДС', type: 'number', width: 90 },
    {
        field: 'sum_collection',
        headerName: 'Инкассация',
        type: 'number',
        width: 90,
    },
    { field: 'sum_electron', headerName: 'Б ∑', type: 'number', width: 100 },
    {
        field: 'revenue',
        headerName: 'В ∑',
        type: 'number',
        width: 100,
    },
    {
        field: 'sum_total_of_income',
        headerName: 'П смены',
        type: 'number',
        width: 100,
    },
    {
        field: 'sum_non_zero_total_of_income',
        headerName: 'НС +',
        type: 'number',
        width: 100,
    },
    { field: 'sum_non_zero_total_of_outcome', headerName: 'НС -', type: 'number', width: 100 },
    {
        field: 'ver',
        headerName: 'Версия',
        width: 100,
    },
    { field: 'automatic', headerName: 'Создан автоматически', type: 'boolean', width: 100 },
    {
        field: 'comment',
        headerName: 'Комментарий',
        width: 100,
    },
]

export const columns_receipts = [
    { field: 'id', headerName: 'UID документ', width: 10 },
    {
        field: 'deleted',
        headerName: 'Пометка на удаление',
        width: 100,
        type: 'boolean',
    },
    {
        field: 'number_kkt',
        headerName: 'ЗН ККТ',
        width: 130,
    },
    {
        field: 'date_shift',
        headerName: 'Дата смены',
        width: 100,
        type: 'date',
        valueGetter: (param) => {
            return param ? dayjs(param).toDate() : null
        },
    },
    {
        field: 'date_create',
        headerName: 'Создан',
        width: 140,
        type: 'dateTime',
        valueGetter: (param) => (param ? dayjs(param).toDate() : null),
    },
    {
        field: 'copy',
        headerName: 'Копия',
        width: 100,
        type: 'boolean',
        renderHeader: () => <CakeIcon fontSize="small" />,
    },
    {
        field: 'type',
        headerName: 'Тип',
        width: 100,
        valueGetter: (param) => {
            switch (param) {
                case 1:
                    return 'ПРИХОД'
                case 2:
                    return 'ВОЗВРАТ'
            }
        },
    },
    { field: 'price', headerName: 'Цена', width: 100, type: 'number' },
    {
        field: 'sum_discount',
        headerName: 'Скидка',
        width: 100,
        type: 'number',
    },
    { field: 'sum', headerName: 'Сумма', width: 100, type: 'number' },
    {
        field: 'name_payment_type',
        headerName: 'Вид оплаты',
        width: 140,
    },
    { field: 'number', headerName: '№ чека', width: 50 },
    { field: 'rn', headerName: 'РН', width: 140 },
    {
        field: 'fn',
        headerName: 'ФН',
        width: 140,
    },
    { field: 'fd', headerName: 'ФД', width: 50 },
    { field: 'fp', headerName: 'ФП', width: 100 },
    {
        field: 'moment',
        headerName: 'Пробитие',
        width: 150,
        type: 'dateTime',
        valueGetter: (param) => {
            return param ? dayjs(param).toDate() : null
        },
    },
    { field: 'shift_number', headerName: 'Номер смены', width: 70 },
    {
        field: 'name_cashier',
        headerName: 'Кассир',
        width: 120,
    },
    {
        field: 'name_channel',
        headerName: 'Канал продажи',
        width: 140,
    },
    {
        field: 'name_organization',
        headerName: 'Организация',
        width: 100,
    },
    { field: 'inn_organization', headerName: 'ИНН', width: 100 },
    {
        field: 'sno',
        headerName: 'СНО',
        width: 100,
        valueGetter: (param) => {
            switch (param) {
                case 0:
                    return 'Основная'
                case 1:
                    return 'Упрощенная'
            }
        },
    },
    { field: 'name_store', headerName: 'Торговая точка', width: 140 },
    {
        field: 'name_creator',
        headerName: 'Автор',
        width: 100,
    },
    { field: 'printed', headerName: 'Напечатан', width: 100, type: 'boolean' },
    {
        field: 'date_shift_claim',
        headerName: 'Подтверждение возврата',
        width: 100,
    },
    {
        field: 'uid_kkt',
        headerName: 'UID ККТ',
        width: 100,
    },
    { field: 'uid_order_cinema', headerName: 'UID заказ кино', width: 100 },
    {
        field: 'uid_order_food',
        headerName: 'UID заказ общепит',
        width: 100,
    },
    { field: 'uid_organization', headerName: ' UID организация', width: 100 },
    {
        field: 'uid_payment_type',
        headerName: 'UID вид оплаты',
        width: 100,
    },
    { field: 'uid_channel', headerName: 'UID канал продажи', width: 100 },
    {
        field: 'uid_store',
        headerName: 'UID торговая точка',
        width: 100,
    },
    { field: 'uid_cashier', headerName: 'UID кассир', width: 100 },
    {
        field: 'uid_work_place',
        headerName: 'UID рабочее место',
        width: 100,
    },
    { field: 'uid_creator', headerName: 'UID автор', width: 100 },
]
