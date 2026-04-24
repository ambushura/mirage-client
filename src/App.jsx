import {useMemo} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Box, Button, Modal} from "@mui/material"
import {Navigate, Route, Routes} from "react-router-dom"

import Header from "./frontoffice/page/header/Header.jsx"
import Footer from "./frontoffice/page/footer/Footer.jsx"
import NotFound from "./frontoffice/page/body/NotFound.jsx"
import AppRoutes from "./AppRoutes.jsx"

import {
    Calc,
    CommentOrder,
    CommentPosition,
    Contact,
    Discounts,
    EgaisSettings,
    MarkHosts,
    Quantity,
    SeanceCancellation
} from "./frontoffice/forms/"

import {useSetSizeWindow} from "./ui/hooks/useSetSizeWindow.js"
import {useSetTopMenu} from "./ui/hooks/useSetTopMenu.js"
import {useReset} from "./frontoffice/hooks/useReset.js"
import {closeModal} from "./redux/interfaceReducer.js"
import MarkInfo from "./frontoffice/forms/markirovka/MarkInfo.jsx"
import HorecaFilters from "./frontoffice/page/body/admin/orders/horeca/HorecaFilters.jsx"
import CinemaFilters from "./frontoffice/page/body/admin/orders/cinema/CinemaFilters.jsx"
import ScheduleFilters from "./frontoffice/forms/schedule_filters/ScheduleFilters.jsx"
import Seance from "./frontoffice/forms/documents/Seance.jsx"
import KKTForm from "./frontoffice/page/body/admin/scheme/forms/KKTForm.jsx"
import PinpadForm from "./frontoffice/page/body/admin/scheme/forms/PinpadForm.jsx"
import {FilialForm} from "./frontoffice/page/body/admin/scheme/forms/FilialForm.jsx"
import {KitchenPointForm} from "./frontoffice/page/body/admin/scheme/forms/KitchenPointForm.jsx"
import {BilletCheckForm} from "./frontoffice/page/body/admin/scheme/forms/BilletCheckForm.jsx"
import {WorkplaceForm} from "./frontoffice/page/body/admin/scheme/forms/WorkplaceForm.jsx"
import TableOptions from "./frontoffice/forms/TableOptions.jsx"
import Dialog from "./frontoffice/forms/Dialog.jsx"
import {useSetCityAndFilial} from "./frontoffice/hooks/useSetCityAndFilial.js"
import StaffList from "./frontoffice/forms/StaffList.jsx"
import OthersPaymentTypes from "./frontoffice/page/right-panel/OthersPaymentTypes.jsx"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {LicenseInfo} from '@mui/x-license'
import OperationCloseShift from "./frontoffice/forms/OperationCloseShift.jsx"
import {useInactivityAction} from "./ui/hooks/useInactivityAction.js"
import KitchenPrint from "./frontoffice/forms/KitchenPrint.jsx"
import CenterHeaderTop from "./backoffice/CenterHeaderTop.jsx"
import CenterHeaderLeft from "./backoffice/CenterHeaderLeft.jsx"
import CenterHoreca from "./backoffice/pages/horeca/Center.jsx"
import CenterShift from "./backoffice/pages/shift/Center.jsx"
import {ScrollStyles} from "./ui/ThemeContext.jsx"
import Order from "./backoffice/pages/horeca/orders/Order.jsx"
import CenterCinema from "./backoffice/pages/cinema/Center.jsx"
import Recipe from "./backoffice/pages/horeca/Recipe.jsx"
import CenterResults from "./backoffice/pages/results/Center.jsx"
import ItemsMovement from "./backoffice/pages/horeca/ItemsMovement.jsx"

LicenseInfo.setLicenseKey('9f3cf429ff65365e1e59d830a6e7c994Tz0xMTgyODQsRT0xNzg3OTYxNTk5MDAwLFM9cHJvLExNPXN1YnNjcmlwdGlvbixQVj1RMy0yMDI0LEtWPTI=')

function App() {

    const dispatch = useDispatch()

    useSetCityAndFilial()
    useSetSizeWindow()
    useSetTopMenu()
    useReset()
    useInactivityAction()

    const {cities} = useSelector(state => state.data)
    const {modal_opened, modal_type, modal_props, need_update} = useSelector(state => state.interface)
    const param_date = useSelector(state => state.interface.params.param_date)
    const center = useSelector(state => state.auth.center)

    const ModalContent = useMemo(() => {
        const Component = ModalComponents[modal_type]
        return Component ? <Component props={modal_props}/> : null
    }, [modal_type, modal_props])

    const defaultRedirectKK = cities.length ? `/films/2/all/${param_date}/` : "/"

    if (center) {

        return <Box id="app">
            <CenterHeaderTop/>
            <CenterHeaderLeft/>
            <ScrollStyles/>
            <Box id='center-page'>
                <Routes>

                    <Route path="/center/shift/revenue" element={<CenterShift current_page={['shift', 'revenue']}/>}/>

                    <Route path="/center/shift/results" element={<CenterShift current_page={['shift', 'results']}/>}/>

                    <Route path="/center/shift/operations"
                           element={<CenterShift current_page={['shift', 'operations']}/>}/>

                    <Route path="/center/horeca/goods" element={<CenterHoreca current_page={['horeca', 'goods']}/>}/>

                    <Route path="/center/horeca/store_state"
                           element={<CenterHoreca current_page={['horeca', 'store_state']}/>}/>

                    <Route path="/center/horeca/store_production"
                           element={<CenterHoreca current_page={['horeca', 'store_production']}/>}/>

                    <Route path="/center/horeca/shift_state"
                           element={<CenterHoreca current_page={['horeca', 'shift_state']}/>}/>

                    <Route path="/center/horeca/orders"
                           element={<CenterHoreca current_page={['horeca', 'orders']}/>}/>

                    <Route path="/center/horeca/store_diff"
                           element={<CenterHoreca current_page={['horeca', 'store_diff']}/>}/>

                    <Route path="/center/cinema/orders" element={<CenterCinema current_page={['cinema', 'orders']}/>}/>

                    <Route path="/center/results/cashbox"
                           element={<CenterResults current_page={['results', 'cashbox']}/>}/>

                    <Route path="*" element={<NotFound/>}/>

                </Routes>
            </Box>
            <Modal
                keepMounted open={modal_opened}
                onClose={() => dispatch(closeModal())}>
                <Box id="modal">{ModalContent}</Box>
            </Modal>
        </Box>

    } else if (need_update) {

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

                <Route path="/" element={<Navigate replace to={defaultRedirectKK}/>}/>

                <Route path="/films/:param_city/:param_filial/:param_date"
                       element={<AppRoutes current_page="films"/>}/>

                <Route path="/film/:param_city/:param_filial/:param_date/:uid_film"
                       element={<AppRoutes current_page="film"/>}/>

                <Route path="/schedule/:param_city/:param_filial/:param_date"
                       element={<AppRoutes current_page="schedule"/>}/>

                <Route path="/seance/:param_city/:param_filial/:uid_seance"
                       element={<AppRoutes current_page="seance"/>}/>

                <Route path="/seance/:param_city/:param_filial" element={<Navigate replace to={defaultRedirectKK}/>}/>

                <Route path="/seance/:param_city/:param_filial/" element={<NotFound/>}/>

                <Route path="/mkitchen/:param_city/:param_filial/" element={<AppRoutes current_page="mkitchen"/>}/>

                <Route path="/kitchen/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="kitchen"/>}/>

                <Route path="/menu/:param_city/:param_filial/"
                       element={<AppRoutes current_page="menu"/>}/>

                <Route path="/admin/orders/cinema/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/orders/cinema"/>}/>

                <Route path="/admin/orders/horeca/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/orders/horeca"/>}/>

                <Route path="/admin/zbooks/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/zbooks"/>}/>

                <Route path="/admin/zbook/:param_city/:param_filial/:uid/"
                       element={<AppRoutes current_page="admin/zbook"/>}/>

                <Route path="/admin/receipt/:param_city/:param_filial/:uid/"
                       element={<AppRoutes current_page="admin/receipt"/>}/>

                <Route path="/admin/operations/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/operations"/>}/>

                <Route path="/admin/operation/:param_city/:param_filial/:uid"
                       element={<AppRoutes current_page="admin/operation"/>}/>

                <Route path="/admin/halls/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/halls"/>}/>

                <Route path="/admin/egais/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/egais"/>}/>

                <Route path="/admin/scheme/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/scheme"/>}/>

                <Route path="/admin/staff/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/staff"/>}/>

                <Route path="/admin/acquiring/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/acquiring"/>}/>

                <Route path="/admin/slip/:param_city/:param_filial/:uid/"
                       element={<AppRoutes current_page="admin/slip"/>}/>

                <Route path="/admin/z_acquiring/:param_city/:param_filial/:uid/"
                       element={<AppRoutes current_page="admin/z_acquiring"/>}/>

                <Route path="/admin/reports/:param_city/:param_filial/:param_date_admin/"
                       element={<AppRoutes current_page="admin/reports"/>}/>

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

export const ModalComponents = {
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
    seance_settings: Seance,
    equipment_billet_check: BilletCheckForm,
    equipment_filial: FilialForm,
    equipment_kitchen_point: KitchenPointForm,
    equipment_kkt: KKTForm,
    equipment_pinpad: PinpadForm,
    equipment_workplace: WorkplaceForm,
    seance_cancellation: SeanceCancellation,
    creator_change: StaffList,
    others_payment_types: OthersPaymentTypes,
    documents_operation_close_shift: OperationCloseShift,
    dialog_delete_order: Dialog,
    dialog_save_order: Dialog,
    dialog_delete_receipts: Dialog,
    dialog_delete_z_book: Dialog,
    dialog_delete_operation: Dialog,
    dialog_reboot: Dialog,
    dialog_shutdown: Dialog,
    kitchen_print: KitchenPrint,
    center_order_horeca: Order,
    center_recipe: Recipe,
    center_items_movement: ItemsMovement,
}