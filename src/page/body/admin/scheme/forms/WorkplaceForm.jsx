import {Box, FormGroup, TextField, Typography} from "@mui/material"

export function WorkplaceForm({props}) {
    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            {props.kiosk ? 'Киоск самообслуживания' : 'Рабочее место'}
        </Typography>
        <FormGroup sx={{display: 'flex', flexDirection: 'column', width: 'inherit'}}>
            <TextField variant='filled' label='Имя' value={props.label}
                       sx={{marginBottom: 1}}/>
        </FormGroup>
    </Box>
}