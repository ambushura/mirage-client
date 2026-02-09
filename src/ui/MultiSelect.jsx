import React from 'react'
import {FormControl, IconButton, InputLabel, ListItemText, MenuItem, Select} from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear'
import Checkbox from "@mui/material/Checkbox"
import {useDispatch} from "react-redux"

const MultiSelect = ({label, items, items_selected, setValue, sx}) => {
    const dispatch = useDispatch()
    const allSelected = items.length === items_selected.length && items_selected.length > 0
    const handleChange = (e) => {
        const v = e.target.value
        if (v.includes('__ALL__')) {
            dispatch(setValue(items_selected.length === items.length ? [] : items.map(i => i.uid)))
            return
        }
        dispatch(setValue(v.filter(val => val !== '__ALL__')))
    }
    const clearAll = (e) => {
        e.stopPropagation()
        dispatch(setValue([]))
    }
    return <FormControl color="secondary" sx={sx}>
        <InputLabel>{label}</InputLabel>
        <Select
            multiple
            value={items_selected}
            label={label}
            onChange={handleChange}
            renderValue={(selected) => selected.length ? `Выбрано: ${selected.length}` : 'Не выбрано'}
            endAdornment={items_selected.length > 0 && <IconButton
                size="small"
                onClick={clearAll}
                sx={{mr: 1}}
            >
                <ClearIcon fontSize="small"/>
            </IconButton>}
            MenuProps={{
                PaperProps: {style: {maxHeight: 800}, className: 'center-scroll'},

            }}
            variant='outlined'
        >
            <MenuItem value="__ALL__">
                <Checkbox
                    color="secondary"
                    indeterminate={items_selected.length > 0 && !allSelected}
                    checked={allSelected}
                />
                <ListItemText primary="Все"/>
            </MenuItem>

            {items.map((item) => <MenuItem key={item.uid} value={item.uid}>
                <Checkbox
                    color="secondary"
                    checked={items_selected.includes(item.uid)}
                />
                <ListItemText primary={item.title}/>
            </MenuItem>)}
        </Select>
    </FormControl>
}

export default MultiSelect