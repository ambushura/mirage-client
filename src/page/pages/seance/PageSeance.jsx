import {useEffect, useRef, useState} from "react"
import {Box, Button, Fade, LinearProgress} from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useFetchBooking} from "../../../hooks/fetching/useFetchBooking.js"
import {setBooking} from "../../../redux/scheduleReducer.js"
import {ORDER_TIME_OUT} from "../../../redux/ordersReducer.js"
import {ticket_count} from "../../../service/advanced.js"
import {cinema_order_delete} from "../../../service/fetch_service.js"
import SeanceTitle from "../../../components/cinema/SeanceTitle.jsx"
import Hall from "../../../components/halls/Hall.jsx"
import CheckOut from "./CheckOut.jsx"
import Loader from "../../../components/elements/Loader.jsx"
import Order from "../../../components/orders/Order.jsx"
import {FOOTER_HEIGHT, HEADER_HEIGHT} from "../../../redux/interfaceReducer.js"
import {useSetSeance} from "../../../hooks/pages/useSetSeance.js"
import SeanceMenu from "./SeanceMenu.jsx"

const PageSeance = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const permissions = useSelector(state => state.auth.permissions)
    const seance = useSelector(state => state.schedule.seance)
    const pre_order = useSelector(state => state.orders.pre_order || {in_base: false})
    const horder = useSelector(state => state.orders.horder || {in_base: false})
    const booking = useSelector(state => state.schedule.booking)
    const wp = useSelector(state => state.interface.wp)

    const [booking_data, ,] = useFetchBooking()
    const hall = useSetSeance()

    const refTitle = useRef(null)
    const [checkout, set_check_out] = useState(false)
    const app_width = useSelector(state => state.interface.app_width)
    const app_height = useSelector(state => state.interface.app_height)
    const [hall_height, set_hall_height] = useState(0)
    const [time_remaining, set_time_remaining] = useState(100)
    const [count_book, set_count_book] = useState(0)

    const uid_user = useSelector(state => state.auth.uid)

    useEffect(() => {
        if (filial !== undefined) {
            if (booking_data.length > 0) {
                dispatch(setBooking(booking_data))
            }
        }
        return () => {
            dispatch(setBooking([]))
        }
    }, [dispatch, filial, booking_data, count_book])

    useEffect(() => {
        if (uid_user === null) {
            const timer = setInterval(() => {
                set_time_remaining((prevTimeRemaining) => (prevTimeRemaining - 1))
            }, ORDER_TIME_OUT)
            return () => {
                clearInterval(timer)
            }
        }
    }, [permissions])

    useEffect(() => {
        if (uid_user === null) {
            if (time_remaining <= 1) {
                navigate(-1)
                dispatch(cinema_order_delete(filial, wp, pre_order.uid))
            }
        }
    }, [dispatch, filial, navigate, permissions, pre_order, time_remaining])

    useEffect(() => {
        if (uid_user === null) {
            if (refTitle.current !== null) {
                const {offsetHeight} = refTitle.current
                set_hall_height(app_height - offsetHeight)
            }
        } else {
            set_hall_height(app_height - HEADER_HEIGHT[1] - FOOTER_HEIGHT[1])
        }
    }, [app_height, uid_user, hall, permissions])

    if (seance !== undefined && hall !== undefined) {
        return (
            <>
                {uid_user !== null ? <SeanceMenu/> : null}
                <Fade in={!checkout} unmountOnExit>
                    <Box id='content-box'>
                        <Box id='content-wrap'>
                            <Box id='content'>
                                <Box id='seance' style={{display: checkout ? 'none' : 'block', height: '100%'}}>
                                    {uid_user === null ? <Box id='seance-title' ref={refTitle}>
                                            <Box className='order-panel'>
                                                <Button onClick={() => {
                                                    navigate(-1)
                                                    dispatch(cinema_order_delete(filial, wp, pre_order.uid))
                                                }} variant="contained"
                                                        color="secondary"><KeyboardArrowLeftIcon/>Назад</Button>
                                                <Box sx={{width: '100%', marginLeft: '10px'}}>
                                                    <LinearProgress className='order-progress'
                                                                    sx={{height: '100%'}} value={time_remaining}
                                                                    variant="determinate"/>
                                                </Box>
                                            </Box>
                                            <Box className='seance-title-film-name'>{seance.name_film}</Box>
                                            <Box className='seance-title-hall-name'>Зал {hall.name_full}</Box>
                                            <Box className='seance-title-panel'>
                                                <SeanceTitle
                                                    seance={seance}
                                                    content_type={true}
                                                    day={true}
                                                    its_hall_map={true}
                                                    age={false}/>
                                                {pre_order.items.length > 0 ?
                                                    <Button sx={{height: '48px', marginLeft: '10px'}} variant="contained"
                                                            className='seance-title-preorder' onClick={() => {
                                                        set_check_out(true)
                                                    }}>
                                                        <Box
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                marginRight: '20px'
                                                            }}>
                                                            <Box style={{
                                                                fontSize: '12px',
                                                                fontWeight: '400'
                                                            }}>{ticket_count(pre_order.quantity)}</Box>
                                                            <Box style={{fontWeight: 'bold'}}>{pre_order.price} P
                                                            </Box>
                                                        </Box>
                                                        <Box style={{
                                                            verticalAlign: 'center',
                                                            textAlign: 'center',
                                                            display: 'flex',
                                                            fontWeight: 'bold'
                                                        }}>
                                                            <div>Продолжить</div>
                                                            <KeyboardArrowRightIcon/>
                                                        </Box>
                                                    </Button> : <></>}
                                            </Box>
                                        </Box>
                                        : <></>}
                                    <Box style={{display: 'flex'}}>
                                        <Hall
                                            city={city}
                                            filial={filial}
                                            pre_order={pre_order}
                                            hall={hall}
                                            seance={seance}
                                            height={hall_height}
                                            width={app_width - (uid_user !== null ? 520 : 0)}
                                            booking={booking}
                                            set_count_book={set_count_book}
                                            set_time_remaining={set_time_remaining}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        {pre_order.in_base || horder.in_base ? <Order/> : null}
                    </Box>
                </Fade>
                <Fade in={checkout} unmountOnExit>
                    <Box style={{display: checkout ? 'block' : 'none', height: '100%'}}>
                        <CheckOut
                            set_check_out={set_check_out}
                            time_remaining={time_remaining}/>
                    </Box>
                </Fade>
            </>
        )
    } else {
        return <Loader/>
    }
}

export default PageSeance