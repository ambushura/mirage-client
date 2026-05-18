import { useState } from 'react'
import { Box, Button, Fade, InputAdornment, Tab, Tabs, TextField } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded'
import { useDispatch, useSelector } from 'react-redux'
import { sign_in } from '../../service/fetch_service.js'

const pinDots = Array.from({ length: 6 })

export default function MobileAuth({ onBack }) {
    const dispatch = useDispatch()
    const { city, filial } = useSelector((state) => state.front_mobile)

    const [tab, setTab] = useState(0)
    const [pin, setPin] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const removeDigit = () => setPin((p) => p.slice(0, -1))
    const clearPin = () => setPin('')
    const addDigit = (d) => {
        if (pin.length >= 6) return
        setPin((p) => p + d)
    }

    return (
        <Box className="mobile-page">
            <Box className="mobile-page-content">
                <Box className="mobile-page-header">
                    <Box className="mobile-page-topbar">
                        <Button onClick={onBack} className="mobile-back-button">
                            <ArrowBackRoundedIcon />
                        </Button>
                        <Box className="mobile-page-topbar-title">
                            {city?.name || 'Город'} • {filial?.name || 'Филиал'}
                        </Box>
                    </Box>
                    <Box className="mobile-title">Вход в систему</Box>
                    <Box className="mobile-subtitle">Выберите способ авторизации</Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Tabs
                        value={tab}
                        onChange={(_, v) => setTab(v)}
                        sx={{
                            '& .MuiTab-root': {
                                color: 'rgba(255,255,255,.5)',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: 14,
                            },
                            '& .Mui-selected': {
                                color: '#fff !important',
                            },
                            '& .MuiTabs-indicator': {
                                background: 'linear-gradient(135deg, #ff5252 0%, #ff1744 100%)',
                                height: 3,
                                borderRadius: 2,
                            },
                        }}
                    >
                        <Tab label="PIN" />
                        <Tab label="Логин" />
                    </Tabs>
                </Box>
                {tab === 0 && (
                    <Fade in>
                        <Box className="mobile-auth-section">
                            <Box className="mobile-subtitle" sx={{ textAlign: 'center' }}>
                                Введите код доступа
                            </Box>
                            <Box className="mobile-pin-dots">
                                {pinDots.map((_, i) => (
                                    <Box
                                        key={i}
                                        className="mobile-pin-dot"
                                        sx={{
                                            background:
                                                i < pin.length ? 'linear-gradient(135deg, #ff5252 0%, #ff1744 100%)' : 'transparent',
                                        }}
                                    />
                                ))}
                            </Box>
                            <Box className="mobile-keypad">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                    <Button key={n} onClick={() => addDigit(String(n))} className="mobile-key">
                                        {n}
                                    </Button>
                                ))}
                                <Button onClick={clearPin} className="mobile-key danger">
                                    DEL
                                </Button>
                                <Button onClick={() => addDigit('0')} className="mobile-key">
                                    0
                                </Button>
                                <Button onClick={removeDigit} className="mobile-key">
                                    <KeyboardBackspaceRoundedIcon />
                                </Button>
                            </Box>
                            <Button
                                fullWidth
                                className="mobile-primary-button"
                                disabled={pin.length < 4}
                                onClick={() => console.log('PIN', pin)}
                            >
                                Войти
                            </Button>
                        </Box>
                    </Fade>
                )}
                {tab === 1 && (
                    <Fade in>
                        <Box className="mobile-auth-section">
                            <TextField
                                fullWidth
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="Логин"
                                className="mobile-input"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Пароль"
                                className="mobile-input"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                fullWidth
                                className="mobile-primary-button"
                                onClick={() => {
                                    dispatch(sign_in(filial, true, false, login, password))
                                }}
                            >
                                Войти
                            </Button>
                        </Box>
                    </Fade>
                )}
            </Box>
        </Box>
    )
}
