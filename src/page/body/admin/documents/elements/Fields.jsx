import {DatePicker, DateTimePicker} from "@mui/x-date-pickers"
import dayjs from "dayjs"
import "dayjs/locale/ru"
import {Checkbox, FormControlLabel, Switch, TextField} from "@mui/material"

dayjs.locale("ru")

export const DateField = ({label, value, onChange, sx, variant}) => <DatePicker
    label={label}
    value={value ? dayjs(value) : null}
    onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
    variant={variant}
    sx={sx}/>

export const DateTimeField = ({label, value, onChange, sx, variant}) => <DateTimePicker
    label={label}
    value={value ? dayjs(value) : null}
    onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
    variant={variant}
    sx={sx}/>

export const MoneyField = ({label, value, onChange, sx, variant}) => <TextField
    label={label}
    type="number"
    fullWidth
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    variant={variant}
    sx={sx}
    InputProps={{
        inputProps: {min: 0, step: 0.01},
    }}/>

export const NumberField = ({label, value, onChange, sx, variant}) => <TextField
    label={label}
    type="number"
    fullWidth
    value={value}
    variant={variant}
    sx={sx}
    onChange={(e) => onChange(Number(e.target.value))}/>

export const BooleanCheckbox = ({label, value, onChange, sx, variant}) => <FormControlLabel
    control={<Checkbox
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
    />}
    label={label}
    variant={variant}
    sx={sx}/>

export const BooleanSwitch = ({label, value, onChange, sx, variant}) => <FormControlLabel
    control={<Switch
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
    />}
    label={label}
    variant={variant}
    sx={sx}/>

export const TextFieldString = ({label, value, onChange, sx, variant}) => <TextField
    label={label}
    fullWidth
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    variant={variant}
    sx={sx}
/>