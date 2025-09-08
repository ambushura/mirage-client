import {Box, Button, Typography} from "@mui/material"
import {SelectMenu} from "../../ui/SelectMenu.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {common_list_get, horeca_order_change_creator} from "../../service/fetch_service.js"
import {setStaffList} from "../../redux/ordersReducer.js"
import {closeModal} from "../../redux/interfaceReducer.js"
import {addNotification} from "../../redux/notifierReducer.js"

const StaffList = ({props}) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const staff_list = useSelector(state => state.orders.staff_list)
    const [current_uid_staff, set_current_uid_staff] = useState('')

    useEffect(() => {
        const fetch = async () => {
            const fetching_result_staff_list = await dispatch(common_list_get(filial, 'staff'))
            if (fetching_result_staff_list.loading) {
                // TODO Крутилка
            }
        }
        dispatch(setStaffList([]))
        fetch()
        return () => dispatch(setStaffList([]))
    }, [dispatch, filial])

    return <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{display: 'flex', flexDirection: 'column'}}
        onSubmit={(e) => {
            e.preventDefault()
            if (!props?.uid_order || !current_uid_staff) {
                dispatch(addNotification({
                    message: "Заказ и имя сотрудника должны быть заполнены", severity: 'error', autoHide: true
                }))
                return
            }
            dispatch(horeca_order_change_creator(filial, props.uid_order, current_uid_staff))
            dispatch(closeModal())
        }}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Автор заказа
        </Typography>
        <SelectMenu
            type={'staff-list'}
            list={staff_list}
            current_value={current_uid_staff}
            width={230}
            action={set_current_uid_staff}
        />
        <Button sx={{marginTop: '4px'}} variant="contained" color="secondary"
                type="submit">Сохранить</Button>
    </Box>
}

export default StaffList