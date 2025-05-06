import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material"
import {useState} from "react"

const Discounts = () => {

    const [discount_groups, set_discount_groups] = useState([{uid: '0', name: 'Группа 1'}, {
        uid: '1',
        name: 'Группа 2'
    }])
    const [discounts, set_discounts] = useState([{uid: '0', name: 'Скидка 1'}, {uid: '1', name: 'Скидка 2'}])
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
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
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
                        {discounts.map(discount => <MenuItem sx={{color: 'black'}} key={discount.uid}
                                                             value={discount.uid}>{discount.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Discounts