import {Box, Button, Stack} from "@mui/material"
import {useFetchReceiptsFromOrder} from "../../hooks/payment/useFetchReceiptsFromOrder.js"
import Loader from "./Loader.jsx"
import {useSetPaymentMethods} from "../../hooks/payment/useSetPaymentMethods.js"
import {DataGrid} from "@mui/x-data-grid"
import {ruRU} from "@mui/x-data-grid/locales"
import {useEffect, useMemo, useState} from "react"
import {useSelector} from "react-redux"

const Payment = (props) => {

    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const [total, set_total] = useState([0, 0])
    const [cash, set_cash] = useState([0, 0])

    useEffect(() => {
        set_total([pre_order.sum + horder.sum, pre_order.sum_discount + horder.sum_discount])
    }, [pre_order, horder])

    useEffect(() => {

    }, [pre_order, horder])

    const [payment_methods, payment_methods_error, payment_methods_loading] = useSetPaymentMethods()
    const [receiptsFromOrder, receiptsFromOrder_error, receiptsFromOrder_loading] = useFetchReceiptsFromOrder(props.param.type)

    const SXDataGrid = {
        borderRadius: '12px',
        border: 'none',
        '& .MuiDataGrid-row': {
            background: 'white',
        },
        '& .MuiDataGrid-row:hover': {
            background: '#dfdfdf',
        },
        '& .MuiDataGrid-row.Mui-selected:hover': {
            background: '#bdbaba',
        },
        '& .MuiDataGrid-row.Mui-selected': {
            background: '#cac6c6',
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
            background: 'white',
            borderRadius: '12px 12px 0 0',
        },
        '& .MuiDataGrid-footerContainer': {
            background: 'white',
            borderRadius: '0 0 12px 12px',
        },
        '& .MuiDataGrid-root': {
            backgroundColor: '#f5f5f5',
        },
        '& .MuiDataGrid-cell': {
            fontWeight: 'bold',
        },
        '& .MuiDataGrid-columnHeaders': {
            color: 'black',
        },
        '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#fff',
        },
        '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
        },
        '& .MuiDataGrid-cell:focus': {
            outline: 'none',
            backgroundColor: '#b6b5b5',
        },
        '& MuiDataGrid-root *': {
            userSelect: 'none !important'
        },
    }

    const columns = useMemo(() => {
        return [
            {
                field: 'id',
                headerName: '№',
                width: 90,
            },
            {
                field: 'name',
                headerName: 'Наименование',
                width: 300,
                editable: false,
            },
            {
                field: 'quantity',
                headerName: 'кол-во',
                width: 90,
                editable: false,
            },
            {
                field: 'price',
                headerName: 'цена',
                width: 90,
                editable: false,
            },
            {
                field: 'sum',
                headerName: 'сумма',
                width: 90,
                editable: false,
            },
        ]
    }, [])

    const data = useMemo(() => {
        return {
            waiting: {
                mark_egais_items: {
                    rows: [],
                    columns: columns,
                },
                horeca_items: {
                    rows: [],
                    columns: columns,
                },
                cinema_items: {
                    rows: [],
                    columns: [],
                }
            },
            slip_without_receipt: {
                mark_egais_items: {
                    rows: [],
                    columns: [],
                },
                horeca_items: {
                    rows: [],
                    columns: [],
                },
                cinema_items: {
                    rows: [],
                    columns: [],
                }
            },
            success: {
                mark_egais_items: {
                    rows: [],
                    columns: [],
                },
                horeca_items: {
                    rows: [],
                    columns: [],
                },
                cinema_items: {
                    rows: [],
                    columns: [],
                }
            }
        }
    }, [columns])

    const [receipts, set_receipts] = useState(Object.assign({}, data))
    useEffect(() => {
        if (receiptsFromOrder !== null) {
            const receiptsNew = Object.assign({}, data)
            receiptsFromOrder.waiting.mark_egais_items.forEach((item) => {
                receiptsNew.waiting.mark_egais_items.rows.push({
                    id: item.uid,
                    name: item.name,
                    quantity: item.quantity + ' ' + item.unit_name,
                    price: `${item.price} р`,
                    sum: `${item.sum} р`,
                })
            })
            receiptsFromOrder.waiting.horeca_items.forEach((item) => {
                receiptsNew.waiting.horeca_items.rows.push({
                    id: item.uid,
                    name: item.name,
                    quantity: item.quantity + ' ' + item.unit_name,
                    price: `${item.price} р`,
                    sum: `${item.sum} р`,
                })
            })
            receiptsFromOrder.waiting.cinema_items.forEach((item) => {
                receiptsNew.waiting.cinema_items.rows.push({
                    id: item.uid,
                    name: item.name,
                    quantity: item.quantity + ' ' + item.unit_name,
                    price: `${item.price} р`,
                    sum: `${item.sum} р`,
                })
            })
            set_receipts(receiptsNew)
        }
    }, [data, receiptsFromOrder])

    const paymentMethodsArray = () => {
        if (payment_methods_loading) {
            return <Loader/>
        } else if (payment_methods_error) {
            return <Box>Ошибка загрузки маршрутов оплаты</Box>
        } else if (payment_methods.list.length === 0) {
            return <Box>Для этого рабочего места не найдено маршрутов оплаты</Box>
        } else {
            return (
                <>
                    {payment_methods.list.map(paymentMethod => {
                        return (
                            <Button variant='contained' color='info'
                                    key={paymentMethod.uid}>{paymentMethod.name}</Button>
                        )
                    })}
                </>
            )
        }
    }

    const [slip_without_receipt, set_slip_without_receipt] = useState(false)
    const [waiting, set_waiting] = useState(false)
    const [success, set_success] = useState(false)
    useEffect(() => {
        if (receipts.slip_without_receipt.mark_egais_items.rows.length > 0 ||
            receipts.slip_without_receipt.horeca_items.rows.length > 0 ||
            receipts.slip_without_receipt.cinema_items.rows.length > 0) {
            set_slip_without_receipt(true)
        } else {
            set_slip_without_receipt(false)
        }
        if (receipts.waiting.mark_egais_items.rows.length > 0 ||
            receipts.waiting.horeca_items.rows.length > 0 ||
            receipts.waiting.cinema_items.rows.length > 0) {
            set_waiting(true)
        } else {
            set_waiting(false)
        }
        if (receipts.success.mark_egais_items.rows.length > 0 ||
            receipts.success.horeca_items.rows.length > 0 ||
            receipts.success.cinema_items.rows.length > 0) {
            set_success(true)
        } else {
            set_success(false)
        }
    }, [receipts])

    const table = (table_name, title) => {
        if (receipts[table_name.split(".")[0]][table_name.split(".")[1]].rows.length > 0) {
            return (
                <>
                    <Box className='order-receipt-title-type'>{title}</Box>
                    <DataGrid
                        hideColumnHeaders
                        disableRowSelectionOnClick
                        disableColumnSelector
                        treeData
                        columnVisibilityModel={{id: false}}
                        rows={receipts[table_name.split(".")[0]][table_name.split(".")[1]].rows}
                        columns={receipts[table_name.split(".")[0]][table_name.split(".")[1]].columns}
                        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                        sx={SXDataGrid}
                    />
                </>
            )
        } else {
            return (<></>)
        }
    }

    if (receiptsFromOrder_error !== null) {
        return (<Box>Ошибка</Box>)
    } else if (receiptsFromOrder_loading) {
        return (<Loader/>)
    } else if (receiptsFromOrder !== null) {
        return (
            <Box id="order-receipts">
                <Box className='order-receipts-section'>
                    <Box className='order-receipts-section-total'>
                        <DataGrid
                            disableRowSelection
                            disableColumnSelector
                            hideFooter
                            columnVisibilityModel={{id: false}}
                            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                            sx={SXDataGrid}
                            columns={[
                                {field: 'id', headerName: '№', width: 1},
                                {
                                    field: 'name',
                                    headerName: '',
                                    width: 80,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                                {
                                    field: 'total',
                                    headerName: 'ВСЕГО',
                                    width: 90,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                                {
                                    field: 'cinema',
                                    headerName: 'КИНО',
                                    width: 90,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                                {
                                    field: 'horeca',
                                    headerName: 'ОБЩЕПИТ',
                                    width: 90,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                                {
                                    field: 'cash',
                                    headerName: 'ПОЛУЧИЛ',
                                    width: 90,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                                {
                                    field: 'back',
                                    headerName: 'СДАЧА',
                                    width: 90,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                            ]}
                            rows={[
                                {
                                    id: '0',
                                    name: 'к оплате',
                                    total: `${total[0]} р`,
                                    cinema: `${pre_order.sum} р`,
                                    horeca: `${horder.sum} р`,
                                    cash: `${cash[0]} р`,
                                    back: `${cash[1]} р`,
                                },
                                {
                                    id: '1',
                                    name: 'скидка',
                                    total: `${total[1]} р`,
                                    cinema: `${pre_order.sum_discount} р`,
                                    horeca: `${horder.sum_discount} р`
                                },
                            ]}/>
                    </Box>
                    <Box className='order-receipts-section-items'>
                        <Box sx={{display: slip_without_receipt ? 'block' : 'none'}}>
                            <Box className='order-receipt-title'>Списали деньги с карты, но не пробили чек</Box>
                            <Box>
                                {table('slip_without_receipt.mark_egais_items', 'Товары ЧЗ, ЕГАИС')}
                                {table('slip_without_receipt.horeca_items', 'Товары')}
                                {table('slip_without_receipt.cinema_items', 'Услуги')}
                            </Box>
                        </Box>
                        <Box sx={{display: waiting ? 'block' : 'none'}}>
                            <Box className='order-receipt-title'>Ожидает оплаты</Box>
                            <Box>
                                {table('waiting.mark_egais_items', 'Товары ЧЗ, ЕГАИС')}
                                {table('waiting.horeca_items', 'Товары')}
                                {table('waiting.cinema_items', 'Услуги')}
                            </Box>
                        </Box>
                        <Box sx={{display: success ? 'block' : 'none'}}>
                            <Box className='order-receipt-title'>Успешно оплачено</Box>
                            <Box>
                                <Box>
                                    {table('success.mark_egais_items', 'Товары ЧЗ, ЕГАИС')}
                                    {table('success.horeca_items', 'Товары')}
                                    {table('success.cinema_items', 'Услуги')}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className='order-receipts-calc-payment'>
                    <Box className='order-receipts-payment'>
                        <Box className='order-receipts-calc-payment-types'>
                            {paymentMethodsArray()}
                        </Box>
                    </Box>
                    <Box className='order-receipts-calc'>
                        <Stack direction="column" spacing={1}>
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained" color='secondary' onClick={() => {}}>7</Button>
                                <Button variant="contained" color='secondary'>8</Button>
                                <Button variant="contained" color='secondary'>9</Button>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained" color='secondary'>4</Button>
                                <Button variant="contained" color='secondary'>5</Button>
                                <Button variant="contained" color='secondary'>6</Button>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained" color='secondary'>1</Button>
                                <Button variant="contained" color='secondary'>2</Button>
                                <Button variant="contained" color='secondary'>3</Button>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained" color='secondary'>0</Button>
                                <Button variant="contained" color='secondary' fullWidth onClick={() => {
                                    set_cash([0, 0])
                                }}>Очистить</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        )
    } else {
        return (
            <></>
        )
    }
}

export default Payment