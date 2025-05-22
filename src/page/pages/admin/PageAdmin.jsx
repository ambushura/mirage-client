import {Box} from "@mui/material"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {NEW_EMPTY_HORDER, NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../../../redux/ordersReducer.js"
import MenuAdmin from "./MenuAdmin.jsx"
import OrdersCinema from "./orders/OrdersCinema.jsx"
import OrdersHoreca from "./orders/OrdersHoreca.jsx"
import Order from "../../../components/orders/Order.jsx"
import Zbooks from "./total/Zbooks.jsx"
import Operations from "./total/Operations.jsx"
import Egais from "./egais/EGAIS.jsx"

const PageAdmin = () => {

    const dispatch = useDispatch()

    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const current_page = useSelector(state => state.interface.current_page)
    const [update_cinema, set_update_cinema] = useState(true)
    const [update_horeca, set_update_horeca] = useState(true)

    useEffect(() => {
        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
    }, [dispatch])

    return (
        <>
            <MenuAdmin
                set_update_cinema={set_update_cinema}
                set_update_horeca={set_update_horeca}/>
            <Box id='content-box'>
                <Box id='content-wrap'>
                    <Box id='content'>
                        <Box id="page-admin">
                            {current_page === 'admin/orders/cinema' ?
                                <OrdersCinema update_cinema={update_cinema}/> : null}
                            {current_page === 'admin/orders/horeca' ?
                                <OrdersHoreca update_horeca={update_horeca}/> : null}
                            {current_page === 'admin/zbooks' ?
                                <Zbooks/> : null}
                            {current_page === 'admin/operations' ?
                                <Operations/> : null}
                            {current_page === 'admin/egais' ?
                                <Egais/> : null}
                        </Box>
                    </Box>
                </Box>
                {pre_order.in_base || horder.in_base ? <Order/> : null}
            </Box>
        </>
    )
}

export default PageAdmin