import {Box, Fade, TextField} from "@mui/material"
import {useSetOrdersCinema} from "../../../../hooks/pages/useSetOrdersCinema.js"
import {useDispatch, useSelector} from "react-redux"
import SeanceTitle from "../../../../components/cinema/SeanceTitle.jsx"
import {cinema_order_fetch} from "../../../../service/fetch_service.js"
import {NEW_EMPTY_ORDER, setCurrentPreOrder, setOrdersCinemaFilialSeance,} from "../../../../redux/ordersReducer.js"
import dayjs from "dayjs"
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import CancelIcon from '@mui/icons-material/Cancel'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'
import {TIMEOUT} from "../../../../redux/interfaceReducer.js"

const OrdersCinema = (props) => {

    const dispatch = useDispatch()

    useSetOrdersCinema(props.update_cinema)

    const order_cinema_schedule = useSelector(state => state.orders.orders_cinema_schedule)
    const orders_cinema = useSelector(state => state.orders.orders_cinema || [])
    const {current_filial, current_uid_seance} = useSelector(state => state.orders.orders_cinema_filial_seance || [])
    const wp = useSelector(state => state.interface.wp)

    const pre_order = useSelector(state => state.orders.pre_order)

    return (
        <Box className='admin-orders-cinema'>
            <Box className='admin-orders-schedule'>
                {order_cinema_schedule.map(filial_data => {
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
                                        {filial_data.data !== null && filial_data.data.map((seance => {
                                            return (
                                                <Box
                                                    onClick={() => {
                                                        dispatch(setOrdersCinemaFilialSeance({
                                                            current_filial: filial_data.filial,
                                                            current_uid_seance: seance.seance.uid
                                                        }))
                                                        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                                                    }}
                                                    sx={{backgroundColor: current_uid_seance !== null && seance.seance.uid === current_uid_seance ? '#eaeaea' : null}}
                                                    key={`${seance.seance.uid}${seance.seance.ver}`}
                                                    className='admin-orders-cinema-seance'>
                                                    <SeanceTitle
                                                        content_type={true}
                                                        seance={seance.seance}
                                                        age={true}/>
                                                    <span style={{
                                                        flex: 1,
                                                        overflow: 'hidden',
                                                        textAlign: 'end'
                                                    }}>{seance.seance.name_film}</span>
                                                    <span style={{
                                                        backgroundColor: 'white',
                                                        color: 'black',
                                                        marginLeft: '10px',
                                                        padding: '4px 10px',
                                                        borderRadius: '6px'
                                                    }}>{seance.count}</span>
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
            {current_filial !== null && current_uid_seance !== null ?
                <Box className='admin-orders-list'>
                    <Box className='admin-orders-cinema-filial-name'>{current_filial.name}</Box>
                    <Fade in={orders_cinema !== undefined} timeout={TIMEOUT} unmountOnExit>
                        <Box className='admin-orders-list-content'>
                            <Box className='admin-orders-list-content-order-header'>
                                <Box></Box>
                                <TextField size='small' label="Номер" variant='filled'/>
                                <TextField size='small' label="Создан" variant='filled'/>
                                <TextField size='small' label="Изменен" variant='filled'/>
                                <TextField size='small' label="Кол-во" variant='filled'/>
                                <TextField size='small' label="Цена" variant='filled'/>
                                <TextField size='small' label="Скидка" variant='filled'/>
                                <TextField size='small' label="Сумма" variant='filled'/>
                                <TextField size='small' label="Фамилия" variant='filled'/>
                                <TextField size='small' label="Имя" variant='filled'/>
                                <TextField size='small' label="Отчество" variant='filled'/>
                                <TextField size='small' label="Телефон" variant='filled'/>
                                <TextField size='small' label="e-mail" variant='filled'/>
                            </Box>
                            {orders_cinema !== undefined && orders_cinema.map(order => {
                                return (
                                    <Box sx={{backgroundColor: order.uid === pre_order.uid ? '#eaeaea' : null}}
                                         key={`${order.uid}${order.ver}`}
                                         className='admin-orders-list-content-order' onClick={() => {
                                        dispatch(cinema_order_fetch(current_filial, wp, order.uid))
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
                                        <Box>{order.buyer_s}</Box>
                                        <Box>{order.buyer_n}</Box>
                                        <Box>{order.buyer_o}</Box>
                                        <Box>{order.buyer_email}</Box>
                                        <Box>{order.buyer_phone_number}</Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Fade>
                </Box> : null}
        </Box>
    )
}

export default OrdersCinema