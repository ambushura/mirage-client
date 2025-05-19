import {Box, Button, TextField, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import {common_position_add_comment} from "../../../service/fetch_service.js"
import {closeModal} from "../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"

const CommentPosition = (props) => {

    const dispatch = useDispatch()
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)

    const [comment, set_comment] = useState(null)
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const order_type = props.props.order_type
    const uid_order = props.props.uid_order
    const uid_position = props.props.uid_position
    const current_comment = props.props.comment

    useEffect(() => {
        set_comment(current_comment)
    }, [current_comment])

    useEffect(() => {
        if (props.props.order_type === 'cinema') {
            if (!pre_order.in_base) {
                dispatch(closeModal())
            }
        } else if (props.props.order_type === 'horeca') {
            if (!horder.in_base) {
                dispatch(closeModal())
            }
        }
    }, [dispatch, props.props.order_type, pre_order, horder])

    return (
        <Box component="form"
             autoComplete="off"
             noValidate
             onSubmit={(e) => {
                 e.preventDefault()
                 dispatch(common_position_add_comment(filial, wp, order_type, uid_order, uid_position, comment))
                 dispatch(closeModal())
             }}
             display="flex" flexDirection="column" sx={{alignItems: 'flex-start'}} id="modal-comment">
            <Typography variant="h6" color="textSecondary" margin={1}>Комментарий к позиции заказа</Typography>
            <TextField label='Комментарий' sx={{m: 1, minWidth: '400px'}} variant='filled' color="textSecondary"
                       multiline value={comment} onChange={(event) => {
                set_comment(event.target.value)
            }}/>
            <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                <Button variant='contained' color='secondary' type="submit">Сохранить</Button>
            </Box>
        </Box>
    )
}

export default CommentPosition