import {Box, Button, TextField, Typography} from "@mui/material"
import {closeModal} from "../../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {DatePicker} from "@mui/x-date-pickers"
import {useEffect, useState} from "react"
import {common_documents_receipt_get} from "../../../../service/fetch_service.js"
import dayjs from "dayjs";
import LazySelect from "../../../../ui/LazySelect.jsx"

const Receipt = ({props}) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(closeModal())
    }

    const [receipt, set_receipt] = useState({
        id: null,
        uid_creator: null,
        name_creator: '',
        copy: false,
        date_create: null,
        date_shift: null,
        sum_discount: 0,
        fn: '',
        fd: null,
        fp: '',
        moment: null,
        number: null,
        number_kkt: '',
        price: 0,
        shift_number: null,
        sum: 0,
        type: null,
        uid_cashier: null,
        name_cashier: '',
        uid_kkt: null,
        uid_order_cinema: null,
        uid_order_food: null,
        uid_organization: null,
        uid_payment_type: null,
        name_payment_type: '',
        uid_channel: null,
        name_channel: '',
        uid_store: null,
        name_organization: '',
        inn_organization: '',
        name_store: '',
        uid_work_place: null,
        sno: null,
        printed: false,
        channel_name: '',
        rn: '',
        date_shift_claim: null
    })

    useEffect(() => {
        if (props.id === 'new') {
            set_receipt({
                id: null,
                uid_creator: null,
                name_creator: '',
                copy: false,
                date_create: null,
                date_shift: null,
                sum_discount: 0,
                fn: '',
                fd: null,
                fp: '',
                moment: null,
                number: null,
                number_kkt: '',
                price: 0,
                shift_number: null,
                sum: 0,
                type: null,
                uid_cashier: null,
                name_cashier: '',
                uid_kkt: null,
                uid_order_cinema: null,
                uid_order_food: null,
                uid_organization: null,
                uid_payment_type: null,
                name_payment_type: '',
                uid_channel: null,
                name_channel: '',
                uid_store: null,
                name_organization: '',
                inn_organization: '',
                name_store: '',
                uid_work_place: null,
                sno: null,
                printed: false,
                channel_name: '',
                rn: '',
                date_shift_claim: null
            })
        } else {
            const fetch = async () => {
                try {
                    const data = await dispatch(common_documents_receipt_get(filial, props.uid))
                    set_receipt(data.data)
                } catch (err) {
                    console.error('Ошибка загрузки чека:', err)
                }
            }
            fetch()
        }
    }, [filial, props.uid, dispatch])

    const handleMoneyChange = (key) => (e) => {
        let val = e.target.value.replace(',', '.')
        // Разрешаем только цифры и одну точку, максимум 2 знака после
        if (!/^\d*\.?\d{0,2}$/.test(val)) return
        // Убираем ведущие нули, кроме "0." (например, "012" -> "12")
        if (val.startsWith('0') && val.length > 1 && val[1] !== '.') {
            val = val.replace(/^0+/, '')
        }
        // Если пользователь ввёл ".", превращаем в "0."
        if (val === '.') val = '0.'
        set_receipt(prev => ({...prev, [key]: val}))
    }

    return <Box
        id="modal-receipt"
        component="form"
        noValidate
        autoComplete="off"
        sx={{width: '960px'}}
        onSubmit={handleSubmit}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            КАССОВЫЙ ЧЕК
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Реквизиты чека
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', maxWidth: '246px', marginBottom: '10px'}}>
                        <TextField
                            sx={{flex: 1, marginRight: '10px'}}
                            value={receipt.shift_number || '0'}
                            label='Номер смены'
                            variant='filled'
                            slotProps={{input: {readOnly: true}}}
                        />
                        <TextField
                            value={receipt.number || '0'}
                            label='Номер чека'
                            variant='filled'
                            sx={{flex: 1}}
                            slotProps={{input: {readOnly: true}}}
                        />
                    </Box>
                    <TextField
                        value={receipt.fn || '0'}
                        label='ФН'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        value={receipt.fd || '0'}
                        label='ФД'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        value={receipt.fp || '0'}
                        label='ФП'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        value={receipt.rn || '0'}
                        label='РН'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <DatePicker
                        value={receipt.moment ? dayjs(receipt.moment) : null}
                        format='DD.MM.YYYY HH:mm'
                        label='Момент пробития чека'
                        variant='filled'
                        sx={{marginBottom: '10px', width: '100%'}}
                        onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Касса
                    </Typography>
                    <LazySelect
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        label="Касса"
                        value={receipt.uid_kkt || ''}
                        type="kkt"
                        filial={filial}
                        onChange={(uid, extra) => {
                            set_receipt(prev => ({
                                ...prev,
                                uid_kkt: uid,
                                name_organization: extra.name_organization,
                                inn_organization: extra.inn
                            }))
                        }}
                        getLabel={item => `ЗН ${item.title}`}
                        extraFields={['uid_kkt', 'name_organization', 'inn']}
                    />
                    <TextField
                        value={receipt.name_organization || ''}
                        label='Организация'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        value={receipt.inn_organization || ''}
                        label='ИНН'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        value={(receipt.sno === 1 ? 'Общая' : 'Упрощенная') || ''}
                        label='Налогообложение'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <LazySelect
                        variant='filled'
                        sx={{marginBottom: '10px', maxWidth: '210px'}}
                        label="Торговая точка"
                        value={receipt.uid_store || ''}
                        type="stores"
                        filial={filial}
                        onChange={(uid, extra) => {
                            set_receipt(prev => ({
                                ...prev, uid_store: uid, name_store: extra.name_store,
                            }))
                        }}
                        getLabel={item => `${item.title}`}
                        extraFields={['name_store']}
                    />
                    <LazySelect
                        variant='filled'
                        sx={{marginBottom: '10px', maxWidth: '210px'}}
                        label="Канал продажи"
                        value={receipt.uid_channel || ''}
                        type="sales_channels"
                        filial={filial}
                        onChange={(uid, extra) => {
                            set_receipt(prev => ({
                                ...prev, uid_channel: uid, name_channel: extra.name_channel,
                            }))
                        }}
                        getLabel={item => `${item.title}`}
                        extraFields={['name_store']}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Сумма
                    </Typography>
                    <TextField
                        label='Вид операции'
                        variant='filled'
                        sx={{marginBottom: '10px', flex: 1}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Способ оплаты'
                        variant='filled'
                        sx={{marginBottom: '10px', flex: 1}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        value={receipt.price || '0'}
                        label='Цена'
                        variant='filled'
                        sx={{marginBottom: '10px', flex: 1}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        value={receipt.sum_discount || '0'}
                        label='Сумма скидки'
                        variant='filled'
                        sx={{marginBottom: '10px', flex: 1}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        value={receipt.sum || '0'}
                        label='Сумма со скидкой'
                        variant='filled'
                        slotProps={{input: {readOnly: true}}}
                        sx={{flex: 1}}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Дополнительно
                    </Typography>
                    <DatePicker
                        value={receipt.date_shift ? dayjs(receipt.date_shift) : null}
                        label='Дата смены'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                    />
                    <DatePicker
                        value={receipt.date_create ? dayjs(receipt.date_create) : null}
                        label='Дата создания'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                    />
                    <TextField
                        label='Автор'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Кассир'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Содержит марки'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Марки проверены'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Button fullWidth variant='contained' color='warning' sx={{marginRight: 1}}>Удалить</Button>
                <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}}>Товары</Button>
                <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}}>Перейти в заказ</Button>
                <Button fullWidth variant='contained' color='secondary' onClick={() => dispatch()}>Сохранить</Button>
            </Box>
        </Box>
    </Box>
}

export default Receipt