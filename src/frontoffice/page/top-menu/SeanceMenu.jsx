import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import SeanceTitle from '../../components/cinema/SeanceTitle.jsx'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { useNavigate } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { openModal } from '../../../redux/interfaceReducer.js'
import { cinema_seance_booking_get } from '../../../service/fetch_service.js'
import { setBooking } from '../../../redux/scheduleReducer.js'

const SeanceMenu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const filial = useSelector((state) => state.data.filial)
    const seance = useSelector((state) => state.schedule.seance)
    const user = useSelector((state) => state.auth.uid)
    const pre_order = useSelector((state) => state.orders.pre_order)

    return (
        seance !== undefined && (
            <Box id="top-menu">
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            sx={{ marginRight: '4px' }}
                            onClick={() => {
                                navigate(-1)
                            }}
                            startIcon={<KeyboardArrowLeftIcon />}
                        >
                            Назад
                        </Button>
                        <SeanceTitle seance={seance} content_type={true} day={true} its_hall_map={true} age={true} />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: 'var(--bgr-color)',
                                height: '48px',
                                borderRadius: '12px',
                                padding: '0 8px 0 0',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    margin: '0 16px',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#8B919B',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <LocationOnIcon />
                                <span>Зал №{seance.hall_full_name}</span>
                            </Box>
                            <Box
                                sx={{
                                    fontWeight: 'bold',
                                    margin: '0 8px',
                                    fontSize: '20px',
                                    overflow: 'hidden',
                                    overflowWrap: 'break-word',
                                    whiteSpace: 'wrap',
                                }}
                            >
                                {seance.name_film}
                            </Box>
                        </Box>
                    </Box>
                    {!seance.canceled && seance.opened && user !== null && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ marginRight: '4px' }}
                                onClick={async () => {
                                    if (seance !== undefined) {
                                        const fetching_result = await dispatch(
                                            cinema_seance_booking_get(filial, seance.uid, pre_order.uid, true)
                                        )
                                        if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                                            dispatch(setBooking(fetching_result.data))
                                        }
                                    }
                                }}
                            >
                                Уточнить брони
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    if (seance !== undefined) {
                                        dispatch(
                                            openModal({
                                                type: 'seance_cancellation',
                                                props: { uid_seance: seance.uid, ver: seance.ver },
                                            })
                                        )
                                    }
                                }}
                            >
                                Отменить сеанс
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        )
    )
}

export default SeanceMenu
