import React from 'react'
import {Box} from "@mui/material"
import MultiSelect from "../../../ui/MultiSelect.jsx"
import {useDispatch, useSelector} from "react-redux"
import {setFilialsSelected, setPeriod} from "../../../redux/centerReducer.js"
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker'
import dayjs from "dayjs"

const CenterRevenueHeader = () => {

    const dispatch = useDispatch()

    const filials = useSelector(state => state.center.filials)
    const filials_selected = useSelector(state => state.center.filials_selected)
    const {date_shift_beginning, date_shift_end} = useSelector(state => state.center)

    return <Box sx={{height: 80, display: 'flex', alignItems: 'center'}}>
        <MultiSelect
            label='Филиалы'
            type='filials'
            items={filials}
            items_selected={filials_selected}
            setValue={setFilialsSelected}
            sx={{width: 200, ml: '10px'}}/>
        <DateRangePicker
            color='secondary'
            value={[dayjs(date_shift_beginning), dayjs(date_shift_end),]}
            onChange={(newValue) => dispatch(setPeriod(newValue))}
            sx={{width: 260, ml: '10px'}}/>
    </Box>
}

export default CenterRevenueHeader