import {Box, Skeleton} from "@mui/material"
import {openModal} from "../../../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {common_documents_z_book_get, common_documents_z_book_save} from "../../../../../service/fetch_service.js"
import {useForm} from "react-hook-form"
import ControlledDatePicker from "../../../../../ui/ControlledDatePicker.jsx"
import ControlledLazySelect from "../../../../../ui/ControlledLazySelect.jsx"
import ControlledTextField from "../../../../../ui/ControlledTextField.jsx"
import ControlledMoneyField from "../../../../../ui/ControlledMoneyField.jsx"
import dayjs from "dayjs"
import {
    setCaptionZBook,
    setTriggerDeleteZBook,
    setTriggerSubmitZBook,
    setZBooksUpdate
} from "../../../../../redux/documentsReducer.js"
import {parceZone} from "../../../../../service/advanced.js"
import {v4} from 'uuid'
import {addNotification} from "../../../../../redux/notifierReducer.js"

const ZBook = () => {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const filial = useSelector(state => state.data.filial)
    const {uid} = useSelector(state => state.interface.params)

    // Состояние загрузки документа
    const [loading, set_loading] = useState(true)

    // Триггеры сохранения/удаления документа
    const trigger_submit_zBook = useSelector(state => state.documents.trigger_submit_zBook)
    const trigger_delete_zBook = useSelector(state => state.documents.trigger_delete_zBook)

    // Форма
    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            uid_filial: uid === 'new' ? filial.uid : '',
            ver: uid === 'new' ? v4() : '',
            id: uid === 'new' ? v4() : '',
            automatic: false,
            name_organization: '',
            inn: '',
            number_kkt: '',
            number_shift: 0,
            date_shift: '',
            date_ofd: '',
            sum_in_cash: 0,
            sum_out_cash: 0,
            sum_in_electron: 0,
            sum_out_electron: 0,
            sum_non_zero_total_of_income: 0,
            sum_non_zero_total_of_outcome: 0,
            sum_total_of_income: 0,
            sum_nds: 0,
            sum_collection: 0,
            revenue: 0,
            comment: '',
            uid_kkt: '',
            uid_wallet: '',
            deleted: false,
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
                    const data = await dispatch(common_documents_z_book_get(filial, uid))
                    if (data?.data) {
                        reset({
                            ...data.data,
                            date_shift: data.data.date_shift ? dayjs(parceZone(data.data.date_shift)) : null,
                            moment: data.data.moment ? dayjs(parceZone(data.data.moment)) : null,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки кассовой книги:', err)
            } finally {
                set_loading(false)
            }
        }
        fetchData()
    }, [uid, filial, dispatch, reset])

    // Наблюдаемые переменные
    const date_shift = watch('date_shift')
    const number_kkt = watch('number_kkt')

    // Триггер сохранения документа
    useEffect(() => {
        if (trigger_submit_zBook) {
            handleSubmit(onSubmit)()
            dispatch(setTriggerSubmitZBook(false))
            dispatch(addNotification({
                message: `Кассовая книга ${uid === 'new' ? '' : 'от ' + dayjs(date_shift).format('DD.MM.YY') + ' ЗН ' + number_kkt} сохранена.`,
                severity: 'info',
                autoHide: true
            }))
        }
    }, [trigger_submit_zBook])

    // Функция сохранения документа
    const onSubmit = (data) => {
        const prepared = {
            ...data,
            id: uid === 'new' ? v4() : data.id,
            uid_filial: uid === 'new' ? filial.uid : data.uid_filial,
            date_create: uid === 'new' ? dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss+00:00') : dayjs(data.date_create).format('YYYY-MM-DDTHH:mm:ss+00:00'),
            date_shift: dayjs(data.date_shift).format('YYYY-MM-DDTHH:mm:ss+00:00'),
            moment: dayjs(data.moment).format('YYYY-MM-DDTHH:mm:ss+00:00'),
            number_shift: Number(data.number_shift) || 0,
            last_fd: Number(data.last_fd) || 0,
            sum_in_cash: parseFloat(data.sum_in_cash) || 0,
            sum_out_cash: parseFloat(data.sum_out_cash) || 0,
            sum_in_electron: parseFloat(data.sum_in_electron) || 0,
            sum_out_electron: parseFloat(data.sum_out_electron) || 0,
            sum_nds: parseFloat(data.sum_nds) || 0,
            sum_collection: parseFloat(data.sum_collection) || 0,
            sum_electron: parseFloat(data.sum_electron) || 0,
            revenue: parseFloat(data.revenue) || 0,
            sum_total_of_income: parseFloat(data.sum_total_of_income) || 0,
            sum_non_zero_total_of_income: parseFloat(data.sum_non_zero_total_of_income) || 0,
            sum_non_zero_total_of_outcome: parseFloat(data.sum_non_zero_total_of_outcome) || 0,
        }
        dispatch(common_documents_z_book_save(filial, prepared))
        dispatch(setZBooksUpdate())
    }

    // Триггер удаления документа
    useEffect(() => {
        if (trigger_delete_zBook) {
            dispatch(openModal({
                type: 'dialog_delete_z_book', props: {
                    type: 'YesNo',
                    action: 'dialog_delete_z_book',
                    question: 'Вы уверены, что хотите удалить эту кассовую книгу?',
                    filial: filial,
                    uid: uid,
                }
            }))
        }
        return () => dispatch(setTriggerDeleteZBook(false))
    }, [trigger_delete_zBook])

    // Триггер заголовка документа в меню
    useEffect(() => {
        dispatch(setCaptionZBook(`КАССОВАЯ КНИГА ${uid === 'new' ? ' * ' : 'от ' + dayjs(date_shift).format('DD.MM.YY') + ' ЗН ' + number_kkt}`))
        return () => {
            dispatch(setCaptionZBook(null))
        }
    }, [uid, date_shift, number_kkt])

    if (loading) {
        return <Loader/>
    } else {
        return <Box
            sx={{width: '100%', padding: '10px'}}
            id="modal-z-book"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <Box sx={{
                    display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1, marginRight: '10px'
                }}>
                    <ControlledDatePicker
                        control={control}
                        name="date_shift"
                        label="Дата смены"
                        rules={{required: 'Укажите дату смены'}}
                        sx={{width: '100%'}}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="uid_kkt"
                        label="ККТ"
                        type="kkt"
                        filial={filial}
                        extraFields={['uid_organization', 'name_organization', 'inn', 'sno', 'title', 'uid_wallet']}
                        rules={{required: 'Укажите ККТ'}}
                        onChange={(uid, extra) => {
                            setValue('uid_organization', extra.uid_organization || '')
                            setValue('name_organization', extra.name_organization || '')
                            setValue('inn', extra.inn || '')
                            setValue('sno', String(extra.sno) ?? null)
                            setValue('number_kkt', extra.title ?? null)
                            setValue('uid_wallet', extra.uid_wallet ?? null)
                        }}
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="name_organization"
                        label="Организация"
                        readOnly={true}
                        rules={{
                            required: 'Укажите организацию (из кассы)'
                        }}
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="inn"
                        label="ИНН"
                        readOnly={true}
                        rules={{
                            required: 'Укажите ИНН организации (из кассы)',
                            pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                        }}
                        sx={{width: '100%'}}
                    />
                    <ControlledDatePicker
                        control={control}
                        name="date_ofd"
                        label="Дата ОФД"
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="last_fd"
                        label="Номер последнего ФД"
                        numeric
                        rules={{
                            pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                        }}
                        sx={{width: '100%'}}
                    />
                </Box>
                <Box
                    sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1, marginRight: '10px'}}>
                    <ControlledTextField
                        control={control}
                        name="number_shift"
                        label="Номер смены"
                        numeric
                        rules={{
                            required: 'Укажите номер смены',
                            pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                        }}
                        sx={{width: '100%'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum_in_cash"
                        label="Наличные (приход)"
                        sx={{width: '100%'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum_out_cash"
                        label="Наличные (расход)"
                        sx={{width: '100%'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum_in_electron"
                        label="Безналичные (приход)"
                        sx={{width: '100%'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum_out_electron"
                        label="Безналичные (расход)"
                        sx={{width: '100%'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum_nds"
                        label="НСД"
                        sx={{width: '100%'}}
                    />
                </Box>
                <Box
                    sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1}}>
                    <ControlledMoneyField
                        control={control}
                        name="sum_collection"
                        label="Инкассация"
                        sx={{width: '100%'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum_electron"
                        label="Безналичные (всего)"
                        sx={{width: '100%'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="revenue"
                        label="Выручка"
                        sx={{width: '100%'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum_total_of_income"
                        label="Сменный итог"
                        sx={{width: '100%'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum_non_zero_total_of_income"
                        label="Необнуляемая сумма прихода"
                        sx={{width: '100%'}}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="sum_non_zero_total_of_outcome"
                        label="Необнуляемая сумма возврата прихода"
                        sx={{width: '100%'}}
                    />
                </Box>
            </Box>
            <ControlledTextField
                control={control}
                name="comment"
                label="Комментарий"
                sx={{width: '100%'}}
                multiline={true}
                rows={3}
            />
        </Box>
    }
}

export default ZBook

function Loader() {
    return <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
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
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
            </Box>
        </Box>
        <Skeleton variant="rectangular" width={'100%'} height={50}/>
    </Box>
}