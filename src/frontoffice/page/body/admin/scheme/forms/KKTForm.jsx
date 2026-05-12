import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    common_catalog_get,
    equipment_action,
    ROUTE_EQUIPMENT_KKT_CANCEL_LAST_DOCUMENT,
    ROUTE_EQUIPMENT_KKT_CLOCK_RESET,
    ROUTE_EQUIPMENT_KKT_OPEN_BOX,
    ROUTE_EQUIPMENT_KKT_REBOOT,
    ROUTE_EQUIPMENT_KKT_X,
    ROUTE_EQUIPMENT_KKT_Z,
} from '../../../../../../service/fetch_service.js'
import { useForm } from 'react-hook-form'
import { v4 } from 'uuid'
import dayjs from 'dayjs'
import ControlledTextField from '../../../../../../ui/ControlledTextField.jsx'
import ControlledLazySelect from '../../../../../../ui/ControlledLazySelect.jsx'
import ControlledSwitch from '../../../../../../ui/ControlledSwitch.jsx'

export default function KKTForm({ props }) {
    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const filial = useSelector((state) => state.data.filial)
    const param_date = useSelector((state) => state.interface.params.param_date)

    // Состояние загрузки документа
    const [loading, set_loading] = useState(true)

    // Триггеры сохранения/удаления документа
    const { trigger_submit_kkt, trigger_delete_kkt } = useSelector((state) => state.equipment)

    // Форма
    const { handleSubmit, setValue, control, reset, watch } = useForm({
        defaultValues: {
            date_change: props.uid === 'new' ? dayjs(new Date()) : props.date_change,
            date_create: props.uid === 'new' ? dayjs(new Date()) : props.date_change,
            deleted: false,
            fn: '',
            ip: '',
            location: '',
            mac: '',
            name_department: '',
            name_store: '',
            number: '',
            port: '',
            rn: '',
            type_horeca: false,
            type_mirage: false,
            type_pushkarta: false,
            type_rent: false,
            type_to_kino: false,
            uid: props.uid === 'new' ? v4() : props.uid,
            uid_channel: '',
            uid_department: '',
            uid_organization: '',
            uid_store: '',
            uid_wallet: '',
            ver: props.uid === 'new' ? v4() : '',
        },
    })

    // Загрузка документа в форму при открытии
    useEffect(() => {
        const fetchData = async () => {
            set_loading(true)
            try {
                if (props.uid === 'new') {
                    reset()
                } else {
                    const data = await dispatch(common_catalog_get(filial, 'kkt', props.uid, param_date))
                    if (data?.data) {
                        reset({
                            ...data.data,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки кассы:', err)
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
        if (prepared.date_create) prepared.date_create = dayjs(prepared.date_create).format('YYYY-MM-DDTHH:mm:ss+00:00')
        if (prepared.date_change) prepared.date_change = dayjs(prepared.date_change).format('YYYY-MM-DDTHH:mm:ss+00:00')
    }

    // Триггер удаления документа

    // Вспомогательные функции
    const [fast_commands, set_fast_commands] = useState([])
    useEffect(() => {
        set_fast_commands([
            {
                id: 1,
                name: 'Х-отчет',
                route: ROUTE_EQUIPMENT_KKT_X,
                param: { uid },
            },
            { id: 2, name: 'Отчет о закрытии смены', route: ROUTE_EQUIPMENT_KKT_Z, param: { uid } },
            {
                id: 3,
                name: 'Открыть денежный ящик',
                route: ROUTE_EQUIPMENT_KKT_OPEN_BOX,
                param: { uid },
            },
            { id: 4, name: 'Тест связи с ККТ', route: '', param: {} },
            {
                id: 5,
                name: 'Тест связи с ОФД',
                route: '',
                param: {},
            },
            {
                id: 6,
                name: 'Синхронизировать время с сервером',
                route: ROUTE_EQUIPMENT_KKT_CLOCK_RESET,
                param: { uid },
            },
            {
                id: 7,
                name: 'Перезагрузка',
                route: ROUTE_EQUIPMENT_KKT_REBOOT,
                param: { uid },
            },
            {
                id: 8,
                name: 'Отмена последнего открытого документа',
                route: ROUTE_EQUIPMENT_KKT_CANCEL_LAST_DOCUMENT,
                param: { uid },
            },
        ])
    }, [uid])

    const chapter_list = [
        { id: 0, name: 'Информация о ККТ' },
        { id: 1, name: 'Регистрация ККТ' },
        {
            id: 2,
            name: 'Чек',
        },
        { id: 3, name: 'Отчеты' },
        { id: 4, name: 'Маркировка' },
        { id: 5, name: 'ФН' },
        { id: 6, name: 'Сервисные' },
        {
            id: 7,
            name: 'Лицензии',
        },
    ]

    const request_type_list = [
        { id: 0, name: '0 - Общая информация и статус ККТ' },
        {
            id: 1,
            name: '1 - Сумма наличных в кассе',
        },
        { id: 2, name: '2 - Версия модуля' },
    ]

    const report_list = [
        { id: 0, name: '0 - Отчет о закрытии смены' },
        { id: 1, name: '1 - Х-отчет' },
        {
            id: 2,
            name: '2 - Печать копии последнего документа',
        },
        { id: 3, name: '3 - Отчет о состоянии расчетов' },
        { id: 4, name: '4 - Демонстрационная печать ККТ' },
        {
            id: 5,
            name: '5 - Печать информации о ККТ',
        },
        { id: 6, name: '6 - Тест связи с ОФД' },
        { id: 9, name: '9 - Отчет по секциям' },
        {
            id: 12,
            name: '12 - Печать итогов регистрации/перерегистрации ККТ',
        },
    ]

    const [page, set_page] = useState(0)
    const [request_type_value, set_request_type_value] = useState(0)
    const [chapter_value, set_chapter_value] = useState(0)
    const [report_value, set_report_value] = useState(0)

    if (loading) {
        return <Loader />
    } else {
        return (
            <Box sx={{ padding: '10px' }} id="modal-kkt" component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ width: '700px', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                        ККТ
                    </Typography>
                    <Box sx={{ width: 'inherit', display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ flex: 3, marginRight: '5px' }}>
                            <ButtonGroup color="secondary" variant="contained" sx={{ marginBottom: 1 }}>
                                <Button color={page === 0 ? 'primary' : 'secondary'} onClick={() => set_page(0)}>
                                    Информация
                                </Button>
                                <Button color={page === 1 ? 'primary' : 'secondary'} onClick={() => set_page(1)}>
                                    Обслуживание
                                </Button>
                                <Button color={page === 2 ? 'primary' : 'secondary'} onClick={() => set_page(2)}>
                                    Драйвер
                                </Button>
                            </ButtonGroup>
                            <Box sx={{ display: page === 0 ? 'block' : 'none', width: 'inherit' }}>
                                <FormGroup sx={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}>
                                    <ControlledTextField
                                        control={control}
                                        name="number"
                                        label="Заводской номер"
                                        numeric
                                        rules={{
                                            required: 'Укажите заводской номер ККТ',
                                            pattern: { value: /^[0-9]+$/, message: 'Допустимы только цифры' },
                                        }}
                                    />
                                    <Box sx={{ width: 'inherit', display: 'flex' }}>
                                        <ControlledTextField
                                            sx={{ flex: 2, marginRight: '4px' }}
                                            control={control}
                                            name="ip"
                                            label="IP"
                                            rules={{
                                                required: 'Укажите IP-адрес',
                                                pattern: {
                                                    value: /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
                                                    message: 'Введите корректный IPv4 (пример: 192.168.0.1)',
                                                },
                                            }}
                                        />
                                        <ControlledTextField
                                            sx={{ flex: 1 }}
                                            control={control}
                                            name="port"
                                            label="PORT"
                                            numeric
                                            rules={{
                                                required: 'Укажите порт',
                                                pattern: { value: /^[0-9]+$/, message: 'Допустимы только цифры' },
                                            }}
                                        />
                                    </Box>
                                    <ControlledTextField control={control} name="mac" label="MAC-адрес" sx={{ width: '100%' }} />
                                    <FormGroup
                                        sx={{
                                            marginBottom: 1,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            width: 'inherit',
                                        }}
                                    >
                                        <ControlledSwitch control={control} name="type_to_kino" label="То кино" color="secondary" />
                                        <ControlledSwitch control={control} name="type_horeca" label="Общепит" color="secondary" />
                                        <ControlledSwitch control={control} name="type_mirage" label="Мираж" color="secondary" />
                                        <ControlledSwitch control={control} name="type_rent" label="Аренда" color="secondary" />
                                    </FormGroup>
                                    <ControlledLazySelect
                                        control={control}
                                        name="uid_organization"
                                        label="Организация"
                                        type="organizations"
                                        filial={filial}
                                        rules={{ required: 'Укажите организацию' }}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <ControlledTextField
                                            sx={{ flex: 1, marginRight: '4px' }}
                                            control={control}
                                            name="rn"
                                            label="Регистрационный номер"
                                            numeric
                                            rules={{
                                                required: 'Укажите регистрационнный номер ККТ',
                                                pattern: { value: /^[0-9]+$/, message: 'Допустимы только цифры' },
                                            }}
                                        />
                                        <ControlledTextField
                                            sx={{ flex: 1 }}
                                            control={control}
                                            name="fn"
                                            label="Номер фискального накопителя"
                                            numeric
                                            rules={{
                                                required: 'Укажите номер фискального накопителя',
                                                pattern: { value: /^[0-9]+$/, message: 'Допустимы только цифры' },
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <ControlledLazySelect
                                            sx={{ flex: 1, marginRight: '4px' }}
                                            control={control}
                                            name="uid_store"
                                            label="Торговая точка"
                                            type="stores"
                                            filial={filial}
                                            extraFields={['name_store']}
                                            rules={{ required: 'Укажите торговую точку продажи' }}
                                            onChange={(uid, extra) => {
                                                setValue('name_store', extra.name_store || '')
                                            }}
                                        />
                                        <ControlledLazySelect
                                            sx={{ flex: 1 }}
                                            control={control}
                                            name="uid_channel"
                                            label="Канал продажи"
                                            type="sales_channels"
                                            filial={filial}
                                            extraFields={['title']}
                                            rules={{ required: 'Укажите канал продажи' }}
                                            onChange={(uid, extra) => {
                                                setValue('channel_name', extra.title || '')
                                            }}
                                        />
                                    </Box>
                                    <ControlledLazySelect
                                        sx={{ flex: 1 }}
                                        control={control}
                                        name="uid_department"
                                        label="Подразделение"
                                        type="stores"
                                        filial={filial}
                                        extraFields={['name_department']}
                                        rules={{ required: 'Укажите подразделение продажи' }}
                                        onChange={(uid, extra) => {
                                            setValue('name_department', extra.name_department || '')
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <ControlledLazySelect
                                            sx={{ flex: 1, marginRight: '4px' }}
                                            control={control}
                                            name="uid_wallet"
                                            label="Касса"
                                            type="wallets"
                                            filial={filial}
                                            rules={{ required: 'Укажите кассу' }}
                                        />
                                        <ControlledTextField sx={{ flex: 1 }} control={control} name="location" label="Расположение" />
                                    </Box>
                                </FormGroup>
                            </Box>
                            <Box sx={{ display: page === 1 ? 'block' : 'none', width: 'inherit' }}>
                                <Box>В разработке...</Box>
                            </Box>
                            <Box sx={{ display: page === 2 ? 'block' : 'none', width: 'inherit' }}>
                                <FormGroup sx={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}>
                                    <FormControl variant="filled" color="secondary" sx={{ marginBottom: 1, width: 'inherit' }}>
                                        <InputLabel id="equipment-chapter-label">Функции драйвера</InputLabel>
                                        <Select
                                            onChange={(event) => {
                                                set_chapter_value(event.target.value)
                                            }}
                                            labelId="equipment-chapter-label"
                                            id="equipment-chapter-select"
                                            value={chapter_value}
                                            label="Раздел"
                                            variant="filled"
                                        >
                                            {chapter_list.map((discount_group) => (
                                                <MenuItem sx={{ color: 'black' }} key={discount_group.id} value={discount_group.id}>
                                                    {discount_group.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Box
                                        sx={{
                                            display: chapter_value === 0 ? 'flex' : 'none',
                                            width: 'inherit',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 'inherit',
                                                marginBottom: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <FormControl variant="filled" color="secondary" sx={{ marginBottom: 1, width: 'inherit' }}>
                                                <InputLabel sx={{ width: 'inherit' }} id="equipment-chapter-1-label">
                                                    Тип запроса
                                                </InputLabel>
                                                <Select
                                                    onChange={(event) => {
                                                        set_request_type_value(event.target.value)
                                                    }}
                                                    labelId="equipment-chapter-1-label"
                                                    id="equipment-chapter-1-select"
                                                    value={request_type_value}
                                                    label={chapter_list[chapter_value]}
                                                    variant="filled"
                                                >
                                                    {request_type_list.map((discount_group) => (
                                                        <MenuItem sx={{ color: 'black' }} key={discount_group.id} value={discount_group.id}>
                                                            {discount_group.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <TextField multiline sx={{ width: 'inherit', marginBottom: 1, flex: 1 }} />
                                            <Button sx={{ width: 'inherit' }} variant="contained" color="secondary" onClick={() => {}}>
                                                Прочитать
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: chapter_value === 1 ? 'flex' : 'none', width: 'inherit' }}>
                                        <Box></Box>
                                    </Box>
                                    <Box sx={{ display: chapter_value === 2 ? 'flex' : 'none', width: 'inherit' }}>
                                        <Box></Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: chapter_value === 3 ? 'flex' : 'none',
                                            width: 'inherit',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <FormControl variant="filled" color="secondary" sx={{ marginBottom: 1, width: 'inherit' }}>
                                            <InputLabel id="discounts-group-select-label">Тип отчета</InputLabel>
                                            <Select
                                                onChange={(event) => {
                                                    set_report_value(event.target.value)
                                                }}
                                                labelId="discounts-group-select-label"
                                                id="discounts-group-select"
                                                value={report_value}
                                                label="Отчеты"
                                                variant="filled"
                                            >
                                                {report_list.map((option) => (
                                                    <MenuItem sx={{ color: 'black' }} key={option.id} value={option.id}>
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Button fullWidth variant="contained" color="secondary" onClick={() => {}}>
                                            Сформировать отчет
                                        </Button>
                                    </Box>
                                </FormGroup>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, marginLeft: '5px', display: 'flex', flexDirection: 'column' }}>
                            {fast_commands.map((el) => {
                                return (
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        sx={{ marginBottom: '5px' }}
                                        fullWidth
                                        key={el.id}
                                        onClick={() => {
                                            dispatch(equipment_action(filial, el.route, el.param))
                                        }}
                                    >
                                        {el.name}
                                    </Button>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}

function Loader() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginRight: '5px' }}>
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                </Box>
            </Box>
            <Skeleton variant="rectangular" width={'615px'} height={50} />
        </Box>
    )
}
