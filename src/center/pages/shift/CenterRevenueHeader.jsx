import React, {useEffect, useState} from 'react'
import {Box} from "@mui/material"
import MultiSelect from "../../../ui/MultiSelect.jsx"
import {useDispatch, useSelector} from "react-redux"
import {clearPeriod, dateShiftAccepted, setFilialsSelected, setPeriod} from "../../../redux/centerReducer.js"
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker'
import dayjs from "dayjs"

const CenterRevenueHeader = () => {

    const dispatch = useDispatch()

    const filials = useSelector(state => state.center.filials)
    const filials_selected = useSelector(state => state.center.filials_selected)
    const {
        date_shift_beginning, date_shift_end, date_shift_valid, date_shift_accepted
    } = useSelector(state => state.center)

    const [draftRange, setDraftRange] = useState([null, null])
    useEffect(() => {
        setDraftRange([date_shift_beginning ? dayjs(date_shift_beginning) : null, date_shift_end ? dayjs(date_shift_end) : null,])
    }, [date_shift_beginning, date_shift_end, date_shift_accepted])

    return <Box sx={{height: 80, display: 'flex', alignItems: 'center'}}>
        <MultiSelect
            label='Филиалы'
            type='filials'
            items={filials}
            items_selected={filials_selected}
            setValue={setFilialsSelected}
            sx={{width: 200, ml: '10px'}}/>
        <DateRangePicker
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
        />
    </Box>
}

export default CenterRevenueHeader