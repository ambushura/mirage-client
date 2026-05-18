import { Box } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import Waiter from './waiter/Waiter.jsx'
import URM from './urm/URM.jsx'
import Controller from './controller/Controller.jsx'
import useSetCityAndFilial from '../hooks/useSetCityAndFilial.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PageWrapper } from '../auth/AuthRoutes.jsx'
import { logout } from '../../redux/desktop/frontoffice/authReducer.js'

const FrontRoutes = () => {
    useSetCityAndFilial()

    const LogoutRedirect = () => {
        const dispatch = useDispatch()
        useEffect(() => {
            dispatch(logout())
        }, [dispatch])
        return <Navigate to="/mobile" replace />
    }

    return (
        <Box>
            <Routes>
                <Route
                    path="/mobile/:param_city/:param_filial/waiter"
                    element={
                        <PageWrapper>
                            <Waiter />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/mobile/:param_city/:param_filial/urm"
                    element={
                        <PageWrapper>
                            <URM />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/mobile/:param_city/:param_filial/controller"
                    element={
                        <PageWrapper>
                            <Controller />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/mobile/:param_city/:param_filial/back"
                    element={
                        <PageWrapper>
                            <Box>БК</Box>
                        </PageWrapper>
                    }
                />
                <Route path="/mobile/*" element={<LogoutRedirect />} />
            </Routes>
        </Box>
    )
}

export default FrontRoutes
