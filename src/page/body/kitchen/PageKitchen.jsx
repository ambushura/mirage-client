import {Box, Button} from "@mui/material"
import {useSetKitchen} from "./useSetKitchen.js"
import {useDispatch, useSelector} from "react-redux"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CircleIcon from '@mui/icons-material/Circle'
import dayjs from "dayjs"
import {horeca_kitchen_push} from "../../../service/fetch_service.js"
import AdminMenu from "../top-menu/AdminMenu.jsx";

const KitchenOrderList = ({orders, showButtons, dispatch, wp, filial}) => (
    <>
        {orders.map(order => (
            <Box className='kitchen-order' key={`${order.uid}${order.ver}`}>
                <Box className='kitchen-order-header'>
                    <CircleIcon sx={{color: '#d1d1d1'}}/>
                    <Box sx={{ml: '4px'}}>{order.number}</Box>
                    <Box>{dayjs.utc(order.date_create).format("HH:mm")}</Box>
                    <Box>{dayjs.utc(order.date_change).format("HH:mm")}</Box>
                </Box>
                <Box className='kitchen-order-body'>
                    {order.items.map(item => (
                        <Box key={`${item.uid}${order.ver}`} className='kitchen-position'>
                            {showButtons &&
                                <button className='kitchen-button'
                                        onClick={() => dispatch(horeca_kitchen_push(filial, wp, order.uid, item.uid))}>
                                    <CheckCircleOutlineIcon/>
                                </button>
                            }
                            <Box sx={{fontWeight: 'bold'}}>{item.quantity} {item.unit_name}</Box>
                            <Box sx={{ml: '4px'}}>{item.name}</Box>
                            <Box>{item.comment}</Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        ))}
    </>
)

const KitchenSection = ({title, orders, showButtons = true, dispatch, wp, filial}) => (
    <Box className='kitchen-section'>
        <Box className='kitchen-section-header'>{title}</Box>
        <Box className='kitchen-section-orders'>
            <KitchenOrderList orders={orders}
                              showButtons={showButtons}
                              dispatch={dispatch}
                              wp={wp}
                              filial={filial}/>
        </Box>
    </Box>
)

const PageKitchen = () => {

    const dispatch = useDispatch()

    useSetKitchen()

    const filials_orders = useSelector(state => state.orders.kitchen_orders || [])
    const wp = useSelector(state => state.interface.wp)

    return (
        <>
            <AdminMenu/>
            <Box id='kitchen-page'>
                {filials_orders.map(filial_orders => (
                    <>
                        {filial_orders.data !== null && (filial_orders.data.waiting.length > 0 || filial_orders.data.cooking.length > 0 || filial_orders.data.completed.length > 0) ?
                            <Box key={filial_orders.filial.uid} className='kitchen-filial'>
                                <Box><Button variant='contained' color='primary'
                                             size='small'>{filial_orders.filial.name}</Button></Box>
                                <Box className='kitchen-orders'>
                                    <KitchenSection title="Начните готовить"
                                                    orders={filial_orders.data.waiting}
                                                    dispatch={dispatch}
                                                    wp={wp}
                                                    filial={filial_orders.filial}/>
                                    <KitchenSection title="Готовятся"
                                                    orders={filial_orders.data.cooking}
                                                    dispatch={dispatch}
                                                    wp={wp}
                                                    filial={filial_orders.filial}/>
                                    <KitchenSection title="Готовы" orders={filial_orders.data.completed}
                                                    dispatch={dispatch}
                                                    wp={wp}
                                                    filial={filial_orders.filial}
                                                    showButtons={false}/>
                                </Box>
                            </Box>
                            : null
                        }
                    </>
                ))}
            </Box>
        </>
    )
}

export default PageKitchen