import {useDispatch, useSelector} from "react-redux"
import {Box, Button, LinearProgress} from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import Ticket from "./Ticket.jsx"
import {payment} from "../../../service/fetch_service.js"

const CheckOut = (props) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)
    const wp = useSelector(state => state.data.wp)

    return (
        <Box id='checkout'>
            <Box>
                <Box className='order-panel'>
                    <Button onClick={() => {
                        props.set_check_out(false)
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
                        dispatch(payment(filial, pre_order.uid, wp))
                    }} variant='contained' color='primary' sx={{width: '100%', marginTop: '10px'}}>Оплатить</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CheckOut