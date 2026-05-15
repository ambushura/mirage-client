import { useEffect } from 'react'
import { Box, Button, InputAdornment, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useDispatch } from 'react-redux'
import { common_cities_filials_get } from '../../service/fetch_service.js'
import { setCities } from '../../redux/mobile/frontoffice/mobileReducer.js'
import CityPage from './CityPage.jsx'
import FilialPage from './FilialPage.jsx'
import LoginPage from './LoginPage.jsx'
import '../../ui/css/mobile/auth.css'
import '../../ui/css/mobile/common.css'
import InterfacePage from './InterfacePage.jsx'

const AuthRoutes = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        const fetch = async () => {
            const res = await dispatch(common_cities_filials_get())
            if (res.error === null && !res.loading) {
                dispatch(setCities(res.data))
            }
        }
        fetch()
    }, [dispatch])

    return (
        <Box
            sx={{
                width: '100%',
                height: '100dvh',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
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
                        path="/mobile/:param_city/:param_filial/:interface_param"
                        element={
                            <PageWrapper>
                                <LoginPage />
                            </PageWrapper>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </Box>
    )
}

export default AuthRoutes

const PageWrapper = ({ children }) => {
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
        <Box className="front-mobile-auth-list">
            <Box>
                <Box className="front-mobile-auth-title-h1">{title}</Box>

                <Box className="front-mobile-auth-title-h2">Для продолжения авторизации</Box>
            </Box>
            {cityName && (
                <Box className="front-mobile-auth-city-bar">
                    <Button
                        onClick={onBack}
                        sx={{
                            minWidth: 0,
                            width: 42,
                            height: 42,
                            borderRadius: '16px',
                            color: '#fff',
                            background: 'rgba(255,255,255,.06)',
                            border: '1px solid rgba(255,255,255,.08)',
                            '&:hover': {
                                background: 'rgba(255,255,255,0.1)',
                            },

                            '&:active': {
                                transform: 'scale(0.96)',
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </Button>

                    <Box className="front-mobile-auth-city-name">{cityName}</Box>
                </Box>
            )}
            <TextField
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                className="front-mobile-auth-list-input"
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
            <Box className="front-mobile-auth-list-options-box mobile-scroll">
                <List className="front-mobile-auth-list-options">
                    {list.map((el) => (
                        <ListItem key={el.uid} disablePadding className="front-mobile-auth-list-options-item">
                            <ListItemButton
                                className="front-mobile-auth-list-options-item-button"
                                onClick={() => onClick(el)}
                                sx={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)' }}
                            >
                                <Box className="front-mobile-auth-list-options-item-icon">
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
                                                fontSize: 17,
                                            },
                                        },

                                        secondary: {
                                            sx: {
                                                color: 'rgba(255,255,255,0.45)',
                                                mt: '2px',
                                            },
                                        },
                                    }}
                                />
                                <ChevronRightRoundedIcon className="front-mobile-auth-list-options-item-point" />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}
