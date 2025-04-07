import {Box, Button} from "@mui/material"
import {useFetchOrdersCinema} from "../../../../hooks/fetching/useFetchOrdersCinema.js"
import {useSelector} from "react-redux"
import SeanceTitle from "../../../../components/cinema/SeanceTitle.jsx"

const OrdersCinema = () => {

    useFetchOrdersCinema()

    const orders = useSelector(state => state.orders.orders_cinema)

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
                                                <Button variant='contained' color='secondary'
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
                Заказы
            </Box>
        </Box>
    )
}

export default OrdersCinema