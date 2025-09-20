import {Box} from "@mui/material"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {NEW_EMPTY_HORDER, NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../../../redux/ordersReducer.js"
import OrdersCinema from "./orders/cinema/OrdersCinema.jsx"
import OrdersHoreca from "./orders/horeca/OrdersHoreca.jsx"
import Zbooks from "./total/Zbooks.jsx"
import Operations from "./total/Operations.jsx"
import Egais from "./egais/EGAIS.jsx"
import PageStaff from "./staff/PageStaff.jsx"
import PageHalls from "./halls/PageHalls.jsx"
import PageEquipment from "./equipment/PageEquipment.jsx"
import ZPinpads from "./total/ZPinpads.jsx"

const PageAdmin = () => {

    const dispatch = useDispatch()

    const current_page = useSelector(state => state.interface.current_page)
    const [update_cinema, set_update_cinema] = useState(true)
    const [update_horeca, set_update_horeca] = useState(true)

    useEffect(() => {
        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        dispatch(setCurrentHorder(NEW_EMPTY_HORDER()))
    }, [dispatch])

    return <Box id='content-box' sx={{overflowY: 'auto'}}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box id='content-header'></Box>
            <Box id='content' sx={{padding: '10px 0'}}>
                {current_page === 'admin/orders/cinema' ? <OrdersCinema update_cinema={update_cinema}/> : null}
                {current_page === 'admin/orders/horeca' ? <OrdersHoreca update_horeca={update_horeca}/> : null}
                {current_page === 'admin/zbooks' ? <Zbooks/> : null}
                {current_page === 'admin/operations' ? <Operations/> : null}
                {current_page === 'admin/egais' ? <Egais/> : null}
                {current_page === 'admin/staff' ? <PageStaff/> : null}
                {current_page === 'admin/halls' ? <PageHalls/> : null}
                {current_page === 'admin/equipment' ? <PageEquipment/> : null}
                {current_page === 'admin/acquiring' ? <ZPinpads/> : null}
            </Box>
            <Box id='content-footer'></Box>
        </Box>
    </Box>
}

export default PageAdmin