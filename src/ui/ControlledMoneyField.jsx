import { TextField, Tooltip } from '@mui/material'
import { Controller } from 'react-hook-form'
import { tooltip_error } from './ThemeContext.jsx'

const formatMoney = (value) => {
    const num = parseFloat(value)
    if (isNaN(num)) return 0
    return parseFloat(num.toFixed(2))
}

const ControlledMoneyField = ({ control, name, label, rules, sx, readOnly = false, defaultValue = 0 }) => {
    const handleChange = (field) => (e) => {
        let val = e.target.value.replace(',', '.')
        if (!/^\d*\.?\d{0,2}$/.test(val)) return
        if (val.startsWith('.')) val = '0' + val
        field.onChange(val)
    }

    const handleBlur = (field) => () => {
        const value = field.value?.toString().replace(',', '.') || '0'
        const num = formatMoney(value)
        field.onChange(num)
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
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
                        value={field.value === null || field.value === undefined ? '' : field.value}
                        label={label}
                        variant="filled"
                        fullWidth
                        sx={{ marginBottom: '10px', ...sx }}
                        slotProps={{
                            input: { inputMode: 'decimal', style: { textAlign: 'right' } },
                        }}
                        inputProps={{
                            inputMode: 'decimal',
                            style: { textAlign: 'right' },
                            readOnly,
                        }}
                        error={!!fieldState.error}
                        onChange={handleChange(field)}
                        onBlur={handleBlur(field)}
                        readOnly={readOnly}
                    />
                </Tooltip>
            )}
        />
    )
}

export default ControlledMoneyField
