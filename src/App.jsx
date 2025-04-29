import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Modal } from "@mui/material"
import { Routes, Route, Navigate } from "react-router-dom"

import Header from "./page/header/Header.jsx"
import Footer from "./page/footer/Footer.jsx"
import NotFound from "./page/pages/NotFound.jsx"
import AppRoutes from "./AppRoutes.jsx"

import { useSetCityAndFilial } from "./hooks/common/useSetCityAndFilial.js"
import { useSetSizeWindow } from "./hooks/interface/useSetSizeWindow.js"
import { useSetTopMenu } from "./hooks/interface/useSetTopMenu.js"
import { useSetWS } from "./hooks/common/useSetWS.js"
import { useReset } from "./hooks/common/useReset.js"

import { closeModal } from "./redux/interfaceReducer.js"
import Quantity from "./components/modal/Quantity.jsx"
import Comment from "./components/modal/Comment.jsx"
import Calc from "./components/modal/Calc.jsx"

function App() {
    const dispatch = useDispatch()

    // Инициализация хуков
    useSetWS()
    useSetCityAndFilial()
    useSetSizeWindow()
    useSetTopMenu()
    useReset()

    // Данные из стора
    const {permissions} = useSelector(state => state.auth)
    const {cities} = useSelector(state => state.data)
    const {modal_opened, modal_type, modal_props} = useSelector(state => state.interface)
    const param_date = useSelector(state => state.interface.params.param_date)
    const [modalContent, setModalContent] = useState(null)

    // Обновление содержимого модального окна
    useEffect(() => {
        switch (modal_type) {
            case 'quantity':
                setModalContent(<Quantity param={modal_props}/>)
                break
            case 'comment':
                setModalContent(<Comment param={modal_props}/>)
                break
            case 'calc':
                setModalContent(<Calc/>)
                break
            default:
                setModalContent(null)
        }
    }, [modal_type, modal_props])

    const defaultRedirect = cities.length > 0
        ? `/films/${cities[0].code}/all/${param_date}/`
        : `/`

    return (
        <Box id="app">
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate replace to={defaultRedirect}/>}/>
                <Route path="/films/:param_city/:param_filial/:param_date" element={<AppRoutes current_page="films"/>}/>
                <Route path="/film/:param_city/:param_filial/:param_date/:uid_film"
                       element={<AppRoutes current_page="film"/>}/>
                <Route path="/schedule/:param_city/:param_filial/:param_date"
                       element={<AppRoutes current_page="schedule"/>}/>
                <Route path="/seance/:param_city/:param_filial/:uid_seance"
                       element={<AppRoutes current_page="seance"/>}/>
                <Route path="/seance/:param_city/:param_filial" element={<Navigate replace to={defaultRedirect}/>}/>
                <Route path="/seance/:param_city/:param_filial/" element={<NotFound/>}/>
                <Route path="/mkitchen/:param_city/:param_filial/" element={<AppRoutes current_page="mkitchen"/>}/>
                <Route path="/menu/:param_city/:param_filial/"
                       element={permissions.includes(0) ? <AppRoutes current_page="menu"/> : <NotFound/>}/>
                <Route path="/admin/orders/cinema/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/orders/cinema"/>}/>
                <Route path="/admin/orders/horeca/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/orders/horeca"/>}/>
                <Route path="/admin/total/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/total"/>}/>
                <Route path="/admin/halls/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/halls"/>}/>
                <Route path="/admin/equipment/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/equipment"/>}/>
                <Route path="/kitchen/:param_city/:param_filial/" element={<AppRoutes current_page="kitchen"/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
            <Modal keepMounted open={modal_opened} onClose={() => dispatch(closeModal())}>
                <Box id="modal">
                    {modalContent}
                </Box>
            </Modal>
        </Box>
    )
}

export default App