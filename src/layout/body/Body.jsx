import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useParams, useSearchParams} from "react-router-dom"
import ScheduleMenu from "./cinema/schedule/ScheduleMenu"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import {setCitiesMenu, setCity, setCurrentPage, setFilial, setFilialsMenu, setTopMenu} from "../../redux/dataReducer"
import {
    fetchFilms,
    fetchFilmSeances,
    fetchHall,
    fetchPreOrder,
    fetchSchedule,
    fetchSeance
} from "../../async_actions/dataService"
import {
    setFilm,
    setFilms,
    setScheduleCity,
    setScheduleDateShift,
    setScheduleFilial,
    setSeance
} from "../../redux/scheduleReducer"
import dayjs from "dayjs"
import Schedule from "../body/cinema/schedule/Schedule"
import Page404 from "./Page404"
import {Box, Fade} from "@mui/material"
import Seance from "./cinema/seances/Seance"
import {setCurrentPreOrder} from "../../redux/ordersReducer"
import CheckOut from "./orders/CheckOut"
const Body = () => {

    // Служебные функции
    const dispatch = useDispatch()
    const {param_city, param_filial, param_page} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    // Параметры адресной строки
    const date = searchParams.get("date")
    const uid_film = searchParams.get("film")
    const uid_seance = searchParams.get("seance")
    const uid_order = searchParams.get("order")
    // Параметры адресной строки для установки
    const schedule_date = useSelector(state => state.schedule.date_param)
    // Геолокация
    const cities = useSelector(state => state.data.cities)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    // Интерфейс
    const app_height = useSelector(state => state.interface.app_height)
    const current_page = useSelector(state => state.data.current_page)
    const top_menu = useSelector(state => state.data.top_menu)
    // Данные
    const films = useSelector(state => state.schedule.films)
    const film = useSelector(state => state.schedule.film)
    const schedule_city = useSelector(state => state.schedule.schedule_city)
    const schedule_filial = useSelector(state => state.schedule.schedule_filial)
    const halls = useSelector(state => state.halls.halls)
    const seance = useSelector(state => state.schedule.seance)
    const pre_order = useSelector(state => state.orders.pre_order)

    // Текущая страница
    useEffect(() => {
        if (param_page !== undefined) {
            dispatch(setCurrentPage(param_page))
        }
    }, [dispatch, param_page])

    // Город, филиал по умолчанию
    useEffect(() => {
        // Установка города
        if (param_city !== undefined) {
            const city = cities.find(city => city.code === param_city)
            if (city !== undefined) {
                dispatch(setCity(city))
            } else {
                dispatch(setCity(cities[0]))
            }
        } else (
            dispatch(setCity(cities[0]))
        )
        // Установка филиала
        if (city !== undefined) {
            if (param_filial !== undefined) {
                const filial = city.filials.find(filial => filial.eais === param_filial)
                if (filial !== undefined) {
                    dispatch(setFilial(filial))
                } else {
                    dispatch(setFilial(undefined))
                }
            } else {
                dispatch(setFilial(undefined))
            }
        }
    }, [dispatch, cities, param_city, city, param_filial])

    // Меню выбора города, филиала
    useEffect(() => {
        let cities_menu = []
        cities.forEach(city => {
            cities_menu.push({
                name: city.name,
                code: city.code,
                uid: city.uid,
                path: `/${current_page}/${city.code}/}`
            })
        })
        dispatch(setCitiesMenu(cities_menu))
        if (city !== undefined) {
            let filials_menu = []
            city.filials.forEach(filial => {
                filials_menu.push({
                    name: filial.name,
                    eais: filial.eais,
                    uid: filial.uid,
                    path: `/${current_page}/${city.code}/${filial.eais}/`
                })
            })
            filials_menu.push({
                name: 'Все кинотеатры',
                eais: undefined,
                uid: undefined,
                path: `/${current_page}/${city.code}/}`
            })
            dispatch(setFilialsMenu(filials_menu))
        }
    }, [dispatch, cities, city, current_page])

    // Главное меню
    useEffect(() => {
        if (city === undefined) {
            return
        }
        const top_menu_array = []
        JSON.parse(JSON.stringify(top_menu)).forEach(el => {
            top_menu_array.push({
                ...el,
                path: `/${el.id}/${city.code}/${filial !== undefined ? filial.eais + '/' : ''}`
            })
        })
        dispatch(setTopMenu(top_menu_array))
    }, [dispatch, city, filial])

    // Дата смены по умолчанию
    useEffect(() => {
        if (['films', 'schedule'].find(el => el === current_page) !== undefined) {
            if (date === null) {
                setSearchParams(prev => {
                    prev.set('date', schedule_date)
                    return prev
                })
            } else {
                dispatch(setScheduleDateShift(dayjs(date)))
            }
        } else {
            setSearchParams(prev => {
                prev.delete('date')
                return prev
            })
        }
    }, [dispatch, current_page, date, schedule_date, setSearchParams])

    useEffect(() => {
        switch (current_page) {
            case 'films':
                dispatch(setFilms([]))
                dispatch(setFilm(undefined))
                if (date !== null) {
                    if (uid_film === null) {
                        if (city !== undefined && filial === undefined) {
                            dispatch(fetchFilms(city.filials, date))
                        } else if (city !== undefined && filial !== undefined) {
                            dispatch(fetchFilms(filial, date))
                        }
                    } else {
                        if (city !== undefined && filial === undefined) {
                            dispatch(fetchFilmSeances(city.filials, date, uid_film))
                        } else if (city !== undefined && filial !== undefined) {
                            dispatch(fetchFilmSeances(filial, date, uid_film))
                        }
                    }
                }
                break
            case 'seance':
                dispatch(setSeance(undefined))
                if (uid_seance !== null) {
                    dispatch(fetchSeance(filial, uid_seance))
                }
            case 'schedule':
                dispatch(setScheduleCity([]))
                dispatch(setScheduleFilial([]))
                if (date !== null) {
                    if (city !== undefined && filial === undefined) {
                        dispatch(fetchSchedule(city.filials, date))
                    } else if (city !== undefined && filial !== undefined) {
                        dispatch(fetchSchedule(filial, date))
                    }
                }
                break
            case 'checkout':
                setCurrentPreOrder(undefined)
                if (uid_order !== null) {
                    dispatch(fetchPreOrder(filial, uid_order))
                }
                break
            default:
                break
        }
    }, [dispatch, city, filial, current_page, date, uid_film, uid_seance, uid_order])

    // Подгрузка залов
    useEffect(() => {
        if (seance !== undefined) {
            if (halls.find(hall => hall.uid === seance.uid_hall) === undefined) {
                dispatch(fetchHall(filial, seance.uid_hall))
            }
        }
    }, [dispatch, filial, seance, halls])

    // [0] страница 404
    // [1] расписание/фильмы
    // [2] сеанс
    // [3] чекаут
    const [page, set_page] = useState([true, false, false, false])
    useEffect(() => {
        if (cities.length === 0) {
            set_page([true, false, false, false])
        } else {
            switch (current_page) {
                case ['films', 'schedule'].find(el => el === current_page):
                    set_page([false, true, false, false])
                    break
                case 'seance':
                    if (seance !== undefined && uid_seance !== null) {
                        set_page([false, false, true, false])
                    }
                    break
                case 'checkout':
                    if (pre_order !== undefined) {
                        set_page([false, false, false, true])
                    }
                    break
                default:
                    break
            }
        }
    }, [cities, current_page, film, films, pre_order, schedule_city, schedule_filial, seance, uid_seance])

    return <div id="box">
        <Fade in={page[0]}>
            {page[0] ?
                <Box style={{height: page[0] ? `${app_height}px` : '0px'}}>
                    <Page404/>
                </Box>
                : <Box></Box>
            }
        </Fade>
        <Fade in={page[1]}>
            {page[1] ?
                <Box style={{height: page[1] ? `${app_height}px` : '0px'}}>
                    <Header/>
                    <ScheduleMenu
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}/>
                    <Box id="content" style={{height: `${app_height - 250}px`}}>
                        <div className="gradient-block-top"></div>
                        <div className="gradient-block-left"></div>
                        <Box id="content-wrap">
                            <Schedule/>
                        </Box>
                        <div className="gradient-block-right"></div>
                        <div className="gradient-block-bottom"></div>
                    </Box>
                    <Footer/>
                </Box>
                : <Box></Box>}
        </Fade>
        <Fade in={page[2]}>
            {page[2] ?
                <Box style={{height: page[2] ? `${app_height}px` : '0px'}}>
                    <Seance/>
                </Box>
                : <Box></Box>
            }
        </Fade>
        <Fade in={page[3]}>
            {page[3] ?
                <Box style={{height: page[3] ? `${app_height}px` : '0px'}}>
                    <CheckOut/>
                </Box>
                : <Box></Box>}
        </Fade>
    </div>
}
export default Body