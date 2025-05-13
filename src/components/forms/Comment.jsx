import {Box, Button, TextField, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import {common_comment_add} from "../../service/fetch_service.js"
import {closeModal} from "../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"

const Comment = (props) => {

    const dispatch = useDispatch()

    const [comment, set_comment] = useState(null)
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const order_type = props.props.order_type
    const action_type = props.props.action_type

    useEffect(() => {
        set_comment('')
    }, [])

    return (
        <Box component="form"
             autoComplete="off"
             noValidate
             onSubmit={(e) => {
                 e.preventDefault()
                 dispatch(common_comment_add(filial, wp, order_type, comment))
                 dispatch(closeModal())
             }}
             display="flex" flexDirection="column" sx={{alignItems: 'flex-start'}} id="modal-comment">
            <Typography variant="h6" color="textSecondary" margin={1}>
                {`Комментарий к ${action_type === 'order' ? 'заказу' : 'позиции заказа'}`}
            </Typography>
            <TextField label='Комментарий' sx={{m: 1, minWidth: '400px'}} variant='filled' color="textSecondary"
                       multiline value={comment} onChange={(event) => {
                set_comment(event.target.value)
            }}/>
            <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                <Button variant='contained' color='secondary'>Сохранить</Button>
            </Box>
        </Box>
    )
}

export default Comment