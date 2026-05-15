import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { horeca_kitchen_get, horeca_kitchen_push } from '../../../../../service/fetch_service.js'
import { memo, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { setKitchenOrders } from '../../../../../redux/desktop/frontoffice/ordersReducer.js'
import Loader from '../../../../../ui/Loader.jsx'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import { openModal } from '../../../../../redux/desktop/frontoffice/interfaceReducer.js'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const KitchenOrderList = ({ orders, showButtons, dispatch, showTimer, printKitchen }) => {
    const filial = useSelector((state) => state.data.filial)
    const uid_kitchen_points_selected = useSelector((state) => state.orders.uid_kitchen_points_selected)

    return (
        <>
            {orders.map((order) => {
                if (order.items.length > 0) {
                    return (
                        <motion.div
                            className={`kitchen-order ${order.canceled && order.items.length > 3 ? 'kitchen-order-canceled' : order.canceled && order.items.length <= 3 ? 'kitchen-order-1-line-canceled' : ''}`}
                            key={`${order.uid}${order.ver}`}
                            variants={itemVariants}
                            style={{ overflowY: `${order.canceled ? 'hidden' : 'auto'}` }}
                        >
                            <Box className="kitchen-order-header glass">
                                <Box sx={{ borderBottom: '2px solid #4a4a4b' }}>
                                    <Button
                                        disabled={order.canceled}
                                        variant="text"
                                        color="secondary"
                                        sx={{ fontSize: '150%' }}
                                        onClick={() => {
                                            if (printKitchen)
                                                dispatch(
                                                    openModal({
                                                        type: 'kitchen_print',
                                                        props: { order: order },
                                                    })
                                                )
                                        }}
                                    >
                                        Счет {order.number}
                                    </Button>
                                </Box>
                                <Box sx={{ flex: 1, paddingLeft: '12px', overflow: 'hidden' }}>
                                    <Box sx={{ fontWeight: '500' }}>создан в {dayjs.utc(order.date_create).format('HH:mm')}</Box>
                                    {showTimer && (
                                        <Box sx={{ color: '#8B919B' }}>
                                            <ElapsedTime from={dayjs.utc(order.date_create)} />
                                        </Box>
                                    )}
                                    <Box sx={{ width: '100%' }}>{order.user_name}</Box>
                                </Box>
                            </Box>
                            <Box className="kitchen-order-body">
                                {order.items.map((item, i) => (
                                    <Box
                                        key={`${item.uid}${order.ver}`}
                                        className="kitchen-position"
                                        style={{
                                            borderBottom: i !== order.items.length - 1 && !item.canceled ? '1px dashed #b1b1b7' : 'none',
                                        }}
                                    >
                                        {showButtons && (
                                            <Button
                                                variant="text"
                                                color="secondary"
                                                className="kitchen-button"
                                                onClick={() =>
                                                    dispatch(
                                                        horeca_kitchen_push(
                                                            filial,
                                                            order.uid,
                                                            item.uid,
                                                            uid_kitchen_points_selected,
                                                            order.ver
                                                        )
                                                    )
                                                }
                                            >
                                                <SkipNextIcon fontSize={'large'} />
                                            </Button>
                                        )}
                                        <Box
                                            className={`${item.canceled ? 'kitchen-item-canceled' : ''}`}
                                            sx={{ display: 'flex', flexDirection: 'column' }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {item.take_away && <Box sx={{ fontSize: '120%', marginRight: '5px' }}>С СОБОЙ</Box>}
                                                {item.course > 0 && <Box sx={{ fontSize: '120%' }}>{item.course + 1} КУРС</Box>}
                                            </Box>
                                            <Box
                                                sx={{
                                                    fontWeight: 'bold',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {item.quantity} {item.unit_name}
                                            </Box>
                                            <Box sx={{ overflow: 'hidden', flex: 1 }}>{item.name}</Box>
                                            <Box>{item.comment}</Box>
                                            {item.modifications !== null ? (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                    }}
                                                >
                                                    {item.modifications.map((modification) => {
                                                        return (
                                                            <Box key={modification} sx={{ fontWeight: 'bold', padding: '4px 4px 0 0' }}>
                                                                {modification}
                                                            </Box>
                                                        )
                                                    })}
                                                </Box>
                                            ) : null}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </motion.div>
                    )
                }
            })}
        </>
    )
}

const KitchenSection = ({ orders, showButtons = true, dispatch, showTimer, printKitchen }) => (
    <Box className="kitchen-section">
        <AnimatePresence>
            {orders.length > 0 && (
                <motion.div
                    className="kitchen-section-orders"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                >
                    <KitchenOrderList
                        orders={orders}
                        showButtons={showButtons}
                        dispatch={dispatch}
                        showTimer={showTimer}
                        printKitchen={printKitchen}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    </Box>
)

const PageKitchen = () => {
    const dispatch = useDispatch()

    const filial = useSelector((state) => state.data.filial)
    const param_date_admin = useSelector((state) => state.interface.params.param_date_admin)
    const kitchen_orders = useSelector((state) => state.orders.kitchen_orders)
    const uid_kitchen_points_selected = useSelector((state) => state.orders.uid_kitchen_points_selected)
    const [fetching, set_fetching] = useState({ loading: false, error: null, data: null })

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

    return (
        <Box id="content-box" sx={{ overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box id="content-header"></Box>
                {filial === undefined && (
                    <Box className="empty-box" sx={{ width: '100%', height: '100%' }}>
                        Выберите филиал...
                    </Box>
                )}
                {fetching.loading && fetching.error === null && fetching.data === null && <Loader />}
                {!fetching.loading && fetching.error !== null && fetching.data === null && (
                    <Box className="empty-box" sx={{ minHeight: 'calc(var(--page-height)' }}>
                        {fetching.error}
                    </Box>
                )}
                {}
                {!fetching.loading && fetching.error === null && fetching.data !== null && (
                    <Box id="content" sx={{ height: 'calc(var(--page-height) - var(--footer-height)) !important' }}>
                        {kitchen_orders !== null && (kitchen_orders.cooking.length > 0 || kitchen_orders.completed.length > 0) ? (
                            <>
                                <Box className="kitchen-orders">
                                    <Box sx={{ flex: 2 }}>
                                        <Box className="kitchen-section-header glass">НАЧНИТЕ ГОТОВИТЬ</Box>
                                        <KitchenSection
                                            orders={kitchen_orders.cooking}
                                            dispatch={dispatch}
                                            showTimer={true}
                                            printKitchen={false}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box className="kitchen-section-header glass">ГОТОВЫ</Box>
                                        <KitchenSection
                                            orders={kitchen_orders.completed}
                                            dispatch={dispatch}
                                            showButtons={false}
                                            showTimer={false}
                                            printKitchen={true}
                                        />
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <Box className="empty-box">Ничего не нужно готовить...</Box>
                        )}
                    </Box>
                )}
                <Box id="content-footer"></Box>
            </Box>
        </Box>
    )
}

export default PageKitchen

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
            ease: 'easeOut',
        },
    },
}

export const ElapsedTime = memo(({ from }) => {
    const [now, setNow] = useState(() => dayjs())

    useEffect(() => {
        const id = setInterval(() => setNow(dayjs()), 1000)
        return () => clearInterval(id)
    }, [])

    const localFrom = dayjs(new Date(new Date(from.$y, from.$M, from.$D, from.$H, from.$m, from.$s)))
    const diffMs = Math.max(0, now.diff(localFrom))
    const d = dayjs.duration(diffMs)
    const diffMinutes = d.asMinutes()

    let color = '#e90007'
    if (diffMinutes <= 10) {
        color = 'green'
    } else if (diffMinutes <= 15) {
        color = '#ff8100'
    }

    let text = ''
    if (d.asMinutes() < 1) {
        text = `${d.seconds()} с`
    } else if (d.asHours() < 1) {
        text = `${d.minutes()} м ${d.seconds()} с`
    } else {
        text = `${Math.floor(d.asHours())} ч ${d.minutes()} м ${d.seconds()} с`
    }

    return <span style={{ color }}>{text}</span>
})
