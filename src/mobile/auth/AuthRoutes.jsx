import { Box, Button, InputAdornment, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CityPage from './CityPage.jsx'
import FilialPage from './FilialPage.jsx'
import LoginPage from './LoginPage.jsx'
import './auth.css'
import '../mobile.css'
import InterfacePage from './InterfacePage.jsx'
import useSetCityAndFilial from '../hooks/useSetCityAndFilial.js'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { logout } from '../../redux/desktop/frontoffice/authReducer.js'

const AuthRoutes = () => {
    const location = useLocation()

    useSetCityAndFilial()

    const LogoutRedirect = () => {
        const dispatch = useDispatch()
        useEffect(() => {
            dispatch(logout())
        }, [dispatch])
        return <Navigate to="/mobile" replace />
    }

    return (
        <Box className="mobile">
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Navigate replace to="/mobile" />} />
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
                        path="/mobile/:param_city/:param_filial/:current_page"
                        element={
                            <PageWrapper>
                                <LoginPage />
                            </PageWrapper>
                        }
                    />
                    <Route path="/mobile/:param_city/:param_filial/:current_page/*" element={<LogoutRedirect />} />
                </Routes>
            </AnimatePresence>
        </Box>
    )
}

export default AuthRoutes

export const PageWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{
                x: 40,
                opacity: 0,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
            exit={{
                x: -40,
                opacity: 0,
            }}
            transition={{
                duration: 0.18,
                ease: 'easeOut',
            }}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
            }}
        >
            {children}
        </motion.div>
    )
}

export function AuthList({ list, search, setSearch, title, placeholder, cityName, onBack, onClick }) {
    return (
        <Box className="mobile-page">
            <Box className="mobile-page-content">
                <Box className="mobile-page-header">
                    <Box className="mobile-title">{title}</Box>
                    <Box className="mobile-subtitle">Для продолжения авторизации</Box>
                </Box>
                {cityName && (
                    <Box className="mobile-page-topbar">
                        <Button onClick={onBack} className="mobile-back-button">
                            <ArrowBackIcon />
                        </Button>
                        <Box className="mobile-page-topbar-title">{cityName}</Box>
                    </Box>
                )}
                <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={placeholder}
                    className="mobile-input"
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRoundedIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Box className="mobile-scroll mobile-list-wrapper">
                    <List className="mobile-list">
                        {list.map((el) => (
                            <ListItem key={el.uid} disablePadding className="mobile-list-item">
                                <ListItemButton className="mobile-card-button" onClick={() => onClick(el)}>
                                    <Box className="mobile-card-icon">
                                        <LocationOnRoundedIcon />
                                    </Box>
                                    <ListItemText
                                        primary={el.name}
                                        secondary="Нажмите для выбора"
                                        slotProps={{
                                            primary: {
                                                sx: {
                                                    color: '#fff',
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                },
                                            },
                                            secondary: {
                                                sx: {
                                                    color: 'rgba(255,255,255,.45)',
                                                    mt: '2px',
                                                    fontSize: 13,
                                                },
                                            },
                                        }}
                                    />
                                    <ChevronRightRoundedIcon className="mobile-card-arrow" />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    )
}
