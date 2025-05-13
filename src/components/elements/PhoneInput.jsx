import {TextField} from "@mui/material"
import {IMaskInput} from "react-imask"
import React from "react"

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props
    return (
        <IMaskInput
            {...other}
            mask="+7 (000) 000-00-00"
            overwrite
            unmask={false}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
        />
    )
})

export default function PhoneInput({value, set_value}) {
    return (
        <TextField
            label="Телефон"
            variant="filled"
            fullWidth
            value={value}
            onChange={(event) => set_value(event.target.value)}
            InputProps={{
                inputComponent: TextMaskCustom
            }}
        />
    )
}