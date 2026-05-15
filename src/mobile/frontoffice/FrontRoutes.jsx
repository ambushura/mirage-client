import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Waiter from './waiter/Waiter.jsx'
import URM from './urm/URM.jsx'
import Controller from './controller/Controller.jsx'

const FrontRoutes = () => {
    return (
        <Box>
            <Routes>
                <Route path="/mobile/:param_city/:param_filial/waiter" element={<Waiter />} />
                <Route path="/mobile/:param_city/:param_filial/urm" element={<URM />} />
                <Route path="/mobile/:param_city/:param_filial/controller" element={<Controller />} />
                <Route path="/mobile/:param_city/:param_filial/back" element={<Box>БК</Box>} />
            </Routes>
        </Box>
    )
}

export default FrontRoutes
