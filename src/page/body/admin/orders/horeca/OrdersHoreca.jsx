import {Box, Pagination} from "@mui/material"
import {useSetOrdersHoreca} from "./useSetOrdersHoreca.js"
import {useDispatch, useSelector} from "react-redux"
import OrderHoreca from "./OrderHoreca.jsx"
import {setOrdersHorecaPage} from "../../../../../redux/ordersReducer.js"
import {useEffect} from "react"
import {AnimatePresence, motion} from 'framer-motion'

const OrdersHoreca = () => {

    const dispatch = useDispatch()

    useSetOrdersHoreca()

    const orders = useSelector(state => state.orders.orders_horeca || [])
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const page = useSelector(state => state.orders.orders_horeca_page)

    useEffect(() => {
        return () => dispatch(setOrdersHorecaPage(1))
    }, [dispatch, param_date_admin])

    return (
        <Box className='admin-orders-horeca'>
            <Box className='admin-orders-horeca-orders'>
                <Box className='admin-orders-horeca-orders-content'>
                    {orders.length > 0 ? orders.map(filial_data => {
                            if (filial_data.error == null && !filial_data.loading && filial_data.data !== null) {
                                const pages = Math.ceil(filial_data.data.total_count / 20)
                                return (
                                    <Box className='admin-orders-horeca-filial-content' key={filial_data.filial.uid}>
                                        <Box className='admin-orders-horeca-filial-box'>
                                            <AnimatePresence>
                                                {filial_data.data.orders.length > 0 && (
                                                    <motion.div
                                                        className='admin-orders-horeca-filial-orders'
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="hidden"
                                                        variants={containerVariants}>{filial_data.data.orders.map(order =>
                                                        <motion.div
                                                            className='admin-orders-horeca-order'
                                                            key={`${order.uid}${order.ver}`}
                                                            variants={itemVariants}>
                                                            <OrderHoreca order={order}/>
                                                        </motion.div>)}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            {
                                                pages > 1 ? <Pagination sx={{
                                                        position: 'sticky',
                                                        left: 0,
                                                        height: '60px',
                                                        backgroundColor: 'var(--bgr-color)',
                                                        padding: '10px 0',
                                                        width: '100%',
                                                    }}
                                                                        page={page}
                                                                        onChange={(event, value) => dispatch(setOrdersHorecaPage(value))}
                                                                        size={'large'}
                                                                        count={pages}
                                                                        showFirstButton showLastButton/>
                                                    : null}
                                        </Box>
                                    </Box>
                                )
                            }
                        })
                        : null}
                </Box>
            </Box>
        </Box>
    )
}

export default OrdersHoreca

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
            duration: 0.4,
            ease: "easeOut"
        }
    }
}