import {useDispatch, useSelector} from "react-redux"
import {Box, Modal} from "@mui/material"
import {Navigate, Route, Routes} from "react-router-dom"

import Header from "./page/header/Header.jsx"
import Footer from "./page/footer/Footer.jsx"
import NotFound from "./page/pages/NotFound.jsx"
import AppRoutes from "./AppRoutes.jsx"

import {useSetCityAndFilial} from "./hooks/common/useSetCityAndFilial.js"
import {useSetSizeWindow} from "./hooks/interface/useSetSizeWindow.js"
import {useSetTopMenu}from "./hooks/interface/useSetTopMenu.js"
import {useFullScreen}from "./hooks/interface/useFullScreen.js"
import {useSetWS}from "./hooks/common/useSetWS.js"
import {useReset}from "./hooks/common/useReset.js"
import {closeModal} from "./redux/interfaceReducer.js"
import Quantity from "./components/modal/Quantity.jsx"
import Comment from "./components/modal/Comment.jsx"
import {useEffect, useState} from "react"
import Payment from "./components/modal/Payment.jsx"

function App() {

    const dispatch = useDispatch()

    // Хуки
    useSetWS()
    useSetCityAndFilial()
    useSetSizeWindow()
    useSetTopMenu()
    useReset()
    const full = useFullScreen()

    // Данные из хранилища
    const permissions = useSelector(state => state.auth.permissions)
    const cities = useSelector(state => state.data.cities)
    const param_date = useSelector(state => state.interface.params.param_date)

    // Модальное окно
    const modal_opened = useSelector(state => state.interface.modal_opened)
    const modal_type = useSelector(state => state.interface.modal_type)
    const modal_props = useSelector(state => state.interface.modal_props)
    const [modal_window, set_modal_window] = useState(<></>)
    useEffect(() => {
        if (modal_type === 'quantity') {
            set_modal_window(<Quantity param={modal_props}/>)
        } else if (modal_type === 'comment') {
            set_modal_window(<Comment param={modal_props}/>)
        } else if (modal_type === 'payment') {
            set_modal_window(<Payment param={modal_props}/>)
        }
    }, [modal_type, modal_props])

    return (
        <Box id="app">
            {(!full || permissions.includes("staff")) && <Header/>}
            <Routes>
                <Route path="/" element={<Navigate replace
                                                   to={cities.length > 0 ? `/films/${cities[0].code}/all/${param_date}/` : `/`}/>}/>
                <Route path="/films/:param_city/:param_filial/:param_date" element={<AppRoutes current_page="films"/>}/>
                <Route path="/film/:param_city/:param_filial/:param_date/:uid_film"
                       element={<AppRoutes current_page="film"/>}/>
                <Route path="/schedule/:param_city/:param_filial/:param_date"
                       element={<AppRoutes current_page="schedule"/>}/>
                <Route path="/seance/:param_city/:param_filial/:uid_seance"
                       element={<AppRoutes current_page="seance"/>}/>
                <Route path="/seance/:param_city/:param_filial/" element={<NotFound/>}/>
                <Route path="/mkitchen/:param_city/:param_filial/" element={<AppRoutes current_page="mkitchen"/>}/>
                <Route path="/menu/:param_city/:param_filial/"
                       element={permissions.includes("staff") ? <AppRoutes current_page="menu"/> : <NotFound/>}/>
                <Route path="/admin/:param_city/:param_filial/"
                       element={permissions.includes("staff") ? <AppRoutes current_page="admin"/> : <NotFound/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            {(!full || permissions.includes("staff")) && <Footer/>}
            <Modal open={modal_opened} onClose={() => dispatch(closeModal())}>
                <Box id="modal">
                    {modal_window}
                </Box>
            </Modal>
        </Box>
    )
}

export default App