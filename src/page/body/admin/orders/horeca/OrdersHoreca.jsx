import {Box, Pagination} from "@mui/material"
import {useSetOrdersHoreca} from "./useSetOrdersHoreca.js"
import {useDispatch, useSelector} from "react-redux"
import OrderHoreca from "./OrderHoreca.jsx"
import {setOrdersHorecaPage} from "../../../../../redux/ordersReducer.js"
import {AnimatePresence, motion} from 'framer-motion'

const OrdersHoreca = () => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)

    useSetOrdersHoreca()

    const data = useSelector(state => state.orders.orders_horeca || [])
    const page = useSelector(state => state.orders.orders_horeca_page)

    if (filial === undefined) {
        return <Box className='empty-box'>
            Выберите филиал...
        </Box>
    } else {
        return <Box className='admin-orders-horeca'>
            <Box className='admin-orders-horeca-orders'>
                <Box className='admin-orders-horeca-orders-content'>
                    {data.length > 0 ? data.map(filial_data => {
                            if (filial_data.error == null && !filial_data.loading && filial_data.data !== null) {
                                if (filial_data.data.orders.length === 0) {
                                    return <Box key='zero' className='empty-box' sx={{height: '100%'}}>Нет заказов в эту
                                        смену...</Box>
                                } else {
                                    const pages = Math.ceil(filial_data.data.total_count / 20)
                                    return <Box className='admin-orders-horeca-filial-content'
                                                key={filial_data.filial.uid}>
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
                                                        position: 'absolute',
                                                        left: 0,
                                                        bottom: 0,
                                                        height: '60px',
                                                        backgroundColor: 'var(--bgr-color)',
                                                        padding: '10px 0',
                                                        width: '100%',
                                                        zIndex: 1,
                                                    }}
                                                                        page={page}
                                                                        onChange={(event, value) => dispatch(setOrdersHorecaPage(value))}
                                                                        size={'large'}
                                                                        count={pages}
                                                                        showFirstButton showLastButton/>
                                                    : null}
                                        </Box>
                                    </Box>
                                }
                            }
                        })
                        : null}
                </Box>
            </Box>
        </Box>
    }
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
            duration: 0.2,
            ease: "easeOut"
        }
    }
}