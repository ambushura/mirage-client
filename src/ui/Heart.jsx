import Button from "@mui/material/Button"
import SkipNextIcon from '@mui/icons-material/SkipNext'

export default function Heart() {
    return <div className="bgr-wrapper">
        <div className="bgr-wavy-bg"/>
        <Button sx={{borderRadius: '30px'}} color='secondary' className="bgr-glass-btn" onClick={() => {
            window.location.reload()
        }} endIcon={<SkipNextIcon/>}>Продолжить</Button>
        <div className='bgr-message' style={{
            position: 'absolute', bottom: '50px', color: '#1C1F23', fontWeight: '400', zIndex: '1'
        }}>· Версия программы была
            обновлена, нажмите "Продолжить", чтобы продолжить работу ·
        </div>
    </div>
}