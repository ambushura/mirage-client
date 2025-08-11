import {Box, Button, ButtonGroup} from "@mui/material"
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import {useDispatch} from "react-redux"
import {openModal} from "../../../redux/interfaceReducer.js"
import SettingsIcon from '@mui/icons-material/Settings'

const HorecaMenu = () => {

    const dispatch = useDispatch()

    return (
        <Box id="top-menu">
            <ButtonGroup variant='contained' color='secondary' size='medium'>
                <Button startIcon={<QrCodeScannerIcon/>}
                        onClick={() => {
                            dispatch(openModal({type: 'mark', props: {add: true}}))
                        }}>ЧЗ</Button>
                <Button endIcon={<SettingsIcon/>}
                        onClick={() => {
                            dispatch(openModal({type: 'mark_hosts', props: {}}))
                        }}>Настройки</Button>
            </ButtonGroup>
            <ButtonGroup variant='contained' color='secondary' size='large' sx={{marginLeft: '4px'}}>
                <Button startIcon={<QrCodeScannerIcon/>}
                        onClick={() => {
                            dispatch(openModal({type: 'egais', props: {add: true}}))
                        }}>ЕГАИС</Button>
                <Button size='small'
                        endIcon={<SettingsIcon/>}
                        onClick={() => {
                            dispatch(openModal({type: 'egais_settings', props: {}}))
                        }}>УТМ ЕГАИС</Button>
            </ButtonGroup>
            <Button variant='contained' color='secondary' sx={{marginLeft: '4px'}}
                    startIcon={<QrCode2Icon/>}>Штрихкод</Button>
        </Box>
    )
}

export default HorecaMenu