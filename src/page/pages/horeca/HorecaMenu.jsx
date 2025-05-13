import {Box, Button} from "@mui/material"
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import QrCode2Icon from '@mui/icons-material/QrCode2'

const HorecaMenu = () => {
    return (
        <Box id="top-menu" style={{justifyContent: 'flex-start'}}>
            <Button variant='contained' color='secondary' sx={{marginLeft: '5px'}} startIcon={<QrCodeScannerIcon/>}>ЧЗ</Button>
            <Button variant='contained' color='secondary' sx={{marginLeft: '5px'}} startIcon={<QrCodeScannerIcon/>}>ЕГАИС</Button>
            <Button variant='contained' color='secondary' sx={{marginLeft: '5px'}} startIcon={<QrCode2Icon/>}>Штрихкод</Button>
        </Box>
    )
}
export default HorecaMenu