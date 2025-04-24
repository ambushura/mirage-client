import {Box, Fade} from "@mui/material"
import {useEffect} from "react"
import Orders from "./orders/Orders.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useSetContentHeight} from "../../../hooks/interface/useSetContentHeight.js"
import {NEW_EMPTY_HORDER, NEW_EMPTY_ORDER, setCurrentHorder, setCurrentPreOrder} from "../../../redux/ordersReducer.js"

const PageAdmin = () => {

    const dispatch = useDispatch()

    const current_page = useSelector(state => state.interface.current_page)
    const [content_height, show_pre_order] = useSetContentHeight()

    useEffect(() => {
        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
        dispatch(setCurrentHorder(NEW_EMPTY_HORDER))
    }, [dispatch])

    return (
        <Box sx={{height: content_height, display: 'flex', flexDirection: 'column'}}>
            <Fade in={current_page === 'admin/orders/cinema' || current_page === 'admin/orders/horeca'} timeout={300}>
                <Box>
                    <Orders/>
                </Box>
            </Fade>
        </Box>
    )
}

export default PageAdmin