import {Box, Button, TextField, Typography} from '@mui/material'
import {closeModal} from '../../../redux/interfaceReducer.js'
import {ruToEnLayout} from '../../../ui/hooks/common_functions.js'
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import {horeca_position_add_mark} from '../../../service/fetch_service.js'

const Egais = ({props}) => {
    const filial = useSelector((state) => state.data.filial)
    const dispatch = useDispatch()
    const [mark, set_mark] = useState(null)

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault()
                dispatch(horeca_position_add_mark(props.filial, props.uid_order, props.uid_position, mark))
                dispatch(closeModal())
            }}
        >
            <Typography variant="h6" color="textSecondary" margin={1}>
                ЕГАИС
            </Typography>
            <TextField
                autoFocus
                label="Акцизная марка"
                sx={{m: 1, minWidth: '400px'}}
                variant="filled"
                color="textSecondary"
                value={mark}
                onChange={(event) => {
                    const raw = event.target.value
                    const fixed = /[а-яё]/i.test(raw) ? ruToEnLayout(raw) : raw
                    set_mark(fixed)
                }}
            />
            <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                <Button variant="contained" color="secondary" type="submit" sx={{marginLeft: '4px'}}>
                    Добавить в заказ
                </Button>
            </Box>
    </Box>
    )
}

export default Egais
