import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import Hall from "../halls/Hall"
import {Box, Button, LinearProgress} from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import dayjs from "dayjs"
import {v4} from 'uuid'
import {deletePreOrder, fetchBooking, fetchPreOrder} from "../../../../async_actions/dataService"
import {setCurrentOrder, setCurrentPreOrder} from "../../../../redux/ordersReducer"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {NavLink, useNavigate} from "react-router-dom"
const Seance = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Высота, ширина для схемы зала
    const app_height = useSelector(state => state.interface.app_height)
    const refTitle = useRef(null)
    const [hall_height, set_hall_height] = useState(0)
    const app_width = useSelector(state => state.interface.app_width)

    // Данные о сеансе-зале
    const seance = useSelector(state => state.schedule.seance)
    const beginning = dayjs(seance.beginning.replace('Z', ''))
    const ending = dayjs(seance.ending.replace('Z', ''))
    const halls = useSelector(state => state.halls.halls)
    const [hall, set_hall] = useState(undefined)

    // Изменяем высоту при изменении размеров окна
    useEffect(() => {
        if (refTitle.current) {
            const {offsetHeight} = refTitle.current
            set_hall_height(app_height - offsetHeight)
        }
    }, [app_height, hall])

    // Находим зал из массива залов
    useEffect(() => {
        if (hall === undefined) {
            const current_hall = halls.find(hall => hall.uid === seance.uid_hall)
            if (current_hall !== undefined) {
                set_hall(current_hall)
            }
        }
    }, [hall, halls, seance])

    // Заказ и брони
    const order = useSelector(state => state.orders.order)
    const pre_order = useSelector(state => state.orders.pre_order)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const booking = useSelector(state => state.schedule.booking)
    const [count_book, set_count_book] = useState(0)
    useEffect(() => {
        if (filial !== undefined && seance !== undefined && order.uid !== undefined) {
            dispatch(fetchBooking(filial, seance.uid, order.uid))
            dispatch(fetchPreOrder(filial, order.uid))
            set_time_remaining(100)
        }
    }, [dispatch, filial, seance, order.uid, count_book])

    // При открытии страницы сеанса создаем новый заказ
    useEffect(() => {
        if (order.uid === undefined) {
            dispatch(setCurrentOrder({uid: v4(), price: 0, count: 0, books: []}))
            dispatch(setCurrentPreOrder({uid: v4(), price: 0, count: 0, books: []}))
        }
        return () => {
            dispatch(setCurrentOrder({uid: v4(), price: 0, count: 0, books: []}))
            dispatch(setCurrentPreOrder({uid: v4(), price: 0, count: 0, books: []}))
        }
    }, [])

    // Таймер для действий
    const [time_remaining, set_time_remaining] = useState(100)
    useEffect(() => {
        const timer = setInterval(() => {
            set_time_remaining((prevTimeRemaining) => (prevTimeRemaining - 1))
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        if (time_remaining <= 1) {
            navigate(`/films/${city.code}/${filial.eais}/`)
            dispatch(deletePreOrder(filial, order.uid))
        }
    }, [navigate, time_remaining])

    const ticket_count = (count) => {
        if (count === 1) {
            return (`${count} билет`)
        } else if (count === 2 || count === 3 || count === 4) {
            return (`${count} билета`)
        } else {
            return (`${count} билетов`)
        }
    }

    return (
        <Box id='seance'>
            {hall !== undefined ?
                <>
                    <Box id='seance-title' ref={refTitle}>
                        <div className='seance-panel'>
                            <NavLink to={`/films/${city.code}/${filial.eais}/?film=${seance.uid_film}`} onClick={() => {
                                dispatch(deletePreOrder(filial, order.uid))
                            }}><Button
                                variant="contained" color="secondary"><KeyboardArrowLeftIcon/>Назад</Button></NavLink>
                            <Box sx={{width: '100%'}}>
                                <LinearProgress
                                    sx={{
                                        height: '100%',
                                        borderRadius: '12px'
                                    }} value={time_remaining} variant="determinate"/>
                            </Box>
                        </div>
                        <div className='seance-title-film-name'>{seance.name_film}</div>
                        <div className='seance-title-hall-name'>{hall.name}</div>
                        <div className='seance-title-panel'>
                            <div className='seance-title-timeslot'>
                                <div className='seance-title-timeslot-day'>{}</div>
                                <div>{String(beginning.$H).padStart(2, '0')}:{String(beginning.$m).padStart(2, '0')} - {String(ending.$H).padStart(2, '0')}:{String(ending.$m).padStart(2, '0')}</div>
                            </div>
                            {pre_order.books.length > 0 ?
                                <Button variant="contained" className='seance-title-preorder' style={{height: '60px'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', marginRight: '20px'}}>
                                        <div style={{fontSize: '12px', fontWeight: '400'}}>{ticket_count(pre_order.count)}</div>
                                        <div style={{fontWeight: 'bold', fontSize: '18px'}}>{pre_order.price} P</div>
                                    </div>
                                    <div style={{verticalAlign: 'center', textAlign: 'center', display: 'flex', fontWeight: 'bold'}}>
                                        <div>Продолжить</div>
                                        <KeyboardArrowRightIcon/>
                                    </div>
                                </Button> : <></>}
                        </div>
                        <div>Здесь будет располагаться легенда с тарифами</div>
                    </Box>
                    <Hall
                        filial={filial}
                        order={order}
                        hall={hall}
                        seance={seance}
                        height={hall_height}
                        width={app_width}
                        booking={booking}
                        set_count_book={set_count_book}
                    />
                </>
                : <></>}
        </Box>
    )
}
export default Seance