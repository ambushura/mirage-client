import {Autocomplete, Box, Pagination, TextField} from "@mui/material"
import {useSetOrdersHoreca} from "../../../../hooks/pages/useSetOrdersHoreca.js"
import {useSelector} from "react-redux"
import OrderFood from "./OrderFood.jsx"
import {useSetOrdersHorecaFilters} from "../../../../hooks/pages/useSetOrdersHorecaFilters.jsx"

const OrdersHoreca = () => {

    useSetOrdersHoreca(false)
    useSetOrdersHorecaFilters()

    const orders = useSelector(state => state.orders.orders_horeca)
    const filters_staff = useSelector(state => state.orders.orders_horeca_filters_staff)
    const filters_state = useSelector(state => state.orders.orders_horeca_filters_state)
    const filters_halls = useSelector(state => state.orders.orders_horeca_filters_halls)
    const filters_workplaces = useSelector(state => state.orders.orders_horeca_filters_workplaces)
    const filters_kitchen_points = useSelector(state => state.orders.orders_horeca_filters_kitchen_points)

    const tags = (size, multiply, limit_tags, id, options, label, placeholder, width) => {
        return (
            <Autocomplete
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
                                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                                            <Box sx={{
                                                position: 'sticky',
                                                top: 0,
                                                backgroundColor: 'var(--bgr-color)',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                flexDirection: 'column'
                                            }}>
                                                <Box>{tags("large", true, 2, "orders-staff-tags", filters_staff, "Официанты", "Официанты", 300)}</Box>
                                                <Box>{tags("large", true, 2, "orders-state-tags", filters_state, "Статусы заказа", "Статус", 300)}</Box>
                                                <Box>{tags("large", true, 2, "orders-halls-tags", filters_halls, "Залы", "Зал", 300)}</Box>
                                                <Box>{tags("large", true, 2, "orders-workplaces-tags", filters_workplaces, "Рабочие места", "Рабочеем место", 300)}</Box>
                                                <Box>{tags("large", true, 2, "orders-kitchen-points-tags", filters_kitchen_points, "Кухня", "Цех", 300)}</Box>
                                            </Box>
                                            <Box
                                                className='admin-orders-horeca-filial-orders'>{filial_data.data.map(order => {
                                                return (
                                                    <OrderFood key={`${order.uid}${order.ver}`} order={order}/>
                                                )
                                            })}
                                                <Pagination sx={{
                                                    position: 'sticky',
                                                    bottom: 0,
                                                    backgroundColor: 'var(--bgr-color)',
                                                    padding: '10px 0',
                                                    width: '100%',
                                                }} size={'large'} count={20} showFirstButton showLastButton/>
                                            </Box>
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