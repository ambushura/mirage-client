import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material"
import {useState} from "react"
import {useFetchDiscounts} from "../../hooks/fetching/useFetchDiscounts.js"
import {useDispatch, useSelector} from "react-redux"
import {applyDiscount} from "../../service/fetch_service.js"

const Discounts = () => {

    const dispatch = useDispatch()

    const [discounts, errors, loading] = useFetchDiscounts()

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)
    const pre_order = useSelector(state => state.orders.pre_order)

    const [discount_groups, set_discount_groups] = useState([{uid: '0', name: 'Группа 1'}, {
        uid: '1',
        name: 'Группа 2'
    }])

    const [current_group, set_current_group] = useState(null)
    const [current_discount, set_current_discount] = useState(null)

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
                            set_current_group(event.target.value)
                        }}
                        labelId="discounts-group-select-label"
                        id="discounts-group-select"
                        value={current_group}
                        label="Группа скидок"
                        variant='filled'>
                        {discount_groups.map(group_discount => <MenuItem sx={{color: 'black'}} key={group_discount.uid}
                                                                         value={group_discount.uid}>{group_discount.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant='filled' sx={{m: 1, minWidth: '200px'}}>
                    <InputLabel id="discounts-select-label">Скидка</InputLabel>
                    <Select
                        onChange={(event) => {
                            set_current_discount(event.target.value)
                        }}
                        labelId="discounts-select-label"
                        id="discounts-select"
                        value={current_discount}
                        label="Скидка"
                        variant='filled'>
                        {discounts !== null && discounts.map(discount => <MenuItem sx={{color: 'black'}}
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
                </FormControl>
                <TextField label='Комментарий' sx={{m: 1, minWidth: '200px'}} variant='filled' color="textSecondary"
                           multiline/>
            </Box>
            <Button sx={{m: 1, minWidth: '200px'}} variant="contained" color="secondary" onClick={() => {
                dispatch((applyDiscount(filial, wp, pre_order.uid, current_discount, ['24234', 'wff'])))
            }}>Сохранить</Button>
        </Box>
    )
}

export default Discounts