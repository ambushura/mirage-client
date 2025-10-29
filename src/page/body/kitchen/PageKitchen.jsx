import {Box, Button} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import dayjs from "dayjs"
import {horeca_kitchen_get, horeca_kitchen_push} from "../../../service/fetch_service.js"
import {useEffect, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {setKitchenOrders} from "../../../redux/ordersReducer.js"
import Loader from "../../../ui/Loader.jsx"
import SkipNextIcon from '@mui/icons-material/SkipNext'

const KitchenOrderList = ({orders, showButtons, dispatch}) => {

    const filial = useSelector(state => state.data.filial)
    const uid_kitchen_points_selected = useSelector(state => state.orders.uid_kitchen_points_selected)

    return <>
        {orders.map(order => <motion.div
            className='kitchen-order'
            key={`${order.uid}${order.ver}`}
            variants={itemVariants}>
            <Box className='kitchen-order-header'>
                <Box sx={{ml: '4px'}}>{order.number}</Box>
                <Box>{dayjs.utc(order.date_create).format("HH:mm")}</Box>
                <Box>{dayjs.utc(order.date_change).format("HH:mm")}</Box>
            </Box>
            <Box className='kitchen-order-body'>
                {order.items.map((item, i) => <Box key={`${item.uid}${order.ver}`} className='kitchen-position'
                                                   style={{borderBottom: i !== order.items.length - 1 ? '1px dashed #b1b1b7' : 'none'}}>
                    {showButtons && <Button variant='outlined' color='secondary'
                                            className='kitchen-button'
                                            onClick={() => dispatch(horeca_kitchen_push(filial, order.uid, item.uid, uid_kitchen_points_selected, order.ver))}><SkipNextIcon/></Button>}
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{
                            display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'
                        }}>{item.take_away && <Box sx={{fontSize: '120%'}}>С СОБОЙ</Box>}{item.course > 0 &&
                            <Box sx={{fontSize: '120%'}}>{item.course} КУРС</Box>}</Box>
                        <Box sx={{
                            fontWeight: 'bold', overflow: 'hidden'
                        }}>{item.quantity} {item.unit_name}</Box>
                        <Box sx={{overflow: 'hidden', flex: 1}}>{item.name}</Box>
                        <Box>{item.comment}</Box>
                        {item.modifications !== null ? <Box sx={{
                            display: 'flex', flexDirection: 'row', flexWrap: 'wrap'
                        }}>{item.modifications.map(modification => {
                            return <Box key={modification}
                                        sx={{fontWeight: 'bold', padding: '4px 4px 0 0'}}>{modification}</Box>
                        })}</Box> : null}
                    </Box>
                </Box>)}
            </Box>
        </motion.div>)}
    </>
}

const KitchenSection = ({
                            orders, showButtons = true, dispatch
                        }) => <Box className='kitchen-section'>
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
</Box>

const PageKitchen = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const kitchen_orders = useSelector(state => state.orders.kitchen_orders)
    const uid_kitchen_points_selected = useSelector(state => state.orders.uid_kitchen_points_selected)
    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(horeca_kitchen_get(filial, param_date_admin, uid_kitchen_points_selected))
            set_fetching(fetching_result)
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.data !== null) {
                dispatch(setKitchenOrders(fetching_result.data))
            }
        }
        if (filial !== undefined && param_date_admin !== undefined) {
            fetch()
        }
    }, [dispatch, filial, param_date_admin, uid_kitchen_points_selected])

    return <Box id='content-box' sx={{overflowY: 'auto'}}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box id='content-header'></Box>
            {filial === undefined &&
                <Box className='empty-box' sx={{width: '100%', height: '100%'}}>Выберите филиал...</Box>}
            {fetching.loading && fetching.error === null && fetching.data === null && <Loader/>}
            {!fetching.loading && fetching.error !== null && fetching.data === null &&
                <Box className='empty-box' sx={{minHeight: 'calc(var(--page-height)'}}>{fetching.error}</Box>}
            {}
            {!fetching.loading && fetching.error === null && fetching.data !== null &&
                <Box id='content' sx={{height: 'calc(var(--page-height) - var(--footer-height)) !important'}}>
                    {kitchen_orders !== null && (kitchen_orders.waiting.length > 0 || kitchen_orders.cooking.length > 0 || kitchen_orders.completed.length > 0) ? <>
                        <Box className='kitchen-orders'>
                            <Box sx={{flex: 1}}>
                                <Box className='kitchen-section-header glass'>Ожидайте</Box>
                                <KitchenSection orders={kitchen_orders.waiting}
                                                dispatch={dispatch}/>
                            </Box>
                            <Box sx={{flex: 1}}>
                                <Box className='kitchen-section-header glass'>Начните готовить</Box>
                                <KitchenSection orders={kitchen_orders.cooking}
                                                dispatch={dispatch}/>
                            </Box>
                            <Box sx={{flex: 1}}>
                                <Box className='kitchen-section-header glass'>Отдайте официанту</Box>
                                <KitchenSection orders={kitchen_orders.completed}
                                                dispatch={dispatch}
                                                showButtons={false}/>
                            </Box>
                        </Box>
                    </> : <Box className='empty-box'>Ничего не нужно готовить...</Box>}
                </Box>}
            <Box id='content-footer'></Box>
        </Box>
    </Box>
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