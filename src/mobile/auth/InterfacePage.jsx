import { Box, Button, Card, CardActionArea, Stack, Typography } from '@mui/material'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded'
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setFilial } from '../../redux/mobile/frontoffice/mobileReducer.js'

const interfaces = [
    {
        id: 'waiter',
        title: 'Официант',
        description: 'Приём заказов, столы, оплаты',
        icon: <RestaurantRoundedIcon sx={{ fontSize: 42 }} />,
        gradient: 'linear-gradient(135deg, #7B61FF 0%, #5B3DF5 100%)',
    },
    {
        id: 'controller',
        title: 'Билетный контроль',
        description: 'Сканирование билетов для прохода',
        icon: <QrCodeScannerRoundedIcon sx={{ fontSize: 42 }} />,
        gradient: 'linear-gradient(135deg, #00C2A8 0%, #008F7A 100%)',
    },
    {
        id: 'urm',
        title: 'УРМ',
        description: 'Универсальное рабочее место',
        icon: <DesktopWindowsRoundedIcon sx={{ fontSize: 42 }} />,
        gradient: 'linear-gradient(135deg, #FF8A00 0%, #E65100 100%)',
    },
    {
        id: 'back',
        title: 'Главный филиал',
        description: 'Центральный офис и управление системой',
        icon: <ApartmentRoundedIcon sx={{ fontSize: 42 }} />,
        gradient: 'linear-gradient(135deg, #FF4D6D 0%, #C9184A 100%)',
    },
]

export default function InterfacePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const params = useParams()
    const { city, filial } = useSelector((state) => state.mobile)

    useEffect(() => {
        if (city === null) return
        city.filials.forEach((filial) => {
            if (filial.eais === params.param_filial) {
                dispatch(setFilial(filial))
            }
        })
    }, [city, dispatch, params.param_filial])

    return (
        <Box
            sx={{
                minHeight: '100dvh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 480,
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                    <Button
                        onClick={() => navigate(`/mobile/${city.code}/`)}
                        sx={{
                            minWidth: 0,
                            width: 42,
                            height: 42,
                            borderRadius: '16px',
                            color: '#fff',
                            background: 'rgba(255,255,255,.06)',
                            border: '1px solid rgba(255,255,255,.08)',

                            '&:hover': {
                                background: 'rgba(255,255,255,.1)',
                            },

                            '&:active': {
                                transform: 'scale(.96)',
                            },
                        }}
                    >
                        <ArrowBackRoundedIcon />
                    </Button>

                    <Box>
                        <Typography variant="h4" fontWeight={800} color="white">
                            Выберите интерфейс
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255,255,255,.65)',
                            }}
                        >
                            Выберите режим работы системы
                        </Typography>
                    </Box>
                </Stack>

                <Stack spacing={2}>
                    {interfaces.map((item) => (
                        <Card
                            key={item.id}
                            elevation={0}
                            sx={{
                                borderRadius: '28px',
                                overflow: 'hidden',
                                background: 'rgba(255,255,255,.04)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,.08)',
                                transition: '.25s',

                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    borderColor: 'rgba(255,255,255,.18)',
                                },
                            }}
                        >
                            <CardActionArea
                                onClick={() => {
                                    navigate(`/mobile/${city.code}/${filial.eais}/${item.id}/`)
                                }}
                                sx={{
                                    p: 2.2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: '22px',
                                            background: item.gradient,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            boxShadow: '0 10px 30px rgba(0,0,0,.25)',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {item.icon}
                                    </Box>

                                    <Box sx={{ flex: 1 }}>
                                        <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                                            <Typography variant="h6" fontWeight={700} color="white">
                                                {item.title}
                                            </Typography>
                                        </Stack>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'rgba(255,255,255,.6)',
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </Box>

                                    <ChevronRightRoundedIcon
                                        sx={{
                                            color: 'rgba(255,255,255,.4)',
                                            fontSize: 28,
                                        }}
                                    />
                                </Box>
                            </CardActionArea>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}
