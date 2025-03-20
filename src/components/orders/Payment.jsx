import {Box, Button} from "@mui/material"
import {useSetPaymentMethods} from "../../hooks/payment/useSetPaymentMethods.js"
import {useFetchReceiptsFromOrder} from "../../hooks/payment/useFetchReceiptsFromOrder.js"
import {useSelector} from "react-redux"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {useEffect} from "react";

const Payment = (props) => {

    const [payment_methods, payment_methods_error, payment_methods_loading] = useSetPaymentMethods()
    const [order_receipt, order_error, order_loading] = useFetchReceiptsFromOrder(props.type)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)

    useEffect(() => {
        // блокируем заказ
        return () => {
            // разблокируем заказ
        }
    }, [])

    return (
        <Box>
            <Box className='payment-total'>
                <Box sx={{display: 'flex', alignItems: 'none'}}>
                    <Button variant='contained' color='secondary' sx={{maxWidth: '70px'}} onClick={() => {
                        props.type === 'cinema' ? props.set_processing_cinema(false) : props.set_processing_horeca(false)
                    }}><ArrowBackIosNewIcon/></Button>
                </Box>
                <Box>
                    <Box className='payment-total-title'>
                        Кино
                    </Box>
                    <Box className='payment-total-sum'>
                        {pre_order.sum}
                    </Box>
                </Box>
                <Box>
                    <Box className='payment-total-title'>
                        Общепит
                    </Box>
                    <Box className='payment-total-sum'>
                        {horder.sum}
                    </Box>
                </Box>
                <Box>
                    <Box className='payment-total-title'>
                        Всего
                    </Box>
                    <Box className='payment-total-sum'>
                        {pre_order.sum + horder.sum}
                    </Box>
                </Box>
                <Box>
                    <Box className='payment-total-title'>
                        Получил
                    </Box>
                    <Box className='payment-total-sum'>
                        0
                    </Box>
                </Box>
                <Box>
                    <Box className='payment-total-title'>
                        Сдача
                    </Box>
                    <Box className='payment-total-sum'>
                        0
                    </Box>
                </Box>
            </Box>
            <Box>

            </Box>
        </Box>
    )
}

export default Payment