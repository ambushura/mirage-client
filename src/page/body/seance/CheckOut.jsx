import {useDispatch, useSelector} from "react-redux"
import {
    Box,
    Button,
    Dialog as MuiDialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress
} from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import Ticket from "./Ticket.jsx"
import {common_order_pay_kiosk, common_orders_receipts_get} from "../../../service/fetch_service.js"
import {useSetPaymentGroups} from "../../../hooks/common/useSetPaymentGroups.js"
import {useEffect} from "react"
import {setPreOrderPaying} from "../../../redux/ordersReducer.js"
import DotsAnimation from "../../../ui/DotsAnimation.jsx"

const CheckOut = (props) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)
    const wp = useSelector(state => state.interface.wp)
    const [payment_group,] = useSetPaymentGroups(pre_order)
    const pre_order_paying = useSelector(state => state.orders.pre_order_paying)

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
                            <span style={{marginRight: '10px'}}>Сумма заказа:</span>
                            <span>{pre_order.price} р</span>
                        </Box>
                    </Box>
                    <Button onClick={async () => {
                        await dispatch(setPreOrderPaying(true))
                        await dispatch(common_order_pay_kiosk(filial, wp, pre_order.uid, pre_order.ver, 'cinema', payment_group))
                        await dispatch(setPreOrderPaying(false))
                    }} variant='contained' color='primary' sx={{width: '100%', marginTop: '10px'}}>Оплатить</Button>
                </Box>
            </Box>
            <Box>
                <MuiDialog
                    open={pre_order_paying}
                    onClose={() => {
                    }}
                    aria-labelledby="paying-process"
                    PaperProps={{
                        sx: {
                            borderRadius: '30px',
                            backgroundColor: '#EFEFEF',
                            color: 'black',
                            minWidth: '335px',
                        }
                    }}
                >
                    <DialogTitle sx={{fontSize: '200%', textAlign: 'center', fontWeight: 900}}>Оплата
                        заказа</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{fontSize: '100%', textAlign: 'left', fontWeight: 900}}>
                            Следуйте инструкциям на пинпаде<DotsAnimation/>
                        </DialogContentText>
                    </DialogContent>
                </MuiDialog>
            </Box>
        </Box>
    )
}

export default CheckOut