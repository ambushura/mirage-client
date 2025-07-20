import {Box, Typography} from "@mui/material"

const SeanceSettings = (props) => {

    const p = props.props

    return (
        <Box>
            <Typography variant="h6" color="textSecondary" margin={1}>
                {p.action === 'new_seance' ? 'Новый сеанс' : 'Редактирование сеанса'}
            </Typography>
            <Box>Зал {p.name_hall}</Box>
            <Box>Начало: {p.beginning.format('HH:mm')}</Box>
            <Box>Начало: {p.ending.format('HH:mm')}</Box>
        </Box>
    )
}

export default SeanceSettings