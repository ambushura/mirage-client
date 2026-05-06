import {Controller} from 'react-hook-form'
import {Tooltip} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import {tooltip_error} from '../ui/ThemeContext.jsx'

const ControlledDatePicker = ({control, name, label, rules = {}, sx = {}}) => (
    <Controller
    name={name}
    control={control}
    rules={rules}
    render={({field, fieldState}) => (
        <Tooltip
        title={fieldState.error ? fieldState.error.message : ''}
        open={!!fieldState.error}
        placement="right-start"
        arrow
        slotProps={{tooltip: tooltip_error}}
        >
        <DatePicker
            {...field}
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={(val) => field.onChange(val ? val.toISOString() : null)}
            slotProps={{
                textField: {
                    variant: 'filled',
                    error: !!fieldState.error,
                    sx: {mb: 1, ...sx},
                    fullWidth: true,
                },
            }}
        />
        </Tooltip>
    )}
    />
)

export default ControlledDatePicker
