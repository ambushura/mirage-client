import { Autocomplete, Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../../../../redux/frontoffice/interfaceReducer.js'
import {
    setOrdersCinemaFiltersBuyerEmailsSelect,
    setOrdersCinemaFiltersBuyerPhoneNumbersSelect,
    setOrdersCinemaFiltersHallsSelect,
    setOrdersCinemaFiltersSeancesSelect,
    setOrdersCinemaFiltersStaffSelect,
    setOrdersCinemaFiltersStateSelect,
    setOrdersCinemaFiltersWorkplacesSelect,
} from '../../../../../../redux/frontoffice/ordersReducer.js'
import PhoneInput from '../../../../../../ui/PhoneInput.jsx'
import CloseIcon from '@mui/icons-material/Close'
import { useSetOrdersCinemaFilters } from './useSetOrdersCinemaFilters.js'

const CinemaFilters = () => {
    useSetOrdersCinemaFilters()

    const dispatch = useDispatch()

    const filters_staff = useSelector((state) => state.orders.orders_cinema_filters_staff)
    const filters_state = useSelector((state) => state.orders.orders_cinema_filters_state)
    const filters_seances = useSelector((state) => state.orders.orders_cinema_filters_seances)
    const filters_halls = useSelector((state) => state.orders.orders_cinema_filters_halls)
    const filters_workplaces = useSelector((state) => state.orders.orders_cinema_filters_workplaces)

    const staff_selected = useSelector((state) => state.orders.orders_cinema_filters_staff_selected)
    const state_selected = useSelector((state) => state.orders.orders_cinema_filters_state_selected)
    const seances_selected = useSelector((state) => state.orders.orders_cinema_filters_seances_selected)
    const halls_selected = useSelector((state) => state.orders.orders_cinema_filters_halls_selected)
    const workplaces_selected = useSelector((state) => state.orders.orders_cinema_filters_workplaces_selected)

    const buyer_emails_selected = useSelector((state) => state.orders.orders_cinema_filters_buyer_emails_selected)
    const buyer_phone_numbers_selected = useSelector((state) => state.orders.orders_cinema_filters_buyer_phone_numbers_selected)

    const tags = (size, multiply, limit_tags, id, options, label, placeholder, selected_uid = []) => {
        return (
            <Autocomplete
                onChange={(event, new_value) => {
                    switch (id) {
                        case 'orders-staff-tags':
                            dispatch(setOrdersCinemaFiltersStaffSelect(new_value))
                            break
                        case 'orders-state-tags':
                            dispatch(setOrdersCinemaFiltersStateSelect(new_value))
                            break
                        case 'orders-seances-tags':
                            dispatch(setOrdersCinemaFiltersSeancesSelect(new_value))
                            break
                        case 'orders-halls-tags':
                            dispatch(setOrdersCinemaFiltersHallsSelect(new_value))
                            break
                        case 'orders-workplaces-tags':
                            dispatch(setOrdersCinemaFiltersWorkplacesSelect(new_value))
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
                    <TextField sx={{ width: '100%' }} variant="filled" {...params} label={label} placeholder={placeholder} />
                )}
                sx={{ width: '100%', marginBottom: '4px' }}
                isOptionEqualToValue={(option, value) => option.uid === value.uid}
            />
        )
    }

    const set_buyer_phone_number = (value) => {
        dispatch(setOrdersCinemaFiltersBuyerPhoneNumbersSelect(value))
    }

    const clear_buyer_phone_number = () => {
        dispatch(setOrdersCinemaFiltersBuyerPhoneNumbersSelect(''))
    }

    return (
        <Box className="admin-orders-cinema-filial-filters">
            {tags('large', true, 4, 'orders-seances-tags', filters_seances, 'Сеансы', 'Сеанс', seances_selected)}
            {tags('large', true, 4, 'orders-staff-tags', filters_staff, 'Кассиры', 'Кассир', staff_selected)}
            {tags('large', true, 4, 'orders-state-tags', filters_state, 'Статусы заказа', 'Статус', state_selected)}
            {tags('large', true, 4, 'orders-halls-tags', filters_halls, 'Залы', 'Зал', halls_selected)}
            {tags('large', true, 4, 'orders-workplaces-tags', filters_workplaces, 'Рабочие места', 'Рабочеем место', workplaces_selected)}
            <PhoneInput value={buyer_phone_numbers_selected} set_value={set_buyer_phone_number} clear_value={clear_buyer_phone_number} />
            <TextField
                sx={{ width: '100%', marginBottom: '4px' }}
                variant="filled"
                label="E-mail"
                type="email"
                value={buyer_emails_selected}
                onChange={(event) => dispatch(setOrdersCinemaFiltersBuyerEmailsSelect(event.target.value))}
                InputProps={{
                    endAdornment: buyer_emails_selected && (
                        <InputAdornment position="end">
                            <IconButton onClick={() => dispatch(setOrdersCinemaFiltersBuyerEmailsSelect(''))} edge="end">
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }} onClick={() => dispatch(closeModal())}>
                <Button variant="contained" color="secondary">
                    Закрыть
                </Button>
            </Box>
        </Box>
    )
}

export default CinemaFilters
