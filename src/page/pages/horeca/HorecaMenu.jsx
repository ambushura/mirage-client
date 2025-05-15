import {Box, Button, ButtonGroup} from "@mui/material"
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import {useDispatch} from "react-redux"
import {openModal} from "../../../redux/interfaceReducer.js"
import SettingsIcon from '@mui/icons-material/Settings'

const HorecaMenu = () => {

    const dispatch = useDispatch()

    return (
        <Box id="top-menu" style={{justifyContent: 'flex-start'}}>
            <ButtonGroup>
                <Button variant='contained' color='secondary' size='large' sx={{marginLeft: '5px'}}
                        startIcon={<QrCodeScannerIcon/>}
                        onClick={() => {
                            dispatch(openModal({type: 'mark', props: {}}))
                        }}>ЧЗ</Button>
                <Button variant='contained' color='secondary' size='small' sx={{marginLeft: '5px'}}
                        endIcon={<SettingsIcon/>}
                        onClick={() => {
                            dispatch(openModal({type: 'mark_hosts', props: {}}))
                        }}>Настройки</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant='contained' color='secondary' sx={{marginLeft: '5px'}} startIcon={<QrCodeScannerIcon/>}
                        onClick={() => {
                            dispatch(openModal({type: 'egais', props: {}}))
                        }}>ЕГАИС</Button>
                <Button variant='contained' color='secondary' size='small' sx={{marginLeft: '5px'}}
                        endIcon={<SettingsIcon/>}
                        onClick={() => {
                            dispatch(openModal({type: 'egais_settings', props: {}}))
                        }}>УТМ ЕГАИС</Button>
            </ButtonGroup>
            <Button variant='contained' color='secondary' sx={{marginLeft: '5px'}}
                    startIcon={<QrCode2Icon/>}>Штрихкод</Button>
        </Box>
    )
}

export default HorecaMenu