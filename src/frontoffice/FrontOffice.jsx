import { Box, Modal } from '@mui/material'
import Header from './page/header/Header.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import FrontRoutes from './FrontRoutes.jsx'
import NotFound from './page/body/NotFound.jsx'
import Footer from './page/footer/Footer.jsx'
import { closeModal } from '../redux/frontoffice/interfaceReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import Order from '../backoffice/pages/horeca/orders/Order.jsx'
import Recipe from '../backoffice/pages/horeca/recipes/Recipe.jsx'
import ItemsMovement from '../backoffice/pages/horeca/ItemsMovement.jsx'
import { useMemo } from 'react'
import { useSetTopMenu } from '../ui/hooks/useSetTopMenu.js'

const ModalComponents = {
    center_order_horeca: Order,
    center_recipe: Recipe,
    center_items_movement: ItemsMovement,
}

const FrontOffice = () => {
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

                <Route path="/films/:param_city/:param_filial/:param_date" element={<FrontRoutes current_page="films" />} />

                <Route path="/film/:param_city/:param_filial/:param_date/:uid_film" element={<FrontRoutes current_page="film" />} />

                <Route path="/schedule/:param_city/:param_filial/:param_date" element={<FrontRoutes current_page="schedule" />} />

                <Route path="/seance/:param_city/:param_filial/:uid_seance" element={<FrontRoutes current_page="seance" />} />

                <Route path="/seance/:param_city/:param_filial" element={<Navigate replace to={defaultRedirectKK} />} />

                <Route path="/seance/:param_city/:param_filial/" element={<NotFound />} />

                <Route path="/mkitchen/:param_city/:param_filial/" element={<FrontRoutes current_page="mkitchen" />} />

                <Route path="/kitchen/:param_city/:param_filial/:param_date_admin/" element={<FrontRoutes current_page="kitchen" />} />

                <Route path="/menu/:param_city/:param_filial/" element={<FrontRoutes current_page="menu" />} />

                <Route
                    path="/admin/orders/cinema/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontRoutes current_page="admin/orders/cinema" />}
                />

                <Route
                    path="/admin/orders/horeca/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontRoutes current_page="admin/orders/horeca" />}
                />

                <Route
                    path="/admin/zbooks/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontRoutes current_page="admin/zbooks" />}
                />

                <Route path="/admin/zbook/:param_city/:param_filial/:uid/" element={<FrontRoutes current_page="admin/zbook" />} />

                <Route path="/admin/receipt/:param_city/:param_filial/:uid/" element={<FrontRoutes current_page="admin/receipt" />} />

                <Route
                    path="/admin/operations/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontRoutes current_page="admin/operations" />}
                />

                <Route path="/admin/operation/:param_city/:param_filial/:uid" element={<FrontRoutes current_page="admin/operation" />} />

                <Route
                    path="/admin/halls/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontRoutes current_page="admin/halls" />}
                />

                <Route
                    path="/admin/egais/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontRoutes current_page="admin/egais" />}
                />

                <Route
                    path="/admin/scheme/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontRoutes current_page="admin/scheme" />}
                />

                <Route
                    path="/admin/staff/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontRoutes current_page="admin/staff" />}
                />

                <Route
                    path="/admin/acquiring/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontRoutes current_page="admin/acquiring" />}
                />

                <Route path="/admin/slip/:param_city/:param_filial/:uid/" element={<FrontRoutes current_page="admin/slip" />} />

                <Route
                    path="/admin/z_acquiring/:param_city/:param_filial/:uid/"
                    element={<FrontRoutes current_page="admin/z_acquiring" />}
                />

                <Route
                    path="/admin/reports/:param_city/:param_filial/:param_date_admin/"
                    element={<FrontRoutes current_page="admin/reports" />}
                />

                <Route
                    path="/second_screen/:param_city/:param_filial/:param_date/"
                    element={<FrontRoutes current_page="second_screen" />}
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

export default FrontOffice
