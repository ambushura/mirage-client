import { Box, Button, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetWP, turnOffWP, turnOnWP } from '../../../../../../../redux/desktop/frontoffice/interfaceReducer.js'
import { useForm } from 'react-hook-form'
import {
    common_catalog_get,
    ROUTE_EQUIPMENT_WORKPLACE_RESET,
    ROUTE_EQUIPMENT_WORKPLACE_TURN_OFF,
    ROUTE_EQUIPMENT_WORKPLACE_TURN_ON,
} from '../../../../../../../service/fetch_service.js'
import ControlledTextField from '../../../../../../../ui/ControlledTextField.jsx'
import ControlledSwitch from '../../../../../../../ui/ControlledSwitch.jsx'

export function WorkplaceForm({ props }) {
    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const filial = useSelector((state) => state.data.filial)
    const param_date = useSelector((state) => state.interface.params.param_date)

    // Состояние загрузки документа
    const [loading, set_loading] = useState(true)

    // Триггеры сохранения/удаления документа
    const { trigger_submit_workplace, trigger_delete_workplace } = useSelector((state) => state.equipment)

    // Форма
    const { handleSubmit, setValue, control, reset, watch } = useForm({
        defaultValues: {
            name: '',
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
                    const data = await dispatch(common_catalog_get(filial, 'workplace', props.uid, param_date))
                    if (data?.data) {
                        reset({
                            ...data.data,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки рабочего места:', err)
            } finally {
                set_loading(false)
            }
        }
        fetchData()
    }, [dispatch, filial, param_date, props.uid])

    // Наблюдаемые переменные
    const name = watch('name')

    // Триггер сохранения документа

    // Функция сохранения документа
    const onSubmit = (data) => {
        const prepared = {
            ...data,
        }
    }

    // Триггер удаления документа

    // Вспомогательные функции
    const [fast_commands, set_fast_commands] = useState([
        {
            id: 0,
            name: 'Включить',
            route: ROUTE_EQUIPMENT_WORKPLACE_TURN_ON,
            param: {},
        },
        { id: 1, name: 'Перезагрузить', route: ROUTE_EQUIPMENT_WORKPLACE_RESET, param: {} },
        {
            id: 2,
            name: 'Выключить',
            route: ROUTE_EQUIPMENT_WORKPLACE_TURN_OFF,
            param: {},
        },
    ])

    if (loading) {
        return <Loader />
    } else {
        return (
            <Box
                sx={{ padding: '10px' }}
                id="modal-workplace"
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography variant="h6" color="textSecondary" margin={1}>
                    {props.kiosk ? 'Киоск самообслуживания' : 'Рабочее место'}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <ControlledTextField sx={{ flex: 1 }} control={control} name="name" label="Имя" />
                    <ControlledSwitch control={control} name="kiosk" label="Это киоск" color="secondary" />
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
                                    switch (el.route) {
                                        case ROUTE_EQUIPMENT_WORKPLACE_TURN_ON:
                                            dispatch(turnOnWP(name))
                                            break
                                        case ROUTE_EQUIPMENT_WORKPLACE_RESET:
                                            dispatch(resetWP(name))
                                            break
                                        case ROUTE_EQUIPMENT_WORKPLACE_TURN_OFF:
                                            dispatch(turnOffWP(name))
                                            break
                                    }
                                }}
                            >
                                {el.name}
                            </Button>
                        )
                    })}
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
