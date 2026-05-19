import { Box } from '@mui/material'
import './top-bar.css'

const TopBar = ({ title }) => {
    return (
        <Box className="mobile-top-bar-wrapper">
            <Box className="mobile-top-bar">
                <Box>
                    <div className="mobile-title">{title}</div>
                    <div className="mobile-subtitle">Смена #12 • 14:32</div>
                </Box>
            </Box>
        </Box>
    )
}

export default TopBar
