import {Box} from "@mui/material"
import Order from "../../../../components/orders/Order.jsx"

const OrdersCinema = () => {
    return (
        <Box className='admin-orders-panel-cinema'>
            <Box className='admin-orders-panel-cinema-seances'>Сеансы</Box>
            <Box className='admin-orders-panel-cinema-orders'>Содержимое</Box>
            <Box>
                <Order/>
            </Box>
        </Box>
    )
}
export default OrdersCinema