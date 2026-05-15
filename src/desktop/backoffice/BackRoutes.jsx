import { Box, Modal } from '@mui/material'
import CenterHeaderTop from './page/CenterHeaderTop.jsx'
import CenterHeaderLeft from './page/CenterHeaderLeft.jsx'
import { ScrollStyles } from '../../ui/ThemeContext.jsx'
import CenterShift from './pages/shift/Center.jsx'
import CenterHoreca from './pages/horeca/Center.jsx'
import CenterCinema from './pages/cinema/Center.jsx'
import CenterResults from './pages/results/Center.jsx'
import CenterMaps from './pages/halls/Center.jsx'
import NotFound from '../frontoffice/page/body/NotFound.jsx'
import { closeModal } from '../../redux/frontoffice/interfaceReducer.js'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import Order from './pages/horeca/orders/Order.jsx'
import Recipe from './pages/horeca/recipes/Recipe.jsx'
import ItemsMovement from './pages/horeca/ItemsMovement.jsx'

const ModalComponents = {
    center_order_horeca: Order,
    center_recipe: Recipe,
    center_items_movement: ItemsMovement,
}

const BackRoutes = () => {
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
                    <Route path="/backoffice/shift/revenue" element={<CenterShift current_page={['shift', 'revenue']} />} />

                    <Route path="/backoffice/shift/results" element={<CenterShift current_page={['shift', 'results']} />} />

                    <Route path="/backoffice/shift/operations" element={<CenterShift current_page={['shift', 'operations']} />} />

                    <Route path="/backoffice/horeca/goods" element={<CenterHoreca current_page={['horeca', 'goods']} />} />

                    <Route path="/backoffice/horeca/goods/recipes/:ref" element={<CenterHoreca current_page={['horeca', 'recipe']} />} />

                    <Route path="/backoffice/horeca/store_state" element={<CenterHoreca current_page={['horeca', 'store_state']} />} />

                    <Route
                        path="/backoffice/horeca/store_production"
                        element={<CenterHoreca current_page={['horeca', 'store_production']} />}
                    />

                    <Route path="/backoffice/horeca/shift_state" element={<CenterHoreca current_page={['horeca', 'shift_state']} />} />

                    <Route path="/backoffice/horeca/orders" element={<CenterHoreca current_page={['horeca', 'orders']} />} />

                    <Route path="/backoffice/horeca/orders/:uid_order" element={<CenterHoreca current_page={['horeca', 'order']} />} />

                    <Route path="/backoffice/horeca/store_diff" element={<CenterHoreca current_page={['horeca', 'store_diff']} />} />

                    <Route path="/backoffice/cinema/orders" element={<CenterCinema current_page={['cinema', 'orders']} />} />

                    <Route path="/backoffice/results/cashbox" element={<CenterResults current_page={['results', 'cashbox']} />} />

                    <Route path="/backoffice/halls/maps" element={<CenterMaps current_page={['halls', 'maps']} />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
            <Modal keepMounted open={modal_opened} onClose={() => dispatch(closeModal())}>
                <Box id="modal">{ModalContent}</Box>
            </Modal>
        </Box>
    )
}

export default BackRoutes
