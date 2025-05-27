import {Autocomplete, Box, TextField} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {
    setOrdersHorecaFiltersHallsSelect,
    setOrdersHorecaFiltersKitchenPointsSelect,
    setOrdersHorecaFiltersKitchenStateSelect,
    setOrdersHorecaFiltersStaffSelect,
    setOrdersHorecaFiltersStateSelect,
    setOrdersHorecaFiltersWorkPlacesSelect
} from "../../../redux/ordersReducer.js"

const HorecaFilters = () => {

    const dispatch = useDispatch()

    const staff_selected = useSelector(state => state.orders.orders_horeca_filters_staff_selected)
    const state_selected = useSelector(state => state.orders.orders_horeca_filters_state_selected)
    const halls_selected = useSelector(state => state.orders.orders_horeca_filters_halls_selected)
    const workplaces_selected = useSelector(state => state.orders.orders_horeca_filters_workplaces_selected)
    const kitchen_points_selected = useSelector(state => state.orders.orders_horeca_filters_kitchen_points_selected)
    const kitchen_state_selected = useSelector(state => state.orders.orders_horeca_filters_kitchen_state_selected)

    const filters_staff = useSelector(state => state.orders.orders_horeca_filters_staff)
    const filters_state = useSelector(state => state.orders.orders_horeca_filters_state)
    const filters_halls = useSelector(state => state.orders.orders_horeca_filters_halls)
    const filters_workplaces = useSelector(state => state.orders.orders_horeca_filters_workplaces)
    const filters_kitchen_points = useSelector(state => state.orders.orders_horeca_filters_kitchen_points)
    const filters_kitchen_state = useSelector(state => state.orders.orders_horeca_filters_kitchen_state)

    const tags = (size, multiply, limit_tags, id, options, label, placeholder, selected_uid = []) => {
        return (
            <Autocomplete
                onChange={(event, new_value) => {
                    switch (id) {
                        case 'orders-staff-tags':
                            dispatch(setOrdersHorecaFiltersStaffSelect(new_value))
                            break
                        case 'orders-state-tags':
                            dispatch(setOrdersHorecaFiltersStateSelect(new_value))
                            break
                        case 'orders-halls-tags':
                            dispatch(setOrdersHorecaFiltersHallsSelect(new_value))
                            break
                        case 'orders-workplaces-tags':
                            dispatch(setOrdersHorecaFiltersWorkPlacesSelect(new_value))
                            break
                        case 'orders-kitchen-points-tags':
                            dispatch(setOrdersHorecaFiltersKitchenPointsSelect(new_value))
                            break
                        case 'orders-kitchen-state-tags':
                            dispatch(setOrdersHorecaFiltersKitchenStateSelect(new_value))
                            break
                        default:
                            break
                    }
                }}
                value={selected_uid}
                noOptionsText={'Нет подходящих опций'}
                size={size}
                multiple={multiply}
                limitTags={limit_tags}
                id={id}
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                    <TextField sx={{width: '100%'}} variant='filled' {...params} label={label}
                               placeholder={placeholder}/>
                )}
                sx={{width: '100%', marginBottom: '4px'}}
            />
        )
    }

    return (
        <Box className='admin-orders-horeca-filial-filters'>
            {tags("large", true, 2, "orders-staff-tags", filters_staff, "Официанты", "Официанты", staff_selected)}
            {tags("large", true, 2, "orders-state-tags", filters_state, "Статусы заказа", "Статус", state_selected)}
            {tags("large", true, 2, "orders-halls-tags", filters_halls, "Залы", "Зал", halls_selected)}
            {tags("large", true, 2, "orders-workplaces-tags", filters_workplaces, "Рабочие места", "Рабочеем место", workplaces_selected)}
            {tags("large", true, 2, "orders-kitchen-points-tags", filters_kitchen_points, "Кухня", "Цех", kitchen_points_selected)}
            {tags("large", true, 2, "orders-kitchen-state-tags", filters_kitchen_state, "Готовность", "Статус", kitchen_state_selected)}
        </Box>
    )
}

export default HorecaFilters