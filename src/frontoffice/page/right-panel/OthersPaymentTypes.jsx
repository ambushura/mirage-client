import {Box, Button, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import {common_payment_methods_get} from "../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {closeModal} from "../../../redux/interfaceReducer.js"
import Loader from "../../../ui/Loader.jsx"
import EditDocumentIcon from "@mui/icons-material/EditDocument"
import CircleIcon from "@mui/icons-material/Circle"
import {buttonColor} from "../../../ui/hooks/common_functions.js"

const YandexFood = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none">
    <path
        d="M0 24C0 13.434 0 8.15 2.939 4.609a12.752 12.752 0 0 1 1.67-1.67C8.15 0 13.434 0 24 0c10.566 0 15.85 0 19.391 2.939a12.758 12.758 0 0 1 1.67 1.67C48 8.15 48 13.434 48 24c0 10.566 0 15.85-2.939 19.391a12.764 12.764 0 0 1-1.67 1.67C39.85 48 34.566 48 24 48c-10.566 0-15.85 0-19.391-2.939a12.758 12.758 0 0 1-1.67-1.67C0 39.85 0 34.566 0 24Z"
        fill="#FFE033"/>
    <path
        d="M36.751 33.547c-2.884 2.546-6.646 4.082-10.752 4.082-8.612 0-15.065-6.67-15.065-14.294 0-7.17 5.716-13.023 12.804-13.023 6.688 0 11.514 5.186 11.514 10.8 0 5.264-4.152 9.533-9.253 9.533-4.667 0-7.961-3.536-7.961-7.31 0-3.388 2.62-6.04 5.702-6.04 2.728 0 4.41 1.989 4.41 3.817 0 1.588-1.116 2.546-2.15 2.546-.367 0-.507-.077-.654-.168.334-.43.5-.987.415-1.569a2.047 2.047 0 0 0-2.322-1.732c-.958.143-1.566.794-1.867 1.277a3.516 3.516 0 0 0-.522 1.869c0 2.694 2.51 4.435 4.95 4.435 3.561.003 6.24-3.108 6.24-6.658 0-4.344-3.765-7.928-8.5-7.928-5.5 0-9.792 4.656-9.792 10.15 0 6.228 5.309 11.42 12.053 11.42 7.456 0 13.343-6.208 13.343-13.644 0-7.994-6.768-14.91-15.604-14.91-9.4 0-16.893 7.75-16.893 17.135 0 10.02 8.412 18.406 19.154 18.406 5.139 0 9.853-1.93 13.45-5.104l-2.7-3.09Z"
        fill="#000"/>
</svg>

const OthersPaymentTypes = ({props}) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const [payment_methods, set_payment_methods] = useState({loading: false, error: null, data: null})
    const payment_group = props.payment_group

    useEffect(() => {
        const fetch = async () => {
            let fetching_result = await dispatch(common_payment_methods_get(filial, props.order.uid, props.type, true))
            if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                set_payment_methods(fetching_result)
            }
        }
        if (filial !== undefined && props.order.uid !== undefined && props.type !== undefined) {
            fetch()
        }
    }, [dispatch, filial, props.order.uid, props.type])

    const [need_report, set_need_report] = useState(true)

    useEffect(() => {
        const chapter0_array = ['for_payment', 'for_returning']
        const chapter1_array = ['waiting', 'slip_without_receipt']
        const chapter2_array = ['mark_egais_items', 'horeca_items', 'cinema_items']
        chapter0_array.forEach((chapter0) => {
            if (chapter0 === 'for_payment') {
                chapter1_array.forEach(chapter1 => {
                    chapter2_array.forEach(chapter2 => {
                        props.order[chapter0][chapter1][chapter2].forEach(item => {
                            if (payment_group[chapter0][chapter1][chapter2].items.includes(item.uid)) {
                                set_need_report(false)
                            }
                        })
                    })
                })
            } else {
                chapter1_array.forEach(chapter1 => {
                    chapter2_array.forEach(chapter2 => {
                        props.order[chapter0][chapter1][chapter2].forEach(item => {
                            if (payment_group[chapter0][chapter1][chapter2].items.includes(item.uid)) {
                                if (item.name_payment_type === null) {
                                    set_need_report(false)
                                } else {
                                    if (['Безналичные', 'СБП'].includes(item.name_payment_type)) {
                                        set_need_report(false)
                                    } else if (['Безналичные (б/т)'].includes(item.name_payment_type)) {
                                        set_need_report(false)
                                    } else if (['Наличные'].includes(item.name_payment_type)) {
                                        set_need_report(false)
                                    } else if (['Сервис', 'Отложенная оплата', 'На расчетный счет', 'Смешанная'].includes(item.name_payment_type)) {
                                        // Возврат по заявлению
                                    }
                                }
                            }
                        })
                    })
                })
            }
        })
    }, [payment_methods])

    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Другие способы оплаты/возврата
        </Typography>
        <Box sx={{display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "center"}}>
            {!payment_methods.loading && payment_methods.error !== null && payment_methods.data === null ?
                <Box className='empty-box'>Ошибка загрузки маршрутов оплаты {payment_methods.error}</Box> : null}
            {payment_methods.loading && payment_methods.error === null && payment_methods.data === null ?
                <Loader/> : null}
            {!payment_methods.loading && payment_methods.error === null && payment_methods.data !== null ?
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: 'wrap'}}>
                    {payment_methods.data.list.map(pm => {
                        const chapter0_array = ['for_payment', 'for_returning']
                        const chapter1_array = ['waiting', 'slip_without_receipt']
                        const chapter2_array = ['mark_egais_items', 'horeca_items', 'cinema_items']
                        let ok = true
                        chapter0_array.forEach((chapter0) => {
                            if (chapter0 === 'for_payment') {
                                chapter1_array.forEach(chapter1 => {
                                    chapter2_array.forEach(chapter2 => {
                                        props.order[chapter0][chapter1][chapter2].forEach(item => {
                                            if (!pm.hidden) {
                                                ok = false
                                            } else {
                                                if (payment_group[chapter0][chapter1][chapter2].items.includes(item.uid)) {
                                                    if (item.name_payment_type === null) {
                                                        if (['Сервис', 'Отложенная оплата', 'Смешанная'].includes(item.name_payment_type)) {
                                                            ok = false
                                                        }
                                                    } else {
                                                        if (['СБП', 'Безналичные'].includes(item.name_payment_type) && pm.name !== 'Безналичные') {
                                                            ok = false
                                                        } else if (['Наличные'].includes(item.name_payment_type) && pm.name !== 'Наличные') {
                                                            ok = false
                                                        } else if (['Безналичные (б/т)'].includes(item.name_payment_type) && pm.name !== 'Безналичные (б/т)') {
                                                            ok = false
                                                        } else if (['На расчетный счет'].includes(item.name_payment_type) && pm.name !== 'На расчетный счет') {
                                                            ok = false
                                                        } else if (['Сервис', 'Отложенная оплата', 'Смешанная'].includes(item.name_payment_type)) {
                                                            ok = false
                                                        }
                                                    }
                                                }
                                            }
                                        })
                                    })
                                })
                            } else {
                                chapter1_array.forEach(chapter1 => {
                                    chapter2_array.forEach(chapter2 => {
                                        props.order[chapter0][chapter1][chapter2].forEach(item => {
                                            if (!pm.hidden) {
                                                ok = false
                                            } else {
                                                if (payment_group[chapter0][chapter1][chapter2].items.includes(item.uid)) {
                                                    if (item.name_payment_type === null) {
                                                        ok = false
                                                    } else {
                                                        if (['Безналичные', 'СБП'].includes(item.name_payment_type) && pm.name !== 'Безналичные') {
                                                            ok = false
                                                        } else if (['Безналичные (б/т)'].includes(item.name_payment_type) && pm.name !== 'Безналичные (б/т)') {
                                                            ok = false
                                                        } else if (['Наличные'].includes(item.name_payment_type) && pm.name !== 'Наличные') {
                                                            ok = false
                                                        } else if (['На расчетный счет'].includes(item.name_payment_type) && pm.name !== 'На расчетный счет') {
                                                            ok = false
                                                        } else if (['Сервис', 'Отложенная оплата', 'Смешанная'].includes(item.name_payment_type)) {
                                                            ok = false
                                                        }
                                                    }
                                                }
                                            }
                                        })
                                    })
                                })
                            }
                        })
                        if (ok) {
                            return <Button
                                startIcon={pm.uid === 'Заявление' ?
                                    <EditDocumentIcon/> : pm.name === 'Отложенная оплата' ?
                                        <YandexFood/> : pm.name !== 'На расчетный счет' ? <CircleIcon
                                            sx={{color: buttonColor(pm.inn), width: '30px', height: '30px'}}/> : null}
                                variant={pm.name === 'На расчетный счет' ? 'contained' : 'outlined'}
                                color={'secondary'}
                                sx={{margin: '0 4px 4px 0'}}
                                key={pm.uid_kkt ?? pm.uid_pinpad ?? pm.uid}
                                className={'payment-path'}
                                onClick={() => {
                                    props.pay(pm)
                                    dispatch(closeModal())
                                }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: pm.name !== 'Отложенная оплата' ? 'column' : 'row',
                                    alignItems: 'center',
                                }}>
                                    <span>{pm.name === 'Отложенная оплата' ? 'Яндекс.Еда' : pm.name}</span>
                                    {!['Отложенная оплата', 'На расчетный счет'].includes(pm.name) && <span
                                        style={{fontSize: '70%'}}><div>ККТ ...{pm.kkt.number.slice(-4)}</div>
                                        {pm.pinpad !== null ? <div>Пинпад ...{pm.pinpad.number.slice(-4)}</div> : null}
                                </span>}
                                </div>
                            </Button>
                        }
                    })}
                    {need_report && <Button
                        startIcon={<EditDocumentIcon/>}
                        variant={'contained'}
                        color={'primary'}
                        key={'Заявление'}
                        className='payment-path'
                        sx={{margin: '0 0 4px 4px'}}
                        onClick={() => {
                        }}>
                        ЗАЯВЛЕНИЕ
                    </Button>}
                </Box> : null}
        </Box>
    </Box>
}

export default OthersPaymentTypes