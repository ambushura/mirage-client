import {Box, FormControlLabel, FormGroup, Switch, Typography} from "@mui/material"

export function FilialForm({props}) {

    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Филиал <strong>{props.label}</strong>
        </Typography>
        <FormGroup sx={{marginBottom: 1, display: 'flex', flexDirection: 'row', width: 'inherit'}}>
            <FormControlLabel checked={false} control={<Switch/>} label="Программа обновляется"/>
            <FormControlLabel checked={false} control={<Switch/>} label="Не принимать заказы с сайта"/>
            <FormControlLabel checked={false} control={<Switch/>} label="Не принимать заказы с киосков"/>
            <FormControlLabel checked={false} control={<Switch/>} label="Не принимать заказы с рабочих мест"/>
        </FormGroup>
    </Box>
}