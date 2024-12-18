import {useDispatch, useSelector} from "react-redux"
import React, {useEffect} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {ThemeProvider} from "@mui/material"
import {theme} from "./ui/ui"
import {LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import 'dayjs/locale/ru'
import Body from "./layout/body/Body"
import Page404 from "./layout/body/Page404"
import {setAppHeight, setAppWidth} from "./redux/interfaceReducer"
import {useFetching} from "./hooks/useFetching"
import {HOST} from "./redux"
import {getCities} from "./redux/dataReducer"
function App() {

    const dispatch = useDispatch()
    // Подгрузка городов кинокомплкесов
    const [cities_response, cities_error, cities_loading] = useFetching(`http://${HOST}/api/get_cities`)
    const cities = useSelector(state => state.data.cities)
    useEffect(() => {
        if (cities.length === 0 && cities_response !== null) {
            dispatch(getCities(cities_response))
        }
    })
    // Ширина окна приложения
    const app_width = useSelector(state => state.interface.app_width)
    const app_height = useSelector(state => state.interface.app_height)
    useEffect(() => {
        if (app_width === undefined) {
            dispatch(setAppWidth(window.innerWidth))
        }
        if (app_height === undefined) {
            dispatch(setAppHeight(window.innerHeight))
        }
        const handleResize = () => {
            dispatch(setAppWidth(window.innerWidth))
            dispatch(setAppHeight(window.innerHeight))
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [app_height, app_width, dispatch])
    // Масштабирование запрещаем
    useEffect(() => {
        const preventZoom = (e) => {
            if (e.ctrlKey || e.metaKey || e.deltaY) {
                e.preventDefault()
            }
        }
        //document.addEventListener("wheel", preventZoom, { passive: false })
        document.addEventListener("gesturestart", (e) => e.preventDefault())
        document.addEventListener("gesturechange", (e) => e.preventDefault())
        //document.addEventListener("contextmenu", (e) => {e.preventDefault()})
        return () => {
            document.removeEventListener("wheel", preventZoom)
            document.removeEventListener("gesturestart", (e) => e.preventDefault())
            document.removeEventListener("gesturechange", (e) => e.preventDefault())
            document.removeEventListener("contextmenu", (e) => {e.preventDefault()})
        }
    }, [])
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <div id="app" style={{height: `${app_height}px`}}>
                        <Routes>
                            <Route path='/' element={<Body/>}>
                                <Route path=':param_page' element={<Page404/>}>
                                    <Route index element={<Page404/>}/>
                                    <Route path=':param_city' element={<Body/>}>
                                        <Route path=':param_filial' element={<Body/>}/>
                                    </Route>
                                </Route>
                            </Route>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    )
}
export default App
