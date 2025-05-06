import {Box, Button, TextField} from "@mui/material"

const Comment = () => {
    return (
        <Box component='form' display="flex" flexDirection="row" gap={1} id="modal-comment">
            <TextField label="Комментарий" variant="filled" color="secondary" focused autoFocus multiline/>
            <Button variant='contained' color='secondary'>Сохранить</Button>
        </Box>
    )
}
export default Comment