import {useMemo} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Box, Modal} from "@mui/material"
import {Navigate, Route, Routes} from "react-router-dom"

import Header from "./page/header/Header.jsx"
import Footer from "./page/footer/Footer.jsx"
import NotFound from "./page/body/NotFound.jsx"
import AppRoutes from "./AppRoutes.jsx"

import {
    Calc,
    CommentOrder,
    CommentPosition,
    Contact,
    Discounts,
    Egais,
    EgaisSettings,
    Mark,
    MarkHosts,
    Quantity
} from "./components/forms/"

import {useSetCityAndFilial} from "./hooks/common/useSetCityAndFilial.js"
import {useSetSizeWindow} from "./hooks/interface/useSetSizeWindow.js"
import {useSetTopMenu} from "./hooks/interface/useSetTopMenu.js"
import {useSetWS} from "./hooks/common/useSetWS.js"
import {useReset} from "./hooks/common/useReset.js"

import {closeModal} from "./redux/interfaceReducer.js"
import MarkInfo from "./components/forms/markirovka/MarkInfo.jsx"
import HorecaFilters from "./page/body/admin/orders/horeca/HorecaFilters.jsx"
import CinemaFilters from "./page/body/admin/orders/cinema/CinemaFilters.jsx"

function App() {

    const dispatch = useDispatch()

    useSetWS()
    useSetCityAndFilial()
    useSetSizeWindow()
    useSetTopMenu()
    useReset()

    const {permissions} = useSelector(state => state.auth)
    const {cities} = useSelector(state => state.data)
    const {modal_opened, modal_type, modal_props} = useSelector(state => state.interface)
    const param_date = useSelector(state => state.interface.params.param_date)

    const modalComponents = {
        quantity: Quantity,
        comment_order: CommentOrder,
        comment_position: CommentPosition,
        calc: Calc,
        discounts: Discounts,
        add_contact: Contact,
        mark: Mark,
        mark_hosts: MarkHosts,
        mark_info: MarkInfo,
        egais: Egais,
        egais_settings: EgaisSettings,
        horeca_filters: HorecaFilters,
        cinema_filters: CinemaFilters,
    }

    const ModalContent = useMemo(() => {
        const Component = modalComponents[modal_type]
        return Component ? <Component props={modal_props}/> : null
    }, [modal_type, modal_props])

    const defaultRedirect = cities.length
        ? `/films/${cities[0].code}/all/${param_date}/`
        : "/"

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
                <Route path="/kitchen/:param_city/:param_filial/" element={<AppRoutes current_page="kitchen"/>}/>

                <Route path="/menu/:param_city/:param_filial/" element={
                    permissions.includes(0)
                        ? <AppRoutes current_page="menu"/>
                        : <NotFound/>
                }/>

                <Route path="/admin/orders/cinema/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/orders/cinema"/>}/>
                <Route path="/admin/orders/horeca/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/orders/horeca"/>}/>
                <Route path="/admin/zbooks/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/zbooks"/>}/>
                <Route path="/admin/zbooks/:param_city/all/:param_date_admin/"
                       element={<NotFound/>}/>
                <Route path="/admin/operations/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/operations"/>}/>
                <Route path="/admin/operations/:param_city/all/:param_date_admin/"
                       element={<NotFound/>}/>
                <Route path="/admin/halls/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/halls"/>}/>
                <Route path="/admin/egais/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/egais"/>}/>
                <Route path="/admin/egais/:param_city/all/:param_date_admin/"
                       element={<NotFound/>}/>
                <Route path="/admin/equipment/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/equipment"/>}/>
                <Route path="/admin/staff/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/staff"/>}/>
                <Route path="/admin/staff/:param_city/all/:param_date_admin/"
                       element={<NotFound/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
            <Modal keepMounted open={modal_opened} onClose={() => dispatch(closeModal())}>
                <Box id="modal">{ModalContent}</Box>
            </Modal>
        </Box>
    )
}

export default App