import { Box } from '@mui/material'
import Menu from './Menu.jsx'
import Order from '../../right-panel/Order.jsx'

const PageHoreca = () => {
    return (
        <Box id="content-box" sx={{ overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box id="content-header"></Box>
                <Box id="content" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Menu />
                    <Box>
                        <Order />
                    </Box>
                </Box>
                <Box id="content-footer"></Box>
            </Box>
        </Box>
    )
}

export default PageHoreca
