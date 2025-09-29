import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material"

const OrganizationsList = ({uid_organization, set_uid_organization, variant}) => {
    return <Box>
        <FormControl fullWidth size="medium">
            <InputLabel id="organization-select-label">Организация</InputLabel>
            <Select
                variant={variant}
                sx={{m: 1}}
                labelId="organization-select-label"
                value={uid_organization}
                onChange={(e) => set_uid_organization(e.target.value)}
            >
                <MenuItem value="1">Организация 1</MenuItem>
                <MenuItem value="2">Организация 2</MenuItem>
                <MenuItem value="3">Организация 3</MenuItem>
            </Select>
        </FormControl>
    </Box>
}

export default OrganizationsList