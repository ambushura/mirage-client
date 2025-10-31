import {Box, Button} from "@mui/material"
import {DatePicker} from "@mui/x-date-pickers"
import {useState} from "react"
import {get_date_shift} from "../service/advanced.js"
import dayjs from "dayjs"

const OperationCloseShift = () => {

    const [date_shift, set_date_shift] = useState(dayjs(get_date_shift(new Date)))

    return <Box sx={{display: "flex", flexDirection: 'column', justifyContent: "space-between"}}>
        <DatePicker
            label={'Дата смены'}
            value={date_shift}
            onChange={(val) => set_date_shift(val)}
            sx={{margin: '10px 0'}}
        />
        <Button variant='contained' color='secondary'>
            Создать документы
        </Button>
    </Box>
}

export default OperationCloseShift