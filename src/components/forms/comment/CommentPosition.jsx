import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import {common_position_add_comment} from "../../../service/fetch_service.js"
import {closeModal} from "../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useSetModifications} from "../../../page/right-panel/horeca/useSetModifications.js"

const CommentPosition = ({props}) => {

    const dispatch = useDispatch()
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)

    const [comment, set_comment] = useState(null)
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const order_type = props.order_type
    const uid_order = props.uid_order
    const uid_position = props.uid_position
    const current_comment = props.comment

    const modifications = useSetModifications(props.uid_menu)
    const [selected_modifications, set_selected_modifications] = useState([])

    useEffect(() => {
        const modifications_old = []
        if (props.modifications !== null) {
            props.modifications.forEach(modification => {
                modifications_old.push(modification.uid)
            })
            set_selected_modifications(modifications_old)
        }
    }, [props.modifications])

    useEffect(() => {
        set_comment(current_comment)
    }, [current_comment])

    useEffect(() => {
        if (props.order_type === 'cinema') {
            if (!pre_order.in_base) {
                dispatch(closeModal())
            }
        } else if (props.order_type === 'horeca') {
            if (!horder.in_base) {
                dispatch(closeModal())
            }
        }
    }, [dispatch, props.order_type, pre_order, horder])

    return (
        <Box component="form"
             autoComplete="off"
             noValidate
             onSubmit={(e) => {
                 e.preventDefault()
                 dispatch(common_position_add_comment(filial, wp, order_type, uid_order, uid_position, comment, selected_modifications))
                 dispatch(closeModal())
             }}
             display="flex" flexDirection="column" sx={{alignItems: 'flex-start'}} id="modal-comment">
            <Typography variant="h6" color="textSecondary" margin={1}>Комментарий к позиции заказа</Typography>
            <TextField label='Комментарий' sx={{m: 1, minWidth: '500px'}} variant='filled' color="textSecondary"
                       multiline value={comment} onChange={(event) => {
                set_comment(event.target.value)
            }}/>
            {props.order_type === 'horeca' && modifications !== null ?
                <Box sx={{minWidth: '500px', maxWidth: '500px', m: 1}}>
                    <Autocomplete
                        fullWidth
                        multiple
                        id='modifications'
                        options={modifications}
                        getOptionLabel={(option) => option.name}
                        value={modifications.filter(m => selected_modifications.includes(m.uid))}
                        onChange={(e, newValue) => {
                            set_selected_modifications(newValue.map(m => m.uid))
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant='outlined'
                                label='Модификаторы'
                                placeholder="добавить модификатор"
                            />
                        )}
                    />
                </Box> : null}
            <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                <Button variant='contained' color='secondary' type="submit">Сохранить</Button>
            </Box>
        </Box>
    )
}

export default CommentPosition