import { Box } from '@mui/material'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Waiter from './waiter/Waiter.jsx'
import URM from './urm/URM.jsx'
import Controller from './controller/Controller.jsx'
import useSetCityAndFilial from '../hooks/useSetCityAndFilial.js'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import CityPage from '../auth/CityPage.jsx'
import FilialPage from '../auth/FilialPage.jsx'
import InterfacePage from '../auth/InterfacePage.jsx'
import LoginPage from '../auth/LoginPage.jsx'
import { PageWrapper } from '../auth/AuthRoutes.jsx'

const FrontRoutes = () => {
    useSetCityAndFilial()

    const navigate = useNavigate()

    const { cities, city, filial, current_interface } = useSelector((state) => state.front_mobile)

    const url = useMemo(() => {
        if (!cities?.length) return null
        if (!city?.code) return '/mobile'
        if (!filial?.eais) return `/mobile/${city.code}`
        if (!current_interface) return `/mobile/${city.code}/${filial.eais}`
        return `/mobile/${city.code}/${filial.eais}/${current_interface}`
    }, [cities, city, filial, current_interface])

    useEffect(() => {
        if (!url) return
        navigate(url, { replace: true })
    }, [url, navigate])

    return (
        <Box>
            <Routes>
                <Route
                    path="/mobile"
                    element={
                        <PageWrapper>
                            <CityPage />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/mobile/:param_city"
                    element={
                        <PageWrapper>
                            <FilialPage />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/mobile/:param_city/:param_filial"
                    element={
                        <PageWrapper>
                            <InterfacePage />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/mobile/:param_city/:param_filial/:interface_param"
                    element={
                        <PageWrapper>
                            <LoginPage />
                        </PageWrapper>
                    }
                />
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
            </Routes>
        </Box>
    )
}

export default FrontRoutes
