import {Box, Button, Fade} from "@mui/material"
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import PersonIcon from '@mui/icons-material/Person'
import {useSelector} from "react-redux"
import {TIMEOUT} from "../../../../service/fetch_service.js"

const OrdersHoreca = () => {

    const orders_show_halls = useSelector(state => state.interface.orders_show_halls)

    return (
        <Box className='admin-orders-horeca'>
            <Box className='admin-orders-horeca-panel'>
                <Box sx={{position: 'sticky', top: 0, zIndex: 1}}><Button variant='contained'
                                                                          color='secondary'>Ожидают
                    оплаты</Button></Box>
                <Box sx={{position: 'sticky', top: '64px', zIndex: 1}}><Button variant='contained' color='secondary'>Пробейте
                    кассовый чек</Button></Box>
                <Box sx={{position: 'sticky', top: '128px', zIndex: 1}}><Button variant='contained'
                                                                                color='secondary'>Успешно
                    оплаченные</Button></Box>
                <Box sx={{position: 'sticky', top: '192px', zIndex: 1}}><Button variant='contained'
                                                                                color='secondary'>Отмененные</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
                <Box><Button variant='contained' color='grey' startIcon={<PersonIcon/>}>Петров Иван
                    Иванович</Button></Box>
            </Box>
            <Fade in={orders_show_halls} timeout={TIMEOUT} unmountOnExit>
                <Box className='admin-orders-horeca-halls'>
                    <Box sx={{position: 'sticky', top: 0}}><span
                        style={{backgroundColor: 'transparent'}}><AppRegistrationIcon
                        sx={{width: '100%', height: '100%'}}/></span></Box>
                    <Box sx={{position: 'sticky', top: '70px'}}><span style={{fontSize: '100%'}}>Все</span></Box>
                    <Box sx={{position: 'sticky', top: '140px'}}><span style={{fontSize: '100%'}}>Без места</span></Box>
                    <Box><span>13</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                    <Box><span>1</span></Box>
                    <Box><span>2</span></Box>
                    <Box><span>3</span></Box>
                </Box>
            </Fade>
            <Box className='admin-orders-horeca-orders'>
                <Box>Заказ 1</Box>
                <Box>Заказ 2</Box>
                <Box>Заказ 3</Box>
                <Box>Заказ 4</Box>
            </Box>
        </Box>
    )
}

export default OrdersHoreca