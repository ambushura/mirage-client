import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useParams, useSearchParams} from "react-router-dom"
import ScheduleMenu from "./cinema/schedule/ScheduleMenu"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import {setCitiesMenu, setCity, setCurrentPage, setFilial, setFilialsMenu, setTopMenu} from "../../redux/dataReducer"
import {fetchFilms, fetchFilmSeances, fetchHall, fetchSchedule, fetchSeance} from "../../async_actions/dataService"
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
const Body = () => {

    // Служебные функции
    const dispatch = useDispatch()
    const {param_city, param_filial, param_page} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    // Параметры адресной строки
    const date = searchParams.get("date")
    const uid_film = searchParams.get("film")
    const uid_seance = searchParams.get("seance")
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
    const halls = useSelector(state => state.halls.halls)
    const seance = useSelector(state => state.schedule.seance)
    const schedule_city = useSelector(state => state.schedule.schedule_city)
    const schedule_filial = useSelector(state => state.schedule.schedule_filial)

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
        if (current_page === 'films') {
            if (date !== null) {
                if (uid_seance === null) {
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
                } else {
                    dispatch(fetchSeance(filial, uid_seance))
                }
            }
        }
        return () => {
            if (current_page === 'films') {
                dispatch(setFilms([]))
                dispatch(setFilm(undefined))
                dispatch(setSeance(undefined))
            }
        }
    }, [dispatch, city, filial, current_page, date, uid_film, uid_seance])

    useEffect(() => {
        if (current_page === 'schedule') {
            if (date !== null) {
                if (city !== undefined && filial === undefined) {
                    dispatch(fetchSchedule(city.filials, date))
                } else if (city !== undefined && filial !== undefined) {
                    dispatch(fetchSchedule(filial, date))
                }
            }
        }
        return () => {
            if (current_page === 'schedule') {
                dispatch(setScheduleCity([]))
                dispatch(setScheduleFilial([]))
            }
        }
    }, [city, filial, current_page, date, dispatch])

    useEffect(() => {
        if (seance !== undefined) {
            if (halls.find(hall => hall.uid === seance.uid_hall) === undefined) {
                dispatch(fetchHall(filial, seance.uid_hall))
            }
        }
    }, [dispatch, filial, seance, halls])

    return <div id="box">
        <Fade in={cities.length !== 0 && seance === undefined}>
            <Box style={{height: cities.length !== 0 && seance === undefined ? `${app_height}px` : '0px'}}>
                <Header/>
                {['films', 'schedule'].find(el => el === current_page) !== undefined ?
                    <>
                        <ScheduleMenu
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}/>
                        <Box id="content" style={{height: `${app_height - 250}px`}}>
                            <div className="gradient-block-top"></div>
                            <Box id="content-wrap">
                                <Schedule/>
                            </Box>
                            <div className="gradient-block-bottom"></div>
                        </Box>
                    </> : <></>
                }
                <Footer/>
            </Box>
        </Fade>
        <Fade in={cities.length !== 0 && seance !== undefined}>
            {seance !== undefined ?
                <Box style={{height: `${app_height}px`}}>
                    <Seance/>
                </Box>
                : <div></div>
            }
        </Fade>
        <Fade in={cities.length === 0}>
            {cities.length === 0 ?
                <Box style={{height: cities.length === 0 ? `${app_height}px` : '0px'}}>
                    <Page404/>
                </Box>
                : <div></div>
            }
        </Fade>
    </div>
}
export default Body