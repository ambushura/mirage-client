import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import { theme } from "./ui/ui"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "dayjs/locale/ru"
import Body from "./layout/body/Body"
import Page404 from "./layout/body/Page404"
import { setAppHeight, setAppWidth } from "./redux/interfaceReducer"
import { useFetching } from "./hooks/useFetching"
import { HOST } from "./redux"
import { getCities } from "./redux/dataReducer"

function App() {

    const dispatch = useDispatch()
    const [citiesResponse] = useFetching(`http://${HOST}/api/get_cities`)
    const cities = useSelector((state) => state.data.cities)
    const appHeight = useSelector((state) => state.interface.app_height)

    useEffect(() => {
        if (!cities.length && citiesResponse) {
            dispatch(getCities(citiesResponse))
        }
    }, [cities, citiesResponse, dispatch])

    useEffect(() => {
        const updateDimensions = () => {
            dispatch(setAppWidth(window.innerWidth))
            dispatch(setAppHeight(window.innerHeight))
        }
        updateDimensions()
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [dispatch])

    useEffect(() => {
        const disableGesture = (e) => e.preventDefault()
        document.addEventListener("gesturestart", disableGesture)
        document.addEventListener("gesturechange", disableGesture)
        return () => {
            document.removeEventListener("gesturestart", disableGesture)
            document.removeEventListener("gesturechange", disableGesture)
        }
    }, [])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <div id="app" style={{ height: `${appHeight}px` }}>
                        <Routes>
                            <Route path="/" element={<Body />}>
                                <Route path=":param_page" element={<Page404 />}>
                                    <Route index element={<Page404 />} />
                                    <Route path=":param_city" element={<Body />}>
                                        <Route path=":param_filial" element={<Body />} />
                                    </Route>
                                </Route>
                            </Route>
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    )
}
export default App