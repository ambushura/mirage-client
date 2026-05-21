import { Box } from '@mui/material'
import '../../mobile.css'
import { useState } from 'react'
import MobileLayout from '../../MobileLayout.jsx'
import TopBar from '../top_bar/TopBar.jsx'
import BottomBar from '../bottom_bar/BottomBar.jsx'
import DrawerSide from '../drawer/DrawerSide.jsx'

const Controller = () => {
    const [drawerOpened, setDrawerOpened] = useState(false)

    return (
        <MobileLayout
            header={<TopBar title="Контроллер" />}
            footer={<BottomBar setDrawerOpened={setDrawerOpened} surface="controller" current_page="main" />}
        >
            {/* Скроллируемый контент */}
            <Box sx={{ color: 'white' }}>
                <Box sx={{ fontSize: '24px', fontWeight: 'bold', mb: 2 }}>Контроль залов</Box>

                {/* Статусы залов */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                        gap: 2,
                        mb: 3,
                    }}
                >
                    {[1, 2, 3, 4, 5, 6].map((hall) => (
                        <Box
                            key={hall}
                            sx={{
                                p: 2,
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
                            <Box sx={{ fontSize: '14px', mb: 1 }}>Зал {hall}</Box>
                            <Box
                                sx={{
                                    fontSize: '12px',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                }}
                            >
                                Статус: Свободен
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Дополнительная информация */}
                <Box
                    sx={{
                        p: 2,
                        borderRadius: '12px',
                        background: 'rgba(255, 100, 100, 0.1)',
                        border: '1px solid rgba(255, 100, 100, 0.2)',
                        mb: 2,
                    }}
                >
                    <Box sx={{ fontSize: '14px', fontWeight: 600, mb: 1 }}>Активные сеансы: 3</Box>
                    <Box
                        sx={{
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.6)',
                        }}
                    >
                        Всего зрителей: 45
                    </Box>
                </Box>
            </Box>

            {/* Боковое меню */}
            <DrawerSide drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} surface="controller" current_page="main" />
        </MobileLayout>
    )
}

export default Controller
