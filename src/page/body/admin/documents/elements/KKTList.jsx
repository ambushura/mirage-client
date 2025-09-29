import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material"

const KKTList = ({uid_kkt, set_uid_kkt}) => {
    return <Box>
        <FormControl fullWidth size='medium'>
            <InputLabel id="kkt-select-label">Касса</InputLabel>
            <Select
                sx={{m: 1}}
                variant='filled'
                labelId="kkt-select-label"
                value={uid_kkt}
                onChange={(e) => set_uid_kkt(e.target.value)}
            >
                <MenuItem value="1">Касса 1</MenuItem>
                <MenuItem value="2">Касса 2</MenuItem>
                <MenuItem value="3">Касса 3</MenuItem>
            </Select>
        </FormControl>
    </Box>
}

export default KKTList