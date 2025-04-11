import {Box, Fade} from "@mui/material"
import {useFetchOrdersCinema} from "../../../../hooks/fetching/useFetchOrdersCinema.js"
import {useDispatch, useSelector} from "react-redux"
import SeanceTitle from "../../../../components/cinema/SeanceTitle.jsx"
import Order from "../../../../components/orders/Order.jsx"
import {fetchPreOrder, TIMEOUT} from "../../../../service/fetch_service.js"
import {
    NEW_EMPTY_ORDER,
    setCurrentPreOrder, setOrdersCinemaFilialSeance,
} from "../../../../redux/ordersReducer.js"
import dayjs from "dayjs"
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import CancelIcon from '@mui/icons-material/Cancel'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'
import {useEffect, useState} from "react"

const OrdersCinema = () => {

    const dispatch = useDispatch()

    useFetchOrdersCinema()

    const orders_cinema = useSelector(state => state.orders.orders_cinema)
    const {filial, uid_seance} = useSelector(state => state.orders.orders_cinema_filial_seance)
    const pre_order = useSelector(state => state.orders.pre_order)
    const [orders, set_orders] = useState({data: {orders: [], uid_seance: undefined, schedule: []}, loading: false, error: null})

    useEffect(() => {
        if (orders_cinema.length > 0 && filial !== null) {
            const orders_new = orders_cinema.find(el => el.filial.uid === filial.uid)
            set_orders(orders_new)
        }
    }, [filial, orders_cinema])

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
                                            {filial_data.data.schedule.map((current_seance => {
                                                return (
                                                    <Box
                                                        onClick={() => {
                                                            dispatch(setOrdersCinemaFilialSeance({
                                                                filial: filial_data.filial,
                                                                uid_seance: current_seance.seance.uid
                                                            }))
                                                            dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                                                        }}
                                                        sx={{backgroundColor: uid_seance !== null && current_seance.seance.uid === uid_seance ? '#eaeaea' : null}}
                                                        key={`${current_seance.seance.uid}${current_seance.seance.ver}`}
                                                        className='admin-orders-cinema-seance'>
                                                        <SeanceTitle
                                                            content_type={true}
                                                            seance={current_seance.seance}
                                                            age={true}/>
                                                        <span style={{
                                                            flex: 1,
                                                            overflow: 'hidden',
                                                            textAlign: 'end'
                                                        }}>{current_seance.seance.name_film}</span>
                                                        <span style={{
                                                            backgroundColor: 'white',
                                                            color: 'black',
                                                            marginLeft: '10px',
                                                            padding: '4px 10px',
                                                            borderRadius: '6px'
                                                        }}>{current_seance.count}</span>
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
            {filial !== null && uid_seance !== null && !orders.loading && orders.error === null ?
                <Box className='admin-orders-list'>
                    <Box className='admin-orders-cinema-filial-name'>{filial.name}</Box>
                    <Fade in={orders.data.orders.length > 0} timeout={TIMEOUT} unmountOnExit>
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
                            {orders.data.orders.map(order => {
                                return (
                                    <Box sx={{backgroundColor: order.uid === pre_order.uid ? '#eaeaea' : null}}
                                         key={`${order.uid}${order.ver}`}
                                         className='admin-orders-list-content-order' onClick={() => {
                                        dispatch(fetchPreOrder(filial, order.uid))
                                    }}>
                                        <Box>{order.canceled ? <NotInterestedIcon/> : order.deleted || order.closed ?
                                            <CancelIcon/> :
                                            <PauseCircleOutlineIcon/>}</Box>
                                        <Box span style={{fontWeight: 'bold'}}>{order.number}</Box>
                                        <Box><span
                                            style={{color: '#8b919b'}}>{dayjs(order.date_create).format('DD.MM')}</span><span
                                            style={{
                                                fontWeight: 'bold',
                                                marginLeft: '4px'
                                            }}>{dayjs(order.date_create).format('HH:mm')}</span></Box>
                                        <Box><span
                                            style={{color: '#8b919b'}}>{dayjs(order.date_change).format('DD.MM')}</span><span
                                            style={{
                                                fontWeight: 'bold',
                                                marginLeft: '4px'
                                            }}>{dayjs(order.date_change).format('HH:mm')}</span></Box>
                                        <Box sx={{fontWeight: 'bold'}}>{order.quantity}</Box>
                                        <Box>{order.price} р</Box>
                                        <Box>{order.sum_discount !== 0 ? `${order.sum_discount} р` : null}</Box>
                                        <Box sx={{fontWeight: 'bold'}}>{order.sum} р</Box>
                                        <Box>{order.email}</Box>
                                        <Box>{order.phone}</Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Fade>
                </Box> : null}
            <Fade in={pre_order.in_base} timeout={TIMEOUT} unmountOnExit>
                <Box style={{flex: 1, paddingLeft: '10px'}}>
                    <Order/>
                </Box>
            </Fade>
        </Box>
    )
}

export default OrdersCinema