import {Controller} from "react-hook-form"
import {Box, Tooltip} from "@mui/material"
import LazySelect from "../ui/LazySelect.jsx"
import {tooltip_error} from "../ui/ThemeContext.jsx"

const ControlledLazySelect = ({
                                  control,
                                  name,
                                  label,
                                  type,
                                  filial,
                                  onChange,
                                  rules = {},
                                  optionsStatic,
                                  extraFields,
                                  getLabel,
                                  sx = {},
                              }) => <Controller
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
        <Box sx={{position: "relative"}}>
            <LazySelect
                {...field}
                label={label}
                variant="filled"
                sx={{
                    marginBottom: '10px', "& .MuiFilledInput-root": fieldState.error ? {
                        borderBottom: "2px solid #d32f2f", borderRadius: "4px 4px 0 0"
                    } : {}, ...sx,
                }}
                value={field.value || ''}
                type={type}
                filial={filial}
                getLabel={getLabel || ((item) => item.title)}
                onChange={(uid, extra) => {
                    field.onChange(uid)
                    if (onChange) onChange(uid, extra)
                }}
                optionsStatic={optionsStatic}
                extraFields={extraFields}
                error={!!fieldState.error}
            />
        </Box>
    </Tooltip>}
/>

export default ControlledLazySelect