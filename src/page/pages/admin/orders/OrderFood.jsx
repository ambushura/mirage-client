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
} from "../../../../redux/interfaceReducer.js";

const OrderFood = (props) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const order = props.order
    const [waiting_group, set_waiting_group] = useState({items: [], mark_egais: []})
    const [slip_without_receipt_group, set_slip_without_receipt_group] = useState({items: [], mark_egais: []})
    const [success_group, set_success_group] = useState({items: [], mark_egais: []})

    useEffect(() => {

        const current_waiting_group_array = order.items_grouped.filter(el => el.payment_state === 'waiting')
        const current_waiting_group = {items: [], mark_egais: []}
        current_waiting_group_array.forEach(el => {
            if (el.mark_egais) {
                current_waiting_group.items.push(el)
            } else {
                current_waiting_group.mark_egais.push(el)
            }
        })
        set_waiting_group(current_waiting_group)

        const current_slip_without_receipt_group_array = order.items_grouped.filter(el => el.payment_state === 'slip_without_receipt')
        const current_slip_without_receipt_group = {items: [], mark_egais: []}
        current_slip_without_receipt_group_array.forEach(el => {
            if (el.mark_egais) {
                current_slip_without_receipt_group.items.push(el)
            } else {
                current_slip_without_receipt_group.mark_egais.push(el)
            }
        })
        set_slip_without_receipt_group(current_slip_without_receipt_group)

        const current_success_group_array = order.items_grouped.filter(el => el.payment_state === 'success')
        const current_success_group = {items: [], mark_egais: []}
        current_success_group_array.forEach(el => {
            if (el.mark_egais) {
                current_success_group.items.push(el)
            } else {
                current_success_group.mark_egais.push(el)
            }
        })
        set_success_group(current_success_group)

    }, [order])

    return (
        <Box key={order.uid} className='admin-orders-horeca-order' onClick={() => {
            dispatch(horeca_order_fetch(filial, wp, order.uid))
        }}>
            <Box className='admin-orders-horeca-order-content' sx={{fontSize: '80%'}}>
                <Box className='admin-orders-horeca-order-header' sx={{display: 'flex', flex: 1, height: '15%'}}>
                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CircleIcon sx={{
                            scale: 1.5,
                            color: order.closed ? 'green' : order.canceled || order.deleted ? 'red' : 'gray'
                        }}/>
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
                        <Box>
                            Зал 1, место 2
                            {order.name_hall}
                            {order.name_place}
                        </Box>
                    </Box>
                </Box>
                <Box className='admin-orders-horeca-order-body' sx={{height: '60%', flex: 1, overflowX: 'hidden', overflowY: 'scroll'}}>
                    {slip_without_receipt_group.items.length > 0 || slip_without_receipt_group.mark_egais.length > 0 ?
                        <>
                            <Box>{PAYMENT_STATE_SLIP_WITHOUT_RECEIPT}</Box>
                            {slip_without_receipt_group.items.length > 0 ? <>
                                <Box>{ITEMS_TYPE_ITEMS}</Box>
                                {slip_without_receipt_group.items.map((item, i) => {
                                        return (
                                            <Box key={i + order.ver}>
                                                <Box sx={{width: '10px'}}></Box>
                                                <Box sx={{width: '10px'}}></Box>
                                                <Box>
                                                    <Box>{item.name}</Box>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                )} </> : null}
                            {slip_without_receipt_group.mark_egais.length > 0 ? <>
                                <Box>{ITEMS_TYPE_MARK_EGAIS}</Box>
                                {slip_without_receipt_group.mark_egais.map((item, i) => {
                                        return (
                                            <Box key={i + order.ver}>
                                                <Box sx={{width: '10px'}}></Box>
                                                <Box sx={{width: '10px'}}></Box>
                                                <Box>
                                                    <Box>{item.name}</Box>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                )} </> : null}
                        </>
                        : null}
                    {waiting_group.items.length > 0 || waiting_group.mark_egais.length > 0 ?
                        <>
                            <Box>{PAYMENT_STATE_WAITING}</Box>
                            {waiting_group.items.length > 0 ? <>
                                <Box>{ITEMS_TYPE_ITEMS}</Box>
                                {waiting_group.items.map((item, i) => {
                                        return (
                                            <Box key={i + order.ver}>
                                                <Box sx={{width: '10px'}}></Box>
                                                <Box sx={{width: '10px'}}></Box>
                                                <Box>
                                                    <Box>{item.name}</Box>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                )}
                            </> : null}
                            {waiting_group.mark_egais.length > 0 ? <>
                                <Box>{ITEMS_TYPE_MARK_EGAIS}</Box>
                                {waiting_group.mark_egais.map((item, i) => {
                                        return (
                                            <Box key={i + order.ver}>
                                                <Box sx={{width: '10px'}}></Box>
                                                <Box sx={{width: '10px'}}></Box>
                                                <Box>
                                                    <Box>{item.name}</Box>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                )}
                            </> : null}
                        </>
                        : null}
                    {success_group.items.length > 0 || success_group.mark_egais.length > 0 ?
                        <>
                            <Box>{PAYMENT_STATE_SUCCESS}</Box>
                        {success_group.items.length > 0 ? <>
                            <Box>{ITEMS_TYPE_ITEMS}</Box>
                            {success_group.items.map((item, i) => {
                                    return (
                                        <Box key={i + order.ver}>
                                            <Box sx={{width: '10px'}}></Box>
                                            <Box sx={{width: '10px'}}></Box>
                                            <Box>
                                                <Box>{item.name}</Box>
                                            </Box>
                                        </Box>
                                    )
                                }
                            )}
                        </> : null}
                            {success_group.mark_egais.length > 0 ? <>
                                <Box>{ITEMS_TYPE_MARK_EGAIS}</Box>
                                {success_group.mark_egais.map((item, i) => {
                                        return (
                                            <Box key={i + order.ver}>
                                                <Box sx={{width: '10px'}}></Box>
                                                <Box sx={{width: '10px'}}></Box>
                                                <Box>
                                                    <Box>{item.name}</Box>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                )}
                            </> : null}
                        </>
                        : null}
                </Box>
                <Box className='admin-orders-horeca-order-footer' sx={{height: '25%', flex: 1,}}>
                    <Box>{order.comment}</Box>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Box>e-mail: {order.buyer_email}</Box>
                        <Box>Телефон: {order.buyer_phone_number}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box>{order.quantity} товаров</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
    }

export default OrderFood