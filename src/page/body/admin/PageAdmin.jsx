import {Box} from "@mui/material"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {NEW_EMPTY_HORDER, NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../../../redux/ordersReducer.js"
import OrdersCinema from "./orders/cinema/OrdersCinema.jsx"
import OrdersHoreca from "./orders/horeca/OrdersHoreca.jsx"
import Zbooks from "./documents/Zbooks.jsx"
import Operations from "./documents/Operations.jsx"
import Egais from "./egais/EGAIS.jsx"
import PageStaff from "./staff/PageStaff.jsx"
import PageHalls from "./halls/PageHalls.jsx"
import PageScheme from "./scheme/PageScheme.jsx"
import ZPinpads from "./documents/ZPinpads.jsx"
import Order from "../../right-panel/Order.jsx"
import Sales from "./documents/Sales.jsx"
import ZBook from "./documents/ZBook.jsx"
import Receipt from "./documents/Receipt.jsx"
import Slip from "./documents/Slip.jsx"
import Operation from "./documents/Operation.jsx";

const PageAdmin = () => {

    const dispatch = useDispatch()

    const current_page = useSelector(state => state.interface.current_page)
    const [update_cinema, set_update_cinema] = useState(true)
    const [update_horeca, set_update_horeca] = useState(true)

    const {horder, pre_order} = useSelector(state => state.orders)

    useEffect(() => {
        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
    }, [dispatch])

    return <Box id='content-box' style={{
        overflowY: 'auto',
        width: ['admin/orders/cinema', 'admin/orders/horeca', 'admin/receipt', 'admin/slip'].includes(current_page) && (pre_order.in_base || horder.in_base) ? 'calc(100vw - var(--order-width))' : '100vw',
    }}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box id='content-header'></Box>
            <Box id='content'
                 style={['admin/operations', 'admin/zbooks', 'admin/acquiring', 'admin/sales'].includes(current_page) ? {height: 'var(--page-height)'} : null}>
                {current_page === 'admin/orders/cinema' && <OrdersCinema update_cinema={update_cinema}/>}
                {current_page === 'admin/orders/horeca' && <OrdersHoreca update_horeca={update_horeca}/>}
                {current_page === 'admin/zbooks' && <Zbooks/>}
                {current_page === 'admin/zbook' && <ZBook/>}
                {current_page === 'admin/receipt' && <Receipt/>}
                {current_page === 'admin/slip' && <Slip/>}
                {current_page === 'admin/operations' && <Operations/>}
                {current_page === 'admin/operation' && <Operation/>}
                {current_page === 'admin/egais' && <Egais/>}
                {current_page === 'admin/staff' && <PageStaff/>}
                {current_page === 'admin/halls' && <PageHalls/>}
                {current_page === 'admin/scheme' && <PageScheme/>}
                {current_page === 'admin/acquiring' && <ZPinpads/>}
                {current_page === 'admin/sales' && <Sales/>}
            </Box>
            <Box id='content-footer'></Box>
            {['admin/orders/cinema', 'admin/orders/horeca', 'admin/receipt', 'admin/slip'].includes(current_page) &&
                <Box sx={{position: 'fixed', right: 0, top: 'var(--header-height)', zIndex: 3}}><Order/></Box>}
        </Box>
    </Box>
}

export default PageAdmin