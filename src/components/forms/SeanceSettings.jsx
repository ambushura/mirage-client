import {Box, Typography} from "@mui/material"

const SeanceSettings = (props) => {

    const p = props.props

    return (
        <Box>
            <Typography variant="h6" color="textSecondary" margin={1}>
                {p.action === 'new_seance' ? 'Новый сеанс' : 'Редактирование сеанса'}
            </Typography>
            <Box>Зал {p.name_hall}</Box>
            <Box>Начало: {p.beginning !== null ? p.beginning.format('HH:mm') : '07:00'}</Box>
            <Box>Начало: {p.ending !== null ? p.ending.format('HH:mm') : '07:00'}</Box>
        </Box>
    )
}

export default SeanceSettings