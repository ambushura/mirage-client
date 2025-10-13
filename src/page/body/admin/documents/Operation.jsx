import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import {useDispatch} from "react-redux"
import {closeModal} from "../../../../redux/interfaceReducer.js"

const Operation = ({props}) => {

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(closeModal())
    }

    return <Box
        id="modal-zbook"
        component="form"
        noValidate
        autoComplete="off"
        sx={{width: '920px'}}
        onSubmit={handleSubmit}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Операция по кассе
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
            <TextField
                label='Касса источник'
                variant='filled'
                fullWidth
                type='number'
                sx={{m: 1}}
                slotProps={{
                    input: {
                        min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                            <RemoveIcon/>
                        </InputAdornment>
                    }
                }}
            />
            <TextField
                label='Касса источник'
                variant='filled'
                fullWidth
                type='number'
                sx={{m: 1}}
                slotProps={{
                    input: {
                        min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                            <AddIcon/>
                        </InputAdornment>
                    }
                }}
            />
            <TextField
                label='Сумма'
                variant='filled'
                fullWidth
                type='number'
                sx={{m: 1}}
                slotProps={{input: {min: 0, step: 0.01}}}
            />
        </Box>
        <Box sx={{m: 1}}>
            <TextField
                label='Комментарий'
                variant='filled'
                fullWidth
                multiline
                rows={4}
            />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button fullWidth variant='contained' color='error' sx={{marginRight: 1}}>Удалить</Button>
            <Button fullWidth variant='contained' color='success'>Сохранить</Button>
        </Box>
        {props.uid}
    </Box>
}

export default Operation