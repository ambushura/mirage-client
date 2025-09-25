import {useEffect, useState} from 'react'
import {Autocomplete, Box, InputAdornment, Stack, TextField} from '@mui/material'
import {LocalizationProvider, MobileTimePicker} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

dayjs.locale('ru')

const films = [{label: 'Интерстеллар'}, {label: 'Начало'}, {label: 'Матрица'}, {label: 'Дюна'}, {label: 'Темный рыцарь'}]

export default function Seance({props}) {

    const [film, setFilm] = useState(null)
    const [startTime, setStartTime] = useState(dayjs())
    const [endTime, setEndTime] = useState(dayjs())
    const [price, setPrice] = useState('')

    useEffect(() => {
        if (props.beginning !== null) {
            setStartTime(props.beginning)
        } else {
            setStartTime(props.ending)
        }
        if (props.ending !== null) {
            setEndTime(props.ending)
        } else {
            setEndTime(props.beginning)
        }
    }, [props])

    return <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={{
            cancelButtonLabel: 'ОТМЕНА',
            okButtonLabel: 'ОК',
            clearButtonLabel: 'Очистить',
            todayButtonLabel: 'Сегодня',
            timePickerToolbarTitle: 'Укажите время сеанса'
        }}
    >
        <Box sx={{maxWidth: 400}}>
            <Stack spacing={3}>
                <Autocomplete
                    options={films}
                    value={film}
                    onChange={(e, newValue) => setFilm(newValue)}
                    renderInput={(params) => (<TextField {...params} label="Фильм" variant="outlined"/>)}
                />
                <MobileTimePicker
                    label="Начало"
                    value={startTime}
                    onChange={setStartTime}
                    ampm={false}
                    views={['hours', 'minutes']}
                    slotProps={{
                        textField: {
                            variant: 'outlined', InputProps: {
                                endAdornment: (<InputAdornment position="end">
                                    <AccessTimeIcon/>
                                </InputAdornment>)
                            }
                        }
                    }}
                />
                <MobileTimePicker
                    label="Окончание"
                    value={endTime}
                    onChange={setEndTime}
                    ampm={false}
                    views={['hours', 'minutes']}
                    slotProps={{
                        textField: {
                            variant: 'outlined', InputProps: {
                                endAdornment: (<InputAdornment position="end">
                                    <AccessTimeIcon/>
                                </InputAdornment>)
                            }
                        }
                    }}
                />
                <TextField
                    label="Стоимость (Р)"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">Р</InputAdornment>), inputProps: {min: 0}
                    }}
                    variant="outlined"
                />
            </Stack>
        </Box>
    </LocalizationProvider>
}