import {Box, ButtonGroup} from "@mui/material"
import PersonIcon from '@mui/icons-material/Person'
import List from "../../../../ui/List.jsx"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {useRef, useState} from "react"
import ReceiptIcon from '@mui/icons-material/Receipt'
import ChairIcon from '@mui/icons-material/Chair'
import ComputerIcon from '@mui/icons-material/Computer'
import KitchenIcon from '@mui/icons-material/Kitchen'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import {useSetOrdersHoreca} from "../../../../hooks/pages/useSetOrdersHoreca.js"
import {useSelector} from "react-redux"
import OrderFood from "./OrderFood.jsx"

const OrdersHoreca = () => {

    const state_list_id = "state-menu"
    const state_ref = useRef(null)
    const [state_opened, set_state_open] = useState(false)
    const prev_state_open = useRef(Boolean(state_opened))

    const staff_list_id = "staff-menu"
    const staff_ref = useRef(null)
    const [staff_opened, set_staff_open] = useState(false)
    const prev_staff_open = useRef(Boolean(staff_opened))

    const halls_list_id = "halls-menu"
    const halls_ref = useRef(null)
    const [halls_opened, set_halls_open] = useState(false)
    const prev_halls_open = useRef(Boolean(halls_opened))

    const workplaces_list_id = "halls-menu"
    const workplaces_ref = useRef(null)
    const [workplaces_opened, set_workplaces_open] = useState(false)
    const prev_workplaces_open = useRef(Boolean(workplaces_opened))

    const kitchen_points_list_id = "kitchen-points-menu"
    const kitchen_points_ref = useRef(null)
    const [kitchen_points_opened, set_kitchen_points_open] = useState(false)
    const prev_kitchen_points_open = useRef(Boolean(kitchen_points_opened))

    const kitchen_status_list_id = "kitchen-status-menu"
    const kitchen_status_ref = useRef(null)
    const [kitchen_status_opened, set_kitchen_status_open] = useState(false)
    const prev_kitchen_status_open = useRef(Boolean(kitchen_status_opened))

    const staff = [
        {uid: 0, name: 'Все официанты'},
        {uid: 1, name: 'Иванов Иван Иванович'},
        {uid: 2, name: 'Петров Петр Петрович'}
    ]
    const state = [
        {uid: 0, name: 'Ожидают оплаты'},
        {uid: 1, name: 'Пробить кассовый чек'},
        {uid: 2, name: 'Успешно оплаченные'},
        {uid: 3, name: 'Отмененные'}
    ]
    const halls = [
        {uid: 0, name: 'Все залы'},
        {uid: 1, name: 'Зал 1'},
        {uid: 2, name: 'Зал 2'}
    ]
    const workplaces = [
        {uid: 0, name: 'Все рабочие места'},
        {uid: 1, name: 'mpopcorn2'},
        {uid: 2, name: 'mpopcorn3'},
    ]
    const kitchen_points = [
        {uid: 0, name: 'Вся кухня'},
        {uid: 1, name: 'Цех 1'},
    ]
    const kitchen_status = [
        {uid: 0, name: 'Любой статус'},
        {uid: 0, name: 'Без готовки'},
        {uid: 1, name: 'Начать готовить'},
        {uid: 2, name: 'Готовится'},
        {uid: 3, name: 'Готово'},
    ]

    useSetOrdersHoreca(false)

    const orders = useSelector(state => state.orders.orders_horeca)

    return (
        <Box className='admin-orders-horeca'>
            <Box>
                <Box className='admin-orders-horeca-panel'>
                    <ButtonGroup variant='contained' color='secondary'>
                        <List
                            size='small'
                            open={staff_opened}
                            anchor={staff_ref}
                            prev_open={prev_staff_open}
                            id={staff_list_id}
                            setOpen={set_staff_open}
                            button_text={'Все официанты'}
                            list={staff}
                            startIcon={<PersonIcon/>}
                            endIcon={<KeyboardArrowDownIcon/>}
                            type="staff"
                        />
                        <List
                            size='small'
                            open={state_opened}
                            anchor={state_ref}
                            prev_open={prev_state_open}
                            id={state_list_id}
                            setOpen={set_state_open}
                            button_text={'Ожидают оплаты'}
                            list={state}
                            startIcon={<ReceiptIcon/>}
                            endIcon={<KeyboardArrowDownIcon/>}
                            type="state"
                        />
                        <List
                            size='small'
                            open={halls_opened}
                            anchor={halls_ref}
                            prev_open={prev_halls_open}
                            id={halls_list_id}
                            setOpen={set_halls_open}
                            button_text={halls[0].name}
                            list={halls}
                            startIcon={<ChairIcon/>}
                            endIcon={<KeyboardArrowDownIcon/>}
                            type="halls"
                        />
                        <List
                            size='small'
                            open={workplaces_opened}
                            anchor={workplaces_ref}
                            prev_open={prev_workplaces_open}
                            id={workplaces_list_id}
                            setOpen={set_workplaces_open}
                            button_text={workplaces[0].name}
                            list={workplaces}
                            startIcon={<ComputerIcon/>}
                            endIcon={<KeyboardArrowDownIcon/>}
                            type="workplaces"
                        />
                        <List
                            size='small'
                            open={kitchen_points_opened}
                            anchor={kitchen_points_ref}
                            prev_open={prev_kitchen_points_open}
                            id={kitchen_points_list_id}
                            setOpen={set_kitchen_points_open}
                            button_text={kitchen_points[0].name}
                            list={kitchen_points}
                            startIcon={<KitchenIcon/>}
                            endIcon={<KeyboardArrowDownIcon/>}
                            type="kitchen_points"
                        />
                        <List
                            size='small'
                            open={kitchen_status_opened}
                            anchor={kitchen_status_ref}
                            prev_open={prev_kitchen_status_open}
                            id={kitchen_status_list_id}
                            setOpen={set_kitchen_status_open}
                            button_text={kitchen_status[0].name}
                            list={kitchen_status}
                            startIcon={<SoupKitchenIcon/>}
                            endIcon={<KeyboardArrowDownIcon/>}
                            type="kitchen_status"
                        />
                    </ButtonGroup>
                </Box>
                <Box className='admin-orders-horeca-orders'>
                    <Box className='admin-orders-horeca-orders-content'>
                        {orders.length > 0 ? orders.map(filial_data => {
                                if (filial_data.data !== null) {
                                    return (
                                        <Box className='admin-orders-horeca-filial-content' key={filial_data.filial.uid}>
                                            <Box className='admin-orders-horeca-filial-name'>{filial_data.filial.name}</Box>
                                            <Box
                                                className='admin-orders-horeca-filial-orders'>{filial_data.data !== null ? filial_data.data.map(order => {
                                                return (
                                                    <OrderFood key={`${order.uid}${order.ver}`} order={order}/>
                                                )
                                            }) : null}</Box>
                                        </Box>
                                    )
                                } else {
                                    return (null)
                                }
                            })
                            : null}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default OrdersHoreca