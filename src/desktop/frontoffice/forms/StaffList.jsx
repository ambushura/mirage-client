import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { horeca_order_change_creator } from '../../../service/fetch_service.js'
import { closeModal } from '../../../redux/frontoffice/interfaceReducer.js'
import { addNotification } from '../../../redux/frontoffice/notifierReducer.js'
import LazySelect from '../../../ui/LazySelect.jsx'

const StaffList = ({ props }) => {
    const dispatch = useDispatch()
    const filial = useSelector((state) => state.data.filial)
    const [current_uid_staff, set_current_uid_staff] = useState('')

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={(e) => {
                e.preventDefault()
                if (!props?.uid_order || !current_uid_staff) {
                    dispatch(
                        addNotification({
                            message: 'Заказ и имя сотрудника должны быть заполнены',
                            severity: 'error',
                            autoHide: true,
                        })
                    )
                    return
                }
                dispatch(horeca_order_change_creator(filial, props.uid_order, current_uid_staff, props.ver))
                dispatch(closeModal())
            }}
        >
            <Typography variant="h6" color="textSecondary" margin={1}>
                Новый автор заказа
            </Typography>
            <LazySelect
                variant="filled"
                sx={{ marginBottom: '10px', maxWidth: '210px' }}
                label="Сотрудник"
                value={current_uid_staff || ''}
                type="staff"
                filial={filial}
                onChange={(uid, extra) => {
                    set_current_uid_staff(uid)
                }}
                getLabel={(item) => `${item.title}`}
            />
            <Button sx={{ marginTop: '4px' }} variant="contained" color="secondary" type="submit">
                Сохранить
            </Button>
        </Box>
    )
}

export default StaffList
