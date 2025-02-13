import {useEffect, useRef, useState} from "react"
import {Box, Button, Fade, LinearProgress} from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useSetCurrentPage} from "../../../hooks/useSetCurrentPage.js"
import {useFetchSeance} from "../../../hooks/useFetchSeance.js"
import {useFetchHall} from "../../../hooks/useFetchHall.js"
import {useFetchOrder} from "../../../hooks/useFetchOrder.js"
import {useFetchBooking} from "../../../hooks/useFetchBooking.js"
import {setBooking, setSeance} from "../../../redux/scheduleReducer.js"
import {setCurrentPreOrder} from "../../../redux/ordersReducer.js"
import {ORDER_TIME_OUT, ticket_count} from "../../../service/advanced.js"
import {deletePreOrder} from "../../../service/fetch_service.js"
import SeanceTitle from "../../../components/cinema/SeanceTitle.jsx"
import Hall from "../../../components/halls/Hall.jsx"
import CheckOut from "./CheckOut.jsx"
import Loader from "../../../components/Loader.jsx"
import Order from "../../../components/orders/Order.jsx"
import {FOOTER_HEIGHT, HEADER_HEIGHT} from "../../../redux/interfaceReducer.js"

const PageSeance = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const [authenticated, set_authenticated] = useState(0)
    const permissions = useSelector(state => state.auth.permissions)
    const seance = useSelector(state => state.schedule.seance)
    const pre_order = useSelector(state => state.orders.pre_order)
    const [hall, set_hall] = useState(undefined)
    const booking = useSelector(state => state.schedule.booking)

    const [seance_data, ,] = useFetchSeance(city, filial, params.uid_seance)
    const [hall_data, ,] = useFetchHall(city, filial, seance)
    const [order_data, ,] = useFetchOrder(city, filial, pre_order)
    const [booking_data, ,] = useFetchBooking(city, filial, seance, pre_order)

    const refTitle = useRef(null)
    const [checkout, set_check_out] = useState(false)
    const app_width = useSelector(state => state.interface.app_width)
    const app_height = useSelector(state => state.interface.app_height)
    const [hall_height, set_hall_height] = useState(0)
    const [time_remaining, set_time_remaining] = useState(100)
    const [count_book, set_count_book] = useState(0)

    useSetCurrentPage('seance')

    useEffect(() => {
        if (city !== undefined && filial !== undefined) {
            if (seance_data !== undefined) {
                dispatch(setSeance(seance_data))
            }
        }
        return () => {
            dispatch(setSeance(undefined))
        }
    }, [dispatch, city, filial, seance_data])

    useEffect(() => {
        if (city !== undefined && filial !== undefined) {
            if (seance !== undefined && hall_data !== undefined) {
                set_hall(hall_data)
            }
        }
        return () => {
            set_hall(undefined)
        }
    }, [city, filial, seance, hall_data])

    useEffect(() => {
        if (city !== undefined && filial !== undefined) {
            if (order_data !== undefined) {
                dispatch(setCurrentPreOrder(order_data))
            }
        }
    }, [dispatch, city, filial, order_data])

    useEffect(() => {
        if (city !== undefined && filial !== undefined) {
            if (booking_data.length > 0) {
                dispatch(setBooking(booking_data))
            }
        }
        return () => {
            dispatch(setBooking([]))
        }
    }, [dispatch, city, filial, booking_data, count_book])

    useEffect(() => {
        const timer = setInterval(() => {
            set_time_remaining((prevTimeRemaining) => (prevTimeRemaining - 1))
        }, ORDER_TIME_OUT)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        if (time_remaining <= 1) {
            navigate(-1)
            dispatch(deletePreOrder(filial, pre_order.uid))
        }
    }, [dispatch, filial, pre_order, time_remaining])

    useEffect(() => {
        if (permissions.includes("staff")) {
            set_authenticated(1)
        } else {
            set_authenticated(0)
        }
        if (!authenticated) {
            if (refTitle.current !== null) {
                const {offsetHeight} = refTitle.current
                set_hall_height(app_height - offsetHeight)
            }
        } else {
            set_hall_height(app_height - HEADER_HEIGHT[1] - FOOTER_HEIGHT[1])
        }
    }, [app_height, authenticated, hall, permissions])

    if (seance !== undefined && hall !== undefined) {
        return (
            <Box>
                <Fade in={!checkout}>
                    <Box id='seance' style={{display: checkout ? 'none' : 'block', height: '100%'}}>
                        {authenticated === 0 ? <Box id='seance-title' ref={refTitle}>
                                <Box className='order-panel'>
                                    <Button onClick={() => {
                                        navigate(-1)
                                        dispatch(deletePreOrder(filial, pre_order.uid))
                                    }} variant="contained" color="secondary"><KeyboardArrowLeftIcon/>Назад</Button>
                                    <Box sx={{width: '100%', marginLeft: '10px'}}>
                                        <LinearProgress className='order-progress'
                                                        sx={{height: '100%'}} value={time_remaining} variant="determinate"/>
                                    </Box>
                                </Box>
                                <Box className='seance-title-film-name'>{seance.name_film}</Box>
                                <Box className='seance-title-hall-name'>{hall.name}</Box>
                                <Box className='seance-title-panel'>
                                    <SeanceTitle seance={seance} content_type={true} day={true} its_hall_map={true} age={false}/>
                                    {pre_order.booking.length > 0 ?
                                        <Button sx={{height: '48px', marginLeft: '10px'}} variant="contained"
                                                className='seance-title-preorder' onClick={() => {
                                            set_check_out(true)
                                        }}>
                                            <Box style={{display: 'flex', flexDirection: 'column', marginRight: '20px'}}>
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
                                filial={filial}
                                pre_order={pre_order}
                                hall={hall}
                                seance={seance}
                                height={hall_height}
                                width={app_width - (authenticated === 1 ? 400 : 0)}
                                booking={booking}
                                set_count_book={set_count_book}
                                set_time_remaining={set_time_remaining}
                            />
                            {authenticated === 1 ? <Box>
                                <Order/>
                            </Box> : <></>}
                        </Box>
                    </Box>
                </Fade>
                <Fade in={checkout}>
                    <Box style={{display: checkout ? 'block' : 'none', height: '100%'}}>
                        <CheckOut
                            set_check_out={set_check_out}
                            time_remaining={time_remaining}/>
                    </Box>
                </Fade>
            </Box>
        )
    } else {
        return <Loader/>
    }
}
export default PageSeance