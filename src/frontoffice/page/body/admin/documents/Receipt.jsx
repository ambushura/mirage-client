import {Box, Skeleton} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {common_documents_receipt_get, common_documents_receipt_save} from "../../../../../service/fetch_service.js"
import dayjs from "dayjs"
import {useForm} from "react-hook-form"
import ControlledTextField from "../../../../../ui/ControlledTextField.jsx"
import ControlledDatePicker from "../../../../../ui/ControlledDatePicker.jsx"
import ControlledLazySelect from "../../../../../ui/ControlledLazySelect.jsx"
import ControlledMoneyField from "../../../../../ui/ControlledMoneyField.jsx"
import ControlledSwitch from "../../../../../ui/ControlledSwitch.jsx"
import {ruRU} from "@mui/x-data-grid/locales"
import {DataGridPro} from "@mui/x-data-grid-pro"
import ControlledDateTimePicker from "../../../../../ui/ControlledDateTimePicker.jsx"
import {openModal} from "../../../../../redux/interfaceReducer.js"
import {
    setCaptionReceipt,
    setReceiptOrder,
    setReceiptsUpdated,
    setTriggerDeleteReceipt,
    setTriggerSubmitReceipt,
} from "../../../../../redux/documentsReducer.js"
import {parceZone} from "../../../../../ui/hooks/common_functions.js"
import {v4} from 'uuid'
import {addNotification} from "../../../../../redux/notifierReducer.js"

const Receipt = () => {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const filial = useSelector(state => state.data.filial)
    const {uid} = useSelector(state => state.interface.params)

    // Состояние загрузки документа
    const [loading, set_loading] = useState(true)

    // Триггеры сохранения/удаления документа
    const {trigger_submit_receipt, trigger_delete_receipt} = useSelector(state => state.documents)

    // Форма
    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            uid_filial: uid === 'new' ? filial.uid : '',
            ver: uid === 'new' ? v4() : '',
            id: uid === 'new' ? v4() : '',
            deleted: false,
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
            comment: '',
            date_shift_confirm: null,
            need_to_confirm: false,
            items: [],
        }
    })

    // Загрузка документа в форму при открытии
    useEffect(() => {
        const fetchData = async () => {
            set_loading(true)
            try {
                if (uid === 'new') {
                    reset()
                } else {
                    const data = await dispatch(common_documents_receipt_get(filial, uid))
                    if (data?.data) {
                        reset({
                            ...data.data,
                            date_create: data.data.date_create ? dayjs(parceZone(data.data.date_create)) : null,
                            date_shift: data.data.date_shift ? dayjs(parceZone(data.data.date_shift)) : null,
                            date_shift_confirm: data.data.date_shift_confirm ? dayjs(parceZone(data.data.date_shift_confirm)) : null,
                            moment: data.data.moment ? dayjs(parceZone(data.data.moment)) : null,
                            price: data.data.price ? parseFloat(data.data.price) : 0,
                            sum_discount: data.data.sum_discount ? parseFloat(data.data.sum_discount) : 0,
                            sum: data.data.sum ? parseFloat(data.data.sum) : 0,
                            sno: data.data.sno !== null ? String(data.data.sno) : null,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки чека:', err)
            } finally {
                set_loading(false)
            }
        }
        fetchData()
    }, [uid, filial, dispatch, reset])

    // Наблюдаемые переменные
    const number = watch('number')
    const date_shift = watch('date_shift')
    const number_kkt = watch('number_kkt')
    const uid_order_cinema = watch('uid_order_cinema')
    const uid_order_food = watch('uid_order_food')
    const items = watch('items')
    const price = watch('price')
    const discount = watch('sum_discount')

    // Триггер сохранения документа
    useEffect(() => {
        if (trigger_submit_receipt) {
            handleSubmit(onSubmit)()
            dispatch(setTriggerSubmitReceipt(false))
            dispatch(addNotification({
                message: `Кассовый чек ${uid === 'new' ? '' : ' №' + number} сохранен`, severity: 'info', autoHide: true
            }))
        }
    }, [trigger_submit_receipt])

    // Функция сохранения документа
    const onSubmit = (data) => {
        const prepared = {
            ...data,
            sno: parseInt(data.sno, 10),
            fd: parseFloat(data.fd),
            number: parseFloat(data.number),
            shift_number: parseFloat(data.shift_number),
            uid_order_cinema: data.uid_order_cinema === '' ? null : data.uid_order_cinema,
            uid_order_food: data.uid_order_food === '' ? null : data.uid_order_food,
        }
        if (prepared.date_shift) prepared.date_shift = dayjs(prepared.date_shift)
            .startOf('day')
            .format('YYYY-MM-DDTHH:mm:ss+00:00')
        if (prepared.date_create) prepared.date_create = dayjs(prepared.date_create)
            .format('YYYY-MM-DDTHH:mm:ss+00:00')
        if (prepared.moment) prepared.moment = dayjs(prepared.moment)
            .format('YYYY-MM-DDTHH:mm:ss+00:00')
        dispatch(common_documents_receipt_save(filial, prepared))
        dispatch(setReceiptsUpdated())
    }

    // Триггер удаления документа
    useEffect(() => {
        if (trigger_delete_receipt) {
            dispatch(openModal({
                type: 'dialog_delete_receipts', props: {
                    type: 'YesNo',
                    action: 'dialog_delete_receipts',
                    question: 'Вы уверены, что хотите удалить этот чек?',
                    filial: filial,
                    uid: uid,
                }
            }))
        }
        return () => dispatch(setTriggerDeleteReceipt(false))
    }, [trigger_delete_receipt])

    // Триггер заголовка документа в меню
    useEffect(() => {
        dispatch(setCaptionReceipt(`КАССОВЫЙ ЧЕК ${uid === 'new' ? ' * ' : ' №' + number + ' от ' + dayjs(date_shift).format('DD.MM.YY') + ' ЗН ' + number_kkt}`))
        return () => {
            dispatch(setCaptionReceipt(null))
        }
    }, [uid, number])

    // Вспомогательные функции
    useEffect(() => {
        const p = parseFloat(price) || 0
        const d = parseFloat(discount) || 0
        const result = Math.max(p - d, 0)
        setValue('sum', Number(result.toFixed(2)), {shouldValidate: true})
    }, [price, discount, setValue])

    useEffect(() => {
        if (uid_order_cinema !== '') {
            dispatch(setReceiptOrder({uid: uid_order_cinema, type: 'cinema'}))
        }
        if (uid_order_food !== '') {
            dispatch(setReceiptOrder({uid: uid_order_food, type: 'horeca'}))
        }
        return () => dispatch(setReceiptOrder(null))
    }, [uid_order_cinema, uid_order_food])

    if (loading) {
        return <Loader/>
    } else {
        return <Box
            sx={{padding: '10px'}}
            id="modal-receipt"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                    <Box
                        sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1, marginRight: '10px'}}>
                        <ControlledTextField
                            control={control}
                            name="shift_number"
                            label="Номер смены"
                            numeric
                            rules={{
                                required: 'Укажите номер смены',
                                pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                            }}
                        />
                        <ControlledTextField
                            control={control}
                            name="number"
                            label="Номер чека"
                            numeric
                            rules={{required: 'Укажите номер чека'}}
                        />
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
                            label="Номер ФП"
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
                        <ControlledDateTimePicker
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
                            name="uid_filial"
                            label="Филиал"
                            type="filials"
                            filial={filial}
                            rules={{required: 'Укажите филиал'}}
                            readOnly={true}
                        />
                        <ControlledLazySelect
                            control={control}
                            name="uid_kkt"
                            label="ККТ"
                            type="kkt"
                            filial={filial}
                            extraFields={['uid_organization', 'name_organization', 'inn', 'sno', 'title']}
                            rules={{required: 'Укажите ККТ'}}
                            onChange={(uid, extra) => {
                                setValue('uid_organization', extra.uid_organization || '')
                                setValue('name_organization', extra.name_organization || '')
                                setValue('inn_organization', extra.inn || '')
                                setValue('sno', String(extra.sno) ?? null)
                                setValue('number_kkt', extra.title ?? null)
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
                            extraFields={['title']}
                            rules={{required: 'Укажите канал продажи'}}
                            onChange={(uid, extra) => {
                                setValue('channel_name', extra.title || '')
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
                        <ControlledDateTimePicker
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
                            extraFields={['title']}
                            onChange={(uid, extra) => setValue('name_creator', extra.title || '')}
                        />
                        <ControlledLazySelect
                            control={control}
                            name="uid_cashier"
                            label="Кассир"
                            type="staff"
                            filial={filial}
                            rules={{required: 'Укажите кассира'}}
                            extraFields={['title']}
                            onChange={(uid, extra) => setValue('name_cashier', extra.title || '')}
                        />
                        <ControlledSwitch
                            control={control}
                            name="printed"
                            label="Напечатан"
                            color="secondary"
                        />
                        <Box sx={{backgroundColor: '#aee3ff', padding: '10px', borderRadius: '12px'}}>
                            <ControlledSwitch
                                control={control}
                                name="need_to_confirm"
                                label="Нуждается в подтверждении"
                                color="primary"
                            />
                            <ControlledDatePicker
                                control={control}
                                name="date_shift_confirm"
                                label="Дата смены фактическая"
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{flex: 1}}>
                    <ControlledTextField
                        control={control}
                        name="comment"
                        label="Комментарий"
                        sx={{width: '100%'}}
                    />
                </Box>
                <Box>
                    <DataGridPro
                        hideFooter
                        checkboxSelection
                        rows={items}
                        columns={columns_items}
                        pageSize={20}
                        pageSizeOptions={[10, 25, 50]}
                        rowHeight={30}
                        headerHeight={30}
                        columnVisibilityModel={{
                            id: false,
                            unit_code: false,
                            mark_kkt_check_result: false,
                            mark_req_id: false,
                            mark_req_timestamp: false
                        }}
                        sx={{
                            maxHeight: `calc(${28}px + ${26 * 5}px + 2px)`,
                            overflowY: 'auto',
                            '& .total-row': {backgroundColor: '#f0f0f0', fontWeight: 'bold'},
                            '& .MuiDataGrid-cell': {padding: '0 4px', fontSize: '0.9rem'},
                            '& .MuiDataGrid-columnHeaderTitle': {fontSize: '0.9rem'},
                            marginBottom: '10px',
                        }}
                        localeText={{
                            ...ruRU.components.MuiDataGrid.defaultProps.localeText, noRowsLabel: 'Нет товаров'
                        }}
                    />
                </Box>
            </Box>
        </Box>
    }
}

export default Receipt

export const columns_items = [{field: 'id', headerName: 'Номер строки', width: 10}, {
    field: 'commodity_name', headerName: 'Наименование', width: 210
}, {field: 'mark_value', headerName: 'Марка', width: 80}, {
    field: 'mark_kkt_check_result', headerName: 'ЧЗ КП', width: 130
}, {field: 'mark_req_id', headerName: 'ЧЗ ИД РР', width: 50}, {
    field: 'mark_req_timestamp', headerName: 'ЧЗ Дата проверки РР', width: 50
}, {field: 'price', headerName: 'Цена', width: 100, type: 'number'}, {
    field: 'quantity', headerName: 'Количество', width: 100, type: 'number'
}, {field: 'unit_name', headerName: 'Ед. изм.', width: 80}, {
    field: 'sum', headerName: 'Сумма со скидкой', width: 100, type: 'number'
}, {
    field: 'sum_tax', headerName: 'Сумма НДС', width: 100, type: 'number'
}, {field: 'tax_type', headerName: '% НДС', width: 80, type: 'number'}, {
    field: 'unit_code', headerName: 'Код ед. изм.', width: 30
},]

function Loader() {
    return <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, marginRight: '5px'}}>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, marginRight: '5px'}}>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, marginRight: '5px'}}>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
            </Box>
        </Box>
        <Skeleton variant="rectangular" width={'615px'} height={50}/>
    </Box>
}