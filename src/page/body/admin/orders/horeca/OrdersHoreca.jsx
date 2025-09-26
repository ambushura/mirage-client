import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import OrderHoreca from "./OrderHoreca.jsx"
import {setOrdersHoreca} from "../../../../../redux/ordersReducer.js"
import {AnimatePresence, motion} from 'framer-motion'
import {useEffect, useState} from "react"
import {common_order_find, horeca_orders_get} from "../../../../../service/fetch_service.js"
import Loader from "../../../../../ui/Loader.jsx"

const OrdersHoreca = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const page = useSelector(state => state.orders.orders_horeca_page)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const staff_selected = useSelector(state => state.orders.orders_horeca_filters_staff_selected)
    const state_selected = useSelector(state => state.orders.orders_horeca_filters_state_selected)
    const halls_selected = useSelector(state => state.orders.orders_horeca_filters_halls_selected)
    const workplaces_selected = useSelector(state => state.orders.orders_horeca_filters_workplaces_selected)
    const kitchen_points_selected = useSelector(state => state.orders.orders_horeca_filters_kitchen_points_selected)
    const kitchen_state_selected = useSelector(state => state.orders.orders_horeca_filters_kitchen_state_selected)
    const order_search_value = useSelector(state => state.orders.order_search_value)
    const update = useSelector(state => state.orders.orders_horeca_update)
    const data = useSelector(state => state.orders.orders_horeca || {orders: [], total_count: 0})

    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})

    useEffect(() => {
        const fetch_orders = async () => {
            const fetching_result = await dispatch(horeca_orders_get(filial, update, page, param_date_admin, staff_selected.map(({uid}) => uid), state_selected.map(({uid}) => uid), halls_selected.map(({uid}) => uid), workplaces_selected.map(({uid}) => uid), kitchen_points_selected.map(({uid}) => uid), kitchen_state_selected.map(({uid}) => uid)))
            if (!fetching_result.loading && fetching_result.error === null && fetching_result.data != null) {
                dispatch(setOrdersHoreca(fetching_result.data))
            }
            set_fetching(fetching_result)
        }
        const fetch_order = async () => {
            const fetching_result = await dispatch(common_order_find(filial, 'horeca', order_search_value))
            if (!fetching_result.loading && fetching_result.error === null && fetching_result.data != null) {
                dispatch(setOrdersHoreca(fetching_result.data))
            }
            set_fetching(fetching_result)
        }
        if (filial !== undefined && order_search_value === null) {
            fetch_orders()
        } else if (filial !== undefined && order_search_value !== null) {
            fetch_order()
        }
        return () => {
            dispatch(setOrdersHoreca({orders: [], total_count: 0}))
        }
    }, [dispatch, filial, halls_selected, kitchen_points_selected, kitchen_state_selected, order_search_value, page, param_date_admin, staff_selected, state_selected, update, workplaces_selected])

    if (filial === undefined) {
        return <Box className='empty-box'>
            Выберите филиал...
        </Box>
    } else if (fetching.loading) {
        return <Loader/>
    } else if (fetching.error !== null) {
        return <Box className='empty-box'>{fetching.error}</Box>
    } else if (fetching.data !== null && fetching.data.total_count === 0) {
        return <Box className='empty-box'
                    sx={{height: '100%'}}>{order_search_value === null ? 'Нет заказов на эту дату...' : 'Ничего не найдено...'}</Box>
    } else if (data !== null) {
        return <Box className='admin-orders-horeca'>
            <AnimatePresence>
                {data.orders.length > 0 && <motion.div
                    className='admin-orders-horeca-filial-orders'
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}>
                    {data.orders.map(order => <motion.div
                        className='admin-orders-horeca-order'
                        key={`${order.uid}${order.ver}`}
                        variants={itemVariants}>
                        <OrderHoreca order={order}/>
                    </motion.div>)}
                </motion.div>}
            </AnimatePresence>
        </Box>
    }
}

export default OrdersHoreca

const containerVariants = {
    hidden: {}, visible: {
        transition: {
            staggerChildren: 0.03, delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: {opacity: 0, y: 20}, visible: {
        opacity: 1, y: 0, transition: {
            duration: 0.2, ease: "easeOut"
        }
    }
}