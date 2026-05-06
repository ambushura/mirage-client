import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ControlledLazySelect from '../../../../../ui/ControlledLazySelect.jsx'
import { useForm } from 'react-hook-form'
import ControlledMoneyField from '../../../../../ui/ControlledMoneyField.jsx'
import ControlledTextField from '../../../../../ui/ControlledTextField.jsx'
import { common_documents_operation_get, common_documents_operation_save } from '../../../../../service/fetch_service.js'
import {
    setCaptionOperation,
    setOperationsUpdate,
    setTriggerDeleteOperation,
    setTriggerSubmitOperation,
} from '../../../../../redux/documentsReducer.js'
import { useEffect, useState } from 'react'
import { addNotification } from '../../../../../redux/notifierReducer.js'
import dayjs from 'dayjs'
import { v4 } from 'uuid'
import ControlledDatePicker from '../../../../../ui/ControlledDatePicker.jsx'
import { openModal } from '../../../../../redux/interfaceReducer.js'

const Operation = () => {
    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const filial = useSelector((state) => state.data.filial)
    const { uid } = useSelector((state) => state.interface.params)

    // Состояние загрузки документа
    const [loading, set_loading] = useState(true)

    // Триггеры сохранения/удаления документа
    const { trigger_submit_operation, trigger_delete_operation } = useSelector((state) => state.documents)

    // Форма
    const { handleSubmit, setValue, control, reset, watch } = useForm({
        defaultValues: {
            uid_filial: uid === 'new' ? filial.uid : '',
            id: uid === 'new' ? v4() : '',
            uid_wallet_in: '',
            uid_wallet_out: '',
            sum: 0,
            comment: '',
        },
    })

    // Загрузка документа в форму при открытии
    useEffect(() => {
        const fetchData = async () => {
            set_loading(true)
            try {
                if (uid === 'new') {
                    reset()
                } else {
                    const data = await dispatch(common_documents_operation_get(filial, uid))
                    if (data?.data) {
                        reset({
                            ...data.data,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки операции по кассе:', err)
            } finally {
                set_loading(false)
            }
        }
        fetchData()
    }, [uid, filial, dispatch, reset])

    // Наблюдаемые переменные
    const date_shift = watch('date_shift')

    // Триггер сохранения документа
    useEffect(() => {
        if (trigger_submit_operation) {
            handleSubmit(onSubmit)()
            dispatch(setTriggerSubmitOperation(false))
            dispatch(
                addNotification({
                    message: `Операция по кассе ${uid === 'new' ? '' : ' от ' + dayjs(date_shift).format('DD.MM.YY')} сохранена`,
                    severity: 'info',
                    autoHide: true,
                })
            )
        }
    }, [trigger_submit_operation])

    // Функция сохранения документа
    const onSubmit = (data) => {
        const prepared = {
            ...data,
            uid_wallet_in: data.uid_wallet_in !== '' ? data.uid_wallet_in : null,
            uid_wallet_out: data.uid_wallet_out !== '' ? data.uid_wallet_out : null,
        }
        if (prepared.date_shift) prepared.date_shift = dayjs(prepared.date_shift).startOf('day').format('YYYY-MM-DDTHH:mm:ss+00:00')
        dispatch(common_documents_operation_save(filial, prepared))
        dispatch(setOperationsUpdate())
    }

    // Триггер удаления документа
    useEffect(() => {
        if (trigger_delete_operation) {
            dispatch(
                openModal({
                    type: 'dialog_delete_operation',
                    props: {
                        type: 'YesNo',
                        action: 'dialog_delete_operation',
                        question: 'Вы уверены, что хотите удалить эту операцию по кассе?',
                        filial: filial,
                        uid: uid,
                    },
                })
            )
        }
        return () => dispatch(setTriggerDeleteOperation(false))
    }, [trigger_delete_operation])

    // Триггер заголовка документа в меню
    useEffect(() => {
        dispatch(setCaptionOperation(`ОПЕРАЦИЯ ПО КАССЕ ${uid === 'new' ? ' * ' : dayjs(date_shift).format('DD.MM.YY')}`))
        return () => {
            dispatch(setCaptionOperation(null))
        }
    }, [uid])

    return (
        <Box sx={{ padding: '10px' }} id="modal-operation" component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                <ControlledDatePicker
                    control={control}
                    name="date_shift"
                    label="Дата смены"
                    rules={{ required: 'Укажите дату смены' }}
                    sx={{ flex: 1, marginRight: '10px' }}
                />
                <Box sx={{ flex: 1, marginRight: '10px' }}>
                    <ControlledLazySelect
                        control={control}
                        name="uid_wallet_out"
                        label="Касса источник"
                        type="wallets"
                        filial={filial}
                        fullWidth
                    />
                </Box>
                <Box sx={{ flex: 1, marginRight: '10px' }}>
                    <ControlledLazySelect
                        control={control}
                        name="uid_wallet_in"
                        label="Касса приемник"
                        type="wallets"
                        filial={filial}
                        fullWidth
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <ControlledMoneyField control={control} name="sum" label="Сумма" fullWidth />
                </Box>
            </Box>
            <Box>
                <ControlledTextField control={control} name="comment" label="Комментарий" sx={{ width: '100%' }} multiline rows={3} />
            </Box>
        </Box>
    )
}

export default Operation
