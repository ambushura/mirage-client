import {Box, Button} from "@mui/material"
import {useFetchReceiptsFromOrder} from "../../hooks/payment/useFetchReceiptsFromOrder.js"
import Loader from "./Loader.jsx"
import Calc from "../orders/Calc.jsx"
import {useSetPaymentMethods} from "../../hooks/payment/useSetPaymentMethods.js"
import {DataGrid} from "@mui/x-data-grid"
import {ruRU} from "@mui/x-data-grid/locales"
import {useEffect, useState} from "react"
import {SXDataGrid} from "../../ui/ThemeContext.jsx"
import CloudDoneIcon from '@mui/icons-material/CloudDone'

const Payment = (props) => {

    const [payment_methods, payment_methods_error, payment_methods_loading] = useSetPaymentMethods()
    const [receiptsFromOrder, receiptsFromOrder_error, receiptsFromOrder_loading] = useFetchReceiptsFromOrder(props.param.type)
    const columns = [
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
            width: 80,
            editable: false,
        },
        {
            field: 'price',
            headerName: 'цена',
            width: 80,
            editable: false,
        },
        {
            field: 'sum',
            headerName: 'сумма',
            width: 80,
            editable: false,
        }]

    const data = {
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
                    sum: `${item.sum} р`
                })
            })
            receiptsFromOrder.waiting.horeca_items.forEach((item) => {
                receiptsNew.waiting.horeca_items.rows.push({
                    id: item.uid,
                    name: item.name,
                    quantity: item.quantity + ' ' + item.unit_name,
                    price: `${item.price} р`,
                    sum: `${item.sum} р`
                })
            })
            receiptsFromOrder.waiting.cinema_items.forEach((item) => {
                receiptsNew.waiting.cinema_items.rows.push({
                    id: item.uid,
                    name: item.name,
                    quantity: item.quantity + ' ' + item.unit_name,
                    price: `${item.price} р`,
                    sum: `${item.sum} р`
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
                <Box className='order-receipt-body'>
                    <Box className='order-receipt-items'>
                        <Box sx={{display: slip_without_receipt ? 'block' : 'none'}}>
                            <Box className='order-receipt-title'>Списали деньги с карты, но не пробили чек</Box>
                            <Box>
                                {table('slip_without_receipt.mark_egais_items', 'Товары (ЧЗ, ЕГАИС)')}
                                {table('slip_without_receipt.horeca_items', 'Товары')}
                                {table('slip_without_receipt.cinema_items', 'Услуги')}
                            </Box>
                        </Box>
                        <Box sx={{display: waiting ? 'block' : 'none'}}>
                            <Box className='order-receipt-title'>Ожидает оплаты</Box>
                            <Box>
                                {table('waiting.mark_egais_items', 'Товары (ЧЗ, ЕГАИС)')}
                                {table('waiting.horeca_items', 'Товары')}
                                {table('waiting.cinema_items', 'Услуги')}
                            </Box>
                        </Box>
                        <Box sx={{display: success ? 'block' : 'none'}}>
                            <Box className='order-receipt-title'>Успешно оплачено</Box>
                            <Box>
                                <Box>
                                    {table('success.mark_egais_items', 'Товары (ЧЗ, ЕГАИС)')}
                                    {table('success.horeca_items', 'Товары')}
                                    {table('success.cinema_items', 'Услуги')}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className='order-receipt-payment-payment-types-calc'>
                        <Calc/>
                        <Box className='order-receipt-payment-types'>
                            <Button variant='contained' color='secondary' startIcon={<CloudDoneIcon/>}>Проверить в
                                ЧЗ</Button>
                            <Button variant='contained' color='secondary' startIcon={<CloudDoneIcon/>}>Проверить в
                                ЕГАИС</Button>
                            {paymentMethodsArray()}
                        </Box>
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