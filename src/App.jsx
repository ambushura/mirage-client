import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Box} from "@mui/material"
import Header from "./page/header/Header.jsx"
import Footer from "./page/footer/Footer.jsx"
import {Navigate, Route, Routes} from "react-router-dom"
import NotFound from "./page/pages/NotFound.jsx"
import AppRoutes from "./AppRoutes.jsx"
import {setAppHeight, setAppWidth} from "./redux/interfaceReducer.js"
import {useSetCityAndFilial} from "./hooks/useSetCityAndFilial.js"

function App() {

    const dispatch = useDispatch()
    const cities = useSelector(state => state.data.cities)
    const current_page = useSelector(state => state.interface.current_page)
    const param_date = useSelector(state => state.schedule.param_date)
    const [full_screen, set_full_screen] = useState(false)
    const authenticated = useSelector(state => state.interface.authenticated)

    // Загружаем города
    useSetCityAndFilial()

    useEffect(() => {
        if (current_page === 'seance') {
            set_full_screen(true)
        } else {
            set_full_screen(false)
        }
    }, [current_page])

    // Отслеживаем изменение размеров окна браузера
    useEffect(() => {
        const updateDimensions = () => {
            dispatch(setAppWidth(window.innerWidth))
            dispatch(setAppHeight(window.innerHeight))
        }
        updateDimensions()
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [dispatch])

    return (
        <Box style={{height: '100%', overflow: 'hidden'}}>
            {!full_screen || authenticated === 1 ? <Header/> : <></>}
            <Routes>
                <Route path="/" element={<Navigate
                    to={cities.length > 0 ? `/films/${cities[0].code}/all/${param_date}/` : "/"}/>}/>
                <Route path="/films/:param_city/:param_filial/:param_date"
                       element={<AppRoutes current_page='films'/>}/>
                <Route path="/film/:param_city/:param_filial/:param_date/:uid_film"
                       element={<AppRoutes current_page='film'/>}/>
                <Route path="/schedule/:param_city/:param_filial/:param_date"
                       element={<AppRoutes current_page='schedule'/>}/>
                <Route path="/seance/:param_city/:param_filial/:uid_seance"
                       element={<AppRoutes current_page='seance'/>}/>
                <Route path="/mkitchen/:param_city/:param_filial/"
                       element={<AppRoutes current_page='mkitchen'/>}/>
                <Route path="/admin/:param_city/:param_filial/"
                       element={<AppRoutes current_page='admin'/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            {!full_screen || authenticated === 1 ? <Footer/> : <></>}
        </Box>
    )
}

export default App
