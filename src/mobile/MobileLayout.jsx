import { Box } from '@mui/material'
import './mobile-layout.css'

/**
 * MobileLayout - универсальная обёртка для мобильных страниц
 *
 * Структура:
 * - Header (фиксированный вверху)
 * - Content (скроллируемый контент в середине)
 * - Footer (фиксированный внизу)
 *
 * Автоматически учитывает:
 * - Safe area (вырезы, notches на новых телефонах)
 * - Высоту viewport (100dvh)
 * - Mobile keyboard (когда он появляется)
 */
export const MobileLayout = ({ header, children, footer, headerHeight = '70px', footerHeight = '90px' }) => {
    // Расчёт высоты контентной области
    // 100dvh (dynamic viewport height) - высота header - высота footer
    const contentHeight = `calc(100dvh - ${headerHeight} - ${footerHeight})`

    return (
        <Box className="mobile-layout">
            {/* HEADER - фиксирован вверху */}
            <Box className="mobile-layout-header" sx={{ minHeight: headerHeight, height: headerHeight }}>
                {header}
            </Box>

            {/* CONTENT - скроллируемая область */}
            <Box className="mobile-layout-content" sx={{ height: contentHeight }}>
                {children}
            </Box>

            {/* FOOTER - фиксирован внизу */}
            <Box className="mobile-layout-footer" sx={{ minHeight: footerHeight, height: footerHeight }}>
                {footer}
            </Box>
        </Box>
    )
}

export default MobileLayout
