import {Box, Button} from "@mui/material"
import {useSetPaymentMethods} from "../../hooks/payment/useSetPaymentMethods.js"
import {useFetchReceiptsFromOrder} from "../../hooks/payment/useFetchReceiptsFromOrder.js"
import {useDispatch, useSelector} from "react-redux"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {useEffect, useMemo, useState} from "react"
import Loader from "../modal/Loader.jsx"
import {
    setCash,
    setHorderPaying,
    setPreOrderPaying,
    setTotal
} from "../../redux/ordersReducer.js"
import {openModal} from "../../redux/interfaceReducer.js"
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import {blockOrder, payment} from "../../service/fetch_service.js"
import Checkbox from '@mui/material/Checkbox'

const Payment = (props) => {

    const dispatch = useDispatch()

    const [payment_methods, payment_methods_error, payment_methods_loading] = useSetPaymentMethods()
    const [order_error, order_loading] = useFetchReceiptsFromOrder(props.type)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const total = useSelector(state => state.orders.total)
    const cash = useSelector(state => state.orders.cash)
    const change = useSelector(state => state.orders.change)
    const filial = useSelector(state => state.data.filial)

    const [waiting_mark_egais_items, set_waiting_mark_egais_items] = useState(true)
    const [waiting_horeca_items, set_waiting_horeca_items] = useState(true)
    const [waiting_cinema_items, set_waiting_cinema_items] = useState(true)

    const [slip_without_receipt_mark_egais_items, set_slip_without_receipt_mark_egais_items] = useState(true)
    const [slip_without_receipt_horeca_items, set_slip_without_receipt_horeca_items] = useState(true)
    const [slip_without_receipt_cinema_items, set_slip_without_receipt_cinema_items] = useState(true)

    const paymentMethodsArray = () => {
        if (payment_methods_loading) {
            return <Loader/>
        } else if (payment_methods_error) {
            return <Box>Ошибка загрузки маршрутов оплаты</Box>
        } else if (payment_methods.list.length === 0) {
            return <Box>Для этого рабочего места не найдено маршрутов оплаты</Box>
        } else {
            return (
                <>
                    {payment_methods.list.map(pm => {
                        return (
                            <Button variant='contained'
                                    color='secondary'
                                    key={pm.uid}
                                    className='payment-path'
                                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                                    onClick={() => {
                                        dispatch(payment(filial, pm, props.type === 'cinema' ? pre_order.uid : horder.uid, props.type))
                                    }}>
                                <span>{pm.name}</span>
                                <span
                                    style={{fontSize: '70%'}}>kkt {pm.kkt.number.slice(-4)} | pin {pm.pinpad.number.slice(-4)}</span>
                            </Button>
                        )
                    })}
                </>
            )
        }
    }

    useEffect(() => {
        dispatch(blockOrder(
            filial,
            props.type === 'cinema' ? pre_order.uid : horder.uid,
            props.type === 'cinema' ? pre_order.ver : horder.ver,
            props.type,
            true))
        return () => {
            dispatch(blockOrder(
                filial,
                props.type === 'cinema' ? pre_order.uid : horder.uid,
                props.type === 'cinema' ? pre_order.ver : horder.ver,
                props.type,
                false))
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(setTotal(pre_order.sum + horder.sum))
        dispatch(setCash(['clean', pre_order.sum + horder.sum]))
    }, [dispatch, horder.sum, pre_order.sum])

    const data = useMemo(() => {
        return {
            waiting: {
                mark_egais_items: [],
                horeca_items: [],
                cinema_items: [],
            },
            slip_without_receipt: {
                mark_egais_items: [],
                horeca_items: [],
                cinema_items: [],
            },
            success: {
                mark_egais_items: [],
                horeca_items: [],
                cinema_items: [],
            }
        }
    }, [])

    const [order_receipt, set_order_receipt] = useState({...data})
    useEffect(() => {
        let order = undefined
        if (props.type === 'cinema') {
            order = pre_order
        } else {
            order = horder
        }
        const for_payment = structuredClone(order.for_payment)
        const categories = ["mark_egais_items", "horeca_items", "cinema_items"]
        categories.forEach((category) => {
            order.for_payment.waiting[category].forEach((item) => {
                for_payment.waiting[category].push({
                    name: item.name,
                    unit_name: item.unit_name,
                    price: item.price,
                    discount: item.name_discount ?? "-",
                    quantity: item.quantity,
                    sum: item.sum,
                })
            })
            const groupedItems = groupAndSum(
                order.for_payment.waiting[category],
                ["name", "unit_name", "price", "discount"],
                ["quantity", "sum"]
            )
            for_payment.waiting[category] = groupedItems.map((item, i) => ({
                id: i,
                name: item.name,
                price: `${item.price.toLocaleString("ru-RU")} р`,
                discount: item.name_discount ?? "-",
                quantity: `${item.quantity.toFixed(3)} ${item.unit_name}`,
                sum: `${item.sum.toLocaleString("ru-RU")} р`,
            }))
        })
        set_order_receipt(for_payment)
    }, [data, pre_order, horder, props.type])

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

    const [slip_without_receipt, set_slip_without_receipt] = useState(false)
    const [waiting, set_waiting] = useState(false)
    const [success, set_success] = useState(false)
    useEffect(() => {
        if (order_receipt.slip_without_receipt.mark_egais_items.length > 0 ||
            order_receipt.slip_without_receipt.horeca_items.length > 0 ||
            order_receipt.slip_without_receipt.cinema_items.length > 0) {
            set_slip_without_receipt(true)
        } else {
            set_slip_without_receipt(false)
        }
        if (order_receipt.waiting.mark_egais_items.length > 0 ||
            order_receipt.waiting.horeca_items.length > 0 ||
            order_receipt.waiting.cinema_items.length > 0) {
            set_waiting(true)
        } else {
            set_waiting(false)
        }
        if (order_receipt.success.mark_egais_items.length > 0 ||
            order_receipt.success.horeca_items.length > 0 ||
            order_receipt.success.cinema_items.length > 0) {
            set_success(true)
        } else {
            set_success(false)
        }
    }, [order_receipt])

    const table = (table_name, title) => {
        const chapter = table_name.split(".")[0]
        const table = table_name.split(".")[1]
        if (order_receipt[chapter][table].length > 0) {
            return (
                <>
                    <Box className='payment-items-group-title-name'><Checkbox
                        checked={
                            `${chapter}.${table}` === 'waiting.mark_egais_items' ? waiting_mark_egais_items :
                                `${chapter}.${table}` === 'waiting.horeca_items' ? waiting_horeca_items :
                                    `${chapter}.${table}` === 'waiting.cinema_items' ? waiting_cinema_items :
                                        `${chapter}.${table}` === 'slip_without_receipt.mark_egais_items' ? slip_without_receipt_mark_egais_items :
                                            `${chapter}.${table}` === 'slip_without_receipt.horeca_items' ? slip_without_receipt_horeca_items :
                                                `${chapter}.${table}` === 'slip_without_receipt.cinema_items' ? slip_without_receipt_cinema_items :
                                                    false
                        } onChange={() => {
                        if (`${chapter}.${table}` === 'waiting.mark_egais_items') {
                            set_waiting_mark_egais_items(prev_value => !prev_value)
                        } else if (`${chapter}.${table}` === 'waiting.horeca_items') {
                            set_waiting_horeca_items(prev_value => !prev_value)
                        } else if (`${chapter}.${table}` === 'waiting.cinema_items') {
                            set_waiting_cinema_items(prev_value => !prev_value)
                        } else if (`${chapter}.${table}` === 'slip_without_receipt.mark_egais_items') {
                            set_slip_without_receipt_mark_egais_items(prev_value => !prev_value)
                        } else if (`${chapter}.${table}` === 'slip_without_receipt.horeca_items') {
                            set_slip_without_receipt_horeca_items(prev_value => !prev_value)
                        } else if (`${chapter}.${table}` === 'slip_without_receipt.cinema_items') {
                            set_slip_without_receipt_cinema_items(prev_value => !prev_value)
                        }
                    }}/>{title}</Box>
                    <Box className='payment-items-group-item'>
                        {order_receipt[chapter][table].map((item) => (
                            <Box key={item.id} className='payment-items-group-item-row'>
                                <Box className='payment-items-group-item-0'>{item.name}</Box>
                                <Box className='payment-items-group-item-1'>{item.quantity}</Box>
                                <Box className='payment-items-group-item-2'>{item.price}</Box>
                                <Box className='payment-items-group-item-3'>{item.sum}</Box>
                            </Box>
                        ))}
                    </Box>
                </>
            )
        } else {
            return (<></>)
        }
    }

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
                            {pre_order.sum}
                        </Box>
                    </Box>
                    <Box>
                        <Box className='payment-total-title'>
                            Общепит
                        </Box>
                        <Box className='payment-total-sum'>
                            {horder.sum}
                        </Box>
                    </Box>
                    <Box sx={{backgroundColor: '#e4e2e2'}}>
                        <Box className='payment-total-title'>
                            Всего
                        </Box>
                        <Box className='payment-total-sum'>
                            {total}
                        </Box>
                    </Box>
                    <Box sx={{cursor: 'pointer'}} onClick={() => dispatch(openModal({type: 'calc', props: {}}))}>
                        <Box className='payment-total-title'>
                            Получил
                        </Box>
                        <Box className='payment-total-sum'>
                            {cash}
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
                            {total !== cash ? Math.abs(change) : <></>}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className='payment-types'>
                {paymentMethodsArray()}
            </Box>
            <Box className='payment-items'>
                <Box sx={{display: slip_without_receipt ? 'block' : 'none'}} className='payment-items-group'>
                    <Box className='payment-items-group-title'>Списали деньги с карты, но не пробили
                        чек</Box>
                    {table('slip_without_receipt.mark_egais_items', 'Товары ЧЗ, ЕГАИС')}
                    {table('slip_without_receipt.horeca_items', 'Товары')}
                    {table('slip_without_receipt.cinema_items', 'Услуги')}
                </Box>
                <Box sx={{display: waiting ? 'block' : 'none'}} className='payment-items-group'>
                    <Box className='payment-items-group-title'>Ожидает оплаты</Box>
                    {table('waiting.mark_egais_items', 'Товары ЧЗ, ЕГАИС')}
                    {table('waiting.horeca_items', 'Товары')}
                    {table('waiting.cinema_items', 'Услуги')}
                </Box>
                <Box sx={{display: success ? 'block' : 'none'}} className='payment-items-group'>
                    <Box className='payment-items-group-title'>Успешно оплачено</Box>
                    {table('success.mark_egais_items', 'Товары ЧЗ, ЕГАИС')}
                    {table('success.horeca_items', 'Товары')}
                    {table('success.cinema_items', 'Услуги')}
                </Box>
            </Box>
        </Box>
    )
}

export default Payment