import {useEffect} from "react"
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {cinema_hall_get, cinema_seance_booking_get, cinema_seance_get,} from "../../../service/fetch_service.js"
import Hall from "../../../components/halls/Hall.jsx"
import CheckOut from "./CheckOut.jsx"
import Loader from "../../../ui/Loader.jsx"
import {setKioskCheckout} from "../../../redux/interfaceReducer.js"
import {setBooking, setSeance} from "../../../redux/scheduleReducer.js"
import {setHall} from "../../../redux/hallsReducer.js"
import {ORDER_TIME_REMAINING, setPreOrderTimeRemaining} from "../../../redux/ordersReducer.js"
import Order from "../../right-panel/Order.jsx"

const PageSeance = () => {

    const dispatch = useDispatch()

    const {city, filial} = useSelector(state => state.data)
    const uid_seance = useSelector(state => state.interface.params.uid_seance)
    const {seance, booking} = useSelector(state => state.schedule)
    const hall = useSelector(state => state.halls.hall)
    const pre_order = useSelector(state => state.orders.pre_order || {in_base: false})
    const kiosk = useSelector(state => state.interface.kiosk)
    const kiosk_checkout = useSelector(state => state.interface.kiosk_checkout)
    const user = useSelector(state => state.auth.uid)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(cinema_seance_booking_get(filial, seance.uid, pre_order.uid))
            if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setBooking(fetching_result.data))
            }
        }
        dispatch(setBooking([]))
        if (filial !== undefined && seance !== undefined) {
            fetch()
        }
        return () => dispatch(setBooking([]))
    }, [dispatch, filial, seance, pre_order.in_base])

    useEffect(() => {
        dispatch(setSeance(undefined))
        if (!filial || !uid_seance) return
        const load = async () => {
            const r = await dispatch(cinema_seance_get(filial, uid_seance))
            if (!r.error && r.data) {
                dispatch(setSeance(r.data))
            }
        }
        load()
    }, [uid_seance, filial])

    useEffect(() => {
        dispatch(setHall(null))
        if (!seance?.uid_hall || !filial) return
        const load = async () => {
            const r = await dispatch(cinema_hall_get(filial, seance.uid_hall, 'cinema'))
            if (!r.error && r.data) {
                dispatch(setHall(r.data))
            }
        }
        load()
    }, [filial, seance?.uid_hall])

    useEffect(() => {
        dispatch(setPreOrderTimeRemaining(ORDER_TIME_REMAINING))
        dispatch(setKioskCheckout(0))
    }, [])

    if (seance !== undefined && hall !== null) {
        if (kiosk_checkout === 0) {
            return <Box id='content-box' sx={{overflowY: 'auto'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box id='content-header'></Box>
                    <Box id='content' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Box
                            className={`seance ${seance.canceled ? 'seance-canceled' : !seance.opened ? 'seance-closed' : ''}`}
                            sx={{flex: 1}}>
                            <Hall
                                city={city}
                                filial={filial}
                                pre_order={pre_order}
                                hall={hall}
                                seance={seance}
                                booking={booking}/>
                        </Box>
                        <Box
                            sx={{minWidth: kiosk || user === null ? 0 : 'var(--order-width)'}}><Order/></Box>
                    </Box>
                    <Box id='content-footer'></Box>
                </Box>
            </Box>
        } else {
            return <Box style={{display: kiosk_checkout ? 'block' : 'none', height: '100%'}}>
                <CheckOut/>
            </Box>
        }
    } else {
        return <Loader size={2}/>
    }
}

export default PageSeance