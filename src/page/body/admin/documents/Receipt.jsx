import {Box, Button, Typography} from "@mui/material"

const Receipt = ({props}) => {

    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Чек
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button fullWidth variant='contained' color='secondary'>Сохранить</Button>
            <Button fullWidth variant='contained' color='error' sx={{marginLeft: 1}}>Удалить</Button>
        </Box>
    </Box>
}

export default Receipt