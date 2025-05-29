import {Box, Button, ButtonGroup} from "@mui/material"
import {
    Cached as CachedIcon,
    Close as CloseIcon,
    Delete as DeleteIcon,
    DeleteForever as DeleteForeverIcon,
    Receipt as ReceiptIcon
} from '@mui/icons-material'
import {useDispatch, useSelector} from "react-redux"
import SeanceTitle from "../cinema/SeanceTitle.jsx"
import BookingItem from "./cinema/BookingItem.jsx"
import HorecaItem from "./horeca/HorecaItem.jsx"
import {useNavigate} from "react-router-dom"
import Payment from "./Payment.jsx"
import {
    NEW_EMPTY_HORDER,
    NEW_EMPTY_ORDER,
    setCurrentHorder,
    setCurrentPreOrder,
    setHorderPaying,
    setPreOrderPaying
} from "../../redux/ordersReducer.js"
import {
    cinema_order_delete,
    cinema_order_fetch,
    horeca_order_fetch,
    markirovka_km_check
} from "../../service/fetch_service.js"
import {openModal} from "../../redux/interfaceReducer.js"
import {Fragment, useEffect, useState} from "react"
import RemoveDoneIcon from '@mui/icons-material/RemoveDone'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {motion} from 'framer-motion'

const OrderPanel = ({
                        height,
                        type,
                        order,
                        paying,
                        setPaying,
                        emptyOrder,
                        fetchOrder,
                        deleteOrder,
                        navigateTo,
                        addContact,
                        dispatch,
                        uid_selected,
                        set_uid_selected,
                        filial,
                        wp
                    }) => (
    <Box className="order-box" style={{height: height}}>
        {paying ? <Payment type={type}/> : (
            <>
                <Box className="order-box-panel-1">
                    <ButtonGroup size='large'>
                        <Button variant="contained" color="info" onClick={() => setPaying(true)}><ReceiptIcon/></Button>
                        <Button variant="contained" color="secondary" onClick={fetchOrder}><CachedIcon/></Button>
                        <Button variant="contained" color="primary" onClick={deleteOrder}><DeleteForeverIcon/></Button>
                        <Button variant="contained" color="secondary" onClick={emptyOrder}><CloseIcon/></Button>
                        {uid_selected.length > 0 ?
                            <Button variant="outlined" color="secondary" sx={{marginRight: '4px'}} onClick={() => {
                                set_uid_selected([])
                            }} endIcon={<RemoveDoneIcon/>}>{uid_selected.length}</Button> : null}
                    </ButtonGroup>
                    <Box className="order-box-panel-1-sum-number">
                        <span className='order-box-panel-1-number'>{`№${order.number}`}</span>
                        <span className='order-box-panel-1-sum'>{Math.round(order.sum).toLocaleString('ru-RU')} Р</span>
                    </Box>
                </Box>
                {type === 'cinema' && (
                    <>
                        <Box className="order-box-panel-2">
                            <Button variant="contained" color="secondary"
                                    onClick={addContact}><ContactMailIcon/></Button>
                            <ButtonGroup size='large' sx={{marginLeft: '4px'}}>
                                <Button variant="contained" color="secondary" onClick={() => {
                                    dispatch(openModal({
                                        type: 'comment_order',
                                        props: {order_type: 'cinema', action_type: 'order', order: order}
                                    }))
                                }}><BorderColorIcon/></Button>
                                <Button variant="contained" color="secondary"><DeleteIcon/></Button>
                            </ButtonGroup>
                            <ButtonGroup size='small'>
                                <Button variant="contained" color="secondary" sx={{marginLeft: '4px'}} onClick={() => {
                                    dispatch(openModal({type: 'discounts', props: {uid_positions: uid_selected}}))
                                }}>Скидки</Button>
                                <Button variant="contained" color="secondary"><DeleteIcon/></Button>
                            </ButtonGroup>
                        </Box>
                        <Box className="order-box-panel-3" onClick={navigateTo}>
                            <SeanceTitle
                                seance={{
                                    uid: order.seance_uid,
                                    beginning: order.seance_beginning,
                                    ending: order.seance_ending,
                                    copy_type: order.film_copy_type,
                                    rate_age: order.film_rate_age,
                                    content_type: order.seance_content_type
                                }} content_type={true} day={true} its_hall_map={true} age={true}/>
                            <Box className='seance-title-film-name'>{order.film_name}</Box>
                            <Box className='seance-title-hall-name'>Зал {order.hall_full_name}</Box>
                        </Box>
                        <Box className="order-box-panel-4">
                            <Box className='order-booking'>{order.items.map(booking => (
                                <BookingItem key={booking.uid}
                                             {...booking}
                                             uid_order={order.uid}
                                             uid_selected={uid_selected}
                                             set_uid_selected={set_uid_selected}/>
                            ))}</Box>
                        </Box>
                    </>
                )}
                {type === 'horeca' && (
                    <>
                        <Box className="order-box-panel-2">
                            <Button variant="contained" color="secondary"
                                    onClick={addContact}><ContactMailIcon/></Button>
                            <ButtonGroup sx={{marginLeft: '4px', marginBottom: '4px'}} size='small'>
                                <ButtonGroup sx={{marginRight: '4px'}} size='large'>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                        dispatch(openModal({
                                            type: 'comment_order',
                                            props: {order_type: 'horeca', action_type: 'order', order: order}
                                        }))
                                    }}><BorderColorIcon/></Button>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                    }}><DeleteIcon/></Button>
                                </ButtonGroup>
                                <ButtonGroup sx={{marginRight: '4px'}} size='small'>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                    }}>Разделить</Button>
                                </ButtonGroup>
                                <ButtonGroup size='small'>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                    }}>Стол</Button>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                    }}><DeleteIcon/></Button>
                                </ButtonGroup>
                            </ButtonGroup>
                        </Box>
                        <Box className="order-box-panel-adv">
                            <Button variant="contained" color="secondary" onClick={() => {
                                dispatch(markirovka_km_check(filial, wp, order.uid))
                            }}>Проверить ЧЗ</Button>
                        </Box>
                        <Box className="order-box-panel-3">
                            {[1, 2, 3, 0].map(state => (
                                order.items.some(item => item.kitchen.state === state) && (
                                    <Fragment key={`${state}`}>
                                        <Box
                                            className={`order-box-panel-3-title-${['others', 'for-kitchen', 'kitchen', 'kitchen-ready'][state]}`}>{['Без кухни', 'Отправить на кухню', 'На кухне', 'Приготовлено'][state]}</Box>
                                        <ul className={`order-box-panel-3-list-${['others', 'for-kitchen', 'kitchen', 'kitchen-ready'][state]}`}>
                                            {order.items.filter(item => item.kitchen.state === state).map(item =>
                                                <HorecaItem
                                                    uid_order={order.uid}
                                                    key={`${item.uid}${order.ver}`}
                                                    item={item}
                                                    uid_selected={uid_selected}
                                                    set_uid_selected={set_uid_selected}/>)}
                                        </ul>
                                    </Fragment>
                                )
                            ))}
                        </Box>
                    </>
                )}
            </>
        )}
    </Box>
)

const Order = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cities = useSelector(state => state.data.cities)
    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const pre_order_paying = useSelector(state => state.orders.pre_order_paying)
    const horder_paying = useSelector(state => state.orders.horder_paying)
    const wp = useSelector(state => state.interface.wp)
    const [uid_horeca_selected, set_uid_horeca_selected] = useState([])
    const [uid_cinema_selected, set_uid_cinema_selected] = useState([])

    const seance_link = () => {
        const city = cities.find(el => el.uid === pre_order.uid_city)
        const fil = city?.filials.find(el => el.uid === pre_order.uid_filial)
        return fil ? `/seance/${city.code}/${fil.eais}/${pre_order.uid_seance}/` : '/'
    }

    useEffect(() => {
        set_uid_horeca_selected([])
    }, [horder.ver])

    useEffect(() => {
        set_uid_cinema_selected([])
    }, [pre_order.ver])

    return (
        <Box id='order'>
            {pre_order.in_base ? (
                <motion.div key={pre_order.uid}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1, duration: 0.2}}
                            exit={{opacity: 0, y: 20}}>
                    <OrderPanel
                        height={horder.in_base ? '50%' : '100%'}
                        type='cinema'
                        order={pre_order}
                        paying={pre_order_paying}
                        setPaying={value => dispatch(setPreOrderPaying(value))}
                        emptyOrder={() => dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))}
                        fetchOrder={() => dispatch(cinema_order_fetch(filial, wp, pre_order.uid))}
                        deleteOrder={() => dispatch(cinema_order_delete(filial, wp, pre_order.uid))}
                        navigateTo={() => navigate(seance_link())}
                        addContact={() => {
                            dispatch(openModal({
                                type: 'add_contact',
                                props: {order_type: 'cinema', order: pre_order}
                            }))
                        }}
                        dispatch={dispatch}
                        uid_selected={uid_cinema_selected}
                        set_uid_selected={set_uid_cinema_selected}
                        filial={filial}
                        wp={wp}
                    />
                </motion.div>
            ) : null}
            {horder.in_base ? (
                <motion.div key={horder.uid}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1, duration: 0.2}}
                            exit={{opacity: 0, y: 20}}>
                    <OrderPanel
                        height={pre_order.in_base ? '50%' : '100%'}
                        type='horeca'
                        order={horder}
                        paying={horder_paying}
                        setPaying={value => dispatch(setHorderPaying(value))}
                        emptyOrder={() => dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))}
                        fetchOrder={() => dispatch(horeca_order_fetch(filial, wp, horder.uid))}
                        dispatch={dispatch}
                        uid_selected={uid_horeca_selected}
                        set_uid_selected={set_uid_horeca_selected}
                        addContact={() => {
                            dispatch(openModal({
                                type: 'add_contact',
                                props: {order_type: 'horeca', order: horder}
                            }))
                        }}
                        filial={filial}
                        wp={wp}
                    />
                </motion.div>
            ) : null}
        </Box>
    )
}

export default Order
