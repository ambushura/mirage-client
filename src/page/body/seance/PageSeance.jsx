import {useEffect, useRef, useState} from "react"
import {Box, Button, Fade, LinearProgress} from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {ORDER_TIME_OUT} from "../../../redux/ordersReducer.js"
import {ticket_count} from "../../../service/advanced.js"
import {
    cinema_hall_get, cinema_order_delete, cinema_seance_booking_get, cinema_seance_get,
} from "../../../service/fetch_service.js"
import SeanceTitle from "../../../components/cinema/SeanceTitle.jsx"
import Hall from "../../../components/halls/Hall.jsx"
import CheckOut from "./CheckOut.jsx"
import Loader from "../../../ui/Loader.jsx"
import Order from "../../right-panel/Order.jsx"
import {FOOTER_HEIGHT, HEADER_HEIGHT} from "../../../redux/interfaceReducer.js"
import SeanceMenu from "./SeanceMenu.jsx"
import {setBooking, setSeance} from "../../../redux/scheduleReducer.js"
import {setHall} from "../../../redux/hallsReducer.js"

const PageSeance = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {city, filial} = useSelector(state => state.data)
    const uid_seance = useSelector(state => state.interface.params.uid_seance)
    const seance = useSelector(state => state.schedule.seance)
    const hall = useSelector(state => state.halls.hall)
    const pre_order = useSelector(state => state.orders.pre_order || {in_base: false})
    const horder = useSelector(state => state.orders.horder || {in_base: false})
    const booking = useSelector(state => state.schedule.booking)
    const uid_user = useSelector(state => state.auth.uid)
    const pre_order_paying = useSelector(state => state.orders.pre_order_paying)
    const {app_width, app_height} = useSelector(state => state.interface.app_width)

    const refTitle = useRef(null)
    const [checkout, set_check_out] = useState(0)
    const [hall_height, set_hall_height] = useState(0)
    const [time_remaining, set_time_remaining] = useState(100)
    const [count_book, set_count_book] = useState(0)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(cinema_seance_booking_get(filial, seance.uid, pre_order.uid))
            if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setBooking(fetching_result.data))
            }
        }
        dispatch(setBooking([]))
        if (filial !== undefined && seance !== undefined && pre_order.in_base) {
            fetch()
        }
        return () => dispatch(setBooking([]))
    }, [dispatch, filial, seance, pre_order, count_book])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(cinema_seance_get(filial, uid_seance))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setSeance(fetching_result.data))
            }
        }
        dispatch(setSeance(undefined))
        if (filial !== undefined && uid_seance !== undefined) {
            fetch()
        }
        return () => dispatch(setSeance(undefined))
    }, [dispatch, filial, uid_seance])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(cinema_hall_get(filial, seance.uid_hall))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setHall(fetching_result.data))
            }
        }
        dispatch(setHall(null))
        if (filial !== undefined && seance !== undefined) {
            fetch()
        }
        return () => {
            dispatch(setHall(null))
        }
    }, [dispatch, filial, seance])

    useEffect(() => {
        if (uid_user === null) {
            const timer = setInterval(() => {
                if (!pre_order_paying) {
                    set_time_remaining((prevTimeRemaining) => (prevTimeRemaining - 1))
                }
            }, ORDER_TIME_OUT)
            return () => {
                clearInterval(timer)
            }
        }
    }, [uid_user, pre_order_paying])

    useEffect(() => {
        if (uid_user === null) {
            if (time_remaining <= 1) {
                navigate(-1)
                dispatch(cinema_order_delete(filial, pre_order.uid))
            }
        }
    }, [dispatch, filial, navigate, uid_user, pre_order, time_remaining])

    useEffect(() => {
        if (uid_user === null) {
            if (refTitle.current !== null) {
                const {offsetHeight} = refTitle.current
                set_hall_height(app_height - offsetHeight)
            }
        } else {
            set_hall_height(app_height - HEADER_HEIGHT[1] - FOOTER_HEIGHT[1] - 65)
        }
    }, [app_height, uid_user, hall])

    if (seance !== undefined && hall !== null) {
        return (<>
            {uid_user !== null ? <SeanceMenu/> : null}
            <Fade in={checkout === 0} unmountOnExit>
                <Box id='content-box'>
                    <Box id='content-wrap'>
                        <Box id='content'>
                            <Box id='seance' sx={{
                                display: checkout ? 'none' : 'flex', alignItems: 'flex-start', height: '100%',
                            }}>
                                {uid_user === null ? <Box id='seance-title' ref={refTitle}>
                                    <Box className='order-panel'>
                                        <Button onClick={() => {
                                            navigate(-1)
                                            dispatch(cinema_order_delete(filial, pre_order.uid))
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
                                        {pre_order.items.length > 0 ? <Button sx={{height: '48px', marginLeft: '10px'}}
                                                                              variant="contained"
                                                                              className='seance-title-preorder'
                                                                              onClick={() => {
                                                                                  set_check_out(1)
                                                                              }}>
                                            <Box
                                                style={{
                                                    display: 'flex', flexDirection: 'column', marginRight: '20px'
                                                }}>
                                                <Box style={{
                                                    fontSize: '12px', fontWeight: '400'
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
                                </Box> : <></>}
                                <Box
                                    className={seance.canceled ? 'seance-canceled' : !seance.opened ? 'seance-closed' : null}
                                    sx={{
                                        width: '100%',
                                        position: 'relative',
                                        flex: 1,
                                        height: 'inherit',
                                        '--seance-state': seance.canceled ? '"Сеанс отменен"' : !seance.opened ? '"Сеанс закрыт"' : '""'
                                    }}>
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
                                        set_time_remaining={set_time_remaining}/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {pre_order.in_base || horder.in_base ? <Order/> : null}
                </Box>
            </Fade>
            <Fade in={checkout === 1} unmountOnExit>
                <Box style={{display: checkout ? 'block' : 'none', height: '100%'}}>
                    <CheckOut
                        set_check_out={set_check_out}
                        time_remaining={time_remaining}/>
                </Box>
            </Fade>
        </>)
    } else {
        return <Loader size={2}/>
    }
}

export default PageSeance