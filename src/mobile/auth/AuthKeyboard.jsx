import { useState } from 'react'
import { Box, Button, Fade, Paper, Tab, Tabs, TextField, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useDispatch, useSelector } from 'react-redux'
import { sign_in } from '../../service/fetch_service.js'

export default function MobileAuth({ onBack }) {
    const dispatch = useDispatch()

    const [tab, setTab] = useState(0)

    const [pin, setPin] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const { city, filial } = useSelector((state) => state.front_mobile)

    const handleTabChange = (_, v) => setTab(v)

    const addDigit = (d) => {
        if (pin.length >= 6) return
        setPin((p) => p + d)
    }

    const removeDigit = () => {
        setPin((p) => p.slice(0, -1))
    }

    const clearPin = () => setPin('')

    const pinDots = Array.from({ length: 5 })

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 420,
                    borderRadius: 5,
                    p: 2.5,
                    backdropFilter: 'blur(12px)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff',
                }}
            >
                {/* HEADER */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2 }}>
                    <Button
                        onClick={onBack}
                        sx={{
                            borderRadius: 2,
                            color: '#fff',
                            background: 'rgba(255,255,255,0.06)',
                        }}
                    >
                        <ArrowBackIcon />
                    </Button>

                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                        <Typography sx={{ color: '#fff', fontSize: 13, opacity: 0.9 }}>{city?.name || 'Город не выбран'}</Typography>

                        <Typography sx={{ color: '#fff', fontSize: 13, opacity: 0.6 }}>{filial?.name || 'Филиал не выбран'}</Typography>
                    </Box>
                </Box>

                <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, fontWeight: 600 }}>
                    Вход в систему
                </Typography>

                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    centered
                    textColor="inherit"
                    indicatorColor="primary"
                    sx={{
                        mb: 2,
                        '& .MuiTab-root': {
                            color: 'rgba(255,255,255,0.5)',
                            textTransform: 'none',
                            fontWeight: 500,
                        },
                        '& .MuiTab-root.Mui-selected': {
                            color: '#fff',
                        },
                    }}
                >
                    <Tab label="PIN" />
                    <Tab label="Логин" />
                </Tabs>

                {/* PIN */}
                {tab === 0 && (
                    <Fade in>
                        <Box>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    opacity: 0.6,
                                    mb: 2,
                                }}
                            >
                                Введите код доступа
                            </Typography>

                            {/* DOTS */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 1,
                                    mb: 3,
                                }}
                            >
                                {pinDots.map((_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            border: '1px solid #ff1744',
                                            background: i < pin.length ? '#ff5252' : 'transparent',
                                            transition: '0.2s',
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* KEYPAD */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: 1.2,
                                }}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                    <Button
                                        key={n}
                                        onClick={() => addDigit(String(n))}
                                        sx={{
                                            py: 2,
                                            borderRadius: 3,
                                            color: '#fff',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            fontSize: 18,
                                            '&:active': { transform: 'scale(0.96)' },
                                        }}
                                    >
                                        {n}
                                    </Button>
                                ))}

                                <Button
                                    onClick={clearPin}
                                    sx={{
                                        py: 2,
                                        borderRadius: 3,
                                        color: '#ff6b6b',
                                        background: 'rgba(255,255,255,0.04)',
                                    }}
                                >
                                    DEL
                                </Button>

                                <Button
                                    onClick={() => addDigit('0')}
                                    sx={{
                                        py: 2,
                                        borderRadius: 3,
                                        color: '#fff',
                                        background: 'rgba(255,255,255,0.05)',
                                        fontSize: 18,
                                    }}
                                >
                                    0
                                </Button>

                                <Button
                                    onClick={removeDigit}
                                    sx={{
                                        py: 2,
                                        borderRadius: 3,
                                        color: '#fff',
                                        background: 'rgba(255,255,255,0.04)',
                                    }}
                                >
                                    ⌫
                                </Button>
                            </Box>

                            <Button
                                fullWidth
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, #ff5252 0%, #ff1744 100%)',
                                    color: '#fff',
                                    textTransform: 'none',
                                }}
                                disabled={pin.length < 4}
                                onClick={() => console.log('PIN login', { pin, city, filial })}
                            >
                                Войти
                            </Button>
                        </Box>
                    </Fade>
                )}

                {/* LOGIN */}
                {tab === 1 && (
                    <Fade in>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                variant="filled"
                                label="Логин"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                fullWidth
                                InputLabelProps={{ style: { color: '#aaa' } }}
                                InputProps={{ style: { color: '#fff' } }}
                            />

                            <TextField
                                variant="filled"
                                label="Пароль"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                InputLabelProps={{ style: { color: '#aaa' } }}
                                InputProps={{ style: { color: '#fff' } }}
                            />

                            <Button
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #ff5252 0%, #ff1744 100%)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                }}
                                onClick={() => {
                                    dispatch(sign_in(filial, true, false, login, password))
                                }}
                            >
                                Войти
                            </Button>
                        </Box>
                    </Fade>
                )}
            </Paper>
        </Box>
    )
}
