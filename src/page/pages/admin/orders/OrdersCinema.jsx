import {Box, Pagination} from "@mui/material"
import {useSetOrdersCinema} from "../../../../hooks/pages/useSetOrdersCinema.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setOrdersCinemaPage} from "../../../../redux/ordersReducer.js"
import OrderCinema from "./OrderCinema.jsx"
import {motion} from 'framer-motion'

const OrdersCinema = () => {

    const dispatch = useDispatch()

    useSetOrdersCinema()

    const orders = useSelector(state => state.orders.orders_cinema || [])
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const page = useSelector(state => state.orders.orders_cinema_page)

    useEffect(() => {
        return () => dispatch(setOrdersCinemaPage(1))
    }, [dispatch, param_date_admin])

    return (
        <Box className='admin-orders-cinema'>
            <Box className='admin-orders-cinema-orders'>
                <Box className='admin-orders-cinema-orders-content'>
                    {orders.length > 0 ? orders.map(filial_data => {
                            const pages = filial_data.data !== null ? Math.ceil(filial_data.data.total_count / 20) : 0
                            return (
                                <>{filial_data.data !== null ?
                                    <Box className='admin-orders-cinema-filial-content' key={filial_data.filial.uid}>
                                        <Box className='admin-orders-cinema-filial-box'>
                                            <Box
                                                className='admin-orders-cinema-filial-orders'>{filial_data.data.orders.map((order, i) => {
                                                return (
                                                    <motion.div key={filial_data.filial.uid}
                                                                initial={{opacity: 0, y: 20}}
                                                                animate={{opacity: 1, y: 0}}
                                                                transition={{delay: i * 0.1, duration: 0.3}}>
                                                        <OrderCinema key={`${order.uid}${order.ver}`} order={order}/>
                                                    </motion.div>
                                                )
                                            })}
                                            </Box>
                                            {pages > 1 ? <Pagination sx={{
                                                    position: 'sticky',
                                                    left: 0,
                                                    height: '60px',
                                                    backgroundColor: 'var(--bgr-color)',
                                                    padding: '10px 0',
                                                    width: '100%',
                                                }}
                                                                     page={page}
                                                                     onChange={(event, value) => dispatch(setOrdersCinemaPage(value))}
                                                                     size={'large'}
                                                                     count={pages}
                                                                     showFirstButton showLastButton/>
                                                : null}
                                        </Box>
                                    </Box> : null}
                                </>
                            )
                        })
                        : null}
                </Box>
            </Box>
        </Box>
    )
}

export default OrdersCinema