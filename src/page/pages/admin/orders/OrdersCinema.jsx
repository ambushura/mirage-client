import {Box, Fade} from "@mui/material"
import {useFetchOrdersCinema} from "../../../../hooks/fetching/useFetchOrdersCinema.js"
import {useDispatch, useSelector} from "react-redux"
import SeanceTitle from "../../../../components/cinema/SeanceTitle.jsx"
import Order from "../../../../components/orders/Order.jsx"
import {fetchPreOrder, TIMEOUT} from "../../../../service/fetch_service.js"
import {
    NEW_EMPTY_ORDER,
    setCurrentPreOrder,
    setOrdersCinemaFilialSeance,
} from "../../../../redux/ordersReducer.js"
import dayjs from "dayjs"
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import CancelIcon from '@mui/icons-material/Cancel'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'

const OrdersCinema = () => {

    const dispatch = useDispatch()

    useFetchOrdersCinema()

    const orders_cinema = useSelector(state => state.orders.orders_cinema)
    const {filial, seance} = useSelector(state => state.orders.orders_cinema_filial_seance)
    const pre_order = useSelector(state => state.orders.pre_order)

    const order_button = (o) => {
        return (
            <Box sx={{backgroundColor: o.uid === pre_order.uid ? '#eaeaea' : null}} key={o.uid}
                 className='admin-orders-list-content-order' onClick={() => {
                dispatch(fetchPreOrder(filial, o.uid))
            }}>
                <Box>{o.canceled ? <NotInterestedIcon/> : o.deleted || o.closed ? <CancelIcon/> :
                    <PauseCircleOutlineIcon/>}</Box>
                <Box span style={{fontWeight: 'bold'}}>{o.number}</Box>
                <Box><span style={{color: '#8b919b'}}>{dayjs(o.date_create).format('DD.MM')}</span><span
                    style={{fontWeight: 'bold', marginLeft: '4px'}}>{dayjs(o.date_create).format('HH:mm')}</span></Box>
                <Box><span style={{color: '#8b919b'}}>{dayjs(o.date_change).format('DD.MM')}</span><span
                    style={{fontWeight: 'bold', marginLeft: '4px'}}>{dayjs(o.date_change).format('HH:mm')}</span></Box>
                <Box sx={{fontWeight: 'bold'}}>{o.quantity}</Box>
                <Box>{o.price} р</Box>
                <Box>{o.sum_discount !== 0 ? `${o.sum_discount} р` : null}</Box>
                <Box sx={{fontWeight: 'bold'}}>{o.sum} р</Box>
                <Box>{o.email}</Box>
                <Box>{o.phone}</Box>
            </Box>
        )
    }

    if (orders_cinema.length > 0) {
        return (
            <Box className='admin-orders-cinema'>
                <Fade in={orders_cinema.length > 0} timeout={TIMEOUT} unmountOnExit>
                    <Box className='admin-orders-schedule'>
                        {orders_cinema.map(filial_data => {
                            if (filial_data.loading) {
                                return null
                            } else if (filial_data.error !== null) {
                                return (
                                    <Box className='admin-orders-cinema-filial' key={filial_data.filial.uid}>
                                        <Box className='admin-orders-cinema-filial-name'>{filial_data.filial.name}</Box>
                                        <Box className='admin-orders-cinema-seance'>{filial_data.error}</Box>
                                    </Box>
                                )
                            } else {
                                return (
                                    <Box className='admin-orders-cinema-filial' key={filial_data.filial.uid}>
                                        <Box className='admin-orders-cinema-filial-name'>{filial_data.filial.name}</Box>
                                        <Box className='admin-orders-cinema-filial-content'>
                                            <Box className='admin-orders-cinema-seances'>
                                                {filial_data.data.seances_orders.map((seance_orders => {
                                                    return (
                                                        <Box
                                                            onClick={() => {
                                                                dispatch(setOrdersCinemaFilialSeance({
                                                                    filial: filial_data.filial,
                                                                    seance: seance_orders
                                                                }))
                                                                dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                                                            }}
                                                            sx={{backgroundColor: seance !== null && seance_orders.seance.uid === seance.seance.uid ? '#eaeaea' : null}}
                                                            key={seance_orders.seance.uid}
                                                            className='admin-orders-cinema-seance'>
                                                            <SeanceTitle
                                                                content_type={true}
                                                                seance={seance_orders.seance}
                                                                age={true}/>
                                                            <span style={{
                                                                flex: 1,
                                                                overflow: 'hidden',
                                                                textAlign: 'end'
                                                            }}>{seance_orders.seance.name_film}</span>
                                                            <span style={{
                                                                backgroundColor: 'white',
                                                                color: 'black',
                                                                marginLeft: '10px',
                                                                padding: '4px 10px',
                                                                borderRadius: '6px'
                                                            }}>{seance_orders.orders.length}</span>
                                                        </Box>
                                                    )
                                                }))}
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            }
                        })}
                    </Box>
                </Fade>
                {filial !== null && seance !== null ? <Box className='admin-orders-list'>
                    <Box className='admin-orders-cinema-filial-name'>{filial.name}</Box>
                    <Fade in={seance.orders.length > 0} timeout={TIMEOUT} unmountOnExit>
                        <Box className='admin-orders-list-content'>
                            <Box className='admin-orders-list-content-order-header'>
                                <Box></Box>
                                <Box>Номер</Box>
                                <Box>Создан</Box>
                                <Box>Изменен</Box>
                                <Box>Кол-во</Box>
                                <Box>Цена</Box>
                                <Box>Скидка</Box>
                                <Box>Сумма</Box>
                                <Box>Телефон</Box>
                                <Box>e-mail</Box>
                            </Box>
                            {seance.orders.map(order => {
                                return (
                                    order_button(order)
                                )
                            })}
                        </Box>
                    </Fade>
                </Box> : null}
                <Box style={{flex: 1, paddingLeft: '10px'}}>
                    <Order/>
                </Box>
            </Box>
        )
    } else {
        return null
    }
}

export default OrdersCinema