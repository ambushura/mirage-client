import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material"
import {closeModal} from "../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useState} from "react"
import {cinema_seance_close} from "../../service/fetch_service.js"

export default function SeanceCancellation({props}) {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const [cancellation_reasons, set_cancellation_reasons] = useState([
        {uid: 0, name: '1 - Нет проданных билетов'},
        {uid: 1, name: '2 - Зрители не пришли'},
        {uid: 2, name: '3 - Эвакуация'},
        {uid: 3, name: '4 - Поломка звука в зале'},
        {uid: 4, name: '5 - Поломка проектора в зале'},
        {uid: 5, name: '6 - Отключение электричества в зале'},
        {uid: 6, name: '7 - Поломка проектора в зале'},
        {uid: 7, name: '8 - Потоп'},
        {uid: 8, name: '9 - Прочее'},
    ])
    const [current_cancellation_reason, set_current_cancellation_reason] = useState(null)
    const [comment, set_comment] = useState(null)

    return (
        <Box component="form"
             autoComplete="off"
             noValidate
             onSubmit={async (e) => {
                 e.preventDefault()
                 await dispatch(cinema_seance_close(filial, wp, props.uid_seance, current_cancellation_reason, comment))
                 await dispatch(closeModal())
             }}
             sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
                 justifyContent: 'space-between',
                 minWidth: '400px'
             }}
        >
            <Typography variant="h6" color="textSecondary" margin={1}>
                Отмена сеанса
            </Typography>
            <FormControl variant='filled' sx={{m: 1, minWidth: 'inherit'}}>
                <InputLabel id="cancellations-reasons-select-label">Причина отмены сеанса</InputLabel>
                <Select
                    onChange={(event) => {
                        set_current_cancellation_reason(event.target.value)
                    }}
                    labelId="cancellations-reasons-select-label"
                    id="cancellations-reasons-select"
                    value={current_cancellation_reason}
                    label="Причина отмены сеансa"
                    variant='filled'>
                    {cancellation_reasons.map(cancellation_reason => <MenuItem
                        sx={{color: 'black'}} key={cancellation_reason.uid}
                        value={cancellation_reason.uid}>{cancellation_reason.name}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField label='Комментарий' sx={{m: 1, minWidth: 'inherit'}} variant='filled' color="textSecondary"
                       multiline value={comment} onChange={(event) => {
                set_comment(event.target.value)
            }}/>
            <Button sx={{m: 1, minWidth: 'inherit'}} variant="contained" color="primary"
                    type="submit">Отменить сеанс</Button>
        </Box>
    )
}