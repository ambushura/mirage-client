import { Box } from '@mui/material'
import '../../mobile.css'
import { useState } from 'react'
import TopBar from '../top_bar/TopBar.jsx'
import BottomBar from '../bottom_bar/BottomBar.jsx'
import MobileLayout from '../../MobileLayout.jsx'
import DrawerSide from '../drawer/DrawerSide.jsx'

/**
 * URM - Управление залами и уборкой для мобильных телефонов
 *
 * Полноэкранная версия с:
 * - Фиксированным заголовком вверху
 * - Скроллируемым контентом в центре
 * - Фиксированным нижним меню
 */
const URM = () => {
    const [drawerOpened, setDrawerOpened] = useState(false)

    return (
        <MobileLayout
            header={<TopBar title="Управление залами" />}
            footer={<BottomBar setDrawerOpened={setDrawerOpened} surface="urm" current_page="main" />}
        >
            {/* Скроллируемый контент */}
            <Box sx={{ color: 'white' }}>
                <Box sx={{ fontSize: '24px', fontWeight: 'bold', mb: 3 }}>Управление залами</Box>

                {/* Списки комнат с их статусами */}
                {['Кинозал 1', 'Кинозал 2', 'Кинозал 3', 'VIP Зал', 'Конференц-зал'].map((room) => (
                    <Box
                        key={room}
                        sx={{
                            p: 2.5,
                            mb: 2,
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Box sx={{ fontSize: '16px', fontWeight: 600 }}>{room}</Box>
                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: '8px',
                                    background: 'rgba(76, 175, 80, 0.2)',
                                    color: '#4CAF50',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                }}
                            >
                                Чистый
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                fontSize: '13px',
                                color: 'rgba(255, 255, 255, 0.6)',
                                mb: 1.5,
                            }}
                        >
                            Мест: 120 | Доступно: 85
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Box
                                sx={{
                                    flex: 1,
                                    p: 1,
                                    borderRadius: '8px',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.08)',
                                    },
                                }}
                            >
                                Очистить
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,
                                    p: 1,
                                    borderRadius: '8px',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.08)',
                                    },
                                }}
                            >
                                Деталь
                            </Box>
                        </Box>
                    </Box>
                ))}

                {/* Пустое место для padding */}
                <Box sx={{ pb: 2 }} />
            </Box>

            {/* Боковое меню */}
            <DrawerSide drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} surface="urm" current_page="main" />
        </MobileLayout>
    )
}

export default URM
