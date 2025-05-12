import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material"
import {useState} from "react"
import {useFetchDiscounts} from "../../hooks/fetching/useFetchDiscounts.js"
import {useDispatch, useSelector} from "react-redux"
import {applyDiscount} from "../../service/fetch_service.js"
import {closeModal} from "../../redux/interfaceReducer.js"

const Discounts = () => {

    const dispatch = useDispatch()

    const {discounts, discounts_groups} = useFetchDiscounts()

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)
    const pre_order = useSelector(state => state.orders.pre_order)

    const [uid_group_discount, set_uid_group_discount] = useState(null)
    const [uid_discount, set_uid_discount] = useState(null)
    const [comment, set_comment] = useState(null)

    return (
        <Box component="form"
             noValidate
             autoComplete="off"
             sx={{minWidth: '200px', display: 'flex', flexDirection: 'column'}}>
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
                        {discounts_groups[0] !== null ? discounts_groups[0].map(discount_group => <MenuItem sx={{color: 'black'}} key={discount_group.uid}
                                                                         value={discount_group.uid}>{discount_group.name}</MenuItem>) : null}
                    </Select>
                </FormControl>
                <FormControl variant='filled' sx={{m: 1, minWidth: '200px'}}>
                    <InputLabel id="discounts-select-label">Скидка</InputLabel>
                    <Select
                        onChange={(event) => {
                            set_uid_discount(event.target.value)
                        }}
                        labelId="discounts-select-label"
                        id="discounts-select"
                        value={uid_discount}
                        label="Скидка"
                        variant='filled'>
                        {discounts[0] !== null ? discounts[0].map(discount => <MenuItem sx={{color: 'black'}}
                                                                                   key={discount.uid}
                                                                                   value={discount.uid}>{discount.name}
                            <span style={{
                                padding: '4px 8px',
                                borderRadius: '8px',
                                marginLeft: '4px',
                                backgroundColor: '#EEEEEE',
                                fontWeight: 'bold'
                            }}>{discount.value} {discount.fix ? 'р' : '%'}</span></MenuItem>) : null}
                    </Select>
                </FormControl>
                <TextField label='Комментарий' sx={{m: 1, minWidth: '200px'}} variant='filled' color="textSecondary"
                           multiline value={comment} onChange={(event) => {
                               set_comment(event.target.value)
                }}/>
            </Box>
            <Button sx={{m: 1, minWidth: '200px'}} variant="contained" color="secondary" onClick={() => {
                dispatch((applyDiscount(filial, wp, pre_order.uid, uid_discount, uid_group_discount, comment, [])))
                dispatch(closeModal())
            }}>Сохранить</Button>
        </Box>
    )
    }

export default Discounts