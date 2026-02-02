import {useDispatch, useSelector} from "react-redux"
import {openModal} from "../../redux/interfaceReducer.js"
import {Button} from "@mui/material"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import sounds_on from "/src/sounds/on.mp3"
import {useState} from "react"
import useSound from "use-sound"

const Footer = () => {

    const dispatch = useDispatch()
    const {wp, kiosk, its_second_screen} = useSelector(state => state.interface)

    const [play] = useSound(sounds_on)
    const [unlocked, set_unlocked] = useState(false)

    return <footer id="footer" className='glass-effect'>
        <div>© «МИРАЖ СИНЕМА» {new Date().getFullYear()}</div>
        {!its_second_screen && <div>{wp}</div>}
        {!kiosk && !its_second_screen && <div style={{position: 'absolute', right: 0}}>
            <Button style={{minWidth: '28px', height: '42px', marginRight: '4px'}} variant='outlined' size='small'
                    color='secondary' onClick={() => {
                dispatch(openModal({
                    type: 'dialog_reboot', props: {
                        type: 'YesNo',
                        action: 'reboot',
                        question: 'Вы уверены, что хотите ПЕРЕЗАГРУЗИТЬ это рабочее место?',
                    }
                }))
            }}><RestartAltIcon/></Button>
            <Button style={{minWidth: '28px', height: '42px', marginRight: '4px'}} variant='outlined' size='small'
                    color='secondary' onClick={() => {
                dispatch(openModal({
                    type: 'dialog_shutdown', props: {
                        type: 'YesNo',
                        action: 'shutdown',
                        question: 'Вы уверены, что хотите ВЫКЛЮЧИТЬ это рабочее место?',
                    }
                }))
            }}><PowerSettingsNewIcon/></Button>
        </div>}
    </footer>
}

export default Footer