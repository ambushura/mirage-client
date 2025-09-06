import {FormControl, IconButton, InputLabel, MenuItem, Select} from "@mui/material"
import {setCurrentKKT, setCurrentPinpad} from "../redux/documentsReducer.js"
import ClearIcon from "@mui/icons-material/Clear"
import {useDispatch} from "react-redux"

export const SelectMenu = ({type, list, current_value, width, action}) => {

    const dispatch = useDispatch()

    return <FormControl variant="filled" sx={{minWidth: width}}>
        <InputLabel
            id="list-select-label">{type === 'zbooks-kkt' ? 'Касса' : type === 'zbooks-pinpad' ? 'Пинпад' : type === 'staff' ? 'Сотрудник' : null}</InputLabel>
        <Select
            value={current_value || ''}
            onChange={(e) => {
                switch (type) {
                    case "zbooks-kkt":
                        dispatch(setCurrentKKT(e.target.value))
                        break
                    case "zbooks-pinpad":
                        dispatch(setCurrentPinpad(e.target.value))
                        break
                    case 'staff-list':
                        action(e.target.value)
                        break
                }
            }}
            sx={{'& .MuiSelect-icon': {right: 32}}}
            endAdornment={current_value && (<IconButton
                size="small"
                onClick={(e) => {
                    e.stopPropagation()
                    switch (type) {
                        case "zbooks-kkt":
                            dispatch(setCurrentKKT(''))
                            break
                        case "zbooks-pinpad":
                            dispatch(setCurrentPinpad(''))
                            break
                        case 'staff-list':
                            action('')
                            break
                    }
                }}
                sx={{position: "absolute", right: 4}}>
                <ClearIcon/>
            </IconButton>)}
            variant='filled'>
            {list.map(element => <MenuItem key={element.uid} value={element.uid}>{element.title}</MenuItem>)}
        </Select>
    </FormControl>
}