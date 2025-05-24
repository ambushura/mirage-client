import {Autocomplete, Box, Pagination, TextField} from "@mui/material"
import {useSetOrdersHoreca} from "../../../../hooks/pages/useSetOrdersHoreca.js"
import {useDispatch, useSelector} from "react-redux"
import OrderFood from "./OrderFood.jsx"
import {useSetOrdersHorecaFilters} from "../../../../hooks/pages/useSetOrdersHorecaFilters.jsx"
import {
    setOrdersHorecaFiltersHallsSelect,
    setOrdersHorecaFiltersKitchenPointsSelect,
    setOrdersHorecaFiltersKitchenStateSelect,
    setOrdersHorecaFiltersStaffSelect,
    setOrdersHorecaFiltersStateSelect,
    setOrdersHorecaFiltersWorkPlacesSelect, setOrdersHorecaOffset
} from "../../../../redux/ordersReducer.js"

const OrdersHoreca = () => {

    const dispatch = useDispatch()

    useSetOrdersHoreca()
    useSetOrdersHorecaFilters()

    const orders = useSelector(state => state.orders.orders_horeca)
    const filters_staff = useSelector(state => state.orders.orders_horeca_filters_staff)
    const filters_state = useSelector(state => state.orders.orders_horeca_filters_state)
    const filters_halls = useSelector(state => state.orders.orders_horeca_filters_halls)
    const filters_workplaces = useSelector(state => state.orders.orders_horeca_filters_workplaces)
    const filters_kitchen_points = useSelector(state => state.orders.orders_horeca_filters_kitchen_points)
    const filters_kitchen_state = useSelector(state => state.orders.orders_horeca_filters_kitchen_state)

    const staff_selected = useSelector(state => state.orders.orders_horeca_filters_staff_selected)
    const state_selected = useSelector(state => state.orders.orders_horeca_filters_state_selected)
    const halls_selected = useSelector(state => state.orders.orders_horeca_filters_halls_selected)
    const workplaces_selected = useSelector(state => state.orders.orders_horeca_filters_workplaces_selected)
    const kitchen_points_selected = useSelector(state => state.orders.orders_horeca_filters_kitchen_points_selected)
    const kitchen_state_selected = useSelector(state => state.orders.orders_horeca_filters_kitchen_state_selected)

    const offset = useSelector(state => state.orders.orders_horeca_offset)

    const tags = (size, multiply, limit_tags, id, options, label, placeholder, width, selected_uid = []) => {
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
                    <TextField variant='filled' {...params} label={label} placeholder={placeholder}/>
                )}
                sx={{width: `${width}px`, marginBottom: '4px'}}
            />
        )
    }

    return (
        <Box className='admin-orders-horeca'>
            <Box className='admin-orders-horeca-orders'>
                <Box className='admin-orders-horeca-orders-content'>
                    {orders.length > 0 ? orders.map(filial_data => {
                            if (filial_data.data !== null) {
                                return (
                                    <Box className='admin-orders-horeca-filial-content' key={filial_data.filial.uid}>
                                        <Box className='admin-orders-horeca-filial-filters'>
                                            <Box>{tags("large", true, 2, "orders-staff-tags", filters_staff, "Официанты", "Официанты", 300, staff_selected)}</Box>
                                            <Box>{tags("large", true, 2, "orders-state-tags", filters_state, "Статусы заказа", "Статус", 300, state_selected)}</Box>
                                            <Box>{tags("large", true, 2, "orders-halls-tags", filters_halls, "Залы", "Зал", 300, halls_selected)}</Box>
                                            <Box>{tags("large", true, 2, "orders-workplaces-tags", filters_workplaces, "Рабочие места", "Рабочеем место", 300, workplaces_selected)}</Box>
                                            <Box>{tags("large", true, 2, "orders-kitchen-points-tags", filters_kitchen_points, "Кухня", "Цех", 300, kitchen_points_selected)}</Box>
                                            <Box>{tags("large", true, 2, "orders-kitchen-state-tags", filters_kitchen_state, "Готовность", "Статус", 300, kitchen_state_selected)}</Box>
                                        </Box>
                                        <Box className='admin-orders-horeca-filial-box'>
                                            <Box className='admin-orders-horeca-filial-orders' sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap'
                                            }}>{filial_data.data.map(order => {
                                                return (
                                                    <OrderFood key={`${order.uid}${order.ver}`} order={order}/>
                                                )
                                            })}
                                            </Box>
                                            <Pagination sx={{
                                                position: 'sticky',
                                                bottom: 0,
                                                top: 'calc(100% - 60px)',
                                                backgroundColor: 'var(--bgr-color)',
                                                padding: '10px 0',
                                                width: '100%',
                                            }}
                                                        page={offset}
                                                        onChange={(event, value) => dispatch(setOrdersHorecaOffset(value))}
                                                        size={'large'}
                                                        count={20}
                                                        showFirstButton showLastButton/>
                                        </Box>
                                    </Box>
                                )
                            } else {
                                return null
                            }
                        })
                        : null}
                </Box>
            </Box>
        </Box>
    )
}

export default OrdersHoreca