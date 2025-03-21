import {Box, Button} from "@mui/material"
import {useSetPaymentMethods} from "../../hooks/payment/useSetPaymentMethods.js"
import {useFetchReceiptsFromOrder} from "../../hooks/payment/useFetchReceiptsFromOrder.js"
import {useDispatch, useSelector} from "react-redux"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {useEffect} from "react"
import Loader from "../modal/Loader.jsx"
import {setCash, setHorderPaying, setPreOrderPaying, setTotal} from "../../redux/ordersReducer.js"
import {openModal} from "../../redux/interfaceReducer.js"

const Payment = (props) => {

    const dispatch = useDispatch()

    const [payment_methods, payment_methods_error, payment_methods_loading] = useSetPaymentMethods()
    const [order_receipt, order_error, order_loading] = useFetchReceiptsFromOrder(props.type)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const total = useSelector(state => state.orders.total)
    const cash = useSelector(state => state.orders.cash)
    const change = useSelector(state => state.orders.change)

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

    useEffect(() => {
        dispatch(setTotal(pre_order.sum + horder.sum))
        dispatch(setCash(['clean', pre_order.sum + horder.sum]))
    }, [dispatch, horder.sum, pre_order.sum])

    return (
        <Box>
            <Box className='payment-total'>
                <Box sx={{display: 'flex', alignItems: 'none', cursor: 'pointer'}} onClick={() => {
                    props.type === 'cinema' ? dispatch(setPreOrderPaying(false)) : dispatch(setHorderPaying(false))
                }}><ArrowBackIosNewIcon/></Box>
                <Box sx={{backgroundColor: '#e4e2e2'}}>
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
                <Box sx={{backgroundColor: '#e4e2e2'}}>
                    <Box className='payment-total-title'>
                        Всего
                    </Box>
                    <Box className='payment-total-sum'>
                        {total}
                    </Box>
                </Box>
                <Box sx={{cursor: 'pointer'}} onClick={() => dispatch(openModal({type: 'calc', props: {}}))}>
                    <Box className='payment-total-title'>
                        Получил
                    </Box>
                    <Box className='payment-total-sum'>
                        {cash}
                    </Box>
                </Box>
                <Box style={{
                    backgroundColor: total > cash ? '#FF1A25' : '#50DB92',
                    color: total > cash ? 'white' : 'black'
                }}>
                    <Box className='payment-total-title'>
                        {total > cash ? 'Получи' : 'Верни'}
                    </Box>
                    <Box className='payment-total-sum'>
                        {Math.abs(change)}
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