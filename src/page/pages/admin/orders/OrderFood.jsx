import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {horeca_order_fetch} from "../../../../service/fetch_service.js"
import CircleIcon from '@mui/icons-material/Circle'
import dayjs from "dayjs";

const OrderFood = (props) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const order = props.order

    return (
        <Box key={order.uid} className='admin-orders-horeca-order' onClick={() => {
            dispatch(horeca_order_fetch(filial, wp, order.uid))
        }}>
            <Box className='admin-orders-horeca-order-content' sx={{fontSize: '80%'}}>
                <Box className='admin-orders-horeca-order-header' sx={{display: 'flex', flex: 1, height: '15%'}}>
                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CircleIcon sx={{scale: 1.5, color: order.closed ? 'green' : order.canceled || order.deleted ? 'red' : 'gray'}}/>
                    </Box>
                    <Box sx={{flexGrow: 1}}>
                        <Box>{order.number}</Box>
                        <Box>{order.name_creator}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                        <Box sx={{display: 'flex'}}>
                            <Box>
                                <Box>Создан</Box>
                                <Box>{dayjs(order.date_create).format("DD.MM HH:mm")}</Box>
                            </Box>
                            <Box>
                                <Box>Изменен</Box>
                                <Box>{dayjs(order.date_change).format("HH:mm")}</Box>
                            </Box>
                        </Box>
                        <Box>
                            Зал 1, место 2
                            {order.name_hall}
                            {order.name_place}
                        </Box>
                    </Box>
                </Box>
                <Box className='admin-orders-horeca-order-body' sx={{height: '60%', flex: 1, overflowX: 'hidden', overflowY: 'auto'}}>
                    {order.items_grouped.map((item, i) => {
                            return (
                                <Box key={i + order.ver}>
                                    <Box sx={{width: '10px'}}></Box>
                                    <Box sx={{width: '10px'}}></Box>
                                    <Box>
                                        <Box>{item.name}</Box>
                                    </Box>
                                </Box>
                            )
                        }
                    )}
                </Box>
                <Box className='admin-orders-horeca-order-footer' sx={{height: '25%', flex: 1,}}>
                    <Box>{order.comment}</Box>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Box>e-mail: {order.buyer_email}</Box>
                        <Box>Телефон: {order.buyer_phone_number}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box>{order.quantity} товаров</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default OrderFood