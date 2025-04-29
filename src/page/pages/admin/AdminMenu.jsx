import {Box, Button, ButtonGroup, Fade, TextField} from "@mui/material"
import dayjs from "dayjs"
import {NEW_EMPTY_ORDER, setCurrentPreOrder, setOrdersCinemaFilialSeance} from "../../../redux/ordersReducer.js"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {to_str_DAY} from "../../../service/advanced.js"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {TIMEOUT} from "../../../redux/interfaceReducer.js"
import LaptopIcon from "@mui/icons-material/Laptop"
import DockIcon from "@mui/icons-material/Dock"
import LanguageIcon from "@mui/icons-material/Language"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const AdminMenu = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const current_page = useSelector(state => state.interface.current_page)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    return (
        <Box className='admin-panel'>
            <ButtonGroup size='small' variant='outlined' color='secondary'
                         className='admin-panel-period'>
                <Button sx={{padding: '0 20px'}} onClick={() => {
                    const date = dayjs(new Date()).format('YYYY-MM-DD')
                    dispatch(setOrdersCinemaFilialSeance({
                        current_filial: filial,
                        current_uid_seance: null
                    }))
                    dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                    navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                }}>сегодня</Button>
                <Button sx={{padding: '0 20px'}} onClick={() => {
                    dispatch(setOrdersCinemaFilialSeance({
                        current_filial: filial,
                        current_uid_seance: null
                    }))
                    dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                    const date = dayjs(param_date_admin).subtract(1, 'day').format('YYYY-MM-DD')
                    navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                }}><KeyboardArrowLeftIcon/></Button>
                <Button sx={{padding: '0 30px'}} endIcon={
                    <KeyboardArrowDownIcon/>}>Заказы {dayjs(param_date_admin).$D} {to_str_DAY(dayjs(param_date_admin).$d)}</Button>
                <Button sx={{padding: '0 20px'}} onClick={() => {
                    dispatch(setOrdersCinemaFilialSeance({
                        current_filial: filial,
                        current_uid_seance: null
                    }))
                    dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
                    const date = dayjs(param_date_admin).subtract(-1, 'day').format('YYYY-MM-DD')
                    navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                }}><KeyboardArrowRightIcon/></Button>
            </ButtonGroup>
            <Fade in={current_page === 'admin/cinema'} timeout={TIMEOUT} unmountOnExit>
                <ButtonGroup sx={{marginLeft: '4px'}} size='medium' variant='contained' color='secondary'>
                    <Button variant='contained'><LaptopIcon/></Button>
                    <Button variant='contained'><DockIcon/></Button>
                    <Button variant='contained'>< LanguageIcon/></Button>
                </ButtonGroup>
            </Fade>
            <TextField sx={{marginLeft: '4px', width: '250px'}} label="Поиск" variant='filled'/>
        </Box>
    )
}

export default AdminMenu