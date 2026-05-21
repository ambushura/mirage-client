import { Box } from '@mui/material'
import MobileLayout from '../MobileLayout.jsx'
import TopBar from '../frontoffice/top_bar/TopBar.jsx'
import BottomBar from '../frontoffice/bottom_bar/BottomBar.jsx'
import DrawerSide from '../frontoffice/drawer/DrawerSide.jsx'
import '../../mobile.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

/**
 * BackMobile - Бэк-офис для мобильных телефонов
 *
 * Полноэкранная версия с:
 * - Фиксированным заголовком вверху
 * - Скроллируемым контентом в центре
 * - Фиксированным нижним меню
 */
const BackMobile = () => {
    const params = useParams()
    const [drawerOpened, setDrawerOpened] = useState(false)

    return (
        <MobileLayout
            header={<TopBar title="Администрация" />}
            footer={<BottomBar setDrawerOpened={setDrawerOpened} surface="backoffice" current_page={params.current_page || 'main'} />}
        >
            {/* Скроллируемый контент */}
            <Box sx={{ color: 'white' }}>
                <Box sx={{ fontSize: '24px', fontWeight: 'bold', mb: 2 }}>Бэк-офис мобильный</Box>

                {/* Здесь будут разные страницы в зависимости от params.current_page */}
                {params.current_page === 'reports' && (
                    <Box>
                        <Box sx={{ fontSize: '16px', mb: 1 }}>Отчёты</Box>
                        {/* Содержимое отчётов */}
                    </Box>
                )}

                {params.current_page === 'schedule' && (
                    <Box>
                        <Box sx={{ fontSize: '16px', mb: 1 }}>Расписание</Box>
                        {/* Содержимое расписания */}
                    </Box>
                )}

                {params.current_page === 'staff' && (
                    <Box>
                        <Box sx={{ fontSize: '16px', mb: 1 }}>Сотрудники</Box>
                        {/* Содержимое управления сотрудниками */}
                    </Box>
                )}

                {/* Дефолтная страница */}
                {!['reports', 'schedule', 'staff'].includes(params.current_page) && (
                    <Box sx={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Выберите раздел из меню внизу</Box>
                )}
            </Box>

            {/* Боковое меню */}
            <DrawerSide
                drawerOpened={drawerOpened}
                setDrawerOpened={setDrawerOpened}
                surface="backoffice"
                current_page={params.current_page || 'main'}
            />
        </MobileLayout>
    )
}

export default BackMobile
