import { Box } from '@mui/material'
import './top-bar.css'
import { useSelector } from 'react-redux'

const TopBar = ({ title }) => {
    const name_user = useSelector((state) => state.auth.name)

    return (
        <Box className="mobile-top-bar-wrapper">
            <Box className="mobile-top-bar">
                <Box>
                    <div className="mobile-title">{title}</div>
                    <div className="mobile-subtitle">{name_user} • 14:32</div>
                </Box>
            </Box>
        </Box>
    )
}

export default TopBar
