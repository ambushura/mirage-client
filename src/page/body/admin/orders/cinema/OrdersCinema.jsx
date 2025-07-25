import {Box, Pagination} from "@mui/material"
import {useSetOrdersCinema} from "./useSetOrdersCinema.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setOrdersCinemaPage} from "../../../../../redux/ordersReducer.js"
import OrderCinema from "./OrderCinema.jsx"
import {AnimatePresence, motion} from 'framer-motion'

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
                            if (filial_data.error == null && !filial_data.loading && filial_data.data !== null) {
                                const pages = Math.ceil(filial_data.data.total_count / 20)
                                return (
                                    <Box className='admin-orders-cinema-filial-content' key={filial_data.filial.uid}>
                                        <Box className='admin-orders-cinema-filial-box'>
                                            <AnimatePresence>
                                                {filial_data.data.orders.length > 0 && (
                                                    <motion.div
                                                        className='admin-orders-cinema-filial-orders'
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="hidden"
                                                        variants={containerVariants}>{filial_data.data.orders.map(order =>
                                                        <motion.div
                                                            className='admin-orders-cinema-order'
                                                            key={`${order.uid}${order.ver}`}
                                                            variants={itemVariants}>
                                                            <OrderCinema key={`${order.uid}${order.ver}`}
                                                                         order={order}/>
                                                        </motion.div>
                                                    )}
                                                    </motion.div>)}
                                            </AnimatePresence>
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
                                    </Box>
                                )
                            } else if (filial_data.loading) {
                                // ДОПОЛНИТЬ ЗАГРУЖАЕТСЯ
                            } else if (filial_data.error !== null) {
                                // ДОПОЛНИТЬ ОШИБКА ЗАГРУЗКИ
                            }
                        })
                        : null}
                </Box>
            </Box>
        </Box>
    )
}

export default OrdersCinema

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    }
}