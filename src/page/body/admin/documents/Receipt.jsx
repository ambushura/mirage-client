import {Box, Button, FormControlLabel, Switch, TextField, Typography} from "@mui/material"
import {closeModal} from "../../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {DatePicker} from "@mui/x-date-pickers"
import {useEffect} from "react"
import {common_documents_receipt_get} from "../../../../service/fetch_service.js"
import dayjs from "dayjs";
import LazySelect from "../../../../ui/LazySelect.jsx"
import {Controller, useForm} from "react-hook-form"

const Receipt = ({props}) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)

    const {handleSubmit, setValue, control, formState: {errors}, reset} = useForm({
        defaultValues: {
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
        }
    })

    const onSubmit = (data) => {
        // TODO
        console.log(data)
        dispatch(closeModal())
    }

    useEffect(() => {
        const fetchData = async () => {
            if (props.id === 'new') {
                reset()
            } else {
                try {
                    const data = await dispatch(common_documents_receipt_get(filial, props.uid))
                    if (data?.data) {
                        reset({
                            ...data.data,
                            date_create: data.data.date_create ? dayjs(data.data.date_create) : null,
                            date_shift: data.data.date_shift ? dayjs(data.data.date_shift) : null,
                            moment: data.data.moment ? dayjs(data.data.moment) : null,
                        })
                    }
                } catch (err) {
                    console.error('Ошибка загрузки чека:', err)
                }
            }
        }

        fetchData()
    }, [props.id, props.uid, filial, dispatch, reset])

    const handleMoneyChange = (field) => (e) => {
        let val = e.target.value.replace(',', '.')
        if (!/^\d*\.?\d{0,2}$/.test(val)) return
        if (val.startsWith('0') && val.length > 1 && val[1] !== '.') {
            val = val.replace(/^0+/, '')
        }
        if (val === '.') val = '0.'
        field.onChange(val)
    }

    return <Box
        id="modal-receipt"
        component="form"
        noValidate
        autoComplete="off"
        sx={{width: '970px'}}
        onSubmit={handleSubmit(onSubmit)}>
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
                        <Controller
                            name="shift_number"
                            control={control}
                            rules={{
                                required: "Укажите номер смены",
                                validate: (value) => value !== null && value !== 0 && value !== "0" || "Укажите номер смены"
                            }}
                            render={({field, fieldState}) => <TextField
                                {...field}
                                sx={{flex: 1, marginRight: '10px'}}
                                value={field.value ?? ''}
                                label='Номер смены'
                                variant='filled'
                                onChange={(e) => field.onChange(e.target.value)}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />}/>
                        <Controller
                            name="number"
                            control={control}
                            render={({field}) => <TextField
                                {...field}
                                value={field.value || '0'}
                                label='Номер чека'
                                variant='filled'
                                sx={{flex: 1}}
                                slotProps={{input: {readOnly: true}}}
                            />}/>
                    </Box>
                    <Controller
                        name="fn"
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            value={field.value || '0'}
                            label='ФН'
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readOnly: true}}}
                        />}/>
                    <Controller
                        name="fd"
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            value={field.value || '0'}
                            label='ФД'
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readOnly: true}}}
                        />}/>
                    <Controller
                        name="fp"
                        control={control}
                        render={({field}) => <TextField
                            value={field.value || '0'}
                            label='ФП'
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readOnly: true}}}
                        />}/>
                    <Controller
                        name="rn"
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            value={field.value || '0'}
                            label='РН'
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readOnly: true}}}
                        />}/>
                    <Controller
                        name="moment"
                        control={control}
                        render={({field}) => <DatePicker
                            {...field}
                            value={field.value ? dayjs(field.value) : null}
                            format='DD.MM.YYYY HH:mm'
                            label='Момент пробития чека'
                            variant='filled'
                            sx={{marginBottom: '10px', width: '100%'}}
                            onChange={(newVal) => field.onChange(newVal ? newVal.toISOString() : null)}
                        />}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Касса
                    </Typography>
                    <Controller
                        name="uid_kkt"
                        control={control}
                        render={({field}) => <LazySelect
                            {...field}
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            label="Касса"
                            value={field.value || ''}
                            type="kkt"
                            filial={filial}
                            onChange={(uid, extra) => {
                                field.onChange(uid)
                                setValue('name_organization', extra.name_organization || '')
                                setValue('inn', extra.inn || '')
                            }}
                            getLabel={item => `ЗН ${item.title}`}
                            extraFields={['uid_kkt', 'name_organization', 'inn']}
                        />}/>
                    <Controller
                        name="name_organization"
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            value={field.value || ''}
                            label='Организация'
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readOnly: true}}}
                        />}/>
                    <Controller
                        name="inn_organization"
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            value={field.value || ''}
                            label='ИНН'
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readOnly: true}}}
                        />}/>
                    <Controller
                        name="sno"
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            value={(field.value === 1 ? 'Общая' : 'Упрощенная') || ''}
                            label='Налогообложение'
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readOnly: true}}}
                        />}/>
                    <Controller
                        name="uid_store"
                        control={control}
                        render={({field}) => <LazySelect
                            {...field}
                            variant='filled'
                            sx={{marginBottom: '10px', maxWidth: '210px'}}
                            label="Торговая точка"
                            value={field.value || ''}
                            type="stores"
                            filial={filial}
                            onChange={(uid, extra) => {
                                field.onChange(uid)
                                setValue('name_store', extra.name_organization || '')
                            }}
                            getLabel={item => `${item.title}`}
                            extraFields={['name_store']}
                        />}/>
                    <Controller
                        name="uid_channel"
                        control={control}
                        render={({field}) => <LazySelect
                            {...field}
                            variant='filled'
                            sx={{marginBottom: '10px', maxWidth: '210px'}}
                            label="Канал продажи"
                            value={field.value || ''}
                            type="sales_channels"
                            filial={filial}
                            onChange={(uid, extra) => {
                                field.onChange(uid)
                                setValue('channel_name', extra.channel_name || '')
                            }}
                            getLabel={item => `${item.title}`}
                            extraFields={['channel_name']}
                        />}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Сумма
                    </Typography>
                    <Controller
                        name="type"
                        control={control}
                        render={({field}) => <LazySelect
                            {...field}
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            label="Вид операции"
                            value={field.value || ''}
                            type="types"
                            filial={filial}
                            onChange={(uid) => {
                                field.onChange(uid)
                            }}
                            getLabel={item => `${item.title}`}
                            optionsStatic={[{uid: 1, title: 'ПРИХОД'}, {uid: 2, title: 'ВОЗВРАТ ПРИХОДА'}, {
                                uid: 3, title: 'РАСХОД'
                            }, {uid: 4, title: 'ВОЗВРАТ РАСХОДА'},]}
                        />}/>
                    <Controller
                        name="uid_payment_type"
                        control={control}
                        render={({field}) => <LazySelect
                            {...field}
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            label="Способ оплаты"
                            value={field.value || ''}
                            type="payment_types"
                            filial={filial}
                            onChange={(uid) => {
                                field.onChange(uid)
                            }}
                            getLabel={item => `${item.title}`}
                        />}/>
                    <Controller
                        name="price"
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            value={field.value || '0'}
                            label='Цена'
                            variant='filled'
                            sx={{marginBottom: '10px', flex: 1}}
                            onChange={handleMoneyChange(field)}
                        />}/>
                    <Controller
                        name="sum_discount"
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            value={field.value || '0'}
                            label='Сумма скидки'
                            variant='filled'
                            sx={{marginBottom: '10px', flex: 1}}
                            onChange={handleMoneyChange(field)}
                        />}/>
                    <Controller
                        name="sum"
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            value={field.value || '0'}
                            label='Сумма со скидкой'
                            variant='filled'
                            slotProps={{input: {readOnly: true}}}
                            sx={{flex: 1}}
                            onChange={handleMoneyChange(field)}
                        />}/>
                    <Controller
                        name="comment"
                        control={control}
                        render={({field}) => <FormControlLabel
                            control={<Switch
                                {...field}
                                checked={Boolean(field.value)}
                                color="secondary"/>}
                            label="Копия"
                        />}/>
                    <Controller
                        name="printed"
                        control={control}
                        render={({field}) => (<FormControlLabel
                            control={<Switch
                                checked={Boolean(field.value)}
                                onChange={(e) => field.onChange(e.target.checked)}
                                color="secondary"
                            />}
                            label="Напечатан"
                        />)}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Дополнительно
                    </Typography>
                    <Controller
                        name="date_shift"
                        control={control}
                        render={({field}) => <DatePicker
                            {...field}
                            value={field.value ? dayjs(field.value) : null}
                            label='Дата смены'
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                        />}/>
                    <Controller
                        name="date_create"
                        control={control}
                        render={({field}) => <DatePicker
                            {...field}
                            value={field.value ? dayjs(field.value) : null}
                            label='Дата создания'
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                        />}/>
                    <Controller
                        name="uid_work_place"
                        control={control}
                        render={({field}) => <LazySelect
                            {...field}
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            label="Рабочее место"
                            value={field.value || ''}
                            type="workplaces"
                            filial={filial}
                            onChange={(uid) => {
                                field.onChange(uid)
                            }}
                            getLabel={item => `${item.title}`}
                        />}/>
                    <Controller
                        name="uid_creator"
                        control={control}
                        render={({field}) => <LazySelect
                            {...field}
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            label="Автор"
                            value={field.value || ''}
                            type="staff"
                            filial={filial}
                            onChange={(uid) => {
                                field.onChange(uid)
                            }}
                            getLabel={item => `${item.title}`}
                        />}/>
                    <Controller
                        name="uid_cashier"
                        control={control}
                        render={({field}) => <LazySelect
                            {...field}
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            label="Кассир"
                            value={field.value || ''}
                            type="staff"
                            filial={filial}
                            onChange={(uid) => {
                                field.onChange(uid)
                            }}
                            getLabel={item => `${item.title}`}
                        />}/>
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Button fullWidth variant='contained' color='warning' sx={{marginRight: 1}}>Удалить</Button>
                <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}}>Товары</Button>
                <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}}>Перейти в заказ</Button>
                <Button fullWidth variant='contained' color='secondary' type="submit">Сохранить</Button>
            </Box>
        </Box>
    </Box>
}

export default Receipt