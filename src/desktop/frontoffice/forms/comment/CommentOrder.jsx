import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { common_order_add_comment } from '../../../../service/fetch_service.js'
import { closeModal } from '../../../../redux/desktop/frontoffice/interfaceReducer.js'
import { useDispatch, useSelector } from 'react-redux'

const CommentOrder = (props) => {
    const dispatch = useDispatch()

    const [comment, set_comment] = useState(null)
    const filial = useSelector((state) => state.data.filial)

    const order_type = props.props.order_type
    const order = props.props.order

    useEffect(() => {
        set_comment(order.comment)
    }, [order.comment])

    return (
        <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={(e) => {
                e.preventDefault()
                dispatch(common_order_add_comment(filial, order_type, order.uid, comment, order.ver))
                dispatch(closeModal())
            }}
            display="flex"
            flexDirection="column"
            sx={{ alignItems: 'flex-start' }}
            id="modal-comment"
        >
            <Typography variant="h6" color="textSecondary" margin={1}>
                Комментарий к заказу
            </Typography>
            <TextField
                label="Комментарий"
                sx={{ m: 1, minWidth: '500px' }}
                variant="filled"
                color="textSecondary"
                multiline
                value={comment}
                onChange={(event) => {
                    set_comment(event.target.value)
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button variant="contained" color="secondary" type="submit">
                    Сохранить
                </Button>
            </Box>
        </Box>
    )
}

export default CommentOrder
