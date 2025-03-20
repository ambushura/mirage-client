import {Box, Button} from "@mui/material"
import {useSetPaymentMethods} from "../../hooks/payment/useSetPaymentMethods.js"
import {useFetchReceiptsFromOrder} from "../../hooks/payment/useFetchReceiptsFromOrder.js"
import {useDispatch, useSelector} from "react-redux"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {useEffect} from "react"
import Loader from "../modal/Loader.jsx"
import {setHorderPaying, setPreOrderPaying} from "../../redux/ordersReducer.js"

const Payment = (props) => {

    const dispatch = useDispatch()

    const [payment_methods, payment_methods_error, payment_methods_loading] = useSetPaymentMethods()
    const [order_receipt, order_error, order_loading] = useFetchReceiptsFromOrder(props.type)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)

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
                        props.type === 'cinema' ? dispatch(setPreOrderPaying(false)) : dispatch(setHorderPaying(false))
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
                {paymentMethodsArray()}
            </Box>
        </Box>
    )
}

export default Payment