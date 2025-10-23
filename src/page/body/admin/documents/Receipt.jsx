import {Box, Button, Typography} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {
    cinema_order_fetch,
    common_documents_receipt_get,
    common_documents_receipt_save,
    horeca_order_fetch
} from "../../../../service/fetch_service.js"
import dayjs from "dayjs"
import {useForm} from "react-hook-form"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"
import ControlledDatePicker from "../../../../ui/ControlledDatePicker.jsx"
import ControlledLazySelect from "../../../../ui/ControlledLazySelect.jsx"
import ControlledMoneyField from "../../../../ui/ControlledMoneyField.jsx"
import ControlledSwitch from "../../../../ui/ControlledSwitch.jsx"
import {ruRU} from "@mui/x-data-grid/locales"
import {DataGridPro} from "@mui/x-data-grid-pro"
import ControlledDateTimePicker from "../../../../ui/ControlledDateTimePicker.jsx"
import {closeModal, openModal, setCurrentPage} from "../../../../redux/interfaceReducer.js"
import CloseIcon from "@mui/icons-material/Close"
import {setReceiptsUpdated} from "../../../../redux/documentsReducer.js"
import {parceZone} from "../../../../service/advanced.js"

const Receipt = ({props}) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)

    const {handleSubmit, setValue, control, formState: {errors}, reset, watch} = useForm({
        defaultValues: {
            id: '',
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
            items: [],
        }
    })

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
        dispatch(closeModal())
        dispatch(setReceiptsUpdated())
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
                            date_create: data.data.date_create ? dayjs(parceZone(data.data.date_create)) : null,
                            date_shift: data.data.date_shift ? dayjs(parceZone(data.data.date_shift)) : null,
                            moment: data.data.moment ? dayjs(parceZone(data.data.moment)) : null,
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


    const uid = watch('id')
    const uid_order_cinema = watch('uid_order_cinema')
    const uid_order_food = watch('uid_order_food')
    const items = watch('items')
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
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
            <Typography variant="h6" color="textSecondary">
                {`КАССОВЫЙ ЧЕК ${props.uid === 'new' ? ' *' : ''}`}
            </Typography>
            <Button variant='text' color='secondary' onClick={() => dispatch(closeModal())}><CloseIcon/></Button>
        </Box>
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
                </Box>
            </Box>
            <Box>
                <DataGridPro
                    hideFooter
                    checkboxSelection
                    rows={items}
                    columns={columns_items}
                    pageSize={20}
                    pageSizeOptions={[10, 25, 50]}
                    rowHeight={26}
                    headerHeight={28}
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
            <Box className='glass'
                 sx={{display: 'flex', flexDirection: 'row', position: 'sticky', bottom: 0, zIndex: 1}}>
                <Button fullWidth variant='contained' color='warning' sx={{marginRight: 1}}
                        onClick={() => dispatch(openModal({
                            type: 'delete_receipts', props: {
                                type: 'YesNo',
                                action: 'delete_receipts',
                                question: 'Вы уверены, что хотите удалить этот чек?',
                                filial: filial,
                                uid: uid,
                            }
                        }))}>Удалить</Button>
                {(uid_order_cinema !== null || uid_order_food !== null) &&
                    <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}} onClick={() => {
                        if (uid_order_cinema !== null) {
                            dispatch(setCurrentPage('admin/orders/cinema'))
                            dispatch(cinema_order_fetch(filial, uid_order_cinema))
                        } else if (uid_order_food !== null) {
                            dispatch(setCurrentPage('admin/orders/horeca'))
                            dispatch(horeca_order_fetch(filial, uid_order_food))
                        }
                        dispatch(closeModal())
                    }}>Перейти в заказ</Button>}
                <Button fullWidth variant='contained' color='secondary' type="submit">Сохранить</Button>
            </Box>
        </Box>
    </Box>
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
}, {field: 'sum', headerName: 'Сумма со скидкой', width: 100, type: 'number'}, {
    field: 'sum_tax', headerName: 'Сумма НДС', width: 100, type: 'number'
}, {field: 'tax_type', headerName: '% НДС', width: 80, type: 'number'}, {
    field: 'unit_code', headerName: 'Код ед. изм.', width: 30
}, {field: 'unit_name', headerName: 'Ед. изм.', width: 80},]