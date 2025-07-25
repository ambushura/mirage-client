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

    return (
        <Box>
            <Typography variant="h6" color="textSecondary" margin={1}>
                Касса
            </Typography>
            <Stack sx={{display: 'flex', flexDirection: 'row'}}>
                <Box>
                    <Box>
                        <Box><span>ЗН ККТ: </span><span style={{fontWeight: 'bold'}}>453534535345345</span></Box>
                        <Box><span>IP-адрес: </span><span style={{fontWeight: 'bold'}}>10.101.3.3:5555</span></Box>
                        <Box><span>MAC-адрес: </span><span style={{fontWeight: 'bold'}}>5555:rt4r:fgfg</span></Box>
                    </Box>
                    <FormControl variant='filled' sx={{m: 1, minWidth: '200px', width: '100%'}}>
                        <InputLabel id="discounts-group-select-label">Раздел</InputLabel>
                        <Select
                            onChange={(event) => {
                                set_chapter_value(event.target.value)
                            }}
                            labelId="discounts-group-select-label"
                            id="discounts-group-select"
                            value={chapter_value}
                            label="Группа скидок"
                            variant='filled'>
                            {chapter_list.map(discount_group => <MenuItem
                                sx={{color: 'black'}} key={discount_group.id}
                                value={discount_group.id}>{discount_group.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    {chapter_value === 0 ?
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <FormControl variant='filled' sx={{m: 1, minWidth: '200px', width: '100%'}}>
                                <InputLabel id="discounts-group-select-label">Тип запроса</InputLabel>
                                <Select
                                    onChange={(event) => {
                                        set_request_type_value(event.target.value)
                                    }}
                                    labelId="discounts-group-select-label"
                                    id="discounts-group-select"
                                    value={request_type_value}
                                    label="Группа скидок"
                                    variant='filled'>
                                    {request_type_list.map(discount_group => <MenuItem
                                        sx={{color: 'black'}} key={discount_group.id}
                                        value={discount_group.id}>{discount_group.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <TextField multiline sx={{m: 1, width: '100%'}}/>
                            <Button sx={{width: '100%', m: 1}} variant='contained' color='secondary' onClick={() => {
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
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <FormControl variant='filled' sx={{m: 1, minWidth: '200px'}}>
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
                                    {report_list.map(discount_group => <MenuItem
                                        sx={{color: 'black'}} key={discount_group.id}
                                        value={discount_group.id}>{discount_group.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Button variant='contained' color='secondary' onClick={() => {
                            }}>Сформировать отчет</Button>
                        </Box>
                        : null}
                </Box>
                <Box sx={{marginLeft: '10px'}}>
                    <ButtonGroup size='small' sx={{height: 'fit-content', marginTop: '10px'}} variant='outlined'
                                 color='secondary' orientation='vertical'>
                        <Button onClick={() => {
                        }}>Х-отчет</Button>
                        <Button onClick={() => {
                        }}>Суточный</Button>
                        <Button onClick={() => {
                        }}>Открыть денежный ящик</Button>
                        <Button onClick={() => {
                        }}>Тест связи с ОФД</Button>
                        <Button onClick={() => {
                        }}>Тест связи с кассой</Button>
                        <Button onClick={() => {
                        }}>Синхронизировать время с сервером</Button>
                        <Button color='warning' variant='contained' onClick={() => {
                        }}>Перезагрузка</Button>
                        <Button color='primary' variant='contained' onClick={() => {
                        }}>Отчет о закрытии смены</Button>
                    </ButtonGroup>
                </Box>
            </Stack>
        </Box>
    )
}