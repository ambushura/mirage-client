import {Autocomplete, Box, Button, TextField} from "@mui/material"
import {useSetKitchen} from "./useSetKitchen.js"
import {useDispatch, useSelector} from "react-redux"
import CircleIcon from '@mui/icons-material/Circle'
import dayjs from "dayjs"
import {horeca_kitchen_push} from "../../../service/fetch_service.js"
import AdminMenu from "../top-menu/AdminMenu.jsx"
import {Fragment} from "react"
import {motion, AnimatePresence} from "framer-motion"
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'

const KitchenOrderList = ({orders, showButtons, dispatch, wp, filial}) => (
    <>
        {orders.map(order => (
            <motion.div
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
                    {order.items.map(item => (
                        <Box key={`${item.uid}${order.ver}`} className='kitchen-position'>
                            {showButtons &&
                                <button className='kitchen-button'
                                        onClick={() => dispatch(horeca_kitchen_push(filial, wp, order.uid, item.uid))}>
                                    <PlayCircleFilledWhiteIcon sx={{color: 'white'}}/>
                                </button>
                            }
                            <Box sx={{
                                fontWeight: 'bold',
                                maxWidth: '50px',
                                minWidth: '50px',
                                overflow: 'hidden'
                            }}>{item.quantity} {item.unit_name}</Box>
                            <Box sx={{ml: '4px', overflow: 'hidden'}}>{item.name}</Box>
                            <Box>{item.comment}</Box>
                        </Box>
                    ))}
                </Box>
            </motion.div>
        ))}
    </>
)

const KitchenSection = ({
                            orders, showButtons = true, dispatch, wp, filial
                        }) => (
    <Box className='kitchen-section'>
        <AnimatePresence>
            {
                orders.length > 0 && (
                    <motion.div
                        className='kitchen-section-orders'
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={containerVariants}>
                        <KitchenOrderList orders={orders}
                                          showButtons={showButtons}
                                          dispatch={dispatch}
                                          wp={wp}
                                          filial={filial}/>
                    </motion.div>
                )
            }
        </AnimatePresence>
    </Box>
)

const show_kitchen_filters = () => {
    return <Box sx={{width: '400px', marginRight: '4px'}}>
        {tags("large", true, 4, "orders-seances-tags", [], "Цеха", "Цех", [])}
    </Box>
}

const tags = (size, multiply, limit_tags, id, options, label, placeholder, selected_uid = []) => {
    return (
        <Autocomplete
            onChange={(event, new_value) => {
            }}
            value={selected_uid}
            noOptionsText={'Нет подходящих опций'}
            size={size}
            multiple={multiply}
            limitTags={limit_tags}
            id={id}
            options={options}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
                <TextField sx={{width: '100%'}} variant='filled' {...params} label={label}
                           placeholder={placeholder}/>
            )}
            sx={{width: '100%', marginBottom: 0}}
            isOptionEqualToValue={(option, value) => option.uid === value.uid}
        />
    )
}

const PageKitchen = () => {

    const dispatch = useDispatch()

    useSetKitchen()

    const filials_orders = useSelector(state => state.orders.kitchen_orders || [])
    const wp = useSelector(state => state.interface.wp)

    return (
        <>
            <AdminMenu/>
            <Box id='content-box'>
                <Box id='content-wrap'>
                    <Box id='content'>
                        {filials_orders.map(filial_orders => (
                            <Fragment key={filial_orders.filial.uid}>
                                {filial_orders.data !== null && (filial_orders.data.waiting.length > 0 || filial_orders.data.cooking.length > 0 || filial_orders.data.completed.length > 0) ?
                                    <>
                                        <Box sx={{
                                            position: 'sticky',
                                            top: 0,
                                            marginLeft: '4px',
                                            backgroundColor: '#f8f8f8',
                                            zIndex: 1,
                                            padding: '4px 0',
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}>{show_kitchen_filters()}
                                            <Button variant='contained' color='primary'
                                                    size='small'>{filial_orders.filial.name}</Button>
                                        </Box>
                                        <Box className='kitchen-orders'>
                                            <Box sx={{flex: 1}}>
                                                <Box className='kitchen-section-header'>Начните готовить</Box>
                                                <KitchenSection orders={filial_orders.data.waiting}
                                                                dispatch={dispatch}
                                                                wp={wp}
                                                                filial={filial_orders.filial}/>
                                            </Box>
                                            <Box sx={{flex: 1}}>
                                                <Box className='kitchen-section-header'>Готовятся</Box>
                                                <KitchenSection orders={filial_orders.data.cooking}
                                                                dispatch={dispatch}
                                                                wp={wp}
                                                                filial={filial_orders.filial}/>
                                            </Box>
                                            <Box sx={{flex: 1}}>
                                                <Box className='kitchen-section-header'>Готовы</Box>
                                                <KitchenSection orders={filial_orders.data.completed}
                                                                dispatch={dispatch}
                                                                wp={wp}
                                                                filial={filial_orders.filial}
                                                                showButtons={false}/>
                                            </Box>
                                        </Box>
                                    </>
                                    : null
                                }
                            </Fragment>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default PageKitchen

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