import {Autocomplete, Box, TextField} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import CircleIcon from '@mui/icons-material/Circle'
import dayjs from "dayjs"
import {horeca_kitchen_get, horeca_kitchen_push} from "../../../service/fetch_service.js"
import AdminMenu from "../top-menu/AdminMenu.jsx"
import {useEffect} from "react"
import {motion, AnimatePresence} from "framer-motion"
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import {setKitchenOrders} from "../../../redux/ordersReducer.js"

const KitchenOrderList = ({orders, showButtons, dispatch}) => {
    const filial = useSelector(state => state.data.filial)
    return (<>
        {orders.map(order => (<motion.div
            className='kitchen-order'
            key={`${order.uid}${order.ver}`}
            variants={itemVariants}>
            <Box className='kitchen-order-header'>
                <CircleIcon sx={{color: '#d1d1d1'}}/>
                <Box sx={{ml: '4px'}}>{order.number}</Box>
                <Box>{dayjs.utc(order.date_create).format("HH:mm")}</Box>
                <Box>{dayjs.utc(order.date_change).format("HH:mm")}</Box>
            </Box>
            <Box className='kitchen-order-body'>
                {order.items.map(item => (<Box key={`${item.uid}${order.ver}`} className='kitchen-position'>
                    {showButtons && <button className='kitchen-button'
                                            onClick={() => dispatch(horeca_kitchen_push(filial, order.uid, item.uid))}>
                        <PlayCircleFilledWhiteIcon sx={{color: 'white'}}/>
                    </button>}
                    <Box sx={{
                        fontWeight: 'bold', maxWidth: '50px', minWidth: '50px', overflow: 'hidden'
                    }}>{item.quantity} {item.unit_name}</Box>
                    <Box sx={{ml: '4px', overflow: 'hidden'}}>{item.name}</Box>
                    <Box>{item.comment}</Box>
                </Box>))}
            </Box>
        </motion.div>))}
    </>)
}

const KitchenSection = ({
                            orders, showButtons = true, dispatch
                        }) => (<Box className='kitchen-section'>
    <AnimatePresence>
        {orders.length > 0 && (<motion.div
            className='kitchen-section-orders'
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}>
            <KitchenOrderList orders={orders}
                              showButtons={showButtons}
                              dispatch={dispatch}/>
        </motion.div>)}
    </AnimatePresence>
</Box>)

const PageKitchen = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const kitchen_orders = useSelector(state => state.orders.kitchen_orders)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(horeca_kitchen_get(filial, param_date_admin))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.data !== null) {
                dispatch(setKitchenOrders(fetching_result.data))
            }
        }
        if (filial !== undefined && param_date_admin !== undefined) {
            fetch()
        }
    }, [dispatch, filial, param_date_admin])

    return (<>
        <AdminMenu/>
        <Box id='content-box'>
            <Box id='content-wrap'>
                <Box id='content'>
                    {kitchen_orders !== null && (kitchen_orders.waiting.length > 0 || kitchen_orders.cooking.length > 0 || kitchen_orders.completed.length > 0) ? <>
                        <Box className='kitchen-orders'>
                            <Box sx={{flex: 1}}>
                                <Box className='kitchen-section-header'>Ожидайте</Box>
                                <KitchenSection orders={kitchen_orders.waiting}
                                                dispatch={dispatch}/>
                            </Box>
                            <Box sx={{flex: 1}}>
                                <Box className='kitchen-section-header'>Начните готовить</Box>
                                <KitchenSection orders={kitchen_orders.cooking}
                                                dispatch={dispatch}/>
                            </Box>
                            <Box sx={{flex: 1}}>
                                <Box className='kitchen-section-header'>Отдайте официанту</Box>
                                <KitchenSection orders={kitchen_orders.completed}
                                                dispatch={dispatch}
                                                showButtons={false}/>
                            </Box>
                        </Box>
                    </> : null}
                </Box>
            </Box>
        </Box>
    </>)
}

export default PageKitchen

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
            duration: 0.4, ease: "easeOut"
        }
    }
}