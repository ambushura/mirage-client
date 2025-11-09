import {Box, Button, FormGroup, TextField, Typography} from "@mui/material"
import {useState} from "react"
import {
    ROUTE_EQUIPMENT_WORKPLACE_RESET,
    ROUTE_EQUIPMENT_WORKPLACE_TURN_OFF,
    ROUTE_EQUIPMENT_WORKPLACE_TURN_ON
} from "../../../../../service/fetch_routes.js"
import {equipment_action} from "../../../../../service/fetch_service.js"

export function WorkplaceForm({props}) {

    const [fast_commands, set_fast_commands] = useState([{
        id: 0, name: 'Включить', route: ROUTE_EQUIPMENT_WORKPLACE_TURN_ON, param: {}
    }, {id: 1, name: 'Перезагрузить', route: ROUTE_EQUIPMENT_WORKPLACE_RESET, param: {}}, {
        id: 2, name: 'Выключить', route: ROUTE_EQUIPMENT_WORKPLACE_TURN_OFF, param: {}
    }])

    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            {props.kiosk ? 'Киоск самообслуживания' : 'Рабочее место'}
        </Typography>
        <FormGroup sx={{display: 'flex', flexDirection: 'column', width: 'inherit'}}>
            <TextField variant='filled' label='Имя' value={props.label}
                       sx={{marginBottom: 1}}/>
        </FormGroup>
        <Box sx={{flex: 1, marginLeft: '5px', display: 'flex', flexDirection: 'column'}}>
            {fast_commands.map(el => {
                return <Button variant='outlined' color='secondary' sx={{marginBottom: '5px'}} fullWidth
                               key={el.id} onClick={() => {
                    dispatch(equipment_action(filial, el.route, el.param))
                }}>{el.name}</Button>
            })}
        </Box>
    </Box>
}