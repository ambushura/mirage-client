import {Box, Button, ButtonGroup, DialogTitle, IconButton, Skeleton} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import SaveIcon from "@mui/icons-material/Save"
import {closeModal} from "../redux/interfaceReducer.js"
import CloseIcon from "@mui/icons-material/Close"
import {useDispatch} from "react-redux"
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

export function TableToolbar({onAdd, onDelete}) {
    return <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper'
    }}>
        <Button onClick={onAdd} variant="tb_add" size="small" startIcon={<AddIcon/>}>Добавить</Button>
        <Button onClick={onDelete} variant="tb_delete" size="small" startIcon={<RemoveIcon/>}>Удалить</Button>
    </Box>
}