import {Box, Button, Typography} from "@mui/material"
import {closeModal} from "../../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {common_documents_receipt_get} from "../../../../service/fetch_service.js"
import dayjs from "dayjs"
import {useForm} from "react-hook-form"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"
import ControlledDatePicker from "../../../../ui/ControlledDatePicker.jsx"
import ControlledLazySelect from "../../../../ui/ControlledLazySelect.jsx"
import ControlledMoneyField from "../../../../ui/ControlledMoneyField.jsx"
import ControlledSwitch from "../../../../ui/ControlledSwitch.jsx"

const Receipt = ({props}) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)

    const {handleSubmit, setValue, control, formState: {errors}, reset, watch} = useForm({
        defaultValues: {
            id: '',
            uid_creator: null,
            name_creator: '',
            copy: false,
            date_create: null,
            date_shift: null,
            sum_discount: 0,
            fn: '',
            fd: '',
            fp: '',
            moment: null,
            number: '',
            number_kkt: '',
            price: 0,
            shift_number: '',
            sum: 0,
            type: null,
            uid_cashier: '',
            name_cashier: '',
            uid_kkt: '',
            uid_order_cinema: '',
            uid_order_food: '',
            uid_organization: '',
            uid_payment_type: '',
            name_payment_type: '',
            uid_channel: '',
            name_channel: '',
            uid_store: '',
            name_organization: '',
            inn_organization: '',
            name_store: '',
            uid_work_place: '',
            sno: null,
            printed: false,
            channel_name: '',
            rn: '',
            date_shift_claim: null,
            items: [],
        }
    })

    const onSubmit = (data) => {
        // TODO
        console.log(data)
        dispatch(closeModal())
    }

    useEffect(() => {
        const fetchData = async () => {
            if (props.uid === 'new') {
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
                            price: data.data.price ? parseFloat(data.data.price) : 0,
                            sum_discount: data.data.sum_discount ? parseFloat(data.data.sum_discount) : 0,
                            sum: data.data.sum ? parseFloat(data.data.sum) : 0,
                            sno: data.data.sno !== null ? String(data.data.sno) : null,
                        })
                    }
                } catch (err) {
                    console.error('Ошибка загрузки чека:', err)
                }
            }
        }

        fetchData()
    }, [props.uid, filial, dispatch, reset])


    const price = watch('price')
    const discount = watch('sum_discount')

    useEffect(() => {
        const p = parseFloat(price) || 0
        const d = parseFloat(discount) || 0
        const result = Math.max(p - d, 0)
        setValue('sum', Number(result.toFixed(2)), {shouldValidate: true})
    }, [price, discount, setValue])

    return <Box
        sx={{maxHeight: '700px', overflowY: 'auto'}}
        id="modal-receipt"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            КАССОВЫЙ ЧЕК
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                <Box
                    sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1, marginRight: '10px'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <ControlledTextField
                            control={control}
                            name="shift_number"
                            label="Номер смены"
                            numeric
                            rules={{
                                required: 'Укажите номер смены',
                                pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                            }}
                            sx={{marginRight: '10px'}}
                        />
                        <ControlledTextField
                            control={control}
                            name="number"
                            label="Номер чека"
                            numeric
                            rules={{required: 'Укажите номер чека'}}
                        />
                    </Box>
                    <ControlledTextField
                        control={control}
                        name="fn"
                        label="Номер ФН"
                        numeric
                        rules={{
                            required: 'Укажите номер фискального накопителя',
                            pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                        }}
                    />
                    <ControlledTextField
                        control={control}
                        name="fd"
                        label="Номер ФД"
                        numeric
                        rules={{
                            required: 'Укажите номер фискального документа',
                            pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                        }}
                    />
                    <ControlledTextField
                        control={control}
                        name="fp"
                        label="Номер ФД"
                        numeric
                        rules={{
                            required: 'Укажите признак фискального документа',
                            pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                        }}
                    />
                    <ControlledTextField
                        control={control}
                        name="rn"
                        label="РН ККТ"
                        numeric
                        rules={{
                            required: 'Укажите регистрационнный номер ККТ',
                            pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                        }}
                    />
                    <ControlledDatePicker
                        control={control}
                        name="moment"
                        label="Момент пробития чека"
                        rules={{required: 'Укажите момент пробития чека'}}
                    />
                </Box>
                <Box
                    sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1, marginRight: '10px'}}>
                    <ControlledLazySelect
                        control={control}
                        name="uid_kkt"
                        label="ККТ"
                        type="kkt"
                        filial={filial}
                        extraFields={['name_organization', 'inn', 'sno']}
                        rules={{required: 'Укажите ККТ'}}
                        onChange={(uid, extra) => {
                            setValue('name_organization', extra.name_organization || '')
                            setValue('inn_organization', extra.inn || '')
                            setValue('sno', String(extra.sno) ?? null)
                        }}
                    />
                    <ControlledTextField
                        control={control}
                        name="name_organization"
                        label="Организация"
                        readOnly={true}
                        rules={{
                            required: 'Укажите организацию (из кассы)'
                        }}
                    />
                    <ControlledTextField
                        control={control}
                        name="inn_organization"
                        label="ИНН"
                        readOnly={true}
                        rules={{
                            required: 'Укажите ИНН организации (из кассы)'
                        }}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="sno"
                        label="Система налогообложения"
                        filial={filial}
                        rules={{required: 'Укажите систему налогообложения организации (из кассы)'}}
                        optionsStatic={[{uid: '0', title: 'Основная'}, {uid: '1', title: 'Упрощенная'}]}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="uid_store"
                        label="Торговая точка"
                        type="stores"
                        filial={filial}
                        extraFields={['name_store']}
                        rules={{required: 'Укажите торговую точку продажи'}}
                        onChange={(uid, extra) => {
                            setValue('name_store', extra.name_store || '')
                        }}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="uid_channel"
                        label="Канал продажи"
                        type="sales_channels"
                        filial={filial}
                        extraFields={['name_channel']}
                        rules={{required: 'Укажите канал продажи'}}
                        onChange={(uid, extra) => {
                            setValue('channel_name', extra.name_channel || '')
                        }}
                    />
                </Box>
                <Box
                    sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1, marginRight: '10px'}}>
                    <ControlledLazySelect
                        control={control}
                        name="type"
                        label="Вид операции"
                        filial={filial}
                        rules={{required: 'Укажите вид операции'}}
                        optionsStatic={[{uid: 1, title: 'ПРИХОД'}, {uid: 2, title: 'ВОЗВРАТ ПРИХОДА'}, {
                            uid: 3, title: 'РАСХОД'
                        }, {uid: 4, title: 'ВОЗВРАТ РАСХОДА'}]}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="uid_payment_type"
                        label="Способ оплаты"
                        type="payment_types"
                        filial={filial}
                        extraFields={['channel_name']}
                        rules={{required: 'Укажите способ оплаты'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="price"
                        label="Цена"
                        rules={{required: "Введите цену"}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum_discount"
                        label="Сумма скидки"
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum"
                        label="Сумма со скидкой"
                        readOnly={true}
                    />
                    <ControlledSwitch
                        control={control}
                        name="copy"
                        label="Копия"
                    />
                </Box>
                <Box
                    sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1, marginRight: '10px'}}>
                    <ControlledDatePicker
                        control={control}
                        name="date_shift"
                        label="Дата смены"
                        rules={{required: 'Укажите дату смены'}}
                    />
                    <ControlledDatePicker
                        control={control}
                        name="date_create"
                        label="Дата создания"
                        rules={{required: 'Укажите дату создания'}}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="uid_work_place"
                        label="Рабочее место"
                        type="workplaces"
                        filial={filial}
                        rules={{required: 'Укажите рабочее место'}}
                        extraFields={['name_workplace']}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="uid_creator"
                        label="Автор"
                        type="staff"
                        filial={filial}
                        rules={{required: 'Укажите автора'}}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="uid_cashier"
                        label="Кассир"
                        type="staff"
                        filial={filial}
                        rules={{required: 'Укажите кассира'}}
                    />
                    <ControlledSwitch
                        control={control}
                        name="printed"
                        label="Напечатан"
                        color="secondary"
                    />
                </Box>
            </Box>
            <Box className='glass'
                 sx={{display: 'flex', flexDirection: 'row', position: 'sticky', bottom: 0, zIndex: 1}}>
                <Button fullWidth variant='contained' color='warning' sx={{marginRight: 1}}>Удалить</Button>
                <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}}>Товары</Button>
                {watch('uid_order_cinema') !== null || watch('uid_order_horeca') !== null &&
                    <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}}>Перейти в
                        заказ</Button>}
                <Button fullWidth variant='contained' color='secondary' type="submit">Сохранить</Button>
            </Box>
        </Box>
    </Box>
}

export default Receipt