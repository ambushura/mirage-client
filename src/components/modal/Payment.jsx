import {Box, Button} from "@mui/material"
import {useFetchReceiptsFromOrder} from "../../hooks/payment/useFetchReceiptsFromOrder.js"
import Loader from "./Loader.jsx"
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import Calc from "../orders/Calc.jsx"
import {useSetPaymentMethods} from "../../hooks/payment/useSetPaymentMethods.js"

const Payment = (props) => {

    const [payment_methods, payment_methods_error, payment_methods_loading] = useSetPaymentMethods()
    const [receiptsFromOrder, receiptsFromOrder_error, receiptsFromOrder_loading] = useFetchReceiptsFromOrder(props.param.type)

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
                            <Button key={paymentMethod.uid}>{paymentMethod.name}</Button>
                        )
                    })}
                </>
            )
        }
    }

    if (receiptsFromOrder_error !== null) {
        return (<Box>Ошибка</Box>)
    } else if (receiptsFromOrder_loading) {
        return (<Loader/>)
    } else if (receiptsFromOrder !== null) {
        return (
            <Box id="order-receipts">
                <Box className='order-receipt-panel'>
                    <Button variant='contained' color='secondary'><CheckBoxIcon/></Button>
                    <Button variant='contained' color='secondary'><CheckBoxOutlineBlankIcon/></Button>
                    <Button variant='contained' color='secondary'>Проверить в ЧЗ</Button>
                    <Button variant='contained' color='secondary'>Проверить в ЕГАИС</Button>
                </Box>
                <Box className='order-receipt-body'>
                    <Box className='order-receipt-items'>
                        {receiptsFromOrder.receipts.map(receipt => {
                            return (
                                <Box className='order-receipt' key={receipt.number}>
                                    {receipt.items.map(item => {
                                        return (
                                            <Box className='order-receipt-item' key={item.uid}>
                                                <Box>{item.name}</Box>
                                                <Box>{item.quantity}</Box>
                                                <Box>{item.unit_name}</Box>
                                                <Box>{item.price}</Box>
                                                <Box>{item.sum}</Box>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            )
                        })}
                    </Box>
                    <Box className='order-receipt-payment-payment-types-calc'>
                        <Box className='order-receipt-payment-types'>
                            {paymentMethodsArray()}
                        </Box>
                        <Calc/>
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