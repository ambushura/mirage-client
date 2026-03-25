import Hall from "../components/halls/Hall.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material"
import {cinema_hall_get, common_orders_filters_halls_get} from "../../service/fetch_service.js"

export default function TableOptions() {

    const dispatch = useDispatch()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)

    const [halls, set_halls] = useState([])
    const [uid_hall, set_uid_hall] = useState('')
    const [hall, set_hall] = useState(null)
    const [booking, set_booking] = useState([])

    const horder = useSelector(state => state.orders.horder)

    useEffect(() => {
        const fetch_halls = async () => {
            const fetching_result = await dispatch(common_orders_filters_halls_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                set_halls(fetching_result.data)
            }
        }
        if (filial !== undefined) {
            fetch_halls()
        }
    }, [dispatch, filial])

    useEffect(() => {
        const fetch_hall = async () => {
            const fetching_result = await dispatch(cinema_hall_get(filial, uid_hall, 'horeca'))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                set_hall(fetching_result.data)
            }
        }
        if (filial !== undefined && uid_hall !== '') {
            fetch_hall()
        }
    }, [dispatch, filial, uid_hall])

    useEffect(() => {
        if (halls !== null && halls.length > 0 && halls.find(hall => hall.uid === horder.uid_hall) !== undefined && horder.uid_hall !== null) {
            set_uid_hall(horder.uid_hall)
            set_booking([{site: null, state: 3, uid_place: horder.uid_place}])
        }
    }, [halls, horder.uid_hall, horder.uid_place])

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
                value={uid_hall !== null ? uid_hall : ''}
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
                horder={horder}
                hall={hall}
                seance={null}
                width={600}
                booking={booking}
            /> : null}
        </Box>
    </Box>
}