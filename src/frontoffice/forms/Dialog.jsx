import {
    Box,
    Button,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import {
    cinema_order_delete,
    common_documents_operation_delete,
    common_documents_receipt_delete,
    common_documents_z_book_delete,
    horeca_order_delete,
} from '../../service/fetch_service.js'
import {closeModal} from '../../redux/interfaceReducer.js'
import {useDispatch} from 'react-redux'
import {NEW_EMPTY_HORDER, NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder,} from '../../redux/ordersReducer.js'
import {setOperationsUpdate, setReceiptsUpdated, setZBooksUpdate,} from '../../redux/documentsReducer.js'

const Dialog = ({props}) => {
    const dispatch = useDispatch()

    const handleYes = () => {
        switch (props.action) {
            case 'reboot':
                break
            case 'shutdown':
                break
            case 'cinema_order_delete':
                dispatch(cinema_order_delete(props.payload.filial, props.payload.uid, props.payload.ver))
                break
            case 'horeca_order_delete':
                dispatch(horeca_order_delete(props.payload.filial, props.payload.uid, props.payload.ver))
                break
            case 'cinema_order_save':
                dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                break
            case 'horeca_order_save':
                dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
                break
            case 'dialog_delete_receipts':
                dispatch(common_documents_receipt_delete(props.filial, props.uid))
                dispatch(setReceiptsUpdated())
                break
            case 'dialog_delete_z_book':
                dispatch(common_documents_z_book_delete(props.filial, props.uid))
                dispatch(setZBooksUpdate())
                break
            case 'dialog_delete_operation':
                dispatch(common_documents_operation_delete(props.filial, props.uid))
                dispatch(setOperationsUpdate())
                break
            default:
                break
        }
        dispatch(closeModal())
    }

    const handleNo = () => {
        dispatch(closeModal())
    }

    switch (props.type) {
        case 'YesNo':
            return (
                <MuiDialog
                    open={true}
                    onClose={handleNo}
                    aria-labelledby="confirm-dialog-title"
                    maxWidth="xk"
                >
                    <DialogTitle id="confirm-dialog-title">Подтвердите</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{props.question}</DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{px: 3, pb: 2}}>
                        <Button
                            sx={{minWidth: '70px'}}
                            onClick={handleYes}
                            variant="contained"
                            color="secondary"
                        >
                            Да
                        </Button>
                        <Button
                            sx={{minWidth: '70px'}}
                            onClick={handleNo}
                            variant="contained"
                            color="secondary"
                        >
                            Нет
                        </Button>
                    </DialogActions>
                </MuiDialog>
            )
        case 'No':
            return <Box/>
        default:
            return null
    }
}

export default Dialog
