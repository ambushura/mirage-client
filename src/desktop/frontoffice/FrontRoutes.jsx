import { Box, Modal } from '@mui/material'
import Header from './page/header/Header.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import FrontOffice from './FrontOffice.jsx'
import NotFound from './page/body/NotFound.jsx'
import Footer from './page/footer/Footer.jsx'
import { closeModal } from '../../redux/frontoffice/interfaceReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useSetTopMenu } from '../../ui/hooks/useSetTopMenu.js'
import TableOptions from './forms/TableOptions.jsx'
import {
    Calc,
    CommentOrder,
    CommentPosition,
    Contact,
    Discounts,
    EgaisSettings,
    MarkHosts,
    Quantity,
    SeanceCancellation,
} from './forms/index.js'
import MarkInfo from './forms/markirovka/MarkInfo.jsx'
import HorecaFilters from './page/body/admin/orders/horeca/HorecaFilters.jsx'
import CinemaFilters from './page/body/admin/orders/cinema/CinemaFilters.jsx'
import ScheduleFilters from './forms/schedule_filters/ScheduleFilters.jsx'
import Seance from './forms/documents/Seance.jsx'
import { BilletCheckForm } from './page/body/admin/scheme/forms/BilletCheckForm.jsx'
import { FilialForm } from './page/body/admin/scheme/forms/FilialForm.jsx'
import { KitchenPointForm } from './page/body/admin/scheme/forms/KitchenPointForm.jsx'
import KKTForm from './page/body/admin/scheme/forms/KKTForm.jsx'
import PinpadForm from './page/body/admin/scheme/forms/PinpadForm.jsx'
import { WorkplaceForm } from './page/body/admin/scheme/forms/WorkplaceForm.jsx'
import StaffList from './forms/StaffList.jsx'
import OthersPaymentTypes from './page/right-panel/OthersPaymentTypes.jsx'
import OperationCloseShift from './forms/OperationCloseShift.jsx'
import Dialog from './forms/Dialog.jsx'
import KitchenPrint from './forms/KitchenPrint.jsx'

const ModalComponents = {
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
}

const FrontRoutes = () => {
    const dispatch = useDispatch()

    useSetTopMenu()

    const { modal_opened, modal_type, modal_props } = useSelector((state) => state.interface)
    const ModalContent = useMemo(() => {
        const Component = ModalComponents[modal_type]
        return Component ? <Component props={modal_props} /> : null
    }, [modal_type, modal_props])

    const { cities } = useSelector((state) => state.data)
    const param_date = useSelector((state) => state.interface.params.param_date)
    const defaultRedirectKK = cities.length ? `/films/2/all/${param_date}/` : '/'

    return (
        <Box id="app">
            <Header />
            <Routes>
                <Route path="/" element={<Navigate replace to={defaultRedirectKK} />} />

                <Route path="/films/:param_city/:param_filial/:param_date" element={<FrontOffice current_page="films" />} />

                <Route path="/film/:param_city/:param_filial/:param_date/:uid_film" element={<FrontOffice current_page="film" />} />

                <Route path="/schedule/:param_city/:param_filial/:param_date" element={<FrontOffice current_page="schedule" />} />

                <Route path="/seance/:param_city/:param_filial/:uid_seance" element={<FrontOffice current_page="seance" />} />

                <Route path="/seance/:param_city/:param_filial" element={<Navigate replace to={defaultRedirectKK} />} />

                <Route path="/seance/:param_city/:param_filial/" element={<NotFound />} />

                <Route path="/mkitchen/:param_city/:param_filial/" element={<FrontOffice current_page="mkitchen" />} />

                <Route path="/kitchen/:param_city/:param_filial/:param_date_admin/" element={<FrontOffice current_page="kitchen" />} />

                <Route path="/menu/:param_city/:param_filial/" element={<FrontOffice current_page="menu" />} />

                <Route
                    path="/admin/orders/cinema/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontOffice current_page="admin/orders/cinema" />}
                />

                <Route
                    path="/admin/orders/horeca/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontOffice current_page="admin/orders/horeca" />}
                />

                <Route
                    path="/admin/zbooks/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontOffice current_page="admin/zbooks" />}
                />

                <Route path="/admin/zbook/:param_city/:param_filial/:uid/" element={<FrontOffice current_page="admin/zbook" />} />

                <Route path="/admin/receipt/:param_city/:param_filial/:uid/" element={<FrontOffice current_page="admin/receipt" />} />

                <Route
                    path="/admin/operations/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontOffice current_page="admin/operations" />}
                />

                <Route path="/admin/operation/:param_city/:param_filial/:uid" element={<FrontOffice current_page="admin/operation" />} />

                <Route
                    path="/admin/halls/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontOffice current_page="admin/halls" />}
                />

                <Route
                    path="/admin/egais/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontOffice current_page="admin/egais" />}
                />

                <Route
                    path="/admin/scheme/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontOffice current_page="admin/scheme" />}
                />

                <Route
                    path="/admin/staff/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontOffice current_page="admin/staff" />}
                />

                <Route
                    path="/admin/acquiring/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontOffice current_page="admin/acquiring" />}
                />

                <Route path="/admin/slip/:param_city/:param_filial/:uid/" element={<FrontOffice current_page="admin/slip" />} />

                <Route
                    path="/admin/z_acquiring/:param_city/:param_filial/:uid/"
                    element={<FrontOffice current_page="admin/z_acquiring" />}
                />

                <Route
                    path="/admin/reports/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontOffice current_page="admin/reports" />}
                />

                <Route
                    path="/second_screen/:param_city/:param_filial/:param_date/"
                    element={<FrontOffice current_page="second_screen" />}
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <Modal keepMounted open={modal_opened} onClose={() => dispatch(closeModal())}>
                <Box id="modal">{ModalContent}</Box>
            </Modal>
        </Box>
    )
}

export default FrontRoutes
