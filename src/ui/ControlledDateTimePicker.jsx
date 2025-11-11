import {Controller} from "react-hook-form"
import {Tooltip} from "@mui/material"
import {DateTimePicker} from "@mui/x-date-pickers"
import dayjs from "dayjs"
import {tooltip_error} from "../ui/ThemeContext.jsx"

const ControlledDateTimePicker = ({control, name, label, rules = {}, sx = {}}) => <Controller
    name={name}
    control={control}
    rules={rules}
    render={({field, fieldState}) => <Tooltip
        title={fieldState.error ? fieldState.error.message : ''}
        open={!!fieldState.error}
        placement="right-start"
        arrow
        slotProps={{tooltip: tooltip_error}}
    >
        <span>
        <DateTimePicker
            {...field}
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={(val) => field.onChange(val ? val.toISOString() : null)}
            slotProps={{
                textField: {
                    variant: 'filled', error: !!fieldState.error, fullWidth: true, sx: {mb: 1, ...sx}
                },
            }}
            format="DD.MM.YYYY HH:mm"
            ampm={false}
        />
        </span>
    </Tooltip>}
/>

export default ControlledDateTimePicker