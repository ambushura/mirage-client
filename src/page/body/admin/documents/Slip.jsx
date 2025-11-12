import {Box, Skeleton, Typography} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {common_documents_slip_get} from "../../../../service/fetch_service.js"
import ControlledDatePicker from "../../../../ui/ControlledDatePicker.jsx"
import ControlledLazySelect from "../../../../ui/ControlledLazySelect.jsx"
import ControlledMoneyField from "../../../../ui/ControlledMoneyField.jsx"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"
import {v4} from "uuid"
import ControlledSwitch from "../../../../ui/ControlledSwitch.jsx"
import {setCaptionSlip, setReceiptOrder, setSlipOrder} from "../../../../redux/documentsReducer.js"
import dayjs from "dayjs"

const Slip = () => {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const {filial} = useSelector(state => state.data)
    const {uid} = useSelector(state => state.interface.params)

    // Состояние загрузки документа
    const [loading, set_loading] = useState(true)

    // Триггеры сохранения/удаления документа
    const {trigger_submit_slip, trigger_delete_slip} = useSelector(state => state.documents)

    // Форма
    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            uid_filial: uid === 'new' ? filial.uid : '',
            ver: uid === 'new' ? v4() : '',
            id: uid === 'new' ? v4() : '',
            deleted: false,
            date_create: '',
            date_shift: '',
            inn: '',
            name_creator: '',
            name_organization: '',
            pinpad_number: '',
            print_error: '',
            printed: '',
            slip0: '',
            slip4: '',
            slip6: '',
            slip9: '',
            slip10: '',
            slip11: '',
            slip13: '',
            slip14: '',
            slip15: '',
            slip19: '',
            slip21: '',
            slip23: '',
            slip25: '',
            slip26: '',
            slip27: '',
            slip28: '',
            slip39: '',
            slip86: '',
            slip90: '',
            slip_sum: '',
            slip_type: '',
            uid_creator: '',
            uid_order_cinema: '',
            uid_order_food: '',
            uid_pinpad: '',
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
                    const data = await dispatch(common_documents_slip_get(filial, uid))
                    if (data?.data) {
                        reset({
                            ...data.data,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки слипа:', err)
            } finally {
                set_loading(false)
            }
        }
        fetchData()
    }, [uid, filial, dispatch, reset])

    // Наблюдаемые переменные
    const uid_order_cinema = watch('uid_order_cinema')
    const uid_order_food = watch('uid_order_food')
    const slip14 = watch('slip14')
    const slip27 = watch('slip27')
    const date_shift = watch('date_shift')

    // Триггер сохранения документа

    // Функция сохранения документа

    // Триггер удаления документа

    // Триггер заголовка документа в меню
    useEffect(() => {
        dispatch(setCaptionSlip(`БАНКОВСКИЙ СЛИП ${uid === 'new' ? ' * ' : ' RRN ' + slip14 + ' от ' + dayjs(date_shift).format('DD.MM.YY') + ' ID ' + slip27}`))
        return () => {
            dispatch(setCaptionSlip(null))
        }
    }, [uid, slip14, date_shift, slip27])

    // Вспомогательные функции
    useEffect(() => {
        if (uid_order_cinema !== '') {
            dispatch(setSlipOrder({uid: uid_order_cinema, type: 'cinema'}))
        }
        if (uid_order_food !== '') {
            dispatch(setSlipOrder({uid: uid_order_food, type: 'horeca'}))
        }
        return () => dispatch(setReceiptOrder(null))
    }, [uid_order_cinema, uid_order_food])

    if (loading) {
        return <Loader/>
    } else {
        return <Box id="modal-slip"
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{padding: '10px'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1, flex: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Квитанция
                    </Typography>
                    <ControlledTextField
                        control={control}
                        name="slip90"
                        label="90 · Квитанция"
                        multiline={true}
                        readOnly={true}
                        sx={{width: '100%'}}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1, flex: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Общие
                    </Typography>
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
                        rules={{required: 'Укажите дату создания слипа'}}
                        readOnly={true}
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
                        readOnly={true}
                    />
                    <ControlledMoneyField
                        control={control}
                        name="slip_sum"
                        label="0 · Сумма операции"
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="inn"
                        label="ИНН"
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip86"
                        label="86 · Дополнительные данные транзакции"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                    <ControlledSwitch
                        control={control}
                        name="printed"
                        label="Напечатан"
                        color="secondary"
                        readOnly={true}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1, flex: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Поля 4 - 11
                    </Typography>
                    <ControlledTextField
                        control={control}
                        name="slip4"
                        label="4 · Код валюты операции"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip6"
                        label="6 · Оригинальные даты и время совершения операции на хосте"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip9"
                        label="9 · Способ кодировки PIN-блока"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip10"
                        label="10 · Номер карты"
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip11"
                        label="11 · Срок действия карты"
                        readOnly={true}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="slip_type"
                        label="Тип слипа"
                        filial={filial}
                        optionsStatic={[{uid: 1, title: 'ПРИХОД'}, {uid: 2, title: 'ВОЗВРАТ/ОТМЕНА'}]}
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="print_error"
                        label="Ошибка печати"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1, flex: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Поля 13 - 21
                    </Typography>
                    <ControlledTextField
                        control={control}
                        name="slip13"
                        label="13 · Код авторизации"
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip14"
                        label="14 · Номер ссылки"
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip15"
                        label="15 · Код ответа"
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip19"
                        label="19 · Дополнительные данные ответа"
                        readOnly={true}
                    />
                    <ControlledDatePicker
                        control={control}
                        name="slip21"
                        label="21 · Оригинальные даты и время совершения операции"
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="name_organization"
                        label="Организация"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="uid_pinpad"
                        label="Пинпад"
                        type="pinpad"
                        filial={filial}
                        readOnly={true}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1, flex: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Поля 23 - 39
                    </Typography>
                    <ControlledTextField
                        control={control}
                        name="slip23"
                        label="23 · Идентификатор транзакции в коммуникационном сервере"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip25"
                        label="25 · Код операции"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip26"
                        label="26 · Уникальный номер транзакции на стороне внешнего  устройства"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip27"
                        label="27 · Идентификатор внешнего устройства"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip28"
                        label="28 · Идентификатор продавца"
                        sx={{width: '100%'}}
                        readOnly={true}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip39"
                        label="39 · Статус проведения транзакции"
                        readOnly={true}
                    />
                </Box>
            </Box>
        </Box>
    }
}

export default Slip

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
        <Skeleton variant="rectangular" width={'715px'} height={50}/>
    </Box>
}