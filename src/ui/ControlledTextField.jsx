import { Controller } from 'react-hook-form'
import { TextField, Tooltip } from '@mui/material'
import { tooltip_error } from '../ui/ThemeContext.jsx'

const ControlledTextField = ({
    control,
    name,
    label,
    numeric = false,
    readOnly = false,
    rules = {},
    sx = {},
    multiline = false,
    rows,
    onChange: customOnChange,
}) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
            <Tooltip
                title={fieldState.error ? fieldState.error.message : ''}
                open={!!fieldState.error}
                placement="right-start"
                arrow
                slotProps={{ tooltip: tooltip_error }}
            >
                <TextField
                    {...field}
                    label={label}
                    variant="filled"
                    error={!!fieldState.error}
                    sx={{ marginBottom: '10px', ...sx }}
                    slotProps={{
                        inputMode: numeric ? 'numeric' : undefined,
                        pattern: numeric ? '[0-9]*' : undefined,
                        input: { readOnly },
                    }}
                    onChange={(e) => {
                        let val = e.target.value
                        if (numeric) val = val.replace(/\D/g, '')
                        if (customOnChange) customOnChange(e, val)
                        else field.onChange(val)
                    }}
                    multiline={multiline}
                    rows={rows}
                />
            </Tooltip>
        )}
    />
)

export default ControlledTextField
