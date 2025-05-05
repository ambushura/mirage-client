import { useForm, Controller } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import TextField from '@mui/material/TextField'
import React from 'react'

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props
    return (
        <IMaskInput
            {...other}
            mask="+7 (000) 000-00-00"
            overwrite
            unmask={false}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
        />
    )
})

export default function PhoneInput() {
    const {control} = useForm()
    return (
        <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({field}) => (
                <TextField
                    {...field}
                    label="Телефон"
                    variant="filled"
                    fullWidth
                    InputProps={{
                        inputComponent: TextMaskCustom
                    }}
                />
            )}
        />
    )
}