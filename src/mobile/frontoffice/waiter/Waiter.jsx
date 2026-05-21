import { Box } from '@mui/material'
import TopBar from '../top_bar/TopBar.jsx'
import BottomBar from '../bottom_bar/BottomBar.jsx'
import DrawerSide from '../drawer/DrawerSide.jsx'
import '../../mobile.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Orders from '../../../desktop/backoffice/pages/cinema/Orders.jsx'
import Order from './order/Order.jsx'
import useSetCityAndFilial from '../../hooks/useSetCityAndFilial.js'
import MobileLayout from '../../MobileLayout.jsx'

const Waiter = () => {
    const params = useParams()
    const [drawerOpened, setDrawerOpened] = useState(false)

    useSetCityAndFilial()

    return (
        <MobileLayout
            header={<TopBar title={getTopBarTitle(params.current_page)} />}
            footer={<BottomBar setDrawerOpened={setDrawerOpened} surface="waiter" current_page={params.current_page} />}
        >
            {/* Содержимое страницы будет скроллиться в центре */}
            <Box>
                {['my-orders', 'all-orders'].includes(params.current_page) && <Orders current_page={params.current_page} />}
                {params.current_page === 'order' && <Order />}
            </Box>

            {/* Боковое меню - отдельно от макета */}
            <DrawerSide drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} surface="waiter" current_page={params.current_page} />
        </MobileLayout>
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
