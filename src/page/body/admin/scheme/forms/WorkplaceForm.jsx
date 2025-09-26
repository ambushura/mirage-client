import {Box, FormGroup, TextField, Typography} from "@mui/material"

export function WorkplaceForm({props}) {
    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Рабочее место
        </Typography>
        <FormGroup sx={{display: 'flex', flexDirection: 'column', width: 'inherit'}}>
            <TextField variant='filled' label='Имя' value={props.label}
                       sx={{marginBottom: 1}}/>
            <Box sx={{
                marginBottom: 1,
                width: 'inherit',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <TextField variant='filled' sx={{flex: 3}} label='IP'/>
                <TextField variant='filled' sx={{flex: 1, marginLeft: 1}} label='PORT'/>
            </Box>
            <TextField variant='filled' label='MAC' sx={{marginBottom: 1}}/>
            <TextField variant='filled' label='Организация' sx={{marginBottom: 1}}/>
        </FormGroup>
    </Box>
}