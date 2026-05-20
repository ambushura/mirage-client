import { Box } from '@mui/material'
import '../../mobile.css'
import BottomBar from '../bottom_bar/BottomBar.jsx'
import { useState } from 'react'
import DrawerSide from '../drawer/DrawerSide.jsx'
import TopBar from '../top_bar/TopBar.jsx'
import { useParams } from 'react-router-dom'
import Orders from '../../../desktop/backoffice/pages/cinema/Orders.jsx'
import Order from './order/Order.jsx'
import useSetCityAndFilial from '../../hooks/useSetCityAndFilial.js'

const Waiter = () => {
    const params = useParams()
    const [drawerOpened, setDrawerOpened] = useState(false)

    useSetCityAndFilial()

    return (
        <Box className="mobile">
            <TopBar title={getTopBarTitle(params.current_page)} />
            <Box className="mobile-orders">
                {['my-orders', 'all-orders'].includes(params.current_page) && <Orders current_page={params.current_page} />}
                {params.current_page === 'order' && <Order />}
            </Box>
            <BottomBar setDrawerOpened={setDrawerOpened} surface="waiter" current_page={params.current_page} />
            <DrawerSide drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} surface="waiter" current_page={params.current_page} />
        </Box>
    )
}

export default Waiter

function getTopBarTitle(current_page) {
    switch (current_page) {
        case 'all-orders':
            return 'Все заказы'
        case 'my-orders':
            return 'Мои заказы'
        case 'order':
            return 'Новый заказ'
        case 'stop-list':
            return 'Стоп-лист'
        default:
            return 'Неизвестная страница'
    }
}
