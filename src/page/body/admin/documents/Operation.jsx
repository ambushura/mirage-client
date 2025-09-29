import {Box, Button, Typography} from "@mui/material"

const Operation = ({props}) => {
    return (
        <Box>
            <Typography variant="h6" color="textSecondary" margin={1}>
                Операция
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Button fullWidth variant='contained' color='secondary'>Сохранить</Button>
                <Button fullWidth variant='contained' color='error' sx={{marginLeft: 1}}>Удалить</Button>
            </Box>
            {props.uid}
        </Box>
    )
}

export default Operation