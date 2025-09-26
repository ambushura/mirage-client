import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import {common_position_add_comment, horeca_modifications_get} from "../../service/fetch_service.js"
import {closeModal} from "../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"

const CommentPosition = ({props}) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)

    const [modifications, set_modifications] = useState([])
    const [selected_modifications, set_selected_modifications] = useState([])
    const [comment, set_comment] = useState(null)

    const order_type = props.order_type
    const uid_order = props.uid_order
    const uid_position = props.uid_position
    const current_comment = props.comment

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(horeca_modifications_get(filial, props.uid_menu, false))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.data !== null) {
                set_modifications(fetching_result.data)
            }
        }
        if (filial !== undefined && order_type === 'horeca' && props.uid_menu !== undefined) {
            fetch()
        }
    }, [dispatch, filial, order_type, props.uid_menu])

    useEffect(() => {
        if (order_type === 'horeca') {
            const modifications_old = []
            if (props.modifications !== null) {
                props.modifications.forEach(modification => {
                    modifications_old.push(modification.uid)
                })
                set_selected_modifications(modifications_old)
            }
        }
    }, [order_type, props.modifications])

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

    return <Box component="form"
                autoComplete="off"
                noValidate
                onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(common_position_add_comment(filial, order_type, uid_order, uid_position, comment, selected_modifications, props.order_type === 'cinema' ? pre_order.ver : horder.ver))
                    dispatch(closeModal())
                }}
                display="flex" flexDirection="column" sx={{alignItems: 'flex-start'}} id="modal-comment">
        <Typography variant="h6" color="textSecondary" margin={1}>Комментарий к позиции заказа</Typography>
        <TextField label='Комментарий' sx={{m: 1, minWidth: '500px'}} variant='filled' color="textSecondary"
                   multiline value={comment} onChange={(event) => {
            set_comment(event.target.value)
        }}/>
        {props.order_type === 'horeca' && modifications !== null && modifications.length > 0 ?
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
                    renderInput={(params) => (<TextField
                        {...params}
                        variant='outlined'
                        label='Модификаторы'
                        placeholder="добавить модификатор"
                    />)}
                />
            </Box> : null}
        <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
            <Button variant='contained' color='secondary' type="submit">Сохранить</Button>
        </Box>
    </Box>
}

export default CommentPosition