import {Box, Button, TextField, Typography} from "@mui/material"
import PhoneInput from "./PhoneInput.jsx"

const CommentOrder = () => {
    return (
        <Box>
            <Typography variant="h6" color="textSecondary" margin={1}>
                Комментарий к заказу
            </Typography>
            <Box component="form" autoComplete="off" sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}>
                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    <TextField variant='filled' label='Фамилия' margin='dense'/>
                    <TextField variant='filled' label='Имя' margin="dense"/>
                    <TextField variant='filled' label='Отчество' margin="dense"/>
                </Box>
                <Box>
                    <TextField variant='filled' label='e-mail' margin="dense" type="email"/>
                    <PhoneInput/>
                </Box>
            </Box>
            <Box>
                <TextField sx={{width: '100%'}} label='Комментарий' color='secondary' margin='dense' focused autoFocus multiline/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button variant='contained' color='secondary'>Сохранить</Button>
            </Box>
        </Box>
    )
}

export default CommentOrder