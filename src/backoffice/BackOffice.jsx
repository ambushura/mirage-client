import { Box, Modal } from '@mui/material'
import CenterHeaderTop from './page/CenterHeaderTop.jsx'
import CenterHeaderLeft from './page/CenterHeaderLeft.jsx'
import { ScrollStyles } from '../ui/ThemeContext.jsx'
import CenterShift from './pages/shift/Center.jsx'
import CenterHoreca from './pages/horeca/Center.jsx'
import CenterCinema from './pages/cinema/Center.jsx'
import CenterResults from './pages/results/Center.jsx'
import CenterMaps from './pages/halls/Center.jsx'
import NotFound from '../frontoffice/page/body/NotFound.jsx'
import { closeModal } from '../redux/frontoffice/interfaceReducer.js'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import TableOptions from '../frontoffice/forms/TableOptions.jsx'
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
} from '../frontoffice/forms/index.js'
import MarkInfo from '../frontoffice/forms/markirovka/MarkInfo.jsx'
import HorecaFilters from '../frontoffice/page/body/admin/orders/horeca/HorecaFilters.jsx'
import CinemaFilters from '../frontoffice/page/body/admin/orders/cinema/CinemaFilters.jsx'
import ScheduleFilters from '../frontoffice/forms/schedule_filters/ScheduleFilters.jsx'
import Seance from '../frontoffice/forms/documents/Seance.jsx'
import { BilletCheckForm } from '../frontoffice/page/body/admin/scheme/forms/BilletCheckForm.jsx'
import { FilialForm } from '../frontoffice/page/body/admin/scheme/forms/FilialForm.jsx'
import { KitchenPointForm } from '../frontoffice/page/body/admin/scheme/forms/KitchenPointForm.jsx'
import KKTForm from '../frontoffice/page/body/admin/scheme/forms/KKTForm.jsx'
import PinpadForm from '../frontoffice/page/body/admin/scheme/forms/PinpadForm.jsx'
import { WorkplaceForm } from '../frontoffice/page/body/admin/scheme/forms/WorkplaceForm.jsx'
import StaffList from '../frontoffice/forms/StaffList.jsx'
import OthersPaymentTypes from '../frontoffice/page/right-panel/OthersPaymentTypes.jsx'
import OperationCloseShift from '../frontoffice/forms/OperationCloseShift.jsx'
import Dialog from '../frontoffice/forms/Dialog.jsx'
import KitchenPrint from '../frontoffice/forms/KitchenPrint.jsx'
import { useMemo } from 'react'

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

const BackOffice = () => {
    const dispatch = useDispatch()

    const { modal_opened, modal_type, modal_props } = useSelector((state) => state.interface)
    const ModalContent = useMemo(() => {
        const Component = ModalComponents[modal_type]
        return Component ? <Component props={modal_props} /> : null
    }, [modal_type, modal_props])

    return (
        <Box id="app">
            <CenterHeaderTop />
            <CenterHeaderLeft />
            <ScrollStyles />
            <Box id="center-page">
                <Routes>
                    <Route path="/center/shift/revenue" element={<CenterShift current_page={['shift', 'revenue']} />} />

                    <Route path="/center/shift/results" element={<CenterShift current_page={['shift', 'results']} />} />

                    <Route path="/center/shift/operations" element={<CenterShift current_page={['shift', 'operations']} />} />

                    <Route path="/center/horeca/goods" element={<CenterHoreca current_page={['horeca', 'goods']} />} />

                    <Route path="/center/horeca/goods/recipes/:ref" element={<CenterHoreca current_page={['horeca', 'recipe']} />} />

                    <Route path="/center/horeca/store_state" element={<CenterHoreca current_page={['horeca', 'store_state']} />} />

                    <Route
                        path="/center/horeca/store_production"
                        element={<CenterHoreca current_page={['horeca', 'store_production']} />}
                    />

                    <Route path="/center/horeca/shift_state" element={<CenterHoreca current_page={['horeca', 'shift_state']} />} />

                    <Route path="/center/horeca/orders" element={<CenterHoreca current_page={['horeca', 'orders']} />} />

                    <Route path="/center/horeca/orders/:uid_order" element={<CenterHoreca current_page={['horeca', 'order']} />} />

                    <Route path="/center/horeca/store_diff" element={<CenterHoreca current_page={['horeca', 'store_diff']} />} />

                    <Route path="/center/cinema/orders" element={<CenterCinema current_page={['cinema', 'orders']} />} />

                    <Route path="/center/results/cashbox" element={<CenterResults current_page={['results', 'cashbox']} />} />

                    <Route path="/center/halls/maps" element={<CenterMaps current_page={['halls', 'maps']} />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
            <Modal keepMounted open={modal_opened} onClose={() => dispatch(closeModal())}>
                <Box id="modal">{ModalContent}</Box>
            </Modal>
        </Box>
    )
}

export default BackOffice
