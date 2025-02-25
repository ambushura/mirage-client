import {useSelector} from "react-redux"
import {Box} from "@mui/material"
import Header from "./page/header/Header.jsx"
import Footer from "./page/footer/Footer.jsx"
import {Navigate, Route, Routes} from "react-router-dom"
import NotFound from "./page/pages/NotFound.jsx"
import AppRoutes from "./AppRoutes.jsx"
import {useSetCityAndFilial} from "./hooks/useSetCityAndFilial.js"
import {useSetSizeWindow} from "./hooks/useSetSizeWindow.js"
import {useSetTopMenu} from "./hooks/useSetTopMenu.js"
import {useFullScreen} from "./hooks/useFullScreen.js"
import {useSetWS} from "./hooks/useSetWS.js"
import {useReset} from "./hooks/useReset.js"

function App() {

    // Хуки
    useSetWS()
    useSetCityAndFilial()
    useSetSizeWindow()
    useSetTopMenu()
    useReset()

    const full = useFullScreen()

    // Данные из хранилища
    const cities = useSelector(state => state.data.cities)
    const param_date = useSelector(state => state.interface.params.param_date)
    const permissions = useSelector(state => state.auth.permissions)

    return (
        <Box style={{height: '100%', overflow: 'hidden'}}>
            {!full || permissions.includes("staff") ? <Header/> : <></>}
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
                <Route path="/seance/:param_city/:param_filial/"
                       element={<NotFound/>}/>
                <Route path="/mkitchen/:param_city/:param_filial/"
                       element={<AppRoutes current_page='mkitchen'/>}/>
                <Route path="/menu/:param_city/:param_filial/"
                       element={permissions.includes("staff") ? <AppRoutes current_page='menu'/> : <NotFound/>}/>
                <Route path="/admin/:param_city/:param_filial/"
                       element={permissions.includes("staff") ? <AppRoutes current_page='admin'/> : <NotFound/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            {!full || permissions.includes("staff") ? <Footer/> : <></>}
        </Box>
    )
}

export default App
