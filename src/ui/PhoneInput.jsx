import {IconButton, InputAdornment, TextField} from '@mui/material'
import {IMaskInput} from 'react-imask'
import {forwardRef} from 'react'
import CloseIcon from '@mui/icons-material/Close'

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props
    return (
        <IMaskInput
            {...other}
            mask="70000000000"
            overwrite
            unmask={false}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
    />
    )
})

export default function PhoneInput({value, set_value, clear_value}) {
    return (
        <TextField
            label="Телефон"
            variant="filled"
            fullWidth
            value={value}
            onChange={(event) => set_value(event.target.value)}
            sx={{marginBottom: '4px'}}
            InputProps={{
                inputComponent: TextMaskCustom,
                endAdornment: value && (
                    <InputAdornment position="end">
                        <IconButton onClick={clear_value} edge="end">
                            <CloseIcon/>
                        </IconButton>
                    </InputAdornment>
                ),
            }}
    />
    )
}
