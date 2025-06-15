import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {horeca_order_fetch} from "../../../../../service/fetch_service.js"
import CircleIcon from '@mui/icons-material/Circle'
import dayjs from "dayjs"
import {useEffect, useState} from "react"
import {
    ITEMS_TYPE_ITEMS, ITEMS_TYPE_MARK_EGAIS,
    PAYMENT_STATE_SLIP_WITHOUT_RECEIPT,
    PAYMENT_STATE_SUCCESS,
    PAYMENT_STATE_WAITING
} from "../../../../../redux/interfaceReducer.js"
import DotsAnimation from "../../../../../ui/DotsAnimation.jsx"
import FunctionsIcon from "@mui/icons-material/Functions"

const groupItems = (items_grouped, payment_state) => {
    const items = [], mark_egais = []
    items_grouped
        .filter(el => el.payment_state === payment_state)
        .forEach(el => el.mark_egais_state ? mark_egais.push(el) : items.push(el))
    return {items, mark_egais}
}

const RenderGroup = ({label, group, ver}) => {
    if (!group.items.length && !group.mark_egais.length) return null
    const renderItems = (items, typeLabel) => items.length > 0 && (
        <>
            <Box sx={{
                height: '25px',
                fontWeight: 'bold',
                backgroundColor: '#ececec',
                padding: '4px 4px 4px 8px',
                position: 'sticky',
                top: '25px',
                zIndex: 1,
            }}>{typeLabel}</Box>
            {items.map((item, i) => (
                <Box key={i + ver}
                     sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         backgroundColor: '#f4f4f4',
                         borderBottom: '1px dashed #b6b5b5'
                     }}>
                    <Box sx={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{width: '20px'}}/>
                        <Box sx={{flex: 1}}>{item.name}</Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>{item.quantity} {item.unit_name}</Box>
                    </Box>
                    <Box sx={{fontWeight: 'bold', display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{width: '20px'}}/>
                        <Box sx={{flex: 1}}>{item.comment}</Box>
                    </Box>
                    <Box sx={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{width: '20px'}}/>
                        <Box sx={{flex: 1, textAlign: 'left', color: '#ababab'}}>Цена: {item.price} р</Box>
                        {item.uid_discount !== null ?
                            <Box sx={{flex: 1, textAlign: 'right', color: '#ff9800', fontSize: '70%', fontWeight: 'bold', overflow: 'hidden'}}>{item.name_discount}</Box> : null}
                        <Box sx={{flex: 1, textAlign: 'right', fontWeight: 'bold', marginRight: '4px'}}><FunctionsIcon
                            sx={{width: '15px', height: '15px'}}/>{item.sum} р</Box>
                    </Box>
                    {item.egais_type_code !== null ?
                        <Box sx={{fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Box sx={{width: '20px', color: '#50DB92'}}><CircleIcon sx={{scale: 0.5}}/></Box>
                            <Box sx={{width: '96px'}}>Акцизная марка: </Box>
                            <Box sx={{
                                flex: 1,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>{item.egais_type_value}</Box>
                        </Box> : null}
                    {item.mark_type !== null ?
                        <Box sx={{fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Box sx={{width: '20px', color: '#e3000b'}}><CircleIcon sx={{scale: 0.5}}/></Box>
                            <Box sx={{width: '45px'}}>ЧЗ КМ: </Box>
                            <Box sx={{
                                flex: 1,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>{item.mark_value}</Box>
                        </Box> : null}
                </Box>
            ))}
        </>
    )
    return (
        <>
            <Box sx={{
                height: '25px',
                fontWeight: 'bold',
                backgroundColor: '#e4e2e2',
                padding: '4px',
                position: 'sticky',
                top: 0,
                zIndex: 1,
            }}>{label}<DotsAnimation/></Box>
            {renderItems(group.mark_egais, ITEMS_TYPE_MARK_EGAIS)}
            {renderItems(group.items, ITEMS_TYPE_ITEMS)}
        </>
    )
}

const OrderHoreca = ({order}) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)
    const horder = useSelector(state => state.orders.horder)

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
        <Box className='admin-orders-horeca-order-content' sx={{fontSize: '80%'}} onClick={() =>
            dispatch(horeca_order_fetch(filial, wp, order.uid))
        }>
            <Box className='admin-orders-horeca-order-header' sx={{display: 'flex', height: '45px'}}>
                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <CircleIcon sx={{scale: 1.5, color: getCircleColor()}}/>
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <Box sx={{fontWeight: 'bold'}}>{order.number}</Box>
                    <Box>{order.name_creator}</Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Box sx={{
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            width: '100px'
                        }}>
                            <span style={{color: '#8B919B'}}>{dayjs.utc(order.date_create).format("DD.MM")}</span>
                            <span>{dayjs.utc(order.date_create).format("HH:mm")}</span>
                        </Box>
                        <Box style={{color: '#8B919B'}}>
                            {dayjs.utc(order.date_change).format("HH:mm")}
                        </Box>
                    </Box>
                    <Box>Зал 1, место 2 {order.name_hall} {order.name_place}</Box>
                </Box>
            </Box>

            <Box className='admin-orders-horeca-order-body'>
                <RenderGroup label={PAYMENT_STATE_SLIP_WITHOUT_RECEIPT} group={groups.slip} ver={order.ver}/>
                <RenderGroup label={PAYMENT_STATE_WAITING} group={groups.waiting} ver={order.ver}/>
                <RenderGroup label={PAYMENT_STATE_SUCCESS} group={groups.success} ver={order.ver}/>
            </Box>

            <Box className='admin-orders-horeca-order-footer'
                 sx={{borderBottom: `3px solid ${horder.uid === order.uid ? 'red' : '#2e3239'}`}}>
                {order.comment !== null ? <Box className='admin-orders-order-footer-comment' sx={{
                    padding: '4px 0',
                    maxHeight: '40px',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    wordBreak: 'break-word'
                }}>Комментарий: {order.comment}</Box> : null}
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    {order.buyer_email !== '' ? <Box>e-mail: {order.buyer_email}</Box> : null}
                    {order.buyer_phone_number !== '' ? <Box>Телефон: {order.buyer_phone_number}</Box> : null}
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontWeight: 'bold',
                    justifyContent: 'space-between',
                    padding: '10px'
                }}>
                    <Box>{order.quantity} товаров</Box>
                    <Box>{order.sum_discount !== 0 ? `Скидка ${order.sum_discount} р` : 'Без скидки'}</Box>
                    <Box>{order.sum} р</Box>
                </Box>
            </Box>

        </Box>
    )
}

export default OrderHoreca