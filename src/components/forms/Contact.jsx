import {Box, Button, TextField, Typography} from "@mui/material"
import PhoneInput from "../elements/PhoneInput.jsx"
import {closeModal} from "../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {common_contact_add} from "../../service/fetch_service.js"

const Contact = (props) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const [buyer_s, set_buyer_s] = useState('')
    const [buyer_n, set_buyer_n] = useState('')
    const [buyer_o, set_buyer_o] = useState('')
    const [buyer_email, set_buyer_email] = useState('')
    const [buyer_phone_number, set_buyer_phone_number] = useState('')

    useEffect(() => {
        set_buyer_s(props.props.order.buyer_s)
        set_buyer_n(props.props.order.buyer_n)
        set_buyer_o(props.props.order.buyer_o)
        set_buyer_email(props.props.order.buyer_email)
        set_buyer_phone_number(props.props.order.buyer_phone_number)
    }, [])

    return (
        <Box component="form"
             autoComplete="off"
             noValidate
             onSubmit={(e) => {
                 e.preventDefault()
                 dispatch(common_contact_add(filial, wp, props.props.order_type, props.props.order.uid, buyer_s, buyer_n, buyer_o, buyer_phone_number, buyer_email))
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
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button variant='contained' color='secondary' type="submit">Сохранить</Button>
            </Box>
        </Box>
    )
}

export default Contact