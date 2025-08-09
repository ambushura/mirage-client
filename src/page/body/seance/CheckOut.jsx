import {useDispatch, useSelector} from "react-redux"
import {
    Box,
    Button,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress
} from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import Ticket from "./Ticket.jsx"
import {common_order_pay_kiosk, common_orders_receipts_get} from "../../../service/fetch_service.js"
import {useSetPaymentGroups} from "../../../hooks/common/useSetPaymentGroups.js"
import {useEffect, useState} from "react"

const CheckOut = (props) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)
    const wp = useSelector(state => state.interface.wp)
    const [payment_group,] = useSetPaymentGroups(pre_order)
    const [paying, set_paying] = useState(0)

    useEffect(() => {
        dispatch(common_orders_receipts_get(filial, wp, 'cinema', pre_order.uid))
    }, [])

    return (
        <Box id='checkout'>
            <Box>
                <Box className='order-panel'>
                    <Button onClick={() => {
                        props.set_check_out(0)
                    }} variant="contained" color="secondary"><KeyboardArrowLeftIcon/>Назад</Button>
                    <Box sx={{width: '100%', marginLeft: '10px'}}>
                        <LinearProgress className='order-progress'
                                        sx={{height: '100%'}} value={props.time_remaining} variant="determinate"/>
                    </Box>
                </Box>
            </Box>
            <Box id="checkout-order">
                <Box>
                    <Box className="checkout-order-title">Ваш заказ</Box>
                    <Box className="checkout-order-tickets-box">
                        <Box className="checkout-order-tickets">
                            {pre_order.items.map(ticket => {
                                return (
                                    <Ticket
                                        key={ticket.uid}
                                        ticket={ticket}
                                    />
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
                <Box id="checkout-total">
                    <Box id='checkout-total-box'>
                        <Box className="checkout-order-title-box">
                            <span>Ваш заказ</span>
                            <span>{pre_order.price} P</span>
                        </Box>
                    </Box>
                    <Button onClick={() => {
                        set_paying(1)
                        dispatch(common_order_pay_kiosk(filial, wp, pre_order.uid, pre_order.ver, 'cinema', payment_group))
                    }} variant='contained' color='primary' sx={{width: '100%', marginTop: '10px'}}>Оплатить</Button>
                </Box>
            </Box>
            {paying ? <Box>
                <MuiDialog
                    open={true}
                    onClose={() => {
                    }}
                    aria-labelledby="confirm-dialog-title"
                    maxWidth="xk"
                >
                    <DialogTitle id="confirm-dialog-title">Оплата заказа</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Следуйте инструкциям на пинпаде
                        </DialogContentText>
                    </DialogContent>
                </MuiDialog>
            </Box> : null}
        </Box>
    )
}

export default CheckOut