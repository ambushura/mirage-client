import {
    Box, Button, ButtonGroup,
    FormControl, FormControlLabel, FormGroup,
    InputLabel,
    MenuItem,
    Select, Switch,
    TextField, Typography
} from "@mui/material"
import {useEffect, useState} from "react"

export default function KKTForm({props}) {

    useEffect(() => {

    }, [])

    const fast_commands = [
        {id: 0, name: 'Суточный отчет'},
        {id: 1, name: 'Х-отчет'},
        {id: 2, name: 'Отчет о закрытии смены'},
        {id: 3, name: 'Открыть денежный ящик'},
        {id: 4, name: 'Тест связи с ККТ'},
        {id: 5, name: 'Тест связи с ОФД'},
        {id: 6, name: 'Синхронизировать время с сервером'},
        {id: 7, name: 'Перезагрузка'},
    ]

    const chapter_list = [
        {id: 0, name: 'Информация о ККТ'},
        {id: 1, name: 'Регистрация ККТ'},
        {id: 2, name: 'Чек'},
        {id: 3, name: 'Отчеты'},
        {id: 4, name: 'Маркировка'},
        {id: 5, name: 'ФН'},
        {id: 6, name: 'Сервисные'},
        {id: 7, name: 'Лицензии'},
    ]

    const request_type_list = [
        {id: 0, name: '0 - Общая информация и статус ККТ'},
        {id: 1, name: '1 - Сумма наличных в кассе'},
        {id: 2, name: '2 - Версия модуля'},
    ]

    const report_list = [
        {id: 0, name: '0 - Отчет о закрытии смены'},
        {id: 1, name: '1 - Х-отчет'},
        {id: 2, name: '2 - Печать копии последнего документа'},
        {id: 3, name: '3 - Отчет о состоянии расчетов'},
        {id: 4, name: '4 - Демонстрационная печать ККТ'},
        {id: 5, name: '5 - Печать информации о ККТ'},
        {id: 6, name: '6 - Тест связи с ОФД'},
        {id: 9, name: '9 - Отчет по секциям'},
        {id: 12, name: '12 - Печать итогов регистрации/перерегистрации ККТ'},
    ]

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
                                marginBottom: 1,
                                width: 'inherit',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <TextField variant='filled' sx={{flex: 3}} label='IP'/>
                                <TextField variant='filled' sx={{flex: 1, marginLeft: 1}} label='PORT'/>
                            </Box>
                            <TextField variant='filled' label='MAC' sx={{marginBottom: 1}}/>
                            <FormGroup sx={{marginBottom: 1, display: 'flex', flexDirection: 'row', width: 'inherit'}}>
                                <FormControlLabel control={<Switch/>} label="То кино!"/>
                                <FormControlLabel control={<Switch/>} label="Общепит"/>
                                <FormControlLabel control={<Switch/>} label="Мираж Синема"/>
                                <FormControlLabel control={<Switch/>} label="Пушкинская карта"/>
                                <FormControlLabel control={<Switch/>} label="Аренда"/>
                            </FormGroup>
                            <TextField variant='filled' label='Организация' sx={{marginBottom: 1}}/>
                        </FormGroup>
                    </Box>
                    <Box sx={{display: page === 1 ? 'block' : 'none', width: 'inherit'}}>
                        <Box>
                            Ограничения работы кассы
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
                                        label="Группа скидок"
                                        variant='filled'>
                                        {report_list.map(discount_group => <MenuItem sx={{color: 'black'}}
                                                                                     key={discount_group.id}
                                                                                     value={discount_group.id}>{discount_group.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Button fullWidth variant='contained' color='secondary'
                                        onClick={() => {
                                        }}>Сформировать отчет</Button>
                            </Box>
                        </FormGroup>
                    </Box>
                </Box>
                <Box sx={{flex: 1, marginLeft: '5px'}}>
                    <ButtonGroup size='small' sx={{height: 'fit-content', width: '100%', marginBottom: 1}}
                                 variant='outlined'
                                 color='secondary' orientation='vertical'>
                        {fast_commands.map(el => <Button key={el.id}>{el.name}</Button>)}
                    </ButtonGroup>
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Button fullWidth variant='contained' color='secondary'>Сохранить</Button>
                <Button fullWidth variant='contained' color='error' sx={{marginLeft: 1}}>Удалить</Button>
            </Box>
        </Box>
    </Box>
}