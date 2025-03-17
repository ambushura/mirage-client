import {Box, Button, Stack} from "@mui/material"
import {useFetchReceiptsFromOrder} from "../../hooks/payment/useFetchReceiptsFromOrder.js"
import Loader from "./Loader.jsx"
import {useSetPaymentMethods} from "../../hooks/payment/useSetPaymentMethods.js"
import {DataGrid} from "@mui/x-data-grid"
import {ruRU} from "@mui/x-data-grid/locales"
import {useEffect, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {setCash, setTotal} from "../../redux/ordersReducer.js"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const Payment = (props) => {

    const dispatch = useDispatch()

    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const total = useSelector(state => state.orders.total)
    const cash = useSelector(state => state.orders.cash)
    const change = useSelector(state => state.orders.change)

    useEffect(() => {
        dispatch(setTotal([pre_order.sum + horder.sum, pre_order.sum_discount + horder.sum_discount]))
        dispatch(setCash(['clean', pre_order.sum + horder.sum]))
        return () => {
            dispatch(setTotal(0))
        }
    }, [dispatch, pre_order, horder])

    const [payment_methods, payment_methods_error, payment_methods_loading] = useSetPaymentMethods()
    const [receiptsFromOrder, receiptsFromOrder_error, receiptsFromOrder_loading] = useFetchReceiptsFromOrder(props.param.type)

    const SXDataGrid = {
        borderRadius: 0,
        border: 'none',
        '& .MuiDataGrid-row': {
            background: 'white',
        },
        '& .MuiDataGrid-row:hover': {
            background: '#fff',
        },
        '& .MuiDataGrid-row.Mui-selected:hover': {
            background: '#fff',
        },
        '& .MuiDataGrid-row.Mui-selected': {
            background: '#fff',
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
            background: 'white',
            fontWeight: 'bold',
            fontSize: '120%',
        },
        '& .MuiDataGrid-footerContainer': {
            background: 'white',
        },
        '& .MuiDataGrid-root': {
            backgroundColor: '#f5f5f5',
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
        '& .MuiDataGrid-cell': {
            fontWeight: 'bold',
        },
        '& .MuiDataGrid-row:nth-of-type(1) .MuiDataGrid-cell[data-field="change"]': {
            backgroundColor: total[0] > cash ? '#E3000B' : '#50DB92',
            color: total[0] > cash ? '#fff' : '#000'
        }
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
            {
                field: 'discount',
                headerName: 'скидка',
                width: 100,
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

    const [receipts, set_receipts] = useState({...data})
    useEffect(() => {
        if (!receiptsFromOrder) return
        const receiptsNew = structuredClone(data)
        const categories = ["mark_egais_items", "horeca_items", "cinema_items"]
        categories.forEach((category) => {
            receiptsFromOrder.waiting[category].forEach((item) => {
                receiptsNew.waiting[category].rows.push({
                    name: item.name,
                    unit_name: item.unit_name,
                    price: item.price,
                    discount: item.name_discount ?? "-",
                    quantity: item.quantity,
                    sum: item.sum,
                })
            })
            const groupedItems = groupAndSum(
                receiptsNew.waiting[category].rows,
                ["name", "unit_name", "price", "discount"],
                ["quantity", "sum"]
            )
            receiptsNew.waiting[category].rows = groupedItems.map((item, i) => ({
                id: i,
                name: item.name,
                price: `${item.price.toLocaleString("ru-RU")} р`,
                discount: item.name_discount ?? "-",
                quantity: `${item.quantity} ${item.unit_name}`,
                sum: `${item.sum.toLocaleString("ru-RU")} р`,
            }))
        })
        set_receipts(receiptsNew)
    }, [data, receiptsFromOrder])

    function groupAndSum(data, groupByFields, sumFields) {
        return Object.values(
            data.reduce((acc, item) => {
                const key = groupByFields.map(field => item[field]).join('-')
                if (!acc[key]) {
                    acc[key] = {...item}
                } else {
                    sumFields.forEach(field => {
                        acc[key][field] += item[field]
                    })
                }
                return acc
            }, {})
        )
    }

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
                                    key={paymentMethod.uid}
                                    className='payment-path'>
                                <span>{paymentMethod.name}</span>
                                <span
                                    style={{fontSize: '70%'}}>kkt..{paymentMethod.kkt.number.slice(-4)} - pin..{paymentMethod.pinpad.number.slice(-4)}</span>
                            </Button>
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
                <Box sx={{minHeight: '100px', minWidth: '100px'}}>
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
                </Box>
            )
        } else {
            return (<></>)
        }
    }

    const calc = (b) => {
        dispatch(setCash([b, pre_order.sum + horder.sum]))
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
                                    field: 'cinema',
                                    headerName: 'Кино',
                                    width: 100,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                                {
                                    field: 'horeca',
                                    headerName: 'Общепит',
                                    width: 100,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                                {
                                    field: 'total',
                                    headerName: 'Всего',
                                    width: 100,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                                {
                                    field: 'cash',
                                    headerName: 'Получил',
                                    width: 100,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                                {
                                    field: 'change',
                                    headerName: total[0] > cash ? 'Получи' : 'Верни',
                                    width: 100,
                                    editable: false,
                                    sortable: false,
                                    filterable: false,
                                    disableColumnMenu: true
                                },
                            ]}
                            rows={[
                                {
                                    id: '0',
                                    name: 'К оплате',
                                    total: `${total[0].toLocaleString("ru-RU")} р`,
                                    cinema: `${pre_order.sum.toLocaleString("ru-RU")} р`,
                                    horeca: `${horder.sum.toLocaleString("ru-RU")} р`,
                                    cash: `${cash.toLocaleString("ru-RU")} р`,
                                    change: `${Math.abs(change).toLocaleString("ru-RU")} р`,
                                },
                                {
                                    id: '1',
                                    name: 'Скидка',
                                    total: `${(pre_order.sum_discount + horder.sum_discount).toLocaleString("ru-RU")} р`,
                                    cinema: `${pre_order.sum_discount.toLocaleString("ru-RU")} р`,
                                    horeca: `${horder.sum_discount.toLocaleString("ru-RU")} р`,
                                    cash: '',
                                    change: '',
                                },
                            ]}/>
                    </Box>
                    <Box className='order-receipts-section-items'>
                        <Box sx={{display: slip_without_receipt ? 'block' : 'none'}}>
                            <Box className='order-receipt-title'>Списали деньги с карты, но не пробили чек</Box>
                            {table('slip_without_receipt.mark_egais_items', 'Товары ЧЗ, ЕГАИС')}
                            {table('slip_without_receipt.horeca_items', 'Товары')}
                            {table('slip_without_receipt.cinema_items', 'Услуги')}
                        </Box>
                        <Box sx={{display: waiting ? 'block' : 'none'}}>
                            <Box className='order-receipt-title'>Ожидает оплаты</Box>
                            {table('waiting.mark_egais_items', 'Товары ЧЗ, ЕГАИС')}
                            {table('waiting.horeca_items', 'Товары')}
                            {table('waiting.cinema_items', 'Услуги')}
                        </Box>
                        <Box sx={{display: success ? 'block' : 'none'}}>
                            <Box className='order-receipt-title'>Успешно оплачено</Box>
                            {table('success.mark_egais_items', 'Товары ЧЗ, ЕГАИС')}
                            {table('success.horeca_items', 'Товары')}
                            {table('success.cinema_items', 'Услуги')}
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
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc(7)
                                }}>7</Button>
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc(8)
                                }}>8</Button>
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc(9)
                                }}>9</Button>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc(4)
                                }}>4</Button>
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc(5)
                                }}>5</Button>
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc(6)
                                }}>6</Button>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc(1)
                                }}>1</Button>
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc(2)
                                }}>2</Button>
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc(3)
                                }}>3</Button>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc(0)
                                }}>0</Button>
                                <Button variant="contained" color='secondary' onClick={() => {
                                    calc('00')
                                }}>00</Button>
                                <Button variant="contained" color='secondary' fullWidth onClick={() => {
                                    dispatch(setCash(['clean', pre_order.sum + horder.sum]))
                                }}><DeleteForeverIcon/></Button>
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