import {Box, Button, FormGroup, Typography} from "@mui/material"
import {useForm} from "react-hook-form"
import {useEffect, useState} from "react"
import {common_catalog_get, equipment_action} from "../../../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {v4} from "uuid"
import ControlledLazySelect from "../../../../../ui/ControlledLazySelect.jsx"
import ControlledTextField from "../../../../../ui/ControlledTextField.jsx"
import dayjs from "dayjs"

export default function PinpadForm({props}) {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)

    // Состояние загрузки документа
    const [loading, set_loading] = useState(true)

    // Триггеры сохранения/удаления документа
    const {trigger_submit_pinpad, trigger_delete_pinpad} = useSelector(state => state.equipment)

    // Форма
    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            ver: props.uid === 'new' ? v4() : '',
            uid: props.uid === 'new' ? v4() : '',
            deleted: false,
            date_create: '',
            date_change: '',
            uid_organization: '',
            number: '',
            port: '',
            mac: '',
            location: '',
            ip: '',
        }
    })

    // Загрузка документа в форму при открытии
    useEffect(() => {
        const fetchData = async () => {
            set_loading(true)
            try {
                if (props.uid === 'new') {
                    reset()
                } else {
                    const data = await dispatch(common_catalog_get(filial, 'pinpad', props.uid, param_date))
                    if (data?.data) {
                        reset({
                            ...data.data,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки пинпада:', err)
            } finally {
                set_loading(false)
            }
        }
        fetchData()
    }, [dispatch, filial, param_date, props.uid])

    // Наблюдаемые переменные
    const uid = watch('uid')

    // Триггер сохранения документа

    // Функция сохранения документа
    const onSubmit = (data) => {
        const prepared = {
            ...data,
        }
        if (prepared.date_create) prepared.date_create = dayjs(prepared.date_create)
            .format('YYYY-MM-DDTHH:mm:ss+00:00')
        if (prepared.date_change) prepared.date_change = dayjs(prepared.date_change)
            .format('YYYY-MM-DDTHH:mm:ss+00:00')
    }

    // Триггер удаления документа

    // Вспомогательные функции
    const [fast_commands, set_fast_commands] = useState([{
        id: 0, name: 'Проверка связи с терминалом', route: '', param: {uid: uid}
    }, {
        id: 1, name: 'Проверка связи с хостом', route: '', param: {uid: uid}
    }, {id: 2, name: 'Оплата/Отмена (1 рубль)', route: '', param: {uid: uid}}, {
        id: 3, name: 'Сверка итогов', route: '', param: {uid: uid}
    }])

    return <Box sx={{minWidth: '600px'}}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Пинпад
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <FormGroup sx={{display: 'flex', flexDirection: 'column', width: 'inherit'}}>
                <ControlledTextField
                    control={control}
                    name="number"
                    label="Идентификатор юр. лица (ID)"
                    sx={{width: '100%'}}
                />
                <ControlledLazySelect
                    control={control}
                    name="uid_organization"
                    label="Организация"
                    type="organizations"
                    filial={filial}
                    rules={{required: 'Укажите организацию'}}
                />
                <Box sx={{width: 'inherit', display: 'flex'}}>
                    <ControlledTextField
                        sx={{flex: 2, marginRight: '4px'}}
                        control={control}
                        name="ip"
                        label="IP"
                        rules={{
                            required: 'Укажите IP-адрес', pattern: {
                                value: /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
                                message: 'Введите корректный IPv4 (пример: 192.168.0.1)'
                            }
                        }}
                    />
                    <ControlledTextField
                        sx={{flex: 1}}
                        control={control}
                        name="port"
                        label="PORT"
                        numeric
                        rules={{
                            required: 'Укажите порт', pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                        }}
                    />
                </Box>
                <ControlledTextField
                    control={control}
                    name="mac"
                    label="MAC-адрес"
                    sx={{width: '100%'}}
                />
            </FormGroup>
            <Box sx={{flex: 1, marginLeft: '5px', display: 'flex', flexDirection: 'column'}}>
                {fast_commands.map(el => {
                    return <Button variant='outlined' color='secondary' sx={{marginBottom: '5px'}} fullWidth
                                   key={el.id} onClick={() => {
                        dispatch(equipment_action(filial, el.route, el.param))
                    }}>{el.name}</Button>
                })}
            </Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button fullWidth variant='contained' color='secondary'>Сохранить</Button>
            <Button fullWidth variant='contained' color='error' sx={{marginLeft: 1}}>Удалить</Button>
        </Box>
    </Box>
}