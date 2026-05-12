import { Box, Button, Typography } from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import ControlledLazySelect from '../../../ui/ControlledLazySelect.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { v4 } from 'uuid'
import ControlledMoneyField from '../../../ui/ControlledMoneyField.jsx'
import ControlledDateTimePicker from '../../../ui/ControlledDateTimePicker.jsx'
import ControlledTextField from '../../../ui/ControlledTextField.jsx'
import ControlledSwitch from '../../../ui/ControlledSwitch.jsx'
import { cinema_seance_create7, get_hall_rent_sum } from '../../../service/fetch_service.js'
import { useEffect, useState } from 'react'
import { closeModal } from '../../../redux/frontoffice/interfaceReducer.js'
import { setScheduleUpdate } from '../../../redux/frontoffice/scheduleReducer.js'

dayjs.locale('ru')

export default function Seance({ props }) {
    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const filial = useSelector((state) => state.data.filial)
    const param_date = useSelector((state) => state.interface.params.param_date)

    // Форма
    const {
        handleSubmit,
        setValue,
        control,
        reset,
        watch,
        formState: { touchedFields },
    } = useForm({
        defaultValues: {
            // Время
            date_shift: param_date,
            beginning: '',
            ending: '',
            duration: 0,

            // Фильм
            uid_film: '',
            copy_type: '',

            // Зал
            uid_hall: '',

            // Сумма
            sum: 0,

            // Прочее
            comment: null,

            // uid
            uid: v4(),
            uid_filial: filial.uid,

            // Дополнительные
            ready: false,
            its_card: false,
            premiere: false,
        },
    })

    // Функция сохранения документа
    const onSubmit = async (data) => {
        const prepared = {
            ...data,
        }
        if (prepared.date_shift) prepared.date_shift = dayjs(prepared.date_shift).startOf('day').format('YYYY-MM-DDTHH:mm:ss+00:00')
        if (prepared.beginning) prepared.beginning = dayjs(prepared.beginning).format('YYYY-MM-DDTHH:mm:ss+00:00')
        if (prepared.ending) prepared.ending = dayjs(prepared.ending).format('YYYY-MM-DDTHH:mm:ss+00:00')
        const result = await dispatch(cinema_seance_create7(filial, prepared))
        if (result?.data) {
            dispatch(closeModal())
            dispatch(setScheduleUpdate())
        }
    }

    // Наблюдаемые переменные
    const uid_hall = watch('uid_hall')
    const uid_film = watch('uid_film')
    const beginning = watch('beginning')
    const ending = watch('ending')
    const duration = watch('duration')
    const sum = watch('sum')
    const its_card = watch('its_card')
    const premiere = watch('premiere')

    const [gotten_price, set_gotten_price] = useState(false)
    useEffect(() => {
        set_gotten_price(false)

        async function get_price() {
            const data = await dispatch(
                get_hall_rent_sum(
                    filial,
                    uid_film,
                    beginning ? dayjs(beginning).toISOString() : '',
                    ending ? dayjs(ending).toISOString() : '',
                    its_card,
                    premiere
                )
            )
            if (data?.sum !== undefined) {
                setValue('ready', false)
                setValue('sum', data.sum)
                setValue('ready', true)
                set_gotten_price(true)
            }
        }

        if (uid_film !== '' && beginning !== '' && ending !== '') {
            get_price()
        }
    }, [uid_film, uid_hall, beginning, ending, its_card, premiere])

    useEffect(() => {
        if (!beginning || !duration) return
        const start = dayjs(beginning)
        if (!start.isValid()) return
        if (touchedFields.ending) return

        const calculatedEnding = start.add(Number(duration), 'minute').toDate()

        setValue('ending', calculatedEnding, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }, [beginning, duration])

    return (
        <Box sx={{ padding: '10px' }} id="modal-seance" component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ width: '700px', display: 'flex', flexDirection: 'column' }}>
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
                    rules={{ required: 'Укажите зал' }}
                    onChange={(uid, extra) => {
                        setValue('vip', extra.vip || '')
                    }}
                    sx={{ width: '100%' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <ControlledLazySelect
                        control={control}
                        name="uid_film"
                        label="Фильм"
                        type="films"
                        filial={filial}
                        extraFields={['copy_type', 'duration', 'premiere']}
                        rules={{ required: 'Укажите фильм' }}
                        onChange={(uid, extra) => {
                            setValue('copy_type', extra.copy_type || '')
                            setValue('duration', extra.duration || 0)
                            setValue('premiere', extra.premiere || false)
                        }}
                        sx={{ flex: 3, marginRight: '10px' }}
                    />
                    <ControlledTextField
                        readOnly
                        control={control}
                        name="duration"
                        label="Длительность (мин)"
                        numeric
                        rules={{
                            required: 'Укажите длительность сеанса',
                            pattern: { value: /^[0-9]+$/, message: 'Допустимы только цифры' },
                            min: { value: 1, message: 'Длительность должна быть больше 0' },
                        }}
                        sx={{ flex: 1, marginRight: '10px' }}
                    />
                    <ControlledLazySelect
                        control={control}
                        name="copy_type"
                        label="Тип"
                        filial={filial}
                        rules={{ required: 'Укажите тип копии фильма' }}
                        optionsStatic={[
                            { uid: '2D', title: '2D' },
                            { uid: '3D', title: '3D' },
                        ]}
                        sx={{ flex: 1 }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ flex: 1, marginRight: '10px' }}>
                        <ControlledDateTimePicker
                            control={control}
                            name="beginning"
                            label="Начало"
                            sx={{ width: '100%', marginRight: '10px' }}
                            rules={{ required: 'Когда начнется сеанс?' }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <ControlledDateTimePicker
                            control={control}
                            name="ending"
                            label="Окончание"
                            sx={{ width: '100%' }}
                            rules={{
                                required: 'Когда сеанс закончится?',
                                validate: (value) => {
                                    if (!beginning) return 'Когда начнется сеанс?'
                                    if (!value) return 'Когда сеанс закончится?'
                                    const start = dayjs(beginning)
                                    const end = dayjs(value)
                                    if (!end.isAfter(start)) {
                                        return 'Сеанс должен закончиться позже начала'
                                    }
                                    const diffHours = end.diff(start, 'hour', true)
                                    if (diffHours > 12) {
                                        return 'Длительность сеанса не может превышать 12 часов'
                                    }
                                    return true
                                },
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <ControlledMoneyField
                        control={control}
                        readOnly
                        name="sum"
                        label="Стоимость"
                        error={!gotten_price}
                        helperText={!gotten_price ? 'Стоимость не рассчитана' : ''}
                        sx={{ flex: 1, marginRight: '10px' }}
                        rules={{
                            required: 'Укажите стоимость сеанса',
                            pattern: { value: /^[0-9]+$/, message: 'Допустимы только цифры' },
                            min: { value: 1, message: 'Стоимость должна быть больше 0' },
                        }}
                    />
                    <ControlledSwitch control={control} name="its_card" label="Карта" color="secondary" sx={{ flex: 1 }} />
                    <Button
                        sx={{ flex: 1 }}
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            set_gotten_price(true)
                        }}
                    >
                        Рассчитать стоимость
                    </Button>
                </Box>
                <ControlledTextField control={control} name="comment" label="Комментарий к сеансу (не к заказу)" sx={{ width: '100%' }} />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                {gotten_price && sum > 0 && (
                    <Button sx={{ flex: 1 }} variant="contained" color="secondary" type="submit">
                        Сохранить
                    </Button>
                )}
            </Box>
        </Box>
    )
}
