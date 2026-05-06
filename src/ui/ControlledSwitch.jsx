import { Controller } from 'react-hook-form'
import { FormControlLabel, Switch, Tooltip } from '@mui/material'
import { tooltip_error } from './ThemeContext.jsx'

const ControlledSwitch = ({ control, name, label, rules = {}, color = 'secondary', sx = {} }) => (
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
                <FormControlLabel
                    sx={sx}
                    control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} color={color} />}
                    label={label}
                />
            </Tooltip>
        )}
    />
)

export default ControlledSwitch
