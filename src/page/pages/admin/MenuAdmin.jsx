import {Box, Button, ButtonGroup, Fade} from "@mui/material"
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
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const MenuAdmin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const current_page = useSelector(state => state.interface.current_page)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    const show_create_delete = () => {
        if (['admin/operations', 'admin/zbooks'].find(el => el === current_page) !== undefined) {
            return (
                <Fade in={['admin/operations', 'admin/zbooks'].find(el => el === current_page) !== undefined}
                      timeout={TIMEOUT} unmountOnExit>
                    <ButtonGroup sx={{marginRight: '4px'}} size='medium' variant='contained' color='secondary'>
                        <Button variant='contained' startIcon={<AddIcon/>}>Создать</Button>
                        <Button variant='contained' startIcon={<RemoveIcon/>}>Удалить</Button>
                    </ButtonGroup>
                </Fade>
            )
        }
    }

    const show_date_param_admin = () => {
        if (['admin/orders/cinema', 'admin/orders/horeca'].find(el => el === current_page) !== undefined) {
            return <ButtonGroup size='small' variant='contained' color='secondary'
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
        }
    }

    const show_cinema_type = () => {
        if (current_page === 'admin/orders/cinema') {
            return (
                <Fade in={current_page === 'admin/orders/cinema'} timeout={TIMEOUT} unmountOnExit>
                    <ButtonGroup sx={{marginLeft: '4px'}} size='medium' variant='contained' color='secondary'>
                        <Button variant='contained'><LaptopIcon/></Button>
                        <Button variant='contained'><DockIcon/></Button>
                        <Button variant='contained'>< LanguageIcon/></Button>
                    </ButtonGroup>
                </Fade>
            )
        }
    }

    const show_egais_menu = () => {
        if (current_page === 'admin/egais') {
            return (
                <Fade in={current_page === 'admin/egais'} timeout={TIMEOUT} unmountOnExit>
                    <Box>
                        <Button size='small' variant='contained' color='secondary'>Организации
                            ЕГАИС</Button>
                        <Button sx={{marginLeft: '4px'}} size='small' variant='contained' color='secondary'>Алкогольная
                            продукция ЕГАИС</Button>
                        <Button sx={{marginLeft: '4px'}} size='small' variant='contained' color='secondary'>Входящие
                            ТТН</Button>
                        <Button sx={{marginLeft: '4px'}} size='small' variant='contained' color='secondary'>Акты
                            списания ЕГАИС</Button>
                        <Button sx={{marginLeft: '4px'}} size='small' variant='contained' color='secondary'>Чеки
                            ЕГАИС</Button>
                    </Box>
                </Fade>
            )
        }
    }

    return (
        <Box className='admin-panel'>
            {show_create_delete()}
            {show_date_param_admin()}
            {show_cinema_type()}
            {show_egais_menu()}
        </Box>
    )
}

export default MenuAdmin