import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
    cinema_discount_apply,
    cinema_seance_discounts_get,
    cinema_seance_discounts_groups_get
} from "../../service/fetch_service.js"
import {closeModal} from "../../redux/interfaceReducer.js"

const Discounts = (props) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const seance = useSelector(state => state.schedule.seance)

    const [discounts, set_discounts] = useState([])
    const [discounts_groups, set_discounts_groups] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result_discounts = await dispatch(cinema_seance_discounts_get(filial, seance.uid))
            if (fetching_result_discounts.loading) {
                // TODO Крутилка
            } else if (fetching_result_discounts.data !== null) {
                set_discounts(fetching_result_discounts.data)
            }
            const fetching_result_discounts_groups = await dispatch(cinema_seance_discounts_groups_get(filial))
            if (fetching_result_discounts_groups.loading) {
                // TODO Крутилка
            } else if (fetching_result_discounts_groups.data !== null) {
                set_discounts_groups(fetching_result_discounts_groups.data)
            }
        }
        fetch()
    }, [dispatch, filial, seance])


    const [discount_error, set_discount_error] = useState(false)

    const pre_order = useSelector(state => state.orders.pre_order)

    const [uid_group_discount, set_uid_group_discount] = useState(null)
    const [uid_discount, set_uid_discount] = useState(null)
    const [comment, set_comment] = useState(null)

    return (
        <Box component="form"
             noValidate
             autoComplete="off"
             sx={{minWidth: '200px', display: 'flex', flexDirection: 'column'}}
             onSubmit={(e) => {
                 e.preventDefault()
                 if (!uid_discount) {
                     set_discount_error(true)
                     return
                 }
                 set_discount_error(false)
                 dispatch(cinema_discount_apply(filial, pre_order.uid, uid_discount, uid_group_discount, comment, props.props.uid_positions))
                 dispatch(closeModal())
             }}>
            <Typography variant="h6" color="textSecondary" margin={1}>
                Скидки
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', maxWidth: '300px', overflow: 'hidden'}}>
                <FormControl variant='filled' sx={{m: 1, minWidth: '200px'}}>
                    <InputLabel id="discounts-group-select-label">Группа скидок</InputLabel>
                    <Select
                        onChange={(event) => {
                            set_uid_group_discount(event.target.value)
                        }}
                        labelId="discounts-group-select-label"
                        id="discounts-group-select"
                        value={uid_group_discount}
                        label="Группа скидок"
                        variant='filled'>
                        {discounts_groups.map(discount_group => <MenuItem
                            sx={{color: 'black'}} key={discount_group.uid}
                            value={discount_group.uid}>{discount_group.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant='filled' sx={{m: 1, minWidth: '200px'}} error={discount_error}>
                    <InputLabel id="discounts-select-label">Скидка</InputLabel>
                    <Select
                        onChange={(event) => {
                            set_uid_discount(event.target.value)
                            set_discount_error(false)
                        }}
                        labelId="discounts-select-label"
                        id="discounts-select"
                        value={uid_discount}
                        label="Скидка"
                        variant='filled'>
                        {discounts.map(discount => <MenuItem sx={{color: 'black'}}
                                                             key={discount.uid}
                                                             value={discount.uid}>{discount.name}
                            <span style={{
                                padding: '4px 8px',
                                borderRadius: '8px',
                                marginLeft: '4px',
                                backgroundColor: '#EEEEEE',
                                fontWeight: 'bold'
                            }}>{discount.value} {discount.fix ? 'р' : '%'}</span></MenuItem>)}
                    </Select>
                    {discount_error && <FormHelperText>Вы забыли указать скидку</FormHelperText>}
                </FormControl>
                <TextField label='Комментарий' sx={{m: 1, minWidth: '200px'}} variant='filled' color="textSecondary"
                           multiline value={comment} onChange={(event) => {
                    set_comment(event.target.value)
                }}/>
            </Box>
            <Button sx={{m: 1, minWidth: '200px'}} variant="contained" color="secondary"
                    type="submit">Сохранить</Button>
        </Box>
    )
}

export default Discounts