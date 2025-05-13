import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {horeca_order_fetch} from "../../../../service/fetch_service.js"

const OrderFood = (props) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const order = props.order

    return (
        <Box key={order.uid} className='admin-orders-horeca-order' onClick={() => {
            dispatch(horeca_order_fetch(filial, wp, order.uid))
        }}>
            <Box className='admin-orders-horeca-order-content'>
                <Box className='admin-orders-horeca-order-header'>
                    <Box className='admin-orders-horeca-order-header-1'>
                        <Box className='admin-orders-horeca-order-header-1-1'>
                            <Box className='admin-orders-horeca-order-header-1-1-1'>
                                {order.number}
                            </Box>
                            <Box className='admin-orders-horeca-order-header-1-1-2'>
                                {order.name_workplace}
                            </Box>
                        </Box>
                        <Box className='admin-orders-horeca-order-header-1-2'>
                            <Box className='admin-orders-horeca-order-header-1-2-1'>
                                {order.name_creator}
                            </Box>
                            <Box className='admin-orders-horeca-order-header-1-2-1'>
                                {'зал/место'}
                            </Box>
                        </Box>
                    </Box>
                    <Box className='admin-orders-horeca-order-header-2'>
                        <span>{order.date_change}</span>
                        <span>изменен</span>
                    </Box>
                    <Box className='admin-orders-horeca-order-header-3'>
                        <span>{order.date_create}</span>
                        <span>создан</span>
                    </Box>
                </Box>
                <Box className='admin-orders-horeca-order-body'>

                </Box>
                <Box className='admin-orders-horeca-order-footer'>

                </Box>
            </Box>
        </Box>
    )
}

export default OrderFood