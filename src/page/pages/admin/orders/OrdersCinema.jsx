import {Box} from "@mui/material"
import Order from "../../../../components/orders/Order.jsx"
import {useFetchOrdersCinema} from "../../../../hooks/fetching/useFetchOrdersCinema.js"
import Loader from "../../../../components/modal/Loader.jsx"

const OrdersCinema = () => {

    const orders_cinema = useFetchOrdersCinema()

    return (
        <Box className='admin-orders-panel-cinema'>
            <Box className='admin-orders-panel-cinema-seances'>Сеансы</Box>
            <Box className='admin-orders-panel-cinema-orders'>
                {orders_cinema.map(filial_data => {
                    if (filial_data.loading) {
                        return <Loader key='0'/>
                    } else if (filial_data.error !== null) {
                        return <div key='1'>{filial_data.error}</div>
                    } else {
                        return (
                            <Box key={filial_data.filial.uid}>
                                <div>{filial_data.filial.name}</div>
                                <Box>{filial_data.data.seances_orders.map(((seance_orders, i) => {
                                    return (
                                        <Box key={i}>
                                            <Box>{seance_orders.seance.name_film}</Box>
                                            <Box>
                                                {seance_orders.orders.map(order => {
                                                    return (
                                                        <Box key={order.uid}>{order.number}</Box>
                                                    )
                                                })}
                                            </Box>
                                        </Box>
                                    )
                                }))}</Box>
                            </Box>
                        )
                    }
                })}
            </Box>
            <Box>
                <Order/>
            </Box>
        </Box>
    )
}

export default OrdersCinema