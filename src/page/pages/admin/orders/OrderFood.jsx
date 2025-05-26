import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {horeca_order_fetch} from "../../../../service/fetch_service.js"
import CircleIcon from '@mui/icons-material/Circle'
import dayjs from "dayjs"
import {useEffect, useState} from "react"
import {
    ITEMS_TYPE_ITEMS, ITEMS_TYPE_MARK_EGAIS,
    PAYMENT_STATE_SLIP_WITHOUT_RECEIPT,
    PAYMENT_STATE_SUCCESS,
    PAYMENT_STATE_WAITING
} from "../../../../redux/interfaceReducer.js"

const groupItems = (items_grouped, payment_state) => {
    const items = [], mark_egais = []
    items_grouped
        .filter(el => el.payment_state === payment_state)
        .forEach(el => el.mark_egais ? items.push(el) : mark_egais.push(el))
    return {items, mark_egais}
}

const RenderGroup = ({label, group, ver}) => {
    if (!group.items.length && !group.mark_egais.length) return null
    const renderItems = (items, typeLabel) => items.length > 0 && (
        <>
            <Box>{typeLabel}</Box>
            {items.map((item, i) => (
                <Box key={i + ver} sx={{display: 'flex'}}>
                    <Box sx={{width: '10px'}}/>
                    <Box sx={{width: '10px'}}/>
                    <Box><Box>{item.name}</Box></Box>
                </Box>
            ))}
        </>
    )
    return (
        <>
            <Box>{label}</Box>
            {renderItems(group.items, ITEMS_TYPE_ITEMS)}
            {renderItems(group.mark_egais, ITEMS_TYPE_MARK_EGAIS)}
        </>
    )
}

const OrderFood = ({order}) => {
    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const [groups, setGroups] = useState({
        waiting: {items: [], mark_egais: []},
        slip: {items: [], mark_egais: []},
        success: {items: [], mark_egais: []}
    })

    useEffect(() => {
        setGroups({
            waiting: groupItems(order.items_grouped, 'waiting'),
            slip: groupItems(order.items_grouped, 'slip_without_receipt'),
            success: groupItems(order.items_grouped, 'success')
        })
    }, [order])

    const getCircleColor = () =>
        order.closed ? '#50DB92' :
            order.canceled || order.deleted ? '#9e0007' : '#d1d1d1'

    return (
        <Box key={order.uid} className='admin-orders-horeca-order' onClick={() =>
            dispatch(horeca_order_fetch(filial, wp, order.uid))
        }>
            <Box className='admin-orders-horeca-order-content' sx={{fontSize: '80%'}}>
                <Box className='admin-orders-horeca-order-header' sx={{display: 'flex', height: '15%'}}>
                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CircleIcon sx={{scale: 1.5, color: getCircleColor()}}/>
                    </Box>
                    <Box sx={{flexGrow: 1}}>
                        <Box>{order.number}</Box>
                        <Box>{order.name_creator}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                        <Box sx={{display: 'flex'}}>
                            <Box>
                                <Box>Создан</Box>
                                <Box>{dayjs(order.date_create).format("DD.MM HH:mm")}</Box>
                            </Box>
                            <Box>
                                <Box>Изменен</Box>
                                <Box>{dayjs(order.date_change).format("HH:mm")}</Box>
                            </Box>
                        </Box>
                        <Box>Зал 1, место 2 {order.name_hall} {order.name_place}</Box>
                    </Box>
                </Box>

                <Box className='admin-orders-horeca-order-body' sx={{height: '60%', overflowY: 'scroll'}}>
                    <RenderGroup label={PAYMENT_STATE_SLIP_WITHOUT_RECEIPT} group={groups.slip} ver={order.ver}/>
                    <RenderGroup label={PAYMENT_STATE_WAITING} group={groups.waiting} ver={order.ver}/>
                    <RenderGroup label={PAYMENT_STATE_SUCCESS} group={groups.success} ver={order.ver}/>
                </Box>

                <Box className='admin-orders-horeca-order-footer' sx={{height: '25%'}}>
                    <Box>{order.comment}</Box>
                    <Box sx={{display: 'flex'}}>
                        <Box>e-mail: {order.buyer_email}</Box>
                        <Box>Телефон: {order.buyer_phone_number}</Box>
                    </Box>
                    <Box>{order.quantity} товаров</Box>
                </Box>
            </Box>
        </Box>
    )
}

export default OrderFood