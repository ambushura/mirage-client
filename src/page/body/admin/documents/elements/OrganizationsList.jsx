import {FormControl, InputLabel, MenuItem, Select} from "@mui/material"

const OrganizationsList = ({uid_organization, set_uid_organization, variant, sx}) => {
    return <FormControl fullWidth sx={sx}>
        <InputLabel id="organization-select-label">Организация</InputLabel>
        <Select
            variant={variant}
            labelId="organization-select-label"
            value={uid_organization}
            onChange={(e) => set_uid_organization(e.target.value)}
        >
            <MenuItem value="1">Организация 1</MenuItem>
            <MenuItem value="2">Организация 2</MenuItem>
            <MenuItem value="3">Организация 3</MenuItem>
        </Select>
    </FormControl>
}

export default OrganizationsList