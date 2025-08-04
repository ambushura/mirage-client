import {Box, Button, Fade} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {setCash, setHorderPaying, setPreOrderPaying, setTotal} from "../../../redux/ordersReducer.js"
import {
    ITEMS_TYPE_ITEMS, ITEMS_TYPE_MARK_EGAIS,
    ITEMS_TYPE_SERVICE,
    openModal,
    PAYMENT_STATE_SLIP_WITHOUT_RECEIPT,
    PAYMENT_STATE_WAITING, RETURNING_STATE_SLIP_WITHOUT_RECEIPT, RETURNING_STATE_SUCCESS, RETURNING_STATE_WAITING
} from "../../../redux/interfaceReducer.js"
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DotsAnimation from "../../../ui/DotsAnimation.jsx"
import {useSetPaymentMethods} from "./useSetPaymentMethods.js"
import Loader from "../../../ui/Loader.jsx"
import {common_order_pay} from "../../../service/fetch_service.js"
import {useEffect, useMemo, useRef, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import Checkbox from "@mui/material/Checkbox"

const Payment = (props) => {

    const dispatch = useDispatch()

    const [payment_methods, payment_methods_error, payment_methods_loading] = useSetPaymentMethods(props.order.uid, props.type)

    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)
    const total = useSelector(state => state.orders.total)
    const cash = useSelector(state => state.orders.cash)
    const change = useSelector(state => state.orders.change)
    const [show_payment_types, set_show_payment_types] = useState(false)

    const pay = (pm) => {
        dispatch(common_order_pay(
            filial,
            wp,
            pm,
            props.type === 'cinema' ? props.order.uid : props.order.uid,
            props.type === 'cinema' ? props.order.ver : props.order.ver,
            props.type,
            payment_group
        ))
    }

    useEffect(() => {
        dispatch(setTotal(pre_order.sum + horder.sum))
        dispatch(setCash(['clean', pre_order.sum + horder.sum]))
    }, [dispatch, horder.sum, pre_order.sum])

    const [payment_group, set_payment_group] = useState(
        {
            for_payment: {
                waiting: {
                    mark_egais_items: {count: 0, selected: true, items: []},
                    horeca_items: {count: 0, selected: true, items: []},
                    cinema_items: {count: 0, selected: true, items: []},
                    count: 0,
                },
                slip_without_receipt: {
                    mark_egais_items: {count: 0, selected: true, items: []},
                    horeca_items: {count: 0, selected: true, items: []},
                    cinema_items: {count: 0, selected: true, items: []},
                    count: 0,
                },
                success: {
                    mark_egais_items: {count: 0, selected: false, items: []},
                    horeca_items: {count: 0, selected: false, items: []},
                    cinema_items: {count: 0, selected: false, items: []},
                    count: 0,
                },
            },
            for_returning: {
                waiting: {
                    mark_egais_items: {count: 0, selected: false, items: []},
                    horeca_items: {count: 0, selected: false, items: []},
                    cinema_items: {count: 0, selected: false, items: []},
                    count: 0,
                },
                slip_without_receipt: {
                    mark_egais_items: {count: 0, selected: false, items: []},
                    horeca_items: {count: 0, selected: false, items: []},
                    cinema_items: {count: 0, selected: false, items: []},
                    count: 0,
                },
                success: {
                    mark_egais_items: {count: 0, selected: false, items: []},
                    horeca_items: {count: 0, selected: false, items: []},
                    cinema_items: {count: 0, selected: false, items: []},
                    count: 0,
                },
            }
        }
    )

    useEffect(() => {

            const chapter0_array = ['for_payment', 'for_returning']
            const chapter1_array = ['waiting', 'slip_without_receipt']
            const chapter2_array = ['mark_egais_items', 'horeca_items', 'cinema_items']

            let show = false
            chapter0_array.forEach(chapter0 => {
                chapter1_array.forEach(chapter1 => {
                    chapter2_array.forEach(chapter2 => {
                        if (payment_group[chapter0][chapter1][chapter2].count > 0 && payment_group[chapter0][chapter1][chapter2].items.length > 0) {
                            show = true
                        }
                    })
                })
            })
            set_show_payment_types(show)
        }
        , [payment_group])

    const GroupedTable = ({group, title, chapter}) => {

        const [chapter0, chapter1, chapter2] = chapter.split('.')

        const has_mounted = useRef(false)
        useEffect(() => {
            has_mounted.current = true
        }, [])

        const grouped_items = useMemo(() => {
            function groupAndSum(data, groupByFields, sumFields) {
                return Object.values(
                    data.reduce((acc, item) => {
                        const key = groupByFields.map(field => item[field]).join('-')
                        if (!acc[key]) {
                            acc[key] = {...item}
                        } else {
                            sumFields.forEach(field => {
                                acc[key][field] += item[field]
                            })
                        }
                        return acc
                    }, {})
                )
            }

            switch (chapter0) {
                case 'for_payment':
                    return groupAndSum(group, ["name", "unit_name", "price", "discount"], ["quantity", "sum"])
                case 'for_returning':
                    return groupAndSum(group, ["uid", "name", "unit_name", "price", "discount"], ["quantity", "sum"])
            }
        }, [group])

        if (grouped_items.length > 0) {
            return (
                <Box>
                    <Box className='payment-items-group-title-name'>
                        {chapter1 !== 'success' ?
                            <Checkbox checked={payment_group[chapter0][chapter1][chapter2].selected}
                                      onChange={() => {
                                          const payment_group_new = structuredClone(payment_group)
                                          const action = !payment_group_new[chapter0][chapter1][chapter2].selected
                                          payment_group_new[chapter0][chapter1][chapter2].selected = action
                                          if (action) {
                                              grouped_items.map(item => (payment_group_new[chapter0][chapter1][chapter2].items.push(item.uid)))
                                          } else {
                                              payment_group_new[chapter0][chapter1][chapter2].items = []
                                          }
                                          set_payment_group(payment_group_new)
                                      }}/> : <Box sx={{width: '10px'}}></Box>
                        }{title}</Box>
                    <AnimatePresence>,
                        {grouped_items.length > 0 && (
                            <motion.div className='payment-items-group-item'
                                        initial={!has_mounted.current}
                                        animate="visible"
                                        exit="hidden"
                                        variants={containerVariants}>
                                {grouped_items.map(item => (
                                    <motion.div
                                        className='payment-items-group-item-row'
                                        key={item.uid}
                                        variants={itemVariants}>
                                        {chapter1 !== 'success' ? <Checkbox
                                            checked={payment_group[chapter0][chapter1][chapter2].items.find(el => el === item.uid) !== undefined}
                                            onChange={() => {
                                                let payment_group_new = structuredClone(payment_group)
                                                if (payment_group_new[chapter0][chapter1][chapter2].items.find(el => el === item.uid) === undefined) {
                                                    payment_group_new[chapter0][chapter1][chapter2].items.push(item.uid)
                                                } else {
                                                    payment_group_new[chapter0][chapter1][chapter2].items = payment_group_new[chapter0][chapter1][chapter2].items.filter(el => el !== item.uid)
                                                }
                                                if (payment_group_new[chapter0][chapter1][chapter2].items.length === 0) {
                                                    payment_group_new[chapter0][chapter1][chapter2].selected = false
                                                } else if (payment_group_new[chapter0][chapter1][chapter2].items.length !== grouped_items.length) {
                                                    payment_group_new[chapter0][chapter1][chapter2].selected = false
                                                } else {
                                                    payment_group_new[chapter0][chapter1][chapter2].selected = true
                                                }
                                                set_payment_group(payment_group_new)
                                            }}/> : null}
                                        <Box className='payment-items-group-item-0'>{item.name}</Box>
                                        <Box className='payment-items-group-item-1'>{item.quantity}</Box>
                                        <Box className='payment-items-group-item-2'>{item.price}</Box>
                                        <Box className='payment-items-group-item-3'>{item.sum}</Box>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
            )
        } else {
            return null
        }
    }

    useEffect(() => {

        const payment_group_new = structuredClone(payment_group)

        payment_group_new.for_payment.waiting.mark_egais_items.count = props.order.for_payment.waiting.mark_egais_items.length
        payment_group_new.for_payment.waiting.horeca_items.count = props.order.for_payment.waiting.horeca_items.length
        payment_group_new.for_payment.waiting.cinema_items.count = props.order.for_payment.waiting.cinema_items.length
        payment_group_new.for_payment.waiting.count = payment_group_new.for_payment.waiting.mark_egais_items.count + payment_group_new.for_payment.waiting.horeca_items.count + payment_group_new.for_payment.waiting.cinema_items.count

        props.order.for_payment.waiting.mark_egais_items.forEach(item => {
            payment_group_new.for_payment.waiting.mark_egais_items.items.push(item.uid)
        })
        props.order.for_payment.waiting.horeca_items.forEach(item => {
            payment_group_new.for_payment.waiting.horeca_items.items.push(item.uid)
        })
        props.order.for_payment.waiting.cinema_items.forEach(item => {
            payment_group_new.for_payment.waiting.cinema_items.items.push(item.uid)
        })

        payment_group_new.for_payment.waiting.mark_egais_items.selected = true
        payment_group_new.for_payment.waiting.horeca_items.selected = true
        payment_group_new.for_payment.waiting.cinema_items.selected = true

        payment_group_new.for_payment.slip_without_receipt.mark_egais_items.count = props.order.for_payment.slip_without_receipt.mark_egais_items.length
        payment_group_new.for_payment.slip_without_receipt.horeca_items.count = props.order.for_payment.slip_without_receipt.horeca_items.length
        payment_group_new.for_payment.slip_without_receipt.cinema_items.count = props.order.for_payment.slip_without_receipt.cinema_items.length
        payment_group_new.for_payment.slip_without_receipt.count = payment_group_new.for_payment.slip_without_receipt.mark_egais_items.count + payment_group_new.for_payment.slip_without_receipt.horeca_items.count + payment_group_new.for_payment.slip_without_receipt.cinema_items.count

        props.order.for_payment.slip_without_receipt.mark_egais_items.forEach(item => {
            payment_group_new.for_payment.slip_without_receipt.mark_egais_items.items.push(item.uid)
        })
        props.order.for_payment.slip_without_receipt.horeca_items.forEach(item => {
            payment_group_new.for_payment.slip_without_receipt.horeca_items.items.push(item.uid)
        })
        props.order.for_payment.slip_without_receipt.cinema_items.forEach(item => {
            payment_group_new.for_payment.slip_without_receipt.cinema_items.items.push(item.uid)
        })

        payment_group_new.for_payment.slip_without_receipt.mark_egais_items.selected = true
        payment_group_new.for_payment.slip_without_receipt.horeca_items.selected = true
        payment_group_new.for_payment.slip_without_receipt.cinema_items.selected = true

        payment_group_new.for_returning.waiting.mark_egais_items.count = props.order.for_returning.waiting.mark_egais_items.length
        payment_group_new.for_returning.waiting.horeca_items.count = props.order.for_returning.waiting.horeca_items.length
        payment_group_new.for_returning.waiting.cinema_items.count = props.order.for_returning.waiting.cinema_items.length
        payment_group_new.for_returning.waiting.count = payment_group_new.for_returning.waiting.mark_egais_items.count + payment_group_new.for_returning.waiting.horeca_items.count + payment_group_new.for_returning.waiting.cinema_items.count

        payment_group_new.for_returning.slip_without_receipt.mark_egais_items.count = props.order.for_returning.slip_without_receipt.mark_egais_items.length
        payment_group_new.for_returning.slip_without_receipt.horeca_items.count = props.order.for_returning.slip_without_receipt.horeca_items.length
        payment_group_new.for_returning.slip_without_receipt.cinema_items.count = props.order.for_returning.slip_without_receipt.cinema_items.length
        payment_group_new.for_returning.slip_without_receipt.count = payment_group_new.for_returning.slip_without_receipt.mark_egais_items.count + payment_group_new.for_returning.slip_without_receipt.horeca_items.count + payment_group_new.for_returning.slip_without_receipt.cinema_items.count

        payment_group_new.for_returning.success.mark_egais_items.count = props.order.for_returning.success.mark_egais_items.length
        payment_group_new.for_returning.success.horeca_items.count = props.order.for_returning.success.horeca_items.length
        payment_group_new.for_returning.success.cinema_items.count = props.order.for_returning.success.cinema_items.length
        payment_group_new.for_returning.success.count = payment_group_new.for_returning.success.mark_egais_items.count + payment_group_new.for_returning.success.horeca_items.count + payment_group_new.for_returning.success.cinema_items.count

        set_payment_group(payment_group_new)

    }, [props.order])

    return (
        <Box style={{backgroundColor: '#f8f8f8'}}>
            <Box className='payment-total'>
                <Box className='payment-total-div'>
                    <Box sx={{display: 'flex', alignItems: 'none', cursor: 'pointer'}} onClick={() => {
                        props.type === 'cinema' ? dispatch(setPreOrderPaying(false)) : dispatch(setHorderPaying(false))
                    }}><ArrowBackIosNewIcon/></Box>
                    <Box sx={{backgroundColor: '#e4e2e2'}}>
                        <Box className='payment-total-title'>
                            Кино
                        </Box>
                        <Box className='payment-total-sum'>
                            {Math.round(pre_order.sum).toLocaleString('ru-RU')}
                        </Box>
                    </Box>
                    <Box>
                        <Box className='payment-total-title'>
                            Общепит
                        </Box>
                        <Box className='payment-total-sum'>
                            {Math.round(horder.sum).toLocaleString('ru-RU')}
                        </Box>
                    </Box>
                    <Box sx={{backgroundColor: '#e4e2e2'}}>
                        <Box className='payment-total-title'>
                            Всего
                        </Box>
                        <Box className='payment-total-sum'>
                            {Math.round(total).toLocaleString('ru-RU')}
                        </Box>
                    </Box>
                    <Box sx={{cursor: 'pointer'}} onClick={() => dispatch(openModal({type: 'calc', props: {}}))}>
                        <Box className='payment-total-title'>
                            Получил
                        </Box>
                        <Box className='payment-total-sum'>
                            {Math.round(cash).toLocaleString('ru-RU')}
                        </Box>
                    </Box>
                    <Box style={{
                        backgroundColor: total > cash ? '#FF1A25' : '#50DB92',
                        color: total > cash ? 'white' : 'black',
                        borderRadius: '0 12px 12px 0'
                    }}>
                        <Box className='payment-total-title'>
                            {total === cash ? <ThumbUpIcon/> : total > cash ? 'Получи' : 'Верни'}
                        </Box>
                        <Box className='payment-total-sum'>
                            {total !== cash ? Math.abs(change).toLocaleString('ru-RU') : <></>}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className='payment-types'>
                {!show_payment_types ? <Box sx={{fontWeight: 'bold'}}>Выберите позиции для платежной операции</Box> :
                    payment_methods_loading ? <Loader/> :
                        payment_methods_error !== null ?
                            <Box sx={{color: '#ff1a25', fontWeight: 'bold'}}>Ошибка загрузки маршрутов оплаты</Box> :
                            payment_methods.list.length === 0 ?
                                <Box sx={{color: '#ff1a25', fontWeight: 'bold'}}>Для этого рабочего места не найдено
                                    маршрутов оплаты, обратитесь в учетный отдел</Box> :
                                payment_methods.list.map(pm => {
                                    const chapter1_array = ['waiting', 'slip_without_receipt']
                                    const chapter2_array = ['mark_egais_items', 'horeca_items', 'cinema_items']
                                    let ok = true
                                    chapter1_array.forEach(chapter1 => {
                                        chapter2_array.forEach(chapter2 => {
                                            props.order.for_returning[chapter1][chapter2].forEach(item => {
                                                if (item.name_payment_type !== pm.name && payment_group.for_returning[chapter1][chapter2].items.includes(item.uid)) {
                                                    ok = false
                                                }
                                            })
                                        })
                                    })
                                    if (ok) {
                                        return (
                                            <Button variant='contained'
                                                    color='secondary'
                                                    key={`${pm.uid}${pm.uid_kkt}${pm.uid_pinpad}`}
                                                    className='payment-path'
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center'
                                                    }}
                                                    onClick={() => {
                                                        pay(pm)
                                                    }}>
                                                <span>{pm.name}</span>
                                                <span
                                                    style={{fontSize: '70%'}}>
                                            <div>ККТ ...{pm.kkt.number.slice(-4)}</div>
                                                    {pm.pinpad !== null ?
                                                        <div>Пинпад ...{pm.pinpad.number.slice(-4)}</div> : null}
                                                </span>
                                            </Button>
                                        )
                                    }
                                })

                }
            </Box>
            <Box className='payment-items'>
                <Fade in={payment_group.for_payment.slip_without_receipt.count > 0} timeout={500} unmountOnExit>
                    <Box className='payment-items-group'>
                        <Box
                            className='payment-items-group-title' sx={{
                            backgroundColor: '#ff1a25',
                            color: 'white'
                        }}>{PAYMENT_STATE_SLIP_WITHOUT_RECEIPT}<DotsAnimation/></Box>
                        <GroupedTable group={props.order.for_payment.slip_without_receipt.mark_egais_items}
                                      title={ITEMS_TYPE_MARK_EGAIS}
                                      chapter={'for_payment.slip_without_receipt.mark_egais_items'}/>
                        <GroupedTable group={props.order.for_payment.slip_without_receipt.horeca_items}
                                      title={ITEMS_TYPE_ITEMS}
                                      chapter={'for_payment.slip_without_receipt.horeca_items'}/>
                        <GroupedTable group={props.order.for_payment.slip_without_receipt.cinema_items}
                                      title={ITEMS_TYPE_SERVICE}
                                      chapter={'for_payment.slip_without_receipt.cinema_items'}/>
                    </Box>
                </Fade>
                <Fade in={payment_group.for_payment.waiting.count > 0} timeout={500} unmountOnExit>
                    <Box className='payment-items-group'>
                        <Box className='payment-items-group-title'>
                            {PAYMENT_STATE_WAITING}<DotsAnimation/>
                        </Box>
                        <GroupedTable group={props.order.for_payment.waiting.mark_egais_items}
                                      title={ITEMS_TYPE_MARK_EGAIS}
                                      chapter={'for_payment.waiting.mark_egais_items'}/>
                        <GroupedTable group={props.order.for_payment.waiting.horeca_items}
                                      title={ITEMS_TYPE_ITEMS}
                                      chapter={'for_payment.waiting.horeca_items'}/>
                        <GroupedTable group={props.order.for_payment.waiting.cinema_items}
                                      title={ITEMS_TYPE_SERVICE}
                                      chapter={'for_payment.waiting.cinema_items'}/>
                    </Box>
                </Fade>

                <Fade in={payment_group.for_returning.slip_without_receipt.count > 0} timeout={500} unmountOnExit>
                    <Box className='payment-items-group'>
                        <Box className='payment-items-group-title' sx={{backgroundColor: '#ff1a25', color: 'white'}}>
                            {RETURNING_STATE_SLIP_WITHOUT_RECEIPT}<DotsAnimation/>
                        </Box>
                        <GroupedTable group={props.order.for_returning.slip_without_receipt.mark_egais_items}
                                      title={ITEMS_TYPE_MARK_EGAIS}
                                      chapter={'for_returning.slip_without_receipt.mark_egais_items'}/>
                        <GroupedTable group={props.order.for_returning.slip_without_receipt.horeca_items}
                                      title={ITEMS_TYPE_ITEMS}
                                      chapter={'for_returning.slip_without_receipt.horeca_items'}/>
                        <GroupedTable group={props.order.for_returning.slip_without_receipt.cinema_items}
                                      title={ITEMS_TYPE_SERVICE}
                                      chapter={'for_returning.slip_without_receipt.cinema_items'}/>
                    </Box>
                </Fade>

                <Fade in={payment_group.for_returning.waiting.count > 0} timeout={500} unmountOnExit>
                    <Box className='payment-items-group'>
                        <Box className='payment-items-group-title' sx={{backgroundColor: '#50DB92'}}>
                            {RETURNING_STATE_WAITING}
                        </Box>
                        <GroupedTable group={props.order.for_returning.waiting.mark_egais_items}
                                      title={ITEMS_TYPE_MARK_EGAIS}
                                      chapter={'for_returning.waiting.mark_egais_items'}/>
                        <GroupedTable group={props.order.for_returning.waiting.horeca_items}
                                      title={ITEMS_TYPE_ITEMS}
                                      chapter={'for_returning.waiting.horeca_items'}/>
                        <GroupedTable group={props.order.for_returning.waiting.cinema_items}
                                      title={ITEMS_TYPE_SERVICE}
                                      chapter={'for_returning.waiting.cinema_items'}/>
                    </Box>
                </Fade>

                <Fade in={payment_group.for_returning.success.count > 0} timeout={500} unmountOnExit>
                    <Box className='payment-items-group'>
                        <Box className='payment-items-group-title' sx={{backgroundColor: '#414650', color: 'white'}}>
                            {RETURNING_STATE_SUCCESS}
                        </Box>
                        <GroupedTable group={props.order.for_returning.success.mark_egais_items}
                                      title={ITEMS_TYPE_MARK_EGAIS}
                                      chapter={'for_returning.success.mark_egais_items'}/>
                        <GroupedTable group={props.order.for_returning.success.horeca_items}
                                      title={ITEMS_TYPE_ITEMS}
                                      chapter={'for_returning.success.horeca_items'}/>
                        <GroupedTable group={props.order.for_returning.success.cinema_items}
                                      title={ITEMS_TYPE_SERVICE}
                                      chapter={'for_returning.success.cinema_items'}/>
                    </Box>
                </Fade>
            </Box>
        </Box>
    )
}

export default Payment

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