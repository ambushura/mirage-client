import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material"
import PhoneInput from "../ui/PhoneInput.jsx"
import {closeModal} from "../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {common_contact_add, pl_estimate_discounts} from "../service/fetch_service.js"
import QrCodeIcon from '@mui/icons-material/QrCode'

const Contact = ({props}) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const [buyer_s, set_buyer_s] = useState('')
    const [buyer_n, set_buyer_n] = useState('')
    const [buyer_o, set_buyer_o] = useState('')
    const [buyer_email, set_buyer_email] = useState('')
    const [buyer_phone_number, set_buyer_phone_number] = useState('')
    const [qr, set_qr] = useState('')

    useEffect(() => {
        set_buyer_s(props.order.buyer_s)
        set_buyer_n(props.order.buyer_n)
        set_buyer_o(props.order.buyer_o)
        set_buyer_email(props.order.buyer_email)
        set_buyer_phone_number(props.order.buyer_phone_number)
    }, [])

    return <Box component="form"
                autoComplete="off"
                noValidate
                onSubmit={(e) => {
                    e.preventDefault()
                    const submitter = e.nativeEvent.submitter
                    const action = submitter?.getAttribute('data-action')
                    switch (action) {
                        case 'common':
                            dispatch(common_contact_add(filial, props.order_type, props.order.uid, buyer_s, buyer_n, buyer_o, buyer_phone_number, buyer_email))
                            break
                        case 'pl':
                            dispatch(pl_estimate_discounts(filial, props.order.uid, props.order_type, qr))
                            break
                    }
                    dispatch(closeModal())
                }}
    >
        <Typography variant="h6" color="textSecondary" margin={1}>
            Информация о клиенте
        </Typography>
        <Box
            sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
        >
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                <TextField variant='filled' label='Фамилия' margin='dense' value={buyer_s} onChange={(event) => {
                    set_buyer_s(event.target.value)
                }}/>
                <TextField variant='filled' label='Имя' margin="dense" value={buyer_n} onChange={(event) => {
                    set_buyer_n(event.target.value)
                }}/>
                <TextField variant='filled' label='Отчество' margin="dense" value={buyer_o} onChange={(event) => {
                    set_buyer_o(event.target.value)
                }}/>
            </Box>
            <Box>
                <TextField variant='filled' label='e-mail' margin="dense" type="email" value={buyer_email}
                           onChange={(event) => {
                               set_buyer_email(event.target.value)
                           }}/>
                <PhoneInput value={buyer_phone_number} set_value={set_buyer_phone_number}/>
                <TextField
                    slotProps={{
                        input: {
                            startAdornment: (<InputAdornment position="start">
                                <QrCodeIcon/>
                            </InputAdornment>),
                        },
                    }}
                    variant='outlined' label='Код ПЛ' margin="dense" value={qr} onChange={(event) => {
                    set_qr(event.target.value)
                }}/>
            </Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
            <Button variant='contained' color='secondary' type="submit" data-action="common"
                    sx={{marginLeft: '10px'}}>Сохранить</Button>
            <Button variant='contained' color='secondary' type="submit" data-action="pl">Заполнить по коду
                ПЛ</Button>
        </Box>
    </Box>
}

export default Contact