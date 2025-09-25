import {
    Box,
    Button,
    Dialog as MuiDialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {cinema_order_delete, common_order_pay} from "../../service/fetch_service.js"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {
    ORDER_TIME_OUT,
    ORDER_TIME_REMAINING,
    setKioskPaymentError,
    setPreOrderPaying,
    setPreOrderTimeRemaining
} from "../../redux/ordersReducer.js"
import SeanceTitle from "../../components/cinema/SeanceTitle.jsx"
import {ticket_count} from "../../service/advanced.js"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {setKioskCheckout} from "../../redux/interfaceReducer.js"
import Loader from "../../ui/Loader.jsx"
import {useSetPaymentGroups} from "../../hooks/common/useSetPaymentGroups.js"

const CheckoutMenu = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const filial = useSelector(state => state.data.filial)
    const uid_user = useSelector(state => state.auth.uid)
    const pre_order = useSelector(state => state.orders.pre_order)
    const pre_order_paying = useSelector(state => state.orders.pre_order_paying)
    const seance = useSelector(state => state.schedule.seance)
    const hall = useSelector(state => state.halls.hall)
    const pre_order_time_remaining = useSelector(state => state.orders.pre_order_time_remaining)
    const kiosk_checkout = useSelector(state => state.interface.kiosk_checkout)
    const kiosk_payment_error = useSelector(state => state.orders.kiosk_payment_error)
    const [payment_group,] = useSetPaymentGroups(pre_order)

    useEffect(() => {
        if (uid_user === null) {
            if (pre_order_time_remaining <= 1) {
                navigate(-1)
                dispatch(cinema_order_delete(filial, pre_order.uid))
            }
        }
    }, [dispatch, filial, navigate, uid_user, pre_order, pre_order_time_remaining])

    useEffect(() => {
        if (uid_user === null) {
            const timer = setInterval(() => {
                if (!pre_order_paying) {
                    const new_time = pre_order_time_remaining - 1
                    dispatch(setPreOrderTimeRemaining(new_time))
                }
            }, ORDER_TIME_OUT)
            return () => {
                clearInterval(timer)
            }
        }
    }, [uid_user, pre_order_paying, pre_order_time_remaining])

    useEffect(() => {
        dispatch(setPreOrderTimeRemaining(ORDER_TIME_REMAINING))
    }, [pre_order.ver])

    if (seance !== undefined && hall !== null) {
        return <Box className='seance-header-kiosk glass-effect'>
            <Box className='order-panel'>
                <Button onClick={() => {
                    if (kiosk_checkout === 0) {
                        navigate(-1)
                        dispatch(cinema_order_delete(filial, pre_order.uid))
                    } else {
                        dispatch(setKioskCheckout(0))
                    }
                }} variant="contained"
                        color="secondary"><KeyboardArrowLeftIcon/>Назад</Button>
                <Box sx={{width: '100%', marginLeft: '10px'}}>
                    <LinearProgress className='order-progress glass-effect'
                                    sx={{height: '100%'}}
                                    value={pre_order_time_remaining}
                                    variant="determinate"/>
                </Box>
            </Box>
            {kiosk_checkout === 0 && <Box id='seance-title'>
                <Box className='seance-title-film-name'>{seance.name_film}</Box>
                <Box className='seance-title-hall-name'>Зал {hall.name_full}</Box>
                <Box className='seance-title-panel'>
                    <SeanceTitle
                        seance={seance}
                        content_type={true}
                        day={true}
                        its_hall_map={true}
                        age={false}/>
                    {pre_order.items.length > 0 ? <Button sx={{height: '48px', marginLeft: '10px'}}
                                                          variant="contained"
                                                          className='seance-title-preorder'
                                                          onClick={() => {
                                                              dispatch(setKioskCheckout(1))
                                                          }}>
                        <Box
                            style={{
                                display: 'flex', flexDirection: 'column', marginRight: '20px'
                            }}>
                            <Box style={{
                                fontSize: '12px', fontWeight: '400'
                            }}>{ticket_count(pre_order.quantity)}</Box>
                            <Box style={{fontWeight: 'bold'}}>{pre_order.price} P
                            </Box>
                        </Box>
                        <Box style={{
                            verticalAlign: 'center', textAlign: 'center', display: 'flex', fontWeight: 'bold'
                        }}>
                            <Box>К оплате</Box>
                            <KeyboardArrowRightIcon/>
                        </Box>
                    </Button> : <></>}
                </Box>
            </Box>}
            {kiosk_checkout === 1 && <Box id='seance-title'>
                <Box id="checkout-total">
                    <Box id='checkout-total-box'>
                        <Box className="checkout-order-title-box">
                            <span style={{marginRight: '10px'}}>Сумма заказа</span>
                            <span>{pre_order.price} р</span>
                        </Box>
                    </Box>
                    <Button onClick={async () => {
                        await dispatch(setKioskPaymentError(null))
                        await dispatch(setPreOrderPaying(true))
                        await dispatch(common_order_pay(filial, null, pre_order.uid, pre_order.ver, 'cinema', payment_group))
                        await dispatch(setPreOrderPaying(false))
                    }} variant='contained' color='primary' sx={{
                        width: '100%', marginTop: '10px'
                    }}>{kiosk_payment_error === null ? 'Оплатить' : 'Повторить оплату'}</Button>
                </Box>
                <MuiDialog
                    open={pre_order_paying}
                    onClose={() => {
                    }}
                    aria-labelledby="paying-process"
                    PaperProps={{
                        sx: {
                            borderRadius: '45px', backgroundColor: '#EFEFEF', color: 'black', minWidth: '530px',
                        }
                    }}
                >
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Box>
                            <Loader size={1.8}/>
                        </Box>
                        <Box>
                            <DialogTitle sx={{fontSize: '200%', fontWeight: 900, paddingBottom: 0}}>Оплата
                                заказа</DialogTitle>
                            <DialogContent>
                                <DialogContentText sx={{fontSize: '100%', fontWeight: 900}}>
                                    Следуйте инструкциям на пинпаде
                                </DialogContentText>
                            </DialogContent>
                        </Box>
                    </Box>
                </MuiDialog>
            </Box>}
        </Box>
    }
}

export default CheckoutMenu;