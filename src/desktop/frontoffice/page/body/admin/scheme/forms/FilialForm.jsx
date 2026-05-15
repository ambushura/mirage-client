import { Box, Button, FormGroup, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { equipment_candy_state_get } from '../../../../../../../service/fetch_service.js'
import { setCandy } from '../../../../../../../redux/frontoffice/dataReducer.js'
import dayjs from 'dayjs'

export function FilialForm({ props }) {
    const dispatch = useDispatch()

    const { filial, candy } = useSelector((state) => state.data)
    const [candy_update, set_candy_update] = useState(0)

    useEffect(() => {
        dispatch(setCandy({ wp: null, candy: null }))
        dispatch(equipment_candy_state_get(filial))
    }, [candy_update])

    return (
        <Box>
            <Typography variant="h6" color="textSecondary" margin={1}>
                Филиал <strong>{props.label}</strong>
            </Typography>
            <FormGroup
                sx={{
                    marginBottom: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'inherit',
                    color: 'black',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    <Typography variant="h8" color="textSecondary">
                        Конфета
                    </Typography>
                    <Box sx={{ fontSize: '80%' }}>{candy.wp !== null && 'Рабочее место: ' + candy.wp}</Box>
                    <Box sx={{ fontSize: '80%' }}>
                        {candy.candy !== null && 'Последнее обращение: ' + dayjs(candy.candy).format('YY:MM:DD HH:mm:ss')}
                    </Box>
                    <Box sx={{ fontSize: '80%' }}>{candy.wp === null && 'Рабочее место: не обнаружено'}</Box>
                    <Box
                        sx={{
                            fontSize: '80%',
                            marginBottom: '4px',
                        }}
                    >
                        {candy.candy === null && 'Последнее обращение: не обнаружено'}
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            set_candy_update((prev) => (prev += 1))
                        }}
                    >
                        Проверить состояние конфеты
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h8" color="textSecondary">
                        Смена сети
                    </Typography>
                    <Button variant="contained" color="secondary">
                        Закрыть на всех устройствах
                    </Button>
                </Box>
            </FormGroup>
        </Box>
    )
}
