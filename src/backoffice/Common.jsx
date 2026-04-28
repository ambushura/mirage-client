import {Box, Button, ButtonGroup, DialogTitle, IconButton, Skeleton} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import SaveIcon from "@mui/icons-material/Save"
import {closeModal} from "../redux/interfaceReducer.js"
import CloseIcon from "@mui/icons-material/Close"
import {useDispatch} from "react-redux"
import ControlledDateTimePicker from "../ui/ControlledDateTimePicker.jsx"
import ControlledTextField from "../ui/ControlledTextField.jsx"

export function Title({title}) {
    const dispatch = useDispatch()
    return <DialogTitle sx={{m: 0, p: '10px'}}>
        {title}
        <IconButton
            aria-label="close"
            onClick={() => {
                dispatch(closeModal())
            }}
            sx={{position: "absolute", right: 8, top: 8}}>
            <CloseIcon/>
        </IconButton>
    </DialogTitle>
}

export function Footer({control, saveButton, copyButton, deleteButton}) {
    return <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {[{f: 'date_create', n: 'Создан'}, {f: 'date_change', n: 'Изменен'}].map((el, i) =>
                <ControlledDateTimePicker
                    key={i}
                    readOnly={true}
                    control={control}
                    name={el.f}
                    label={el.n}
                    sx={{maxWidth: '190px', mr: '10px'}}
                />)}
            <ControlledTextField
                control={control}
                name={'name_creator'}
                label={'Автор'}
                multiline
                sx={{maxWidth: '150px', mr: '10px'}}
            />
        </Box>
        <ButtonGroup
            sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap'}}>
            {deleteButton && <Button variant='delete' startIcon={<DeleteForeverIcon/>}>Удалить</Button>}
            {copyButton && <Button variant='copy' startIcon={<ContentCopyIcon/>}>Скопировать</Button>}
            {saveButton && <Button variant='save' startIcon={<SaveIcon/>}>Сохранить</Button>}
        </ButtonGroup>
    </Box>
}

export function LoaderOrder() {
    return <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', p: 2}}>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10}/>
    </Box>
}