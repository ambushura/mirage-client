import { Box, Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded'
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded'
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useSetCityAndFilial from '../hooks/useSetCityAndFilial.js'

const interfaces = [
    {
        id: 'waiter',
        title: 'Официант',
        description: 'Приём заказов, столы, оплаты',
        icon: <RestaurantRoundedIcon sx={{ fontSize: 30 }} />,
        gradient: 'linear-gradient(135deg, #7B61FF 0%, #5B3DF5 100%)',
    },

    {
        id: 'controller',
        title: 'Билетный контроль',
        description: 'Сканирование билетов для прохода',
        icon: <QrCodeScannerRoundedIcon sx={{ fontSize: 30 }} />,
        gradient: 'linear-gradient(135deg, #00C2A8 0%, #008F7A 100%)',
    },

    {
        id: 'urm',
        title: 'УРМ',
        description: 'Универсальное рабочее место',
        icon: <DesktopWindowsRoundedIcon sx={{ fontSize: 30 }} />,
        gradient: 'linear-gradient(135deg, #FF8A00 0%, #E65100 100%)',
    },

    {
        id: 'back',
        title: 'Бэк-офис',
        description: 'Центральный офис и управление системой',
        icon: <ApartmentRoundedIcon sx={{ fontSize: 30 }} />,
        gradient: 'linear-gradient(135deg, #FF4D6D 0%, #C9184A 100%)',
    },
]

export default function InterfacePage() {
    const navigate = useNavigate()
    const { city, filial } = useSelector((state) => state.front_mobile)

    useSetCityAndFilial()

    if (city === null || filial === null) return

    return (
        <Box className="mobile-page">
            <Box className="mobile-page-content">
                <Box className="mobile-page-header">
                    <Box className="mobile-page-topbar">
                        <Button onClick={() => navigate(`/mobile/${city.code}/`)} className="mobile-back-button">
                            <ArrowBackRoundedIcon />
                        </Button>
                        <Box className="mobile-page-topbar-title">{filial.name}</Box>
                    </Box>
                    <Box className="mobile-title">Выберите интерфейс</Box>
                    <Box className="mobile-subtitle">Выберите режим работы системы</Box>
                </Box>
                <Box className="mobile-scroll mobile-list-wrapper">
                    <List className="mobile-list">
                        {interfaces.map((item) => (
                            <ListItem key={item.id} disablePadding className="mobile-list-item">
                                <ListItemButton
                                    className="mobile-card-button"
                                    onClick={() => {
                                        navigate(`/mobile/${city.code}/${filial.eais}/${item.id}/`)
                                    }}
                                >
                                    <Box className="mobile-card-icon" sx={{ background: item.gradient }}>
                                        {item.icon}
                                    </Box>
                                    <ListItemText
                                        primary={item.title}
                                        secondary={item.description}
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
