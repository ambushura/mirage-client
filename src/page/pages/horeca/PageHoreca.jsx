import {Box} from "@mui/material"
import Menu from "./Menu.jsx"
import Order from "../../../components/orders/Order.jsx"
import {useSelector} from "react-redux"

const PageHoreca = () => {

    const pre_order = useSelector(state => state.orders.pre_order || {in_base: false})
    const horder = useSelector(state => state.orders.horder || {in_base: false})

    return (
        <Box id='content-box'>
            <Box id="content-wrap">
                <Box id='content'>
                    <Menu/>
                </Box>
            </Box>
            {pre_order.in_base || horder.in_base ? <Order/> : null}
        </Box>
    )
}

export default PageHoreca