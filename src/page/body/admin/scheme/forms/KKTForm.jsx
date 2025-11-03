import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from "@mui/material"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
    ROUTE_EQUIPMENT_KKT_CLOCK_RESET,
    ROUTE_EQUIPMENT_KKT_OPEN_BOX,
    ROUTE_EQUIPMENT_KKT_REBOOT,
    ROUTE_EQUIPMENT_KKT_X,
    ROUTE_EQUIPMENT_KKT_Z
} from "../../../../../service/fetch_routes.js"
import {common_catalog_get, equipment_action} from "../../../../../service/fetch_service.js"

export default function KKTForm({props}) {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)
    const param_date = useSelector(state => state.interface.params.param_date)

    const [obj, set_obj] = useState(null)
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_catalog_get(filial, 'kkt', props.uid, param_date))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.data !== null) {
                set_obj(fetching_result.data)
            }
        }
        fetch()
    }, [dispatch, filial, param_date, props.uid])

    const [values, set_values] = useState({
        uid: '',
        uid_filial: '',
        name: '',
        type_to_kino: false,
        type_pushkarta: false,
        type_mirage: false,
        type_rent: false,
        type_horeca: false,
        date_change: '',
        date_create: '',
        fn: '',
        rn: '',
        ip: '',
        port: '',
        location: '',
        mac: '',
        name_department: '',
        name_store: '',
        number: '',
        uid_channel: '',
        uid_department: '',
        uid_organization: '',
        uid_store: '',
        uid_wallet: '',
        ver: '',
    })

    useEffect(() => {
        if (obj !== null) {
            set_values({
                uid: obj.uid,
                name: obj.name,
                type_to_kino: obj.type_to_kino,
                type_pushkarta: obj.type_pushkarta,
                type_mirage: obj.type_mirage,
                type_rent: obj.type_rent,
                type_horeca: obj.type_horeca,
                mac: obj.mac,
                ip: obj.ip,
                port: obj.port,
            })
        }
    }, [obj])

    const [fast_commands, set_fast_commands] = useState([{id: 0, name: 'Суточный отчет', route: '', param: {}}, {
        id: 1, name: 'Х-отчет', route: ROUTE_EQUIPMENT_KKT_X, param: {}
    }, {id: 2, name: 'Отчет о закрытии смены', route: ROUTE_EQUIPMENT_KKT_Z, param: {}}, {
        id: 3, name: 'Открыть денежный ящик', route: ROUTE_EQUIPMENT_KKT_OPEN_BOX, param: {}
    }, {id: 4, name: 'Тест связи с ККТ', route: '', param: {}}, {
        id: 5, name: 'Тест связи с ОФД', route: '', param: {}
    }, {id: 6, name: 'Синхронизировать время с сервером', route: '', param: {}}, {
        id: 7, name: 'Перезагрузка', route: ROUTE_EQUIPMENT_KKT_REBOOT, param: {}
    },])

    useEffect(() => {
        set_fast_commands([{
            id: 1, name: 'Х-отчет', route: ROUTE_EQUIPMENT_KKT_X, param: {uid: values.uid}
        }, {id: 2, name: 'Отчет о закрытии смены', route: ROUTE_EQUIPMENT_KKT_Z, param: {uid: values.uid}}, {
            id: 3, name: 'Открыть денежный ящик', route: ROUTE_EQUIPMENT_KKT_OPEN_BOX, param: {uid: values.uid}
        }, {id: 4, name: 'Тест связи с ККТ', route: '', param: {}}, {
            id: 5, name: 'Тест связи с ОФД', route: '', param: {}
        }, {
            id: 6,
            name: 'Синхронизировать время с сервером',
            route: ROUTE_EQUIPMENT_KKT_CLOCK_RESET,
            param: {uid: values.uid}
        }, {
            id: 7, name: 'Перезагрузка', route: ROUTE_EQUIPMENT_KKT_REBOOT, param: {uid: values.uid}
        },])
    }, [values])

    const chapter_list = [{id: 0, name: 'Информация о ККТ'}, {id: 1, name: 'Регистрация ККТ'}, {
        id: 2, name: 'Чек'
    }, {id: 3, name: 'Отчеты'}, {id: 4, name: 'Маркировка'}, {id: 5, name: 'ФН'}, {id: 6, name: 'Сервисные'}, {
        id: 7, name: 'Лицензии'
    },]

    const request_type_list = [{id: 0, name: '0 - Общая информация и статус ККТ'}, {
        id: 1, name: '1 - Сумма наличных в кассе'
    }, {id: 2, name: '2 - Версия модуля'},]

    const report_list = [{id: 0, name: '0 - Отчет о закрытии смены'}, {id: 1, name: '1 - Х-отчет'}, {
        id: 2, name: '2 - Печать копии последнего документа'
    }, {id: 3, name: '3 - Отчет о состоянии расчетов'}, {id: 4, name: '4 - Демонстрационная печать ККТ'}, {
        id: 5, name: '5 - Печать информации о ККТ'
    }, {id: 6, name: '6 - Тест связи с ОФД'}, {id: 9, name: '9 - Отчет по секциям'}, {
        id: 12, name: '12 - Печать итогов регистрации/перерегистрации ККТ'
    },]

    const [page, set_page] = useState(0)
    const [request_type_value, set_request_type_value] = useState(0)
    const [chapter_value, set_chapter_value] = useState(0)
    const [report_value, set_report_value] = useState(0)

    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Касса
        </Typography>
        <Box sx={{width: '700px', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{width: 'inherit', display: 'flex', flexDirection: 'row'}}>
                <Box sx={{flex: 3, marginRight: '5px'}}>
                    <ButtonGroup color='secondary' variant='contained' sx={{marginBottom: 1}}>
                        <Button color={page === 0 ? 'primary' : 'secondary'}
                                onClick={() => set_page(0)}>Информация</Button>
                        <Button color={page === 1 ? 'primary' : 'secondary'}
                                onClick={() => set_page(1)}>Обслуживание</Button>
                        <Button color={page === 2 ? 'primary' : 'secondary'}
                                onClick={() => set_page(2)}>Драйвер</Button>
                    </ButtonGroup>
                    <Box sx={{display: page === 0 ? 'block' : 'none', width: 'inherit'}}>
                        <FormGroup sx={{display: 'flex', flexDirection: 'column', width: 'inherit'}}>
                            <TextField variant='filled' label='Заводской номер' value={props.label}
                                       sx={{marginBottom: 1}}/>
                            <Box sx={{
                                marginBottom: 1, width: 'inherit', display: 'flex', justifyContent: 'space-between'
                            }}>
                                <TextField value={values.ip} variant='filled' sx={{flex: 3}} label='IP'/>
                                <TextField value={values.port} variant='filled' sx={{flex: 1, marginLeft: 1}}
                                           label='PORT'/>
                            </Box>
                            <TextField value={values.mac} variant='filled' label='MAC' sx={{marginBottom: 1}}/>
                            <FormGroup sx={{marginBottom: 1, display: 'flex', flexDirection: 'row', width: 'inherit'}}>
                                <FormControlLabel checked={values.type_to_kino} control={<Switch/>} label="То кино!"/>
                                <FormControlLabel checked={values.type_horeca} control={<Switch/>} label="Общепит"/>
                                <FormControlLabel checked={values.type_mirage} control={<Switch/>}
                                                  label="Мираж Синема"/>
                                <FormControlLabel checked={values.type_pushkarta} control={<Switch/>}
                                                  label="Пушкинская карта"/>
                                <FormControlLabel checked={values.type_rent} control={<Switch/>} label="Аренда"/>
                            </FormGroup>
                            <TextField variant='filled' label='Организация' sx={{marginBottom: 1}}/>
                        </FormGroup>
                    </Box>
                    <Box sx={{display: page === 1 ? 'block' : 'none', width: 'inherit'}}>
                        <Box>
                            В разработке...
                        </Box>
                    </Box>
                    <Box sx={{display: page === 2 ? 'block' : 'none', width: 'inherit'}}>
                        <FormGroup sx={{display: 'flex', flexDirection: 'column', width: 'inherit'}}>
                            <FormControl variant='filled' color='secondary' sx={{marginBottom: 1, width: 'inherit'}}>
                                <InputLabel id="equipment-chapter-label">Функции драйвера</InputLabel>
                                <Select
                                    onChange={(event) => {
                                        set_chapter_value(event.target.value)
                                    }}
                                    labelId="equipment-chapter-label"
                                    id="equipment-chapter-select"
                                    value={chapter_value}
                                    label="Раздел"
                                    variant='filled'>
                                    {chapter_list.map(discount_group => <MenuItem sx={{color: 'black'}}
                                                                                  key={discount_group.id}
                                                                                  value={discount_group.id}>{discount_group.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Box sx={{
                                display: chapter_value === 0 ? 'flex' : 'none',
                                width: 'inherit',
                                flexDirection: 'column'
                            }}>
                                <Box sx={{width: 'inherit', marginBottom: 1, display: 'flex', flexDirection: 'column'}}>
                                    <FormControl variant='filled' color='secondary'
                                                 sx={{marginBottom: 1, width: 'inherit'}}>
                                        <InputLabel sx={{width: 'inherit'}} id="equipment-chapter-1-label">Тип
                                            запроса</InputLabel>
                                        <Select
                                            onChange={(event) => {
                                                set_request_type_value(event.target.value)
                                            }}
                                            labelId="equipment-chapter-1-label"
                                            id="equipment-chapter-1-select"
                                            value={request_type_value}
                                            label={chapter_list[chapter_value]}
                                            variant='filled'>
                                            {request_type_list.map(discount_group => <MenuItem sx={{color: 'black'}}
                                                                                               key={discount_group.id}
                                                                                               value={discount_group.id}>{discount_group.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <TextField multiline sx={{width: 'inherit', marginBottom: 1, flex: 1}}/>
                                    <Button sx={{width: 'inherit'}} variant='contained' color='secondary'
                                            onClick={() => {
                                            }}>Прочитать</Button>
                                </Box>
                            </Box>
                            <Box sx={{display: chapter_value === 1 ? 'flex' : 'none', width: 'inherit'}}>
                                <Box></Box>
                            </Box>
                            <Box sx={{display: chapter_value === 2 ? 'flex' : 'none', width: 'inherit'}}>
                                <Box></Box>
                            </Box>
                            <Box sx={{
                                display: chapter_value === 3 ? 'flex' : 'none',
                                width: 'inherit',
                                flexDirection: 'column'
                            }}>
                                <FormControl variant='filled' color='secondary'
                                             sx={{marginBottom: 1, width: 'inherit'}}>
                                    <InputLabel id="discounts-group-select-label">Тип отчета</InputLabel>
                                    <Select
                                        onChange={(event) => {
                                            set_report_value(event.target.value)
                                        }}
                                        labelId="discounts-group-select-label"
                                        id="discounts-group-select"
                                        value={report_value}
                                        label="Отчеты"
                                        variant='filled'>
                                        {report_list.map(option => <MenuItem sx={{color: 'black'}}
                                                                             key={option.id}
                                                                             value={option.id}>{option.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Button fullWidth variant='contained' color='secondary'
                                        onClick={() => {
                                        }}>Сформировать отчет</Button>
                            </Box>
                        </FormGroup>
                    </Box>
                </Box>
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
    </Box>
}