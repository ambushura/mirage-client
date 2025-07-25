import {Box, Button} from "@mui/material"
import {useSelector} from "react-redux"
import SeanceTitle from "../../../components/cinema/SeanceTitle.jsx"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import {useNavigate} from "react-router-dom"
import LocationOnIcon from '@mui/icons-material/LocationOn'

const SeanceMenu = () => {

    const navigate = useNavigate()
    const seance = useSelector(state => state.schedule.seance)

    return (
        <Box id="top-menu">
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Button variant="contained" color="secondary" size='large' sx={{marginRight: '4px'}}
                            onClick={() => {
                                navigate(-1)
                            }}><KeyboardArrowLeftIcon/>Назад</Button>
                    <SeanceTitle
                        seance={seance}
                        content_type={true}
                        day={true}
                        its_hall_map={true}
                        age={true}/>
                    <Box sx={{fontWeight: 'bold', margin: '0 8px', fontSize: '20px', overflow: 'hidden'}}>{seance.name_film}</Box>
                    <Box sx={{margin: '0 16px', fontSize: '18px', fontWeight: 'bold', color: '#8B919B', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><LocationOnIcon/><span>Зал
                        №{seance.hall_full_name}</span></Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Button variant='contained' color='primary'>Закрыть сеанс</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default SeanceMenu