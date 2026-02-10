import React, {useEffect, useState} from 'react'
import {Box, IconButton, Stack} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import dayjs from "dayjs"
import MultiSelect from "../../ui/MultiSelect.jsx"
import {clearPeriod, dateShiftAccepted, setDateShift, setFilialsSelected, setPeriod} from "../../redux/centerReducer.js"
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker"
import {DatePicker} from "@mui/x-date-pickers"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

const SubMenu = ({type}) => {

    const dispatch = useDispatch()

    const filials = useSelector(state => state.center.filials)
    const filials_selected = useSelector(state => state.center.filials_selected)
    const {
        date_shift_beginning, date_shift_end, date_shift_accepted, date_shift
    } = useSelector(state => state.center)

    const [draftRange, setDraftRange] = useState([null, null])
    useEffect(() => {
        setDraftRange([date_shift_beginning ? dayjs(date_shift_beginning) : null, date_shift_end ? dayjs(date_shift_end) : null,])
    }, [date_shift_beginning, date_shift_end, date_shift_accepted])

    const prevDay = () => {
        dispatch(setDateShift(dayjs(date_shift).subtract(1, "day").format("YYYY-MM-DD")))
    }

    const nextDay = () => {
        dispatch(setDateShift(dayjs(date_shift).add(1, "day").format("YYYY-MM-DD")))
    }

    return <Box sx={{height: 80, display: 'flex', alignItems: 'center'}}>
        {type.includes('filials') && <MultiSelect
            label='Филиалы'
            type='filials'
            items={filials}
            items_selected={filials_selected}
            setValue={setFilialsSelected}
            sx={{width: 200, ml: '10px'}}/>}
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
        {type.includes('date_shift') && <Stack direction="row" alignItems="center" spacing={1} sx={{ml: '10px'}}>
            <IconButton onClick={prevDay}>
                <ArrowBackIosNewIcon fontSize="small"/>
            </IconButton>
            <DatePicker
                label="Дата смены"
                sx={{width: 160}}
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
    </Box>
}

export default SubMenu