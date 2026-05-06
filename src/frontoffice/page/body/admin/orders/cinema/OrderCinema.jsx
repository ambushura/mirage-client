import { Box } from '@mui/material'
import { cinema_order_fetch } from '../../../../../../service/fetch_service.js'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import {
    ITEMS_TYPE_SERVICE,
    PAYMENT_STATE_SLIP_WITHOUT_RECEIPT,
    PAYMENT_STATE_WAITING,
    RETURNING_STATE_SUCCESS,
    RETURNING_STATE_WAITING,
} from '../../../../../../redux/interfaceReducer.js'
import DotsAnimation from '../../../../../../ui/DotsAnimation.jsx'
import { useEffect, useState } from 'react'
import FunctionsIcon from '@mui/icons-material/Functions'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'
import CommentIcon from '@mui/icons-material/Comment'
import PrintIcon from '@mui/icons-material/Print'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LanguageIcon from '@mui/icons-material/Language'
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const OrderCinema = ({ order }) => {
    const dispatch = useDispatch()

    const filial = useSelector((state) => state.data.filial)
    const pre_order = useSelector((state) => state.orders.pre_order)

    const beginning = dayjs.utc(order.seance_beginning)
    const ending = dayjs.utc(order.seance_ending)

    const group_items = (items_grouped, payment_group, payment_state) => {
        const items = []
        items_grouped
            .filter((el) =>
                payment_group === 'for_payment' ? el.in_payment_group === payment_state : el.out_payment_group === payment_state
            )
            .forEach((el) => items.push(el))
        return { items }
    }

    const RenderGroup = ({ chapter1, label, group, ver }) => {
        if (!group.items.length) return null
        const renderItems = (items, typeLabel) =>
            items.length > 0 && (
                <>
                    <Box
                        className="glass"
                        sx={{
                            height: '25px',
                            fontWeight: 'bold',
                            padding: '4px 4px 4px 8px',
                            position: 'sticky',
                            top: '25px',
                            zIndex: 1,
                        }}
                    >
                        {typeLabel}
                    </Box>
                    {items.map((item, i) => (
                        <Box
                            key={i + ver}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: '#f4f4f4',
                                borderBottom: i !== items.length - 1 ? '1px dashed #b6b5b5' : null,
                                padding: '2px 0 2px 0',
                            }}
                        >
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                                <Box
                                    sx={{
                                        width: '55px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    {item.ticket_printed ? (
                                        <>
                                            <PrintIcon
                                                sx={{
                                                    width: '15px',
                                                    height: '15px',
                                                }}
                                            />
                                            {item.ticket_printed < 10 ? item.ticket_printed : '>9'}
                                        </>
                                    ) : null}
                                    {item.ticket_state !== 0 ? (
                                        <VisibilityIcon
                                            sx={{
                                                width: '15px',
                                                height: '15px',
                                                color:
                                                    item.ticket_state === -1
                                                        ? '#E3000B'
                                                        : item.ticket_state === 1
                                                          ? '#FF9800'
                                                          : item.ticket_state === 2
                                                            ? '#45B97C'
                                                            : 'black',
                                            }}
                                        />
                                    ) : null}
                                </Box>
                                <Box
                                    sx={{
                                        flex: 1,
                                        overflow: 'hidden',
                                    }}
                                >
                                    Ряд <b>{item.place_row}</b> Место <b>{item.place_number}</b>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginRight: '4px',
                                    }}
                                ></Box>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ width: '20px' }} />
                                <Box sx={{ flex: 1, textAlign: 'left', color: '#ababab' }}>Цена: {item.price} р</Box>
                                {item.uid_discount !== null ? (
                                    <Box
                                        sx={{
                                            flex: 1,
                                            textAlign: 'right',
                                            color: '#1DB1BA',
                                            fontSize: '70%',
                                            fontWeight: 'bold',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {item.name_discount}
                                    </Box>
                                ) : null}
                                <Box
                                    sx={{
                                        flex: 1,
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                        marginRight: '4px',
                                    }}
                                >
                                    <FunctionsIcon sx={{ width: '15px', height: '15px' }} />
                                    {item.sum} р
                                </Box>
                            </Box>
                            <Box sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ width: '20px' }} />
                                <Box sx={{ flex: 1 }}>{item.comment}</Box>
                            </Box>
                        </Box>
                    ))}
                </>
            )
        return (
            <>
                <Box
                    sx={{
                        height: '25px',
                        fontWeight: 'bold',
                        backgroundColor:
                            chapter1 === 'returning_waiting'
                                ? '#50db92'
                                : chapter1 === 'returning_success'
                                  ? '#414650'
                                  : chapter1 === 'payment_slip_without_receipt' || chapter1 === 'returning_slip_without_receipt'
                                    ? '#f74b53'
                                    : '#e4e2e2',
                        color:
                            chapter1 === 'returning_waiting'
                                ? 'black'
                                : chapter1 === 'returning_success'
                                  ? 'white'
                                  : chapter1 === 'payment_slip_without_receipt' || chapter1 === 'returning_slip_without_receipt'
                                    ? 'white'
                                    : 'black',
                        padding: '4px',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                    }}
                >
                    {label}
                    {['payment_waiting', 'payment_slip_without_receipt', 'returning_slip_without_receipt'].includes(chapter1) ? (
                        <DotsAnimation />
                    ) : null}
                </Box>
                {renderItems(group.items, ITEMS_TYPE_SERVICE)}
            </>
        )
    }

    const [groups, setGroups] = useState({
        for_payment_waiting: { items: [] },
        for_payment_slip_without_receipt: { items: [] },
        for_returning_waiting: { items: [] },
        for_returning_slip_without_receipt: { items: [] },
        for_returning_success: { items: [] },
    })

    useEffect(() => {
        setGroups({
            for_payment_waiting: group_items(order.items, 'for_payment', 'waiting'),
            for_payment_slip_without_receipt: group_items(order.items, 'for_payment', 'slip_without_receipt'),
            for_returning_waiting: group_items(order.items, 'for_returning', 'waiting'),
            for_returning_slip_without_receipt: group_items(order.items, 'for_returning', 'slip_without_receipt'),
            for_returning_success: group_items(order.items, 'for_returning', 'success'),
        })
    }, [order])

    return (
        <Box key={order.uid} onClick={() => dispatch(cinema_order_fetch(filial, order.uid))}>
            <Box className="admin-orders-cinema-order-content" sx={{ fontSize: '80%' }}>
                <Box
                    className="admin-orders-cinema-order-header"
                    sx={{
                        display: 'flex',
                        height: '45px',
                        backgroundColor: pre_order.uid === order.uid ? '#FFDA6B' : null,
                    }}
                >
                    <Box sx={{ margin: '0 12px' }}>
                        {order.from_site ? (
                            <LanguageIcon
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    color: pre_order.uid === order.uid ? 'red' : 'black',
                                }}
                            />
                        ) : order.from_wp ? (
                            <LaptopWindowsIcon
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    color: pre_order.uid === order.uid ? 'red' : 'black',
                                }}
                            />
                        ) : order.from_kiosk ? (
                            <SmartphoneIcon
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    color: pre_order.uid === order.uid ? 'red' : 'black',
                                }}
                            />
                        ) : null}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Box
                            sx={{
                                fontWeight: 'bold',
                                marginLeft: '12px',
                                textDecoration: pre_order.uid === order.uid ? 'underline' : null,
                            }}
                        >
                            {order.number}
                        </Box>
                        <Box
                            sx={{
                                overflow: 'hidden',
                                marginLeft: '12px',
                                fontSize: '80%',
                                fontWeight: 'bold',
                            }}
                        >
                            {order.name_creator} {order.id_site !== 0 ? order.id_site : null}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            width: '100px',
                            marginRight: '4px',
                            flex: 1,
                        }}
                    >
                        <span>{dayjs.utc(order.date_create).format('DD.MM.YY')}</span>
                        <span>{dayjs.utc(order.date_create).format('HH:mm')}</span>
                        <span style={{ color: '#8B919B' }}> {dayjs.utc(order.date_change).format('HH:mm')}</span>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        flexWrap: 'no-wrap',
                        justifyContent: 'center',
                        padding: '0 4px',
                        borderTop: '1px dashed #b6b5b5',
                        borderBottom: '1px dashed #b6b5b5',
                    }}
                >
                    <Box
                        sx={{
                            fontWeight: 'bold',
                            marginRight: '10px',
                        }}
                    >
                        {dayjs(order.seance_date_shift).format('DD.MM.YY')} · {order.film_name} {order.film_copy_type} {order.film_rate_age}
                        +
                    </Box>
                    <Box
                        sx={{
                            fontWeight: 'bold',
                            color: '#8B919B',
                        }}
                    >
                        <span style={{ marginRight: '10px' }}>
                            <LocationOnIcon
                                sx={{
                                    width: '15px',
                                    height: '15px',
                                }}
                            />{' '}
                            Зал {order.hall_full_name}
                        </span>{' '}
                        {String(beginning.$H).padStart(2, '0')}:{String(beginning.$m).padStart(2, '0')}
                        <span>
                            {' '}
                            - {String(ending.$H).padStart(2, '0')}:{String(ending.$m).padStart(2, '0')}
                        </span>
                    </Box>
                </Box>
                {order.comment !== null ? (
                    <Box
                        className="admin-orders-order-footer-comment"
                        sx={{
                            padding: '4px 0',
                            maxHeight: '40px',
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            wordBreak: 'break-word',
                        }}
                    >
                        <CommentIcon sx={{ width: '15px', height: '15px', marginRight: '10px' }} />
                        {order.comment}
                    </Box>
                ) : null}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {order.buyer_email !== null ? (
                        <Box>
                            <AlternateEmailIcon sx={{ width: '15px', height: '15px', marginRight: '5px' }} />
                            {order.buyer_email}
                        </Box>
                    ) : null}
                    {order.buyer_phone_number !== null ? (
                        <Box>
                            <PhoneEnabledIcon sx={{ width: '15px', height: '15px', marginRight: '5px' }} />
                            {order.buyer_phone_number}
                        </Box>
                    ) : null}
                </Box>
                <Box className="admin-orders-cinema-order-body">
                    <RenderGroup
                        chapter1={'payment_slip_without_receipt'}
                        label={PAYMENT_STATE_SLIP_WITHOUT_RECEIPT}
                        group={groups.for_payment_slip_without_receipt}
                        ver={order.ver}
                    />
                    <RenderGroup
                        chapter1={'payment_waiting'}
                        label={PAYMENT_STATE_WAITING}
                        group={groups.for_payment_waiting}
                        ver={order.ver}
                    />
                    <RenderGroup
                        chapter1={'returning_slip_without_receipt'}
                        label={PAYMENT_STATE_WAITING}
                        group={groups.for_returning_slip_without_receipt}
                        ver={order.ver}
                    />
                    <RenderGroup
                        chapter1={'returning_waiting'}
                        label={RETURNING_STATE_WAITING}
                        group={groups.for_returning_waiting}
                        ver={order.ver}
                    />
                    <RenderGroup
                        chapter1={'returning_success'}
                        label={RETURNING_STATE_SUCCESS}
                        group={groups.for_returning_success}
                        ver={order.ver}
                    />
                    <Box className="admin-orders-order-body-bottom"></Box>
                </Box>

                <Box className="admin-orders-cinema-order-footer glass">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontWeight: 'bold',
                            justifyContent: 'space-between',
                            padding: '10px',
                            borderTop: '1px dashed gray',
                        }}
                    >
                        <Box>{order.quantity} услуг</Box>
                        <Box>{order.sum_discount !== 0 ? `Скидка ${order.sum_discount} р` : 'Без скидки'}</Box>
                        <Box>
                            <FunctionsIcon sx={{ width: '15px', height: '15px' }} />
                            {order.sum} р
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default OrderCinema
