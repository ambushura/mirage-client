import {Controller} from "react-hook-form"
import {FormControlLabel, Switch} from "@mui/material"

const ControlledFieldSwitch = ({
                                   control, name, label, color = "secondary", sx = {}
                               }) => {
    return <Controller
        name={name}
        control={control}
        render={({field}) => <FormControlLabel
            sx={sx}
            label={label}
            control={<Switch
                color={color}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
            />}
        />}
    />
}

export default ControlledFieldSwitch