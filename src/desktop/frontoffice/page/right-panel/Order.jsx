import { Box, Button, ButtonGroup } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import SeanceTitle from '../../components/cinema/SeanceTitle.jsx'
import BookingItem from './BookingItem.jsx'
import HorecaItem from './HorecaItem.jsx'
import { useNavigate } from 'react-router-dom'
import Payment from './Payment.jsx'
import {
    cinema_order_fetch,
    common_order_delete_comment,
    common_orders_receipts_get,
    horeca_order_fetch,
    horeca_table_delete,
} from '../../../../service/fetch_service.js'
import { openModal } from '../../../../redux/frontoffice/interfaceReducer.js'
import { Fragment, useEffect, useState } from 'react'
import RemoveDoneIcon from '@mui/icons-material/RemoveDone'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { motion } from 'framer-motion'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import Printing from './Printing.jsx'
import { selectUidCinema, selectUidHoreca, setHorderPreparing, setPreOrderPreparing } from '../../../../redux/frontoffice/ordersReducer.js'

function Details({ order }) {
    return (
        <Box className="glass" sx={{ fontWeight: 'bold', position: 'sticky', bottom: 0, zIndex: 2 }}>
            {order.buyer_s !== null ||
            order.buyer_n !== null ||
            order.buyer_o !== null ||
            order.buyer_email !== '' ||
            order.buyer_phone_number !== null ? (
                <>
                    <Box sx={{ color: '#8B919B' }}>Контакты покупателя:</Box>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            {order.buyer_email !== '' ? order.buyer_email : null}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            {order.buyer_phone_number !== null ? order.buyer_phone_number : null}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            {order.buyer_s !== null ? `${order.buyer_s} ` : null} {order.buyer_n !== null ? `${order.buyer_n} ` : null}{' '}
                            {order.buyer_o !== null ? order.buyer_o : null}
                        </Box>
                    </Box>
                </>
            ) : null}
            {order.comment !== null ? (
                <>
                    <Box
                        sx={{
                            color: '#8B919B',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                            overflowWrap: 'break-word',
                        }}
                    >
                        Комментарий к заказу:
                    </Box>
                    <Box>{order.comment}</Box>
                </>
            ) : null}
        </Box>
    )
}

const OrderBody = ({
    type,
    order,
    preparing,
    set_preparing,
    printing,
    set_printing,
    emptyOrder,
    fetchOrder,
    deleteOrder,
    navigateTo,
    addContact,
    dispatch,
    uid_selected,
    filial,
}) => {
    if (preparing && order.for_payment !== null && order.for_returning !== null) {
        return <Payment type={type} order={order} />
    } else if (printing) {
        return <Printing type={type} printing={printing} set_printing={set_printing} order={order} uid_selected={uid_selected} />
    } else {
        return (
            <>
                <Box className="order-box-panel-1">
                    <ButtonGroup size="large">
                        <Button
                            variant="contained"
                            color="info"
                            onClick={() => {
                                set_preparing(true)
                            }}
                        >
                            <ReceiptIcon />
                        </Button>
                        <Button variant="contained" color="secondary" onClick={fetchOrder}>
                            <CachedIcon />
                        </Button>
                        <Button variant="contained" color="primary" onClick={deleteOrder}>
                            <DeleteForeverIcon />
                        </Button>
                        <Button variant="contained" color="secondary" onClick={emptyOrder}>
                            <CloseIcon />
                        </Button>
                        {uid_selected.length > 0 ? (
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ marginRight: '4px' }}
                                onClick={() => {
                                    if (type === 'cinema') {
                                        dispatch(selectUidCinema([]))
                                    } else {
                                        dispatch(selectUidHoreca([]))
                                    }
                                }}
                                endIcon={<RemoveDoneIcon />}
                            >
                                {uid_selected.length}
                            </Button>
                        ) : null}
                    </ButtonGroup>
                    <Box className="order-box-panel-1-sum-number">
                        <span className="order-box-panel-1-number">{`№${order.number}`}</span>
                        <span>{order.name_creator}</span>
                        <span className="order-box-panel-1-sum">{Math.round(order.sum).toLocaleString('ru-RU')} Р</span>
                    </Box>
                </Box>
                {type === 'cinema' && (
                    <>
                        <Box className="order-box-panel-2">
                            <Button
                                sx={{ marginRight: '4px' }}
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    set_printing(true)
                                }}
                            >
                                <LocalPrintshopIcon />
                            </Button>
                            <Button variant="contained" color="secondary" onClick={addContact}>
                                <ContactMailIcon />
                            </Button>
                            <ButtonGroup size="large" sx={{ marginLeft: '4px' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        dispatch(
                                            openModal({
                                                type: 'comment_order',
                                                props: { order_type: 'cinema', action_type: 'order', order: order },
                                            })
                                        )
                                    }}
                                >
                                    <BorderColorIcon />
                                </Button>
                                {order.comment !== null ? (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            dispatch(common_order_delete_comment(filial, 'cinema', order.uid, order.ver))
                                        }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                ) : null}
                            </ButtonGroup>
                            <ButtonGroup size="small">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ marginLeft: '4px' }}
                                    onClick={() => {
                                        dispatch(openModal({ type: 'discounts', props: { uid_positions: uid_selected } }))
                                    }}
                                >
                                    Скидки
                                </Button>
                                {order.sum_discount !== 0 ? (
                                    <Button variant="contained" color="secondary">
                                        <DeleteIcon />
                                    </Button>
                                ) : null}
                            </ButtonGroup>
                        </Box>
                        <Box className="order-box-panel-3 glass" onClick={navigateTo}>
                            <Box
                                sx={{
                                    height: '60px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box className="seance-title-hall-name">
                                    <LocationOnIcon />
                                    <span>Зал {order.hall_full_name}</span>
                                </Box>
                                <SeanceTitle
                                    seance={{
                                        uid: order.seance_uid,
                                        beginning: order.seance_beginning,
                                        ending: order.seance_ending,
                                        copy_type: order.film_copy_type,
                                        rate_age: order.film_rate_age,
                                        content_type: order.seance_content_type,
                                    }}
                                    content_type={true}
                                    day={true}
                                    its_hall_map={true}
                                    age={true}
                                />
                            </Box>
                            <Box className="seance-title-film-name">{order.film_name}</Box>
                        </Box>
                        <Box className="order-box-panel-4">
                            <Box className="order-booking">
                                {order.items.map((booking) => (
                                    <BookingItem key={booking.uid} {...booking} uid_order={order.uid} uid_selected={uid_selected} />
                                ))}
                            </Box>
                            <Box sx={{ height: '150px' }}></Box>
                        </Box>
                        <Details order={order} />
                    </>
                )}
                {type === 'horeca' && (
                    <>
                        <Box className="order-box-panel-2">
                            <Button
                                sx={{ marginRight: '4px' }}
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    set_printing(true)
                                }}
                            >
                                <LocalPrintshopIcon />
                            </Button>
                            <Button variant="contained" color="secondary" onClick={addContact}>
                                <ContactMailIcon />
                            </Button>
                            <ButtonGroup sx={{ marginLeft: '4px', marginBottom: '4px' }} size="small">
                                <ButtonGroup sx={{ marginRight: '4px' }} size="large">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            dispatch(
                                                openModal({
                                                    type: 'comment_order',
                                                    props: { order_type: 'horeca', action_type: 'order', order: order },
                                                })
                                            )
                                        }}
                                    >
                                        <BorderColorIcon />
                                    </Button>
                                    {order.comment !== null ? (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                dispatch(common_order_delete_comment(filial, 'horeca', order.uid, order.ver))
                                            }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    ) : null}
                                </ButtonGroup>
                                <ButtonGroup size="small">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            dispatch(
                                                openModal({
                                                    type: 'table_options',
                                                    props: { uid_order: order.uid },
                                                })
                                            )
                                        }}
                                    >
                                        Место
                                    </Button>
                                    {order.name_hall !== null && order.name_place !== null ? (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                dispatch(horeca_table_delete(filial, order.uid, order.ver))
                                            }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    ) : null}
                                </ButtonGroup>
                            </ButtonGroup>
                            <Button sx={{ marginLeft: '4px' }} variant="contained" color="secondary" onClick={() => {}}>
                                <ContentCutIcon />
                            </Button>
                            <Button
                                sx={{ marginLeft: '4px' }}
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                    dispatch(
                                        openModal({
                                            type: 'creator_change',
                                            props: { uid_order: order.uid, ver: order.ver },
                                        })
                                    )
                                }
                            >
                                <PeopleOutlineIcon />
                            </Button>
                        </Box>
                        <Box className="order-box-panel-adv"></Box>
                        <Box className="order-box-panel-3">
                            {order.items.filter((item) => item.kitchen === null).length > 0 && (
                                <>
                                    <Box className={`order-box-panel-3-title-others glass`}>Счет {order.current_number} · Не готовить</Box>
                                    <ul className={`order-box-panel-3-list-others`}>
                                        {order.items
                                            .filter((item) => item.kitchen === null)
                                            .map((item) => (
                                                <HorecaItem
                                                    order={order}
                                                    key={`${item.uid}${order.ver}`}
                                                    item={item}
                                                    uid_selected={uid_selected}
                                                />
                                            ))}
                                    </ul>
                                </>
                            )}
                            {[1, 2, 3].map(
                                (state) =>
                                    order.items.filter((item) => item.kitchen !== null).some((item) => item.kitchen.state === state) && (
                                        <Fragment key={`${state}`}>
                                            <Box
                                                className={`glass order-box-panel-3-title-${['', 'for-kitchen', 'kitchen', 'kitchen-ready'][state]}`}
                                            >
                                                Счет {order.current_number} · {['', 'Сообщить повару', 'Готовится', 'Приготовлено'][state]}
                                            </Box>
                                            <ul
                                                className={`order-box-panel-3-list-${['', 'for-kitchen', 'kitchen', 'kitchen-ready'][state]}`}
                                            >
                                                {order.items
                                                    .filter((item) => item.kitchen !== null)
                                                    .filter((item) => item.kitchen.state === state)
                                                    .map((item) => (
                                                        <HorecaItem
                                                            order={order}
                                                            key={`${item.uid}${order.ver}`}
                                                            item={item}
                                                            uid_selected={uid_selected}
                                                        />
                                                    ))}
                                            </ul>
                                        </Fragment>
                                    )
                            )}
                            <Box sx={{ height: '150px' }}></Box>
                        </Box>
                        <Details order={order} />
                    </>
                )}
            </>
        )
    }
}

const Order = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cities = useSelector((state) => state.data.cities)
    const filial = useSelector((state) => state.data.filial)

    const pre_order = useSelector((state) => state.orders.pre_order)
    const horder = useSelector((state) => state.orders.horder)

    const pre_order_preparing = useSelector((state) => state.orders.pre_order_preparing)
    const horder_preparing = useSelector((state) => state.orders.horder_preparing)

    const uid_horeca_selected = useSelector((state) => state.orders.uid_horeca_selected)
    const uid_cinema_selected = useSelector((state) => state.orders.uid_cinema_selected)

    const [printing_cinema, set_printing_cinema] = useState(false)
    const [printing_horeca, set_printing_horeca] = useState(false)

    const { wp, kiosk } = useSelector((state) => state.interface)

    const seance_link = () => {
        const city = cities.find((el) => el.uid === pre_order.uid_city)
        const fil = city?.filials.find((el) => el.uid === pre_order.uid_filial)
        return fil
            ? `/seance/${city.code}/${fil.eais}/${pre_order.uid_seance}/?${wp !== null ? 'wp=' + wp : ''}`
            : `/?${wp !== null ? 'wp=' + wp : ''}`
    }

    useEffect(() => {
        dispatch(selectUidHoreca([]))
        set_printing_horeca(false)
        dispatch(setPreOrderPreparing(false))
    }, [dispatch, horder.uid, horder.ver])

    useEffect(() => {
        dispatch(selectUidCinema([]))
        set_printing_cinema(false)
        dispatch(setHorderPreparing(false))
    }, [dispatch, pre_order.uid, pre_order.ver])

    return (
        <Box id="order" className="glass">
            {pre_order.in_base ? (
                <motion.div
                    className="order-box"
                    style={{ height: horder.in_base ? '50%' : '100%' }}
                    key={`${pre_order.uid}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <OrderBody
                        key={pre_order.ver}
                        type="cinema"
                        order={pre_order}
                        printing={printing_cinema}
                        preparing={pre_order_preparing}
                        set_printing={set_printing_cinema}
                        set_preparing={() => dispatch(common_orders_receipts_get(filial, 'cinema', pre_order.uid))}
                        fetchOrder={() => dispatch(cinema_order_fetch(filial, pre_order.uid))}
                        deleteOrder={() =>
                            dispatch(
                                openModal({
                                    type: 'dialog_delete_order',
                                    props: {
                                        type: 'YesNo',
                                        action: 'cinema_order_delete',
                                        question: 'Вы уверены, что хотите удалить этот заказ?',
                                        payload: {
                                            filial: filial,
                                            uid: pre_order.uid,
                                            ver: pre_order.ver,
                                        },
                                    },
                                })
                            )
                        }
                        emptyOrder={() =>
                            dispatch(
                                openModal({
                                    type: 'dialog_save_order',
                                    props: {
                                        type: 'YesNo',
                                        action: 'cinema_order_save',
                                        question: 'Вы уверены, что хотите сохранить этот заказ?',
                                    },
                                })
                            )
                        }
                        navigateTo={() => navigate(seance_link())}
                        addContact={() => {
                            dispatch(
                                openModal({
                                    type: 'add_contact',
                                    props: { order_type: 'cinema', order: pre_order },
                                })
                            )
                        }}
                        dispatch={dispatch}
                        uid_selected={uid_cinema_selected}
                        filial={filial}
                    />
                </motion.div>
            ) : null}
            {horder.in_base ? (
                <motion.div
                    className="order-box"
                    style={{ height: pre_order.in_base ? '50%' : '100%' }}
                    key={`${horder.uid}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <OrderBody
                        key={horder.ver}
                        type="horeca"
                        order={horder}
                        printing={printing_horeca}
                        preparing={horder_preparing}
                        set_printing={set_printing_horeca}
                        set_preparing={() => dispatch(common_orders_receipts_get(filial, 'horeca', horder.uid))}
                        fetchOrder={() => dispatch(horeca_order_fetch(filial, horder.uid))}
                        deleteOrder={() =>
                            dispatch(
                                openModal({
                                    type: 'dialog_delete_order',
                                    props: {
                                        type: 'YesNo',
                                        action: 'horeca_order_delete',
                                        question: 'Вы уверены, что хотите удалить этот заказ?',
                                        payload: {
                                            filial: filial,
                                            uid: horder.uid,
                                            ver: horder.ver,
                                        },
                                    },
                                })
                            )
                        }
                        emptyOrder={() =>
                            dispatch(
                                openModal({
                                    type: 'dialog_save_order',
                                    props: {
                                        type: 'YesNo',
                                        action: 'horeca_order_save',
                                        question: 'Вы уверены, что хотите сохранить этот заказ?',
                                    },
                                })
                            )
                        }
                        dispatch={dispatch}
                        uid_selected={uid_horeca_selected}
                        addContact={() => {
                            dispatch(
                                openModal({
                                    type: 'add_contact',
                                    props: { order_type: 'horeca', order: horder },
                                })
                            )
                        }}
                        filial={filial}
                    />
                </motion.div>
            ) : null}
        </Box>
    )
}

export default Order
