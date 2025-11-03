import {Box, Button} from "@mui/material"
import {DatePicker} from "@mui/x-date-pickers"
import {useState} from "react"
import {get_date_shift} from "../service/advanced.js"
import dayjs from "dayjs"
import {common_documents_operations_close_shift} from "../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {closeModal} from "../redux/interfaceReducer.js"
import {setOperationsUpdate} from "../redux/documentsReducer.js"

const OperationCloseShift = () => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)

    const [date_shift, set_date_shift] = useState(dayjs(get_date_shift(new Date)))

    return <Box sx={{display: "flex", flexDirection: 'column', justifyContent: "space-between"}}>
        <DatePicker
            label={'Дата смены'}
            value={date_shift}
            onChange={(val) => set_date_shift(val)}
            sx={{margin: '10px 0'}}
        />
        <Button variant='contained' color='secondary' onClick={() => {
            dispatch(common_documents_operations_close_shift(filial, date_shift.format('YYYY-MM-DD')))
            dispatch(setOperationsUpdate())
            dispatch(closeModal())
        }}>
            Создать документы
        </Button>
    </Box>
}

export default OperationCloseShift