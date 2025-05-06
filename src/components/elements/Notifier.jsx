import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, Alert } from '@mui/material'
import {removeNotification} from "../../redux/notifierReducer.js"

const Notifier = () => {
    const notifications = useSelector(state => state.notifier.notifications)
    const dispatch = useDispatch()
    return (
        <>
            {notifications.map(({id, message, severity, autoHide}, index) => (
                <Snackbar
                    key={id}
                    open={true}
                    autoHideDuration={autoHide ? 10000 : null}
                    onClose={(event, reason) => {
                        if (reason !== 'clickaway') {
                            dispatch(removeNotification(id))
                        }
                    }}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    sx={{marginBottom: `${index * 60 + 16}px`}}>
                    <Alert
                        onClose={() => dispatch(removeNotification(id))}
                        severity={severity}
                        variant="filled">
                        {message}
                    </Alert>
                </Snackbar>
            ))}
        </>
    )
}

export default Notifier