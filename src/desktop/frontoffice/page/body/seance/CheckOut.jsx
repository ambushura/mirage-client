import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import Ticket from './Ticket.jsx'
import { common_orders_receipts_get } from '../../../../../service/fetch_service.js'
import { useEffect } from 'react'
import { setKioskPaymentError } from '../../../../../redux/frontoffice/ordersReducer.js'

const CheckOut = () => {
    const dispatch = useDispatch()

    const filial = useSelector((state) => state.data.filial)
    const pre_order = useSelector((state) => state.orders.pre_order)
    const kiosk_payment_error = useSelector((state) => state.orders.kiosk_payment_error)

    useEffect(() => {
        if (pre_order.in_base) {
            dispatch(common_orders_receipts_get(filial, 'cinema', pre_order.uid))
        }
        return () => {
            dispatch(setKioskPaymentError(null))
        }
    }, [dispatch, filial, pre_order.uid])

    return (
        <Box id="content-box" sx={{ overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box id="content-header"></Box>
                <Box id="content">
                    <Box id="checkout-order">
                        <Box>
                            {kiosk_payment_error !== null ? (
                                <Box className="checkout-order-payment-error">
                                    <span>ОШИБКА ОПЛАТЫ</span>
                                    <span>{kiosk_payment_error}</span>
                                </Box>
                            ) : null}
                            <Box className="checkout-order-tickets-box">
                                <Box className="checkout-order-tickets">
                                    {pre_order.items.map((ticket) => {
                                        return <Ticket key={ticket.uid} ticket={ticket} />
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box></Box>
                </Box>
                <Box id="content-footer"></Box>
            </Box>
        </Box>
    )
}

export default CheckOut
