import {Box, Button} from "@mui/material"
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import {useDispatch} from "react-redux"
import {openModal} from "../../../redux/interfaceReducer.js"

const HorecaMenu = () => {

    const dispatch = useDispatch()

    return (
        <Box id="top-menu" style={{justifyContent: 'flex-start'}}>
            <Button variant='contained' color='secondary' sx={{marginLeft: '5px'}} startIcon={<QrCodeScannerIcon/>} onClick={() => {
                dispatch(openModal({type: 'mark', props: {}}))
            }}>ЧЗ</Button>
            <Button variant='contained' color='secondary' sx={{marginLeft: '5px'}} startIcon={<QrCodeScannerIcon/>} onClick={() => {
                dispatch(openModal({type: 'egais', props: {}}))
            }}>ЕГАИС</Button>
            <Button variant='contained' color='secondary' sx={{marginLeft: '5px'}} startIcon={<QrCode2Icon/>}>Штрихкод</Button>
        </Box>
    )
}
export default HorecaMenu