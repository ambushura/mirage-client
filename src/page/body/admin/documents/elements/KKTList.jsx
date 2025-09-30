import {FormControl, InputLabel, MenuItem, Select} from "@mui/material"

const KKTList = ({uid_kkt, set_uid_kkt, variant, sx}) => {
    return <FormControl fullWidth sx={sx}>
        <InputLabel id="kkt-select-label">Касса</InputLabel>
        <Select
            variant={variant}
            labelId="kkt-select-label"
            value={uid_kkt}
            onChange={(e) => set_uid_kkt(e.target.value)}
        >
            <MenuItem value="1">Касса 1</MenuItem>
            <MenuItem value="2">Касса 2</MenuItem>
            <MenuItem value="3">Касса 3</MenuItem>
        </Select>
    </FormControl>
}

export default KKTList