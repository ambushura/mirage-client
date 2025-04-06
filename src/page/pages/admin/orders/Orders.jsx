import {Box, Button, ButtonGroup, TextField} from "@mui/material"
import OrdersCinema from "./OrdersCinema.jsx"
import OrdersHoreca from "./OrdersHoreca.jsx"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {to_str_DAY} from "../../../../service/advanced.js"
import dayjs from "dayjs"
import {useSelector} from "react-redux"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const Orders = () => {

    const param_date = useSelector(state => state.interface.params.param_date)

    return (
        <Box>
            <Box className='admin-orders-panel'>
                <ButtonGroup sx={{marginLeft: '4px'}} size='small' variant='contained'
                             className='admin-orders-panel-page'>
                    <Button color='primary' sx={{padding: '0 30px'}}>Кино</Button>
                    <Button color='secondary' sx={{padding: '0 30px'}}>Общепит</Button>
                </ButtonGroup>
                <ButtonGroup sx={{marginLeft: '4px'}} size='small' variant='contained' color='secondary'
                             className='admin-orders-panel-period'>
                    <Button sx={{padding: '0 20px'}}>сегодня</Button>
                    <Button sx={{padding: '0 20px'}}><KeyboardArrowLeftIcon/></Button>
                    <Button sx={{padding: '0 30px'}} endIcon={
                        <KeyboardArrowDownIcon/>}>Заказы {dayjs(param_date).$D} {to_str_DAY(dayjs(param_date).$d)}</Button>
                    <Button sx={{padding: '0 20px'}}><KeyboardArrowRightIcon/></Button>
                </ButtonGroup>
                <TextField sx={{marginLeft: '4px', width: '250px'}} label="Поиск" variant='filled'/>
            </Box>
            <OrdersCinema/>
            <OrdersHoreca/>
        </Box>
    )
}

export default Orders