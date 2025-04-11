import {Box, Button, ButtonGroup, TextField} from "@mui/material"
import OrdersCinema from "./OrdersCinema.jsx"
import OrdersHoreca from "./OrdersHoreca.jsx"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {to_str_DAY} from "../../../../service/advanced.js"
import dayjs from "dayjs"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {useSelector} from "react-redux"
import {NavLink, useNavigate} from "react-router-dom"
import LaptopIcon from '@mui/icons-material/Laptop'
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid'
import LanguageIcon from '@mui/icons-material/Language'

const Orders = () => {

    const navigate = useNavigate()

    const current_page = useSelector(state => state.interface.current_page)
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    return (
        <Box id="page-admin">
            <Box className='admin-panel'>
                <ButtonGroup size='small' variant='contained'
                             className='admin-panel-page'>
                    <NavLink
                        to={city !== undefined ? `/admin/cinema/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date_admin}` : '/'}>
                        <Button color={current_page === 'admin/cinema' ? 'primary' : 'secondary'}
                                sx={{padding: '0 30px'}}>Кино</Button>
                    </NavLink>
                    <NavLink
                        to={city !== undefined ? `/admin/horeca/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date_admin}` : '/'}>
                        <Button color={current_page === 'admin/horeca' ? 'primary' : 'secondary'}
                                sx={{padding: '0 30px'}}>Общепит</Button>
                    </NavLink>
                </ButtonGroup>
                <ButtonGroup sx={{marginLeft: '4px'}} size='small' variant='contained' color='secondary'
                             className='admin-panel-period'>
                    <Button sx={{padding: '0 20px'}} onClick={() => {
                        const date = dayjs(new Date()).format('YYYY-MM-DD')
                        navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                    }}>сегодня</Button>
                    <Button sx={{padding: '0 20px'}} onClick={() => {
                        const date = dayjs(param_date_admin).subtract(1, 'day').format('YYYY-MM-DD')
                        navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                    }}><KeyboardArrowLeftIcon/></Button>
                    <Button sx={{padding: '0 30px'}} endIcon={
                        <KeyboardArrowDownIcon/>}>Заказы {dayjs(param_date_admin).$D} {to_str_DAY(dayjs(param_date_admin).$d)}</Button>
                    <Button sx={{padding: '0 20px'}} onClick={() => {
                        const date = dayjs(param_date_admin).subtract(-1, 'day').format('YYYY-MM-DD')
                        navigate(`${city !== undefined ? `/${current_page}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${date}` : '/'}`)
                    }}><KeyboardArrowRightIcon/></Button>
                </ButtonGroup>
                <ButtonGroup sx={{marginLeft: '4px'}} size='medium' variant='contained' color='secondary'>
                    <Button variant='contained'><LaptopIcon/></Button>
                    <Button variant='contained'><TabletAndroidIcon/></Button>
                    <Button variant='contained'>< LanguageIcon/></Button>
                </ButtonGroup>
                <TextField sx={{marginLeft: '4px', width: '250px'}} label="Поиск" variant='filled'/>
            </Box>
            {current_page === 'admin/cinema' ? <OrdersCinema/> : null}
            {current_page === 'admin/horeca' ? <OrdersHoreca/> : null}
        </Box>
    )
}

export default Orders