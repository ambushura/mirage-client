import { Box } from '@mui/material'
import '../../ui/css/mobile/top-bar.css'

const TopBar = () => {
    return (
        <Box className="mobile-top-bar-wrapper">
            <Box className="mobile-top-bar">
                <Box>
                    <div className="mobile-title">Заказы</div>
                    <div className="mobile-subtitle">Смена #12 • 14:32</div>
                </Box>
            </Box>
        </Box>
    )
}

export default TopBar
