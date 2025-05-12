import {Box, Button, TextField, Typography} from "@mui/material"
import PhoneInput from "../elements/PhoneInput.jsx"
import {closeModal} from "../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {addOrderComment} from "../../service/fetch_service.js"

const CommentOrder = (props) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const [buyer_s, set_buyer_s] = useState('')
    const [buyer_n, set_buyer_n] = useState('')
    const [buyer_o, set_buyer_o] = useState('')
    const [email, set_email] = useState('')
    const [phone, set_phone] = useState('')
    const [comment, set_comment] = useState('')

    useEffect(() => {
        set_buyer_s(props.props.order.buyer_s)
        set_buyer_n(props.props.order.buyer_n)
        set_buyer_o(props.props.order.buyer_o)
        set_email(props.props.order.email)
        set_phone(props.props.order.phone)
        set_comment(props.props.order.comment)
    }, [])

    return (
        <Box component="form"
             autoComplete="off"
             noValidate
             onSubmit={(e) => {
                 e.preventDefault()
                 dispatch(addOrderComment(filial, wp, props.props.order_type, props.props.order.uid, buyer_s, buyer_n, buyer_o, phone, email, comment))
                 dispatch(closeModal())
             }}
        >
            <Typography variant="h6" color="textSecondary" margin={1}>
                Комментарий к заказу
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
                    <TextField variant='filled' label='e-mail' margin="dense" type="email" value={email}
                               onChange={(event) => {
                                   set_email(event.target.value)
                               }}/>
                    <PhoneInput value={phone} set_value={set_phone}/>
                </Box>
            </Box>
            <Box>
                <TextField sx={{width: '100%'}} label='Комментарий' color='secondary' margin='dense' focused autoFocus
                           multiline value={comment} onChange={(event) => {
                    set_comment(event.target.value)
                }}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button variant='contained' color='secondary' type="submit">Сохранить</Button>
            </Box>
        </Box>
    )
}

export default CommentOrder