import Hall from "../halls/Hall.jsx"
import {useSetHall} from "../../page/body/admin/halls/useSetHall.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material"
import {useSetHalls} from "../../page/body/admin/halls/useSetHalls.js"

export default function TableOptions({props}) {

    const dispatch = useDispatch()

    const [uid_hall, set_uid_hall] = useState(null)
    const [hall, set_hall] = useState(null)

    const halls = useSetHalls()
    const hallN = useSetHall(uid_hall)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    useEffect(() => {
        if (hallN !== null) {
            set_hall(hallN)
        }
    }, [dispatch, hallN])

    return <Box sx={{display: "flex", flexDirection: "column"}}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Схемы залов
        </Typography>
        <FormControl variant='filled' sx={{m: 1, minWidth: '200px'}}>
            <InputLabel id="halls-select-label">Место гостя</InputLabel>
            <Select
                onChange={(event) => {
                    set_uid_hall(event.target.value)
                }}
                labelId="halls-select-label"
                id="halls-select"
                value={uid_hall !== null ? uid_hall : null}
                label="Залы"
                variant='filled'>
                {halls !== null ? halls.map(hall => <MenuItem
                    sx={{color: 'black'}} key={hall.uid}
                    value={hall.uid}>{hall.title}</MenuItem>) : null}
            </Select>
        </FormControl>
        <Box sx={{width: '600px', height: '600px'}}>
            {hall !== null ? <Hall
                uid_hall={hall.uid}
                city={city}
                filial={filial}
                pre_order={null}
                hall={hall}
                seance={null}
                width={600}
                booking={[]}
            /> : null}
        </Box>
    </Box>
}