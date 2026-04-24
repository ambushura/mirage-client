import {Button, ButtonGroup, DialogTitle, IconButton} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import SaveIcon from "@mui/icons-material/Save"
import {closeModal} from "../redux/interfaceReducer.js"
import CloseIcon from "@mui/icons-material/Close"
import {useDispatch} from "react-redux"

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

export function Footer() {
    return <ButtonGroup sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant='delete' startIcon={<DeleteForeverIcon/>}>Удалить</Button>
        <Button variant='copy' startIcon={<ContentCopyIcon/>}>Скопировать</Button>
        <Button variant='save' startIcon={<SaveIcon/>}>Сохранить</Button>
    </ButtonGroup>
}