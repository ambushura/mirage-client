import React, {useEffect, useState} from 'react'
import {Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import dayjs from "dayjs"
import MultiSelect from "../../ui/MultiSelect.jsx"
import {
    clearPeriod,
    dateShiftAccepted,
    setDateShift,
    setFilial,
    setFilialsSelected,
    setPeriod
} from "../../redux/center/centerReducer.js"
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker"
import {DatePicker} from "@mui/x-date-pickers"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {useNavigate} from "react-router-dom"
import SaveIcon from '@mui/icons-material/Save'
import PolylineIcon from '@mui/icons-material/Polyline'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import CachedIcon from '@mui/icons-material/Cached'
import {center_horeca_store_rest_get} from "../../service/fetch_service.js"

const SubMenu = ({type}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Города
    const cities = useSelector(state => state.data.cities)

    // Филиалы
    const filials = useSelector(state => state.center.filials)
    const filials_selected = useSelector(state => state.center.filials_selected)
    const {
        date_shift_beginning, date_shift_end, date_shift_accepted, date_shift
    } = useSelector(state => state.center)

    // Интервал
    const [draftRange, setDraftRange] = useState([null, null])
    useEffect(() => {
        setDraftRange([date_shift_beginning ? dayjs(date_shift_beginning) : null, date_shift_end ? dayjs(date_shift_end) : null,])
    }, [date_shift_beginning, date_shift_end, date_shift_accepted])

    // Дата смены
    const prevDay = () => {
        dispatch(setDateShift(dayjs(date_shift).subtract(1, "day").format("YYYY-MM-DD")))
    }
    const nextDay = () => {
        dispatch(setDateShift(dayjs(date_shift).add(1, "day").format("YYYY-MM-DD")))
    }

    // Филиал
    const filial = useSelector(state => state.center.filial)

    // Склад (распределение + остатки)
    const {uid_current_store} = useSelector(state => state.center)

    return <Box sx={{height: 'var(--center-submenu-height)', display: 'flex', alignItems: 'center'}}>
        {type.includes('update') && <Box>
            <Button variant='outlined' color='secondary' size='small' sx={{ml: '10px'}}><CachedIcon/></Button>
        </Box>}
        {type.includes('filials') && <MultiSelect
            label='Филиалы'
            type='filials'
            items={filials}
            items_selected={filials_selected}
            setValue={setFilialsSelected}
            sx={{width: 200, ml: '10px'}}/>}
        {type.includes('filial') && <FormControl sx={{width: '300px', ml: '10px'}}>
            <InputLabel id="center-filial-select-label">Филиал</InputLabel>
            <Select
                labelId="center-filial-select-label"
                id="center-filial-select"
                value={filial !== null ? filial.uid : ''}
                label="Филиал"
                onChange={(e) => {
                    cities.forEach((city) => {
                        city.filials.forEach(filial => {
                            if (filial.uid === e.target.value) {
                                dispatch(setFilial([e.target.value, filial]))
                            }
                        })
                    })
                }}
                MenuProps={{
                    PaperProps: {style: {maxHeight: 800}, className: 'center-scroll'},

                }}
                variant='outlined'>
                {filials.map((item, index) => {
                    return <MenuItem value={item.uid} key={item.uid}>{item.title}</MenuItem>
                })}
            </Select>
        </FormControl>}
        {type.includes('period') && <DateRangePicker
            label='Дата смены'
            sx={{width: 300, ml: '10px'}}
            value={draftRange}
            onChange={(value) => {
                setDraftRange(value)
            }}
            onAccept={(value) => {
                const [start, end] = value || []
                if (!start || !end || !start.isValid() || !end.isValid()) {
                    dispatch(clearPeriod())
                    return
                }
                dispatch(setPeriod([start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'),]))
                dispatch(dateShiftAccepted())
            }}
        />}
        {type.includes('date_shift') &&
            <Stack direction="row" alignItems="center" spacing={1} sx={{minWidth: 250, maxWidth: 250, ml: '10px'}}>
                <IconButton onClick={prevDay}>
                    <ArrowBackIosNewIcon fontSize="small"/>
                </IconButton>
                <DatePicker
                    label="Дата смены"
                    value={date_shift ? dayjs(date_shift) : null}
                    onChange={(newValue) => {
                        if (!newValue || !newValue.isValid()) return
                        dispatch(setDateShift(newValue.format('YYYY-MM-DD')))
                    }}
                    slotProps={{
                        textField: {
                            variant: "outlined", color: "secondary"
                        }
                    }}
                />
                <IconButton onClick={nextDay}>
                    <ArrowForwardIosIcon fontSize="small"/>
                </IconButton>
            </Stack>}
        {type.includes('store_state') && <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'no-wrap'}}>
            <Button onClick={() => {
                const result = dispatch(center_horeca_store_rest_get(filial, date_shift, uid_current_store))
            }}
                    variant='outlined' color='secondary' sx={{ml: '10px'}}
                    startIcon={<CloudDownloadIcon/>}>Остатки</Button>
            <Button variant='outlined' color='secondary' sx={{ml: '10px'}}
                    startIcon={<CloudUploadIcon/>}>Оприходование</Button>
            <Button variant='outlined' color='secondary' sx={{ml: '10px'}}
                    startIcon={<CloudUploadIcon/>}>Перемещение</Button>
        </Box>}
        {type.includes('shift_state') && <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'no-wrap'}}>
            <Button variant='outlined' color='secondary' sx={{ml: '10px'}}
                    startIcon={<CloudUploadIcon/>}>Выгрузить в 1С</Button>
            <Button variant='outlined' color='secondary' sx={{ml: '10px'}}
                    startIcon={<LockIcon/>}>Заблокировать</Button>
            <Button variant='outlined' color='secondary' sx={{ml: '10px'}}
                    startIcon={<LockOpenIcon/>}>Разблокировать</Button>
        </Box>}
        {type.includes('back') && <Box>
            <Button variant='outlined' color='secondary' sx={{ml: '10px'}}
                    startIcon={<ArrowBackIcon/>} onClick={() => {
                navigate(-1)
            }}>Назад</Button>
        </Box>}
        {type.includes('save') && <Box>
            <Button variant='outlined' color='info' sx={{ml: '10px'}} startIcon={<SaveIcon/>}>Сохранить</Button>
        </Box>}
        {type.includes('recipe_update') && <Box>
            <Button variant='outlined' color='secondary' sx={{ml: '10px'}}
                    startIcon={<PolylineIcon/>}>Пересобрать</Button>
        </Box>}
    </Box>
}

export default SubMenu