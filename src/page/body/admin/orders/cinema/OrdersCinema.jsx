import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {setOrdersCinema} from "../../../../../redux/ordersReducer.js"
import OrderCinema from "./OrderCinema.jsx"
import {AnimatePresence, motion} from 'framer-motion'
import {useEffect, useState} from "react";
import {cinema_orders_get, common_order_find} from "../../../../../service/fetch_service.js"
import Loader from "../../../../../ui/Loader.jsx"

const OrdersCinema = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const page = useSelector(state => state.orders.orders_cinema_page)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const staff_selected = useSelector(state => state.orders.orders_cinema_filters_staff_selected)
    const state_selected = useSelector(state => state.orders.orders_cinema_filters_state_selected)
    const seances_selected = useSelector(state => state.orders.orders_cinema_filters_seances_selected)
    const halls_selected = useSelector(state => state.orders.orders_cinema_filters_halls_selected)
    const workplaces_selected = useSelector(state => state.orders.orders_cinema_filters_workplaces_selected)
    const buyer_emails_selected = useSelector(state => state.orders.orders_cinema_filters_buyer_emails_selected)
    const buyer_phone_numbers_selected = useSelector(state => state.orders.orders_cinema_filters_buyer_phone_numbers_selected)
    const from_site_selected = useSelector(state => state.orders.orders_cinema_filters_from_site_selected)
    const from_kiosk_selected = useSelector(state => state.orders.orders_cinema_filters_from_kiosk_selected)
    const from_wp_selected = useSelector(state => state.orders.orders_cinema_filters_from_wp_selected)
    const order_search_value = useSelector(state => state.orders.order_search_value)
    const update = useSelector(state => state.orders.orders_cinema_update)
    const data = useSelector(state => state.orders.orders_cinema || {orders: [], total_count: 0})

    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})

    useEffect(() => {
        const fetch_orders = async () => {
            const fetching_result = await dispatch(cinema_orders_get(filial, update, page, param_date_admin, staff_selected.map(({uid}) => uid), state_selected.map(({uid}) => uid), seances_selected.map(({uid}) => uid), halls_selected.map(({uid}) => uid), workplaces_selected.map(({uid}) => uid), buyer_emails_selected, buyer_phone_numbers_selected, from_site_selected, from_kiosk_selected, from_wp_selected))
            dispatch(setOrdersCinema(fetching_result.data))
            set_fetching(fetching_result)
        }
        const fetch_order = async () => {
            const fetching_result = await dispatch(common_order_find(filial, 'cinema', order_search_value))
            dispatch(setOrdersCinema(fetching_result.data))
            set_fetching(fetching_result)
        }
        if (filial !== undefined && order_search_value === null) {
            fetch_orders()
        } else if (filial !== undefined && order_search_value !== null) {
            fetch_order()
        }
    }, [dispatch, filial, update, page, buyer_emails_selected, buyer_phone_numbers_selected, from_kiosk_selected, from_site_selected, from_wp_selected, halls_selected, param_date_admin, seances_selected, staff_selected, state_selected, workplaces_selected, order_search_value])

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
        return <Box className='admin-orders-cinema'>
            <AnimatePresence>
                {data.orders.length > 0 && (<motion.div
                    className='admin-orders-cinema-filial-orders'
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}>{data.orders.map(order => <motion.div
                    className='admin-orders-cinema-order'
                    key={`${order.uid}${order.ver}`}
                    variants={itemVariants}>
                    <OrderCinema key={`${order.uid}${order.ver}`}
                                 order={order}/>
                </motion.div>)}
                </motion.div>)}
            </AnimatePresence>
        </Box>

    }
}

export default OrdersCinema

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