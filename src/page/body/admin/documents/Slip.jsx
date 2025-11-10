import {Box, Button, Skeleton, Typography} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {cinema_order_fetch, common_documents_slip_get, horeca_order_fetch} from "../../../../service/fetch_service.js"
import ControlledDatePicker from "../../../../ui/ControlledDatePicker.jsx"
import ControlledLazySelect from "../../../../ui/ControlledLazySelect.jsx"
import ControlledMoneyField from "../../../../ui/ControlledMoneyField.jsx"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"
import {v4} from "uuid"
import {closeModal} from "../../../../redux/interfaceReducer.js"
import ControlledSwitch from "../../../../ui/ControlledSwitch.jsx";

const Slip = ({props}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const wp = useSelector(state => state.interface.wp)

    const [loading, set_loading] = useState(true)

    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            uid_filial: props.uid === 'new' ? filial.uid : '',
            ver: props.uid === 'new' ? v4() : '',
            id: props.uid === 'new' ? v4() : '',
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

    useEffect(() => {
        const fetchData = async () => {
            set_loading(true)
            try {
                if (props.uid === 'new') {
                    reset()
                } else {
                    const data = await dispatch(common_documents_slip_get(filial, props.uid))
                    if (data?.data) {
                        reset({
                            ...data.data, // date_create: data.data.date_create ? dayjs(parceZone(data.data.date_create)) : null,
                            // date_shift: data.data.date_shift ? dayjs(parceZone(data.data.date_shift)) : null,
                            // moment: data.data.moment ? dayjs(parceZone(data.data.moment)) : null,
                            // price: data.data.price ? parseFloat(data.data.price) : 0,
                            // sum_discount: data.data.sum_discount ? parseFloat(data.data.sum_discount) : 0,
                            // sum: data.data.sum ? parseFloat(data.data.sum) : 0,
                            // sno: data.data.sno !== null ? String(data.data.sno) : null,
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
    }, [props.uid, filial, dispatch, reset])

    const uid_order_cinema = watch('uid_order_cinema')
    const uid_order_food = watch('uid_order_food')
    const slip14 = watch('slip14')

    if (loading) {
        return <Loader/>
    } else {
        return <Box id="modal-slip"
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{width: '1230px'}}
                    onSubmit={handleSubmit}>
            <Typography variant="h6" color="textSecondary" margin={1}>
                БАНКОВСКИЙ СЛИП RRN {slip14}
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
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
                    <ControlledMoneyField
                        control={control}
                        name="slip_sum"
                        label="0 · Сумма операции"
                    />
                    <ControlledTextField
                        control={control}
                        name="inn"
                        label="ИНН"
                    />
                    <ControlledTextField
                        control={control}
                        name="slip86"
                        label="86 · Дополнительные данные транзакции"
                        sx={{width: '100%'}}
                    />
                    <ControlledSwitch
                        control={control}
                        name="printed"
                        label="Напечатан"
                        color="secondary"
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Поля 4 - 11
                    </Typography>
                    <ControlledTextField
                        control={control}
                        name="slip4"
                        label="4 · Код валюты операции"
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip6"
                        label="6 · Оригинальные даты и время совершения операции на хосте"
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip9"
                        label="9 · Способ кодировки PIN-блока"
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip10"
                        label="10 · Номер карты"
                    />
                    <ControlledTextField
                        control={control}
                        name="slip11"
                        label="11 · Срок действия карты"
                    />
                    <ControlledLazySelect
                        control={control}
                        name="slip_type"
                        label="Тип слипа"
                        filial={filial}
                        optionsStatic={[{uid: 1, title: 'ПРИХОД'}, {uid: 2, title: 'ВОЗВРАТ/ОТМЕНА'}]}
                    />
                    <ControlledTextField
                        control={control}
                        name="print_error"
                        label="Ошибка печати"
                        sx={{width: '100%'}}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Поля 13 - 21
                    </Typography>
                    <ControlledTextField
                        control={control}
                        name="slip13"
                        label="13 · Код авторизации"
                    />
                    <ControlledTextField
                        control={control}
                        name="slip14"
                        label="14 · Номер ссылки"
                    />
                    <ControlledTextField
                        control={control}
                        name="slip15"
                        label="15 · Код ответа"
                    />
                    <ControlledTextField
                        control={control}
                        name="slip19"
                        label="19 · Дополнительные данные ответа"
                    />
                    <ControlledDatePicker
                        control={control}
                        name="slip21"
                        label="21 · Оригинальные даты и время совершения операции"
                    />
                    <ControlledTextField
                        control={control}
                        name="name_organization"
                        label="Организация"
                        sx={{width: '100%'}}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="uid_pinpad"
                        label="Пинпад"
                        type="pinpad"
                        filial={filial}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Поля 23 - 39
                    </Typography>
                    <ControlledTextField
                        control={control}
                        name="slip23"
                        label="23 · Идентификатор транзакции в коммуникационном сервере"
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip25"
                        label="25 · Код операции"
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip26"
                        label="26 · Уникальный номер транзакции на стороне внешнего  устройства"
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip27"
                        label="27 · Идентификатор внешнего устройства"
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip28"
                        label="28 · Идентификатор продавца"
                        sx={{width: '100%'}}
                    />
                    <ControlledTextField
                        control={control}
                        name="slip39"
                        label="39 · Статус проведения транзакции"
                    />
                </Box>
                <Box sx={{maxHeight: '420px', m: 1, overflowY: 'auto'}}>
                    <Typography className='glass' sx={{textAlign: 'center', position: 'sticky', top: 0, zIndex: 1}}
                                variant="h6" color="textSecondary">
                        Квитанция
                    </Typography>
                    <ControlledTextField
                        control={control}
                        name="slip90"
                        label="90 · Квитанция"
                        multiline={true}
                        sx={{minWidth: '270px'}}
                    />
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Button fullWidth variant='contained' color='error' sx={{marginRight: 1}}>Удалить</Button>
                {(uid_order_cinema !== null || uid_order_food !== null) &&
                    <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}} onClick={() => {
                        if (uid_order_cinema !== null) {
                            navigate(`/admin/orders/cinema/${city.code}/${filial.eais}/${param_date_admin}/${wp !== null ? '?wp=' + wp : ''}`)
                            dispatch(cinema_order_fetch(filial, uid_order_cinema))
                        } else if (uid_order_food !== null) {
                            navigate(`/admin/orders/horeca/${city.code}/${filial.eais}/${param_date_admin}/${wp !== null ? '?wp=' + wp : ''}`)
                            dispatch(horeca_order_fetch(filial, uid_order_food))
                        }
                        dispatch(closeModal())
                    }}>Перейти в заказ</Button>}
                <Button fullWidth variant='contained' color='secondary'>Сохранить</Button>
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