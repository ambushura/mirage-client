import {
    Box, Button, ButtonGroup,
    FormControl,
    InputLabel,
    MenuItem,
    Select, Stack,
    TextField, Typography
} from "@mui/material"
import {useState} from "react"

export default function KKTForm(props) {

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

    const [request_type_value, set_request_type_value] = useState(0)
    const [chapter_value, set_chapter_value] = useState(0)
    const [report_value, set_report_value] = useState(0)

    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Касса ЗН {props.props.label}
        </Typography>
        <Stack sx={{display: 'flex', flexDirection: 'row'}}>
            <Box sx={{flex: 1, marginRight: '5px'}}>
                <FormControl variant='filled' color='secondary' sx={{marginBottom: 1, width: '350px'}}>
                    <InputLabel id="equipment-chapter-label">Раздел</InputLabel>
                    <Select
                        onChange={(event) => {
                            set_chapter_value(event.target.value)
                        }}
                        labelId="equipment-chapter-label"
                        id="equipment-chapter-select"
                        value={chapter_value}
                        label="Раздел"
                        variant='filled'>
                        {chapter_list.map(discount_group => <MenuItem sx={{color: 'black'}} key={discount_group.id}
                                                                      value={discount_group.id}>{discount_group.name}</MenuItem>)}
                    </Select>
                </FormControl>
                {chapter_value === 0 ?
                    <Box sx={{width: '350px', marginBottom: 1}}>
                        <FormControl variant='filled' color='secondary' sx={{marginBottom: 1, width: 'inherit'}}>
                            <InputLabel id="equipment-chapter-1-label">Тип запроса</InputLabel>
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
                        <TextField multiline sx={{marginBottom: 1, width: 'inherit'}}/>
                        <Button sx={{width: 'inherit'}} variant='contained' color='secondary' onClick={() => {
                        }}>Прочитать</Button>
                    </Box>
                    : null}
                {chapter_value === 1 ?
                    <Box></Box>
                    : null}
                {chapter_value === 2 ?
                    <Box></Box>
                    : null}
                {chapter_value === 3 ?
                    <Box sx={{width: '350px', marginBottom: 1}}>
                        <FormControl variant='filled' color='secondary' sx={{marginBottom: 1, width: 'inherit'}}>
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
                        <Button sx={{width: 'inherit'}} variant='contained' color='secondary' onClick={() => {
                        }}>Сформировать отчет</Button>
                    </Box>
                    : null}
            </Box>
            <Box sx={{flex: 1, marginLeft: '5px'}}>
                <ButtonGroup size='small' sx={{height: 'fit-content', width: '100%'}} variant='outlined'
                             color='secondary' orientation='vertical'>
                    {fast_commands.map(el => <Button key={el.id}>{el.name}</Button>)}
                </ButtonGroup>
            </Box>
        </Stack>
    </Box>
}