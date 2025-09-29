import {Box, Button, Typography} from "@mui/material"

const Slip = ({props}) => {
    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Слип
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button fullWidth variant='contained' color='secondary'>Сохранить</Button>
            <Button fullWidth variant='contained' color='error' sx={{marginLeft: 1}}>Удалить</Button>
        </Box>
    </Box>
}

export default Slip