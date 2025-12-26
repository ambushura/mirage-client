import {Box, Button, Typography} from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import ControlledLazySelect from "../../ui/ControlledLazySelect.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useForm} from "react-hook-form"
import {v4} from "uuid"
import ControlledMoneyField from "../../ui/ControlledMoneyField.jsx"
import ControlledDateTimePicker from "../../ui/ControlledDateTimePicker.jsx"
import ControlledTextField from "../../ui/ControlledTextField.jsx"
import ControlledSwitch from "../../ui/ControlledSwitch.jsx"
import {get_hall_rent_sum} from "../../service/fetch_service.js"
import {useEffect, useState} from "react"

dayjs.locale('ru')

export default function Seance({props}) {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const filial = useSelector(state => state.data.filial)
    const {uid} = useSelector(state => state.interface.params)

    // Форма
    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            beginning: '',
            ending: '',
            canceled: false,
            cancellation_reason: null,
            comment: null,
            content_type: 'rent',
            copy_type: '',
            cover_link: '',
            date_change: '',
            date_create: '',
            date_shift: '',
            deleted: false,
            film_name: '',
            format: '',
            hall_full_name: '',
            hidden_on_kiosk: false,
            hidden_on_site: false,
            hidden_on_work_place: false,
            name_film: '',
            name_hall: '',
            opened: true,
            promotion_name: '',
            rate_age: 0,
            ref: v4(),
            rent: true,
            tariff: [],
            tariff_day: '',
            tariff_time: '',
            uid: v4(),
            uid_0: v4(),
            uid_1: v4(),
            uid_2: v4(),
            uid_filial: uid === 'new' ? filial.uid : '',
            uid_film: '',
            uid_hall: '',
            ver: '',
            duration: 0,
            ready: false,
            its_card: false,
            premiere: false,
        }
    })

    // Функция сохранения документа
    const onSubmit = (data) => {
        const prepared = {
            ...data, uid: uid === 'new' ? v4() : data.id, uid_filial: uid === 'new' ? filial.uid : data.uid_filial,

        }
        //dispatch(common_documents_z_book_save(filial, prepared))
        //dispatch(setZBooksUpdate())
    }

    // Наблюдаемые переменные
    const uid_hall = watch('uid_hall')
    const uid_film = watch('uid_film')
    const beginning = watch('beginning')
    const ending = watch('ending')
    const its_card = watch('its_card')
    const premiere = watch('premiere')

    const [gotten_price, set_gotten_price] = useState(false)
    useEffect(() => {

        set_gotten_price(false)

        async function get_price() {
            const data = await dispatch(get_hall_rent_sum(filial, uid_film, beginning ? dayjs(beginning).toISOString() : "", ending ? dayjs(ending).toISOString() : "", its_card, premiere))
            if (data?.sum !== undefined) {
                setValue('ready', false)
                setValue("sum", data.sum)
                setValue('ready', true)
                set_gotten_price(true)
            }
        }

        if (uid_film !== '' && beginning !== '' && ending !== '') {
            get_price()
        }
    }, [uid_film, uid_hall, beginning, ending, its_card, premiere])

    return <Box
        sx={{padding: '10px'}}
        id="modal-kkt"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{width: '700px', display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h6" color="textSecondary" margin={1}>
                Сеанс
            </Typography>
            <ControlledLazySelect
                control={control}
                name="uid_hall"
                label="Зал"
                type="halls"
                filial={filial}
                extraFields={['vip']}
                rules={{required: 'Укажите зал'}}
                onChange={(uid, extra) => {
                    setValue('vip', extra.vip || '')
                }}
                sx={{width: '100%'}}
            />
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <ControlledLazySelect
                    control={control}
                    name="uid_film"
                    label="Фильм"
                    type="films"
                    filial={filial}
                    extraFields={['copy_type', 'duration', 'premiere']}
                    rules={{required: 'Укажите фильм'}}
                    onChange={(uid, extra) => {
                        setValue('copy_type', extra.copy_type || '')
                        setValue('duration', extra.duration || 0)
                        setValue('premiere', extra.premiere || false)
                    }}
                    sx={{flex: 3, marginRight: '10px'}}
                />
                <ControlledTextField
                    readOnly
                    control={control}
                    name="duration"
                    label="Длительность (мин)"
                    numeric
                    rules={{
                        required: 'Укажите длительность сеанса',
                        pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'},
                        min: {value: 1, message: 'Длительность должна быть больше 0'},
                    }}
                    sx={{flex: 1, marginRight: '10px'}}
                />
                <ControlledLazySelect
                    control={control}
                    name="copy_type"
                    label="Тип"
                    filial={filial}
                    rules={{required: 'Укажите тип копии фильма'}}
                    optionsStatic={[{uid: '2D', title: '2D'}, {uid: '3D', title: '3D'}]}
                    sx={{flex: 1}}
                />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{flex: 1, marginRight: '10px'}}>
                    <ControlledDateTimePicker
                        control={control}
                        name="beginning"
                        label="Начало"
                        sx={{width: '100%', marginRight: '10px'}}
                    />
                </Box>
                <Box sx={{flex: 1}}>
                    <ControlledDateTimePicker
                        control={control}
                        name="ending"
                        label="Окончание"
                        sx={{width: '100%'}}
                    />
                </Box>
            </Box>
            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                <ControlledMoneyField
                    control={control}
                    readOnly
                    name="sum"
                    label="Стоимость"
                    error={!gotten_price}
                    helperText={!gotten_price ? 'Стоимость не рассчитана' : ''}
                    sx={{flex: 1, marginRight: '10px'}}
                    rules={{
                        required: 'Укажите стоимость сеанса',
                        pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'},
                        min: {value: 1, message: 'Стоимость должна быть больше 0'},
                    }}
                />
                <ControlledSwitch
                    control={control}
                    name="its_card"
                    label="Карта"
                    color="secondary"
                    sx={{flex: 1}}
                />
                <Button sx={{flex: 1}} variant='outlined' color='secondary' onClick={() => {
                    set_gotten_price(true)
                }}>Рассчитать
                    стоимость</Button>
            </Box>
            <ControlledTextField
                control={control}
                name="comment"
                label="Комментарий к сеансу (не к заказу)"
                sx={{width: '100%'}}
            />
        </Box>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'row'}}>
            <Button sx={{flex: 1}} variant='contained' color='secondary' type='submit'>Сохранить</Button>
        </Box>
    </Box>
}