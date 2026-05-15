import { Box, Button, InputAdornment, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { setCities, setCity, setFilial } from '../../redux/frontmobile/frontMobileReducer.js'
import { common_cities_filials_get } from '../../service/fetch_service.js'
import '../../ui/css/mobile/auth.css'
import '../../ui/css/mobile/common.css'
import MobileAuth from './AuthKeyboard.jsx'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Auth = () => {
    const dispatch = useDispatch()

    const { cities, city, filial } = useSelector((state) => state.front_mobile)

    const [searchCity, setSearchCity] = useState('')
    const filteredCities = useMemo(() => {
        return cities.filter((city) => city.name.toLowerCase().includes(searchCity.toLowerCase()))
    }, [cities, searchCity])

    const [searchFilial, setSearchFilial] = useState('')
    const filteredFilials = useMemo(() => {
        if (city !== null) {
            return city.filials.filter((filial) => filial.name.toLowerCase().includes(searchFilial.toLowerCase()))
        }
    }, [city, searchFilial])

    function onClickCity(city) {
        dispatch(setCity(city))
    }

    function onClickFilial(filial) {
        dispatch(setFilial(filial))
    }

    useEffect(() => {
        const fetch = async () => {
            const res = await dispatch(common_cities_filials_get())
            if (res.error === null && !res.loading) {
                dispatch(setCities(res.data))
            }
        }
        fetch()
    }, [dispatch])

    const pages = {
        city: (
            <AuthList
                list={filteredCities}
                search={searchCity}
                setSearch={setSearchCity}
                title="Выберите город"
                placeholder="В каком вы городе?"
                onClick={onClickCity}
            />
        ),
        filial: (
            <AuthList
                list={filteredFilials}
                search={searchFilial}
                setSearch={setSearchFilial}
                title="Выберите филиал"
                placeholder="В каком вы филиале?"
                cityName={city?.name}
                onBack={() => {
                    dispatch(setCity(null))
                }}
                onClick={onClickFilial}
            />
        ),
        auth: (
            <MobileAuth
                onBack={() => {
                    dispatch(setFilial(null))
                }}
            />
        ),
    }

    return (
        <Box className="front-mobile-auth">
            <AnimatePresence mode="wait">
                <PageWrapper key={city === null ? 'city' : 'filial'}>
                    {city === null ? pages['city'] : filial === null ? pages['filial'] : pages['auth']}
                </PageWrapper>
            </AnimatePresence>
        </Box>
    )
}

export default Auth

function AuthList({ list, search, setSearch, title, placeholder, cityName, onBack, onClick }) {
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
                            px: 1.2,
                            borderRadius: 2,
                            color: '#fff',
                            background: 'rgba(255,255,255,0.06)',
                            textTransform: 'none',
                            fontSize: 13,
                            display: 'flex',
                            gap: 0.6,
                            alignItems: 'center',
                            '&:active': {
                                transform: 'scale(0.97)',
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </Button>
                    <Box className="front-mobile-auth-city-name">{cityName}</Box>
                </Box>
            )}
            <TextField
                className="front-mobile-auth-list-input"
                fullWidth
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                        <ListItem className="front-mobile-auth-list-options-item" key={el.uid} disablePadding>
                            <ListItemButton
                                className="front-mobile-auth-list-options-item-button"
                                onClick={() => {
                                    onClick(el)
                                }}
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
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '17px',
                                            },
                                        },
                                        secondary: {
                                            sx: {
                                                color: 'rgba(255,255,255,0.45)',
                                                marginTop: '2px',
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

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            variants={pageAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                duration: 0.1,
            }}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            {children}
        </motion.div>
    )
}

const pageAnimation = {
    initial: {
        x: 10,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: -10,
        opacity: 0,
    },
}
