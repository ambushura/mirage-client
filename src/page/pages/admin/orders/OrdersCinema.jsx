import {Box, Button} from "@mui/material"
import {useFetchOrdersCinema} from "../../../../hooks/fetching/useFetchOrdersCinema.js"
import {useDispatch, useSelector} from "react-redux"
import SeanceTitle from "../../../../components/cinema/SeanceTitle.jsx"
import {useState} from "react"
import Order from "../../../../components/orders/Order.jsx"
import {fetchPreOrder} from "../../../../service/fetch_service.js"
import {NEW_EMPTY_ORDER, setCurrentPreOrder} from "../../../../redux/ordersReducer.js"
import dayjs from "dayjs"

const OrdersCinema = () => {

    const dispatch = useDispatch()

    const pre_order = useSelector(state => state.orders.pre_order)
    useFetchOrdersCinema()
    const orders = useSelector(state => state.orders.orders_cinema)
    const [seance, set_seance] = useState(null)
    const [filial, set_filial] = useState(null)

    const order_button = (o) => {
        return (
            <Button color={o.uid === pre_order.uid ? 'info' : 'secondary'} variant='contained' key={o.uid}
                    className='admin-orders-orders-buttons-button' sx={{marginBottom: '4px'}} onClick={() => {
                dispatch(fetchPreOrder(filial, o.uid))
            }}>
                <span>{o.number}</span>
                <span>{dayjs(o.date_create).format('DD.MM.YYYY HH:mm')}</span>
                <span>{dayjs(o.date_change).format('DD.MM.YYYY HH:mm')}</span>
            </Button>
        )
    }

    return (
        <Box className='admin-orders-cinema'>
            <Box className='admin-orders-schedule'>
                {orders.map(filial_data => {
                    if (filial_data.loading) {
                        return null
                    } else if (filial_data.error !== null) {
                        return (
                            <Box className='admin-orders-cinema-filial' key={filial_data.filial.uid}>
                                <Box className='admin-orders-cinema-filial-name'>{filial_data.filial.name}</Box>
                                <Button variant='contained' color='primary' className='admin-orders-cinema-seance'
                                        sx={{marginBottom: '5px'}}>{filial_data.error}</Button>
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
                                                <Button
                                                    onClick={() => {
                                                        set_seance(seance_orders)
                                                        set_filial(filial_data.filial)
                                                        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                                                    }}
                                                    variant='contained' color={seance !== null && seance_orders.seance.uid === seance.seance.uid ? 'info' : 'secondary'}
                                                    key={seance_orders.seance.uid}
                                                    className='admin-orders-cinema-seance'
                                                    sx={{marginBottom: '5px'}}>
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
                                                </Button>
                                            )
                                        }))}
                                    </Box>
                                </Box>
                            </Box>
                        )
                    }
                })}
            </Box>
            <Box className='admin-orders-orders'>
                {filial !== null ? <Box className='admin-orders-cinema-filial-name'>{filial.name}</Box> : null}
                {seance !== null ?
                    <Box className='admin-orders-orders-buttons'>
                        {seance.orders.map(order => {
                            return (
                                order_button(order)
                            )
                        })}
                    </Box>
                    : null}
            </Box>
            <Box style={{flex: 1, paddingLeft: '10px'}}>
                <Order/>
            </Box>
        </Box>
    )
}

export default OrdersCinema