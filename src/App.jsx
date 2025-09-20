import {useMemo} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Box, Button, Modal} from "@mui/material"
import {Navigate, Route, Routes} from "react-router-dom"

import Header from "./page/header/Header.jsx"
import Footer from "./page/footer/Footer.jsx"
import NotFound from "./page/body/NotFound.jsx"
import AppRoutes from "./AppRoutes.jsx"

import {
    Calc, CommentOrder, CommentPosition, Contact, Discounts, EgaisSettings, MarkHosts, Quantity, SeanceCancellation
} from "./components/forms/"

import {useSetSizeWindow} from "./hooks/interface/useSetSizeWindow.js"
import {useSetTopMenu} from "./hooks/interface/useSetTopMenu.js"
import {useSetWS} from "./hooks/common/useSetWS.js"
import {useReset} from "./hooks/common/useReset.js"
import {closeModal} from "./redux/interfaceReducer.js"
import MarkInfo from "./components/forms/markirovka/MarkInfo.jsx"
import HorecaFilters from "./page/body/admin/orders/horeca/HorecaFilters.jsx"
import CinemaFilters from "./page/body/admin/orders/cinema/CinemaFilters.jsx"
import ScheduleFilters from "./components/forms/schedule_filters/ScheduleFilters.jsx"
import SeanceSettings from "./components/forms/SeanceSettings.jsx"
import KKTForm from "./page/body/admin/equipment/forms/KKTForm.jsx"
import PinpadForm from "./page/body/admin/equipment/forms/PinpadForm.jsx"
import {FilialForm} from "./page/body/admin/equipment/forms/FilialForm.jsx"
import {KitchenPointForm} from "./page/body/admin/equipment/forms/KitchenPointForm.jsx"
import {BilletCheckForm} from "./page/body/admin/equipment/forms/BilletCheckForm.jsx"
import {WorkplaceForm} from "./page/body/admin/equipment/forms/WorkplaceForm.jsx"
import TableOptions from "./components/forms/TableOptions.jsx"
import Dialog from "./components/forms/Dialog.jsx"
import Operation from "./page/body/admin/total/Operation.jsx"
import {useSetCityAndFilial} from "./hooks/common/useSetCityAndFilial.js"
import StaffList from "./components/forms/StaffList.jsx"
import OthersPaymentTypes from "./components/forms/OthersPaymentTypes.jsx"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

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
    const need_update = useSelector(state => state.interface.need_update)

    const modalComponents = {
        table_options: TableOptions,
        quantity: Quantity,
        comment_order: CommentOrder,
        comment_position: CommentPosition,
        calc: Calc,
        discounts: Discounts,
        add_contact: Contact,
        mark_hosts: MarkHosts,
        mark_info: MarkInfo,
        egais_settings: EgaisSettings,
        horeca_filters: HorecaFilters,
        cinema_filters: CinemaFilters,
        schedule_filters: ScheduleFilters,
        seance_settings: SeanceSettings,
        equipment_billet_check: BilletCheckForm,
        equipment_filial: FilialForm,
        equipment_kitchen_point: KitchenPointForm,
        equipment_kkt: KKTForm,
        equipment_pinpad: PinpadForm,
        equipment_workplace: WorkplaceForm,
        seance_cancellation: SeanceCancellation,
        dialog_delete_order: Dialog,
        dialog_save_order: Dialog,
        documents_operation: Operation,
        creator_change: StaffList,
        pinpads: OthersPaymentTypes,
    }

    const ModalContent = useMemo(() => {
        const Component = modalComponents[modal_type]
        return Component ? <Component props={modal_props}/> : null
    }, [modalComponents, modal_type, modal_props])

    const defaultRedirect = cities.length ? `/films/${cities[0].code}/all/${param_date}/` : "/"

    if (need_update) {
        return <div className="bgr-wrapper">
            <div className="bgr-wavy-bg"/>
            <Button sx={{borderRadius: '50%'}} color='secondary' className="bgr-glass-btn" onClick={() => {
                window.location.reload()
            }}><ArrowForwardIosIcon/></Button>
            <div className='bgr-message' style={{
                position: 'absolute', bottom: '50px', color: '#1C1F23', fontWeight: '400', zIndex: '1'
            }}>· Версия приложения была обновлена, нажмите на кнопку, чтобы продолжить работу ·
            </div>
        </div>
    } else {
        return <Box id="app">
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate replace to={defaultRedirect}/>}/>
                <Route path="/films/:param_city/:param_filial/:param_date"
                       element={<AppRoutes current_page="films"/>}/>
                <Route path="/film/:param_city/:param_filial/:param_date/:uid_film"
                       element={<AppRoutes current_page="film"/>}/>
                <Route path="/schedule/:param_city/:param_filial/:param_date"
                       element={<AppRoutes current_page="schedule"/>}/>
                <Route path="/seance/:param_city/:param_filial/:uid_seance"
                       element={<AppRoutes current_page="seance"/>}/>
                <Route path="/seance/:param_city/:param_filial" element={<Navigate replace to={defaultRedirect}/>}/>
                <Route path="/seance/:param_city/:param_filial/" element={<NotFound/>}/>
                <Route path="/mkitchen/:param_city/:param_filial/" element={<AppRoutes current_page="mkitchen"/>}/>
                <Route path="/kitchen/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="kitchen"/>}/>

                <Route path="/menu/:param_city/:param_filial/"
                       element={permissions.includes(0) ? <AppRoutes current_page="menu"/> : <NotFound/>}/>

                <Route path="/admin/orders/cinema/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/orders/cinema"/>}/>

                <Route path="/admin/orders/horeca/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/orders/horeca"/>}/>

                <Route path="/admin/zbooks/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/zbooks"/>}/>

                <Route path="/admin/operations/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/operations"/>}/>

                <Route path="/admin/halls/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/halls"/>}/>

                <Route path="/admin/egais/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/egais"/>}/>

                <Route path="/admin/equipment/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/equipment"/>}/>

                <Route path="/admin/staff/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/staff"/>}/>

                <Route path="/admin/acquiring/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/acquiring"/>}/>

                <Route path='/second_screen/:param_city/:param_filial/:param_date/'
                       element={<AppRoutes current_page="second_screen"/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
            <Modal
                keepMounted open={modal_opened}
                onClose={() => dispatch(closeModal())}>
                <Box id="modal">{ModalContent}</Box>
            </Modal>
        </Box>
    }
}

export default App