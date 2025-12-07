import {Box, Button, Fade, TextField} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
    setCash,
    setHorderPaying,
    setHorderPreparing,
    setPreOrderPaying,
    setPreOrderPreparing,
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
import {common_order_pay, common_payment_methods_get} from "../../service/fetch_service.js"
import {useEffect, useMemo, useRef, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import Checkbox from "@mui/material/Checkbox"
import FunctionsIcon from "@mui/icons-material/Functions"
import {useSetPaymentGroups} from "../../hooks/common/useSetPaymentGroups.js"
import PaymentIcon from '@mui/icons-material/Payment'
import LazySelect from "../../ui/LazySelect.jsx"
import {useNavigate} from "react-router-dom"

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

    const [uid_current_return_reasons, set_uid_current_return_reasons] = useState('')
    const [comment_return_reasons, set_comment_return_reasons] = useState('')

    useEffect(() => {
        const fetch = async () => {
            let fetching_result = await dispatch(common_payment_methods_get(filial, props.order.uid, props.type, false))
            if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                fetching_result.data.list.push({
                    name: 'Другие способы',
                    uid_kkt: '',
                    uid_pinpad: '',
                    uid_work_place: '',
                    uid_filial: '',
                    uid_printer_kkt: '',
                    uid_printer: '',
                    hidden: '',
                    uid: 'Другие способы',
                    kkt: {number: ''},
                    pinpad: {number: ''}
                })
                set_payment_methods(fetching_result)
            }
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
        let total_new = 0
        pre_order.items.filter(item => !item.in_payment_completed && !item.out_payment_completed).forEach(item => {
            total_new += item.sum
        })
        horder.items.filter(item => !item.in_payment_completed && !item.out_payment_completed && !item.canceled).forEach(item => {
            total_new += item.price.sum
        })
        dispatch(setTotal(total_new))
        dispatch(setCash(['clean', total_new]))
    }, [dispatch, horder.ver, pre_order.ver])

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

    const return_reasons_list = () => {
        return <>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <LazySelect
                    sx={{width: '100%'}}
                    variant='filled'
                    label="Причины возврата"
                    value={uid_current_return_reasons || ''}
                    type="return_reasons"
                    filial={filial}
                    onChange={(uid, extra) => {
                        set_uid_current_return_reasons(uid)
                    }}
                    getLabel={item => `${item.title}`}
                />
            </Box>
            <TextField
                sx={{width: '100%'}}
                value={comment_return_reasons || ''}
                label='Комментарий к возврату'
                variant='filled'
                onChange={e => {
                    set_comment_return_reasons(e.target.value)
                }}
            />
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
                        acc[key] = {
                            ...item, __uids: [item.uid]
                        }
                    } else {
                        sumFields.forEach(field => {
                            acc[key][field] += item[field]
                        })
                        acc[key].__uids.push(item.uid)
                    }
                    return acc
                }, {}))
            }

            switch (chapter0) {
                case 'for_payment':
                    return groupAndSum(group, ["name", "unit_name", "price", "sum_discount", "uid_discount"], ["quantity", "sum"])
                case 'for_returning':
                    return groupAndSum(group, ["uid", "name", "unit_name", "price", "sum_discount", "uid_discount", "uid_return_reason", "name_return_reason", "comment_return_reason"], ["quantity", "sum"])
                default:
                    return []
            }
        }, [chapter0, group])

        if (grouped_items.length === 0) return null

        const navigate = useNavigate()
        const {city, filial} = useSelector(state => state.data)
        const wp = useSelector(state => state.interface.wp)

        return <Box>
            <Box className='payment-items-group-title-name'>
                {chapter1 !== 'success' ? <Checkbox
                    checked={payment_group[chapter0][chapter1][chapter2].selected}
                    onChange={() => {
                        const payment_group_new = structuredClone(payment_group)
                        const action = !payment_group_new[chapter0][chapter1][chapter2].selected
                        payment_group_new[chapter0][chapter1][chapter2].selected = action
                        if (action) {
                            payment_group_new[chapter0][chapter1][chapter2].items = grouped_items.flatMap(item => item.__uids)
                        } else {
                            payment_group_new[chapter0][chapter1][chapter2].items = []
                        }
                        set_payment_group(payment_group_new)
                    }}
                /> : <Box sx={{width: '10px'}}></Box>}
                {title}
            </Box>

            <AnimatePresence>
                {grouped_items.length > 0 && <motion.div
                    className='payment-items-group-item'
                    initial={!has_mounted.current}
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                >
                    {grouped_items.map((item, i) => <motion.div key={item.__uids.join('-')} variants={itemVariants}>
                        <Box
                            style={{borderBottom: i !== grouped_items.length - 1 ? '1px dashed #b6b5b5' : null}}>
                            <Box className='payment-items-group-item-row'>
                                {chapter1 !== 'success' ? (<Checkbox
                                    checked={item.__uids.every(uid => payment_group[chapter0][chapter1][chapter2].items.includes(uid))}
                                    onChange={() => {
                                        const payment_group_new = structuredClone(payment_group)
                                        const selectedItems = payment_group_new[chapter0][chapter1][chapter2].items
                                        const allSelected = item.__uids.every(uid => selectedItems.includes(uid))
                                        if (allSelected) {
                                            payment_group_new[chapter0][chapter1][chapter2].items = selectedItems.filter(uid => !item.__uids.includes(uid))
                                        } else {
                                            payment_group_new[chapter0][chapter1][chapter2].items = [...new Set([...selectedItems, ...item.__uids])]
                                        }
                                        const totalUids = grouped_items.flatMap(g => g.__uids)
                                        const selectedUids = payment_group_new[chapter0][chapter1][chapter2].items
                                        payment_group_new[chapter0][chapter1][chapter2].selected = totalUids.every(uid => selectedUids.includes(uid))
                                        set_payment_group(payment_group_new)
                                    }}
                                />) : null}
                                <Box className='payment-items-group-item-0'>{item.name}</Box>
                                <Box className='payment-items-group-item-1'>{item.quantity}</Box>
                                <Box className='payment-items-group-item-2'>{item.price} р</Box>
                                <Box className='payment-items-group-item-3'>
                                    <FunctionsIcon/>{item.sum} р
                                </Box>
                            </Box>

                            {item.uid_return_reason !== null && (<Box
                                sx={{
                                    fontSize: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center'
                                }}
                            >
                                <span style={{fontWeight: 'bold'}}>Причина возврата: </span>
                                <span style={{marginLeft: '5px', fontWeight: 'bold'}}>
                                                {item.name_return_reason !== null && item.name_return_reason.toLowerCase()}
                                            </span>
                                {item.comment_return_reason !== null && (<span>, {item.comment_return_reason}</span>)}
                            </Box>)}

                            {item.name_payment_type !== null ? <Box sx={{
                                fontSize: '80%',
                                color: 'grey',
                                marginRight: '5px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                                <Box>{item.name_payment_type}</Box>
                                {item.uid_in_receipt !== null ?
                                    <Box sx={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {
                                        navigate(`/admin/receipt/${city.code}/${filial.eais}/${item.uid_in_receipt}/?${wp !== null ? 'wp=' + wp : ''}`)
                                    }}>Чек приход</Box> : null}
                                {item.uid_in_slip !== null ?
                                    <Box sx={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {
                                        navigate(`/admin/slip/${city.code}/${filial.eais}/${item.uid_in_slip}/?${wp !== null ? 'wp=' + wp : ''}`)
                                    }}>Слип приход</Box> : null}
                                {item.uid_out_receipt !== null ?
                                    <Box sx={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {
                                        navigate(`/admin/receipt/${city.code}/${filial.eais}/${item.uid_out_receipt}/?${wp !== null ? 'wp=' + wp : ''}`)
                                    }}>Чек возврат</Box> : null}
                                {item.uid_out_slip !== null ?
                                    <Box sx={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {
                                        navigate(`/admin/slip/${city.code}/${filial.eais}/${item.uid_out_slip}/?${wp !== null ? 'wp=' + wp : ''}`)
                                    }}>Слип возврат</Box> : null}
                            </Box> : null}
                        </Box>
                    </motion.div>)}
                </motion.div>}
            </AnimatePresence>
        </Box>
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
                    оплаты</Box> : payment_methods.data === null || payment_methods.data.list.length === 0 ?
                    <Box sx={{color: '#ff1a25', fontWeight: 'bold', textAlign: 'center'}}>Для этого рабочего места не
                        найдено маршрутов оплаты, обратитесь в учетный
                        отдел</Box> : payment_methods.data.list.map(pm => {
                        const chapter0_array = ['for_payment', 'for_returning']
                        const chapter1_array = ['waiting', 'slip_without_receipt']
                        const chapter2_array = ['mark_egais_items', 'horeca_items', 'cinema_items']
                        let ok = true
                        chapter0_array.forEach((chapter0) => {
                            if (chapter0 === 'for_returning') {
                                chapter1_array.forEach(chapter1 => {
                                    chapter2_array.forEach(chapter2 => {
                                        props.order[chapter0][chapter1][chapter2].forEach(item => {
                                            if (pm.uid !== 'Другие способы') {
                                                if (item.name_payment_type !== pm.name && payment_group[chapter0][chapter1][chapter2].items.includes(item.uid) || pm.hidden) {
                                                    ok = false
                                                }
                                            }
                                        })
                                    })
                                })
                            } else {
                                chapter1_array.forEach(chapter1 => {
                                    chapter2_array.forEach(chapter2 => {
                                        props.order[chapter0][chapter1][chapter2].forEach(item => {
                                            if ((payment_group[chapter0][chapter1][chapter2].items.includes(item.uid) && pm.uid === 'Заявление') || (item.name_payment_type !== null && item.name_payment_type !== 'СБП' && item.name_payment_type !== pm.name) || (item.name_payment_type !== null && item.name_payment_type === 'СБП' && pm.name !== 'Безналичные') || pm.hidden) {
                                                ok = false
                                            }
                                        })
                                    })
                                })
                            }
                        })
                        if (ok) {
                            return <Button
                                startIcon={pm.uid === 'Другие способы' ? <PaymentIcon/> : null}
                                variant={pm.uid === 'Другие способы' ? 'contained' : 'outlined'}
                                color='secondary'
                                key={`${pm.uid}${pm.uid_kkt}${pm.uid_pinpad}`}
                                className='payment-path'
                                sx={{
                                    display: 'flex',
                                    flexDirection: pm.uid === 'Другие способы' ? 'row' : 'column',
                                    alignItems: 'center'
                                }}
                                onClick={() => {
                                    if (pm.uid === 'Другие способы') {
                                        dispatch(openModal({
                                            type: 'others_payment_types',
                                            props: {type: props.type, order: props.order, pay, payment_group}
                                        }))
                                    } else {
                                        pay(pm)
                                    }
                                }}>
                                <span>{pm.name}</span>
                                {pm.uid !== 'Другие способы' ? <span
                                    style={{fontSize: '70%'}}><div>ККТ ...{pm.kkt.number.slice(-4)}</div>
                                    {pm.pinpad !== null ? <div>Пинпад ...{pm.pinpad.number.slice(-4)}</div> : null}
                                </span> : null}
                            </Button>
                        }
                    })}
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