import {Box, Button, Fade, TextField} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
    setCash,
    setCommentReturnReasons,
    setHorderPaying,
    setHorderPreparing,
    setPreOrderPaying,
    setPreOrderPreparing,
    setReturnReasonsList,
    setTotal
} from "../../redux/ordersReducer.js"
import {
    ITEMS_TYPE_ITEMS,
    ITEMS_TYPE_MARK_EGAIS,
    ITEMS_TYPE_SERVICE,
    openModal,
    PAYMENT_STATE_SLIP_WITHOUT_RECEIPT,
    PAYMENT_STATE_WAITING,
    RETURNING_STATE_SLIP_WITHOUT_RECEIPT,
    RETURNING_STATE_SUCCESS,
    RETURNING_STATE_WAITING
} from "../../redux/interfaceReducer.js"
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DotsAnimation from "../../ui/DotsAnimation.jsx"
import Loader from "../../ui/Loader.jsx"
import {
    common_list_get, common_order_pay, common_payment_methods_get
} from "../../service/fetch_service.js"
import {useEffect, useMemo, useRef, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import Checkbox from "@mui/material/Checkbox"
import FunctionsIcon from "@mui/icons-material/Functions"
import {useSetPaymentGroups} from "../../hooks/common/useSetPaymentGroups.js"
import {SelectMenu} from "../../ui/SelectMenu.jsx"

const Payment = (props) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const [payment_methods, set_payment_methods] = useState({loading: false, error: null, data: null})
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const [order, set_order] = useState(null)
    const total = useSelector(state => state.orders.total)
    const cash = useSelector(state => state.orders.cash)
    const change = useSelector(state => state.orders.change)
    const [show_payment_types, set_show_payment_types] = useState(false)
    const pre_order_paying = useSelector(state => state.orders.pre_order_paying)
    const horder_paying = useSelector(state => state.orders.horder_paying)
    const return_reasons = useSelector(state => state.orders.return_reasons)
    const uid_current_return_reasons = useSelector(state => state.orders.uid_current_return_reasons)
    const comment_return_reasons = useSelector(state => state.orders.comment_return_reasons)
    const [return_kind, set_return_kind] = useState('0')

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_payment_methods_get(filial, props.order.uid, props.type))
            set_payment_methods(fetching_result)
        }
        if (filial !== undefined && props.order.uid !== undefined && props.type !== undefined) {
            fetch()
        }
    }, [dispatch, filial, props.order.uid, props.type])

    const [payment_group, set_payment_group] = useSetPaymentGroups(order)
    useEffect(() => {
        switch (props.type) {
            case 'cinema':
                set_order(pre_order)
                break
            case 'horeca':
                set_order(horder)
                break
        }
    }, [horder, pre_order, props.type])

    const pay = async (pm) => {
        await dispatch(props.type === 'cinema' ? setPreOrderPaying(true) : setHorderPaying(true))
        await dispatch(common_order_pay(filial, pm, props.type === 'cinema' ? props.order.uid : props.order.uid, props.type === 'cinema' ? props.order.ver : props.order.ver, props.type, payment_group, uid_current_return_reasons, comment_return_reasons))
        await dispatch(props.type === 'cinema' ? setPreOrderPaying(false) : setHorderPaying(false))
    }

    useEffect(() => {
        dispatch(setTotal(pre_order.sum + horder.sum))
        dispatch(setCash(['clean', pre_order.sum + horder.sum]))
    }, [dispatch, horder.sum, pre_order.sum])

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
    }, [payment_group])

    useEffect(() => {
        dispatch(common_list_get(filial, 'return_reasons'))
        return () => {
            dispatch(setCommentReturnReasons(''))
            dispatch(setReturnReasonsList([]))
        }
    }, [dispatch, filial])

    const return_reasons_list = () => {
        return <>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <SelectMenu
                    type={'return-reasons'}
                    list={return_reasons}
                    current_value={uid_current_return_reasons}
                    width='60%'
                />
                <SelectMenu
                    type={'return-kind'}
                    list={[{uid: '0', title: 'Сразу'}, {uid: '1', title: 'По заявлению'}]}
                    current_value={return_kind}
                    width='40%'
                    action={set_return_kind}
                />
            </Box>
            <TextField sx={{width: '100%'}} variant='filled' label='Комментарий к возврату'
                       value={comment_return_reasons}
                       onChange={(event) => {
                           dispatch(setCommentReturnReasons(event.target.value))
                       }}/>
        </>
    }

    const GroupedTable = ({group, title, chapter}) => {

        const [chapter0, chapter1, chapter2] = chapter.split('.')

        const has_mounted = useRef(false)
        useEffect(() => {
            has_mounted.current = true
        }, [])

        const grouped_items = useMemo(() => {
            function groupAndSum(data, groupByFields, sumFields) {
                return Object.values(data.reduce((acc, item) => {
                    const key = groupByFields.map(field => item[field]).join('-')
                    if (!acc[key]) {
                        acc[key] = {...item}
                    } else {
                        sumFields.forEach(field => {
                            acc[key][field] += item[field]
                        })
                    }
                    return acc
                }, {}))
            }

            switch (chapter0) {
                case 'for_payment':
                    return groupAndSum(group, ["name", "unit_name", "price", "sum_discount", "uid_discount"], ["quantity", "sum"])
                case 'for_returning':
                    return groupAndSum(group, ["uid", "name", "unit_name", "price", "sum_discount", "uid_discount", "uid_return_reason", "name_return_reason", "comment_return_reason"], ["quantity", "sum"])
            }
        }, [group])

        if (grouped_items.length > 0) {
            return <Box>
                <Box className='payment-items-group-title-name'>
                    {chapter1 !== 'success' ? <Checkbox checked={payment_group[chapter0][chapter1][chapter2].selected}
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
                                                        }}/> : <Box sx={{width: '10px'}}></Box>}{title}</Box>
                <AnimatePresence>,
                    {grouped_items.length > 0 && (<motion.div className='payment-items-group-item'
                                                              initial={!has_mounted.current}
                                                              animate="visible"
                                                              exit="hidden"
                                                              variants={containerVariants}>
                        {grouped_items.map((item, i) => (<motion.div
                            key={item.uid}
                            variants={itemVariants}>
                            <Box style={{borderBottom: i !== grouped_items.length - 1 ? '1px dashed #b6b5b5' : null}}>
                                <Box className='payment-items-group-item-row'>
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
                                    <Box className='payment-items-group-item-2'>{item.price} р</Box>
                                    <Box className='payment-items-group-item-3'><FunctionsIcon/>{item.sum} р</Box>
                                </Box>
                                {item.uid_return_reason !== null ? <Box
                                    sx={{fontSize: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <span style={{fontWeight: 'bold'}}>Причина возврата: </span>
                                    <span style={{
                                        marginLeft: '5px', fontWeight: 'bold'
                                    }}>{item.name_return_reason.toLowerCase()} </span>
                                    {item.comment_return_reason !== null ?
                                        <span>, {item.comment_return_reason}</span> : null}
                                </Box> : null}
                            </Box>
                        </motion.div>))}
                    </motion.div>)}
                </AnimatePresence>
            </Box>
        } else {
            return null
        }
    }
    return <Box style={{backgroundColor: '#f8f8f8'}}
                className={(props.type === 'cinema' && pre_order_paying) || (props.type === 'horeca' && horder_paying) ? 'payment-paying' : null}>
        <Box className='payment-total'>
            <Box className='payment-total-div'>
                <Box sx={{display: 'flex', alignItems: 'none', cursor: 'pointer'}} onClick={() => {
                    props.type === 'cinema' ? dispatch(setPreOrderPreparing(false)) : dispatch(setHorderPreparing(false))
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
                    {horder_paying ? <Loader size={0.5}/> : <>
                        <Box className='payment-total-title'>
                            {total === cash ? <ThumbUpIcon/> : total > cash ? 'Получи' : 'Верни'}
                        </Box>
                        <Box className='payment-total-sum'>
                            {total !== cash ? Math.abs(change).toLocaleString('ru-RU') : <></>}
                        </Box>
                    </>}
                </Box>
            </Box>
        </Box>
        <Box className='payment-types'>
            {!show_payment_types ? <Box sx={{fontWeight: 'bold'}}>Выберите позиции для платежной
                операции</Box> : payment_methods.loading ? <Loader size={2}/> : payment_methods.error !== null ?
                <Box sx={{color: '#ff1a25', fontWeight: 'bold'}}>Ошибка загрузки маршрутов
                    оплаты</Box> : payment_methods.data === null ?
                    <Box sx={{color: '#ff1a25', fontWeight: 'bold'}}>Для этого рабочего места не найдено
                        маршрутов оплаты, обратитесь в учетный отдел</Box> : payment_methods.data.list.map(pm => {
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
                            return (<Button variant='outlined'
                                            color='secondary'
                                            key={`${pm.uid}${pm.uid_kkt}${pm.uid_pinpad}`}
                                            className='payment-path'
                                            sx={{
                                                display: 'flex', flexDirection: 'column', alignItems: 'center'
                                            }}
                                            onClick={() => {
                                                pay(pm)
                                            }}>
                                <span>{pm.name}</span>
                                <span
                                    style={{fontSize: '70%'}}>
                                            <div>ККТ ...{pm.kkt.number.slice(-4)}</div>
                                    {pm.pinpad !== null ? <div>Пинпад ...{pm.pinpad.number.slice(-4)}</div> : null}
                                                </span>
                            </Button>)
                        }
                    })

            }
        </Box>
        <Box className='payment-items'>
            <Fade in={payment_group.for_payment.slip_without_receipt.count > 0} timeout={500} unmountOnExit>
                <Box className='payment-items-group'>
                    <Box
                        className='payment-items-group-title' sx={{
                        backgroundColor: '#f74b53', color: 'white'
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
                    <Box className='payment-items-group-title'
                         sx={{backgroundColor: '#f74b53', color: 'white'}}>
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
                    {return_reasons_list()}
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
                    <Box className='payment-items-group-title'
                         sx={{backgroundColor: '#414650', color: 'white'}}>
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
}

export default Payment

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