import {Box, Button} from "@mui/material"

const Calc = () => {
    return (
        <Box className='order-receipt-payment-calc'>
            <Box className='order-receipt-payment-calc-row' sx={{height: '50px'}}>
                <Box className='receipt-row receipt-sum' style={{borderRadius: '12px 0 0 0'}}>
                    <span>Кино</span>
                    <span className='receipt-price'>0</span>
                </Box>
                <Box className='receipt-row receipt-sum'>
                    <span>Общепит</span>
                    <span className='receipt-price'>0</span>
                </Box>
                <Box className='receipt-row receipt-sum' style={{borderRadius: '0 12px 0 0'}}>
                    <span>Всего</span>
                    <span className='receipt-price'>0</span>
                </Box>
            </Box>
            <Box className='order-receipt-payment-calc-row' sx={{height: '50px'}}>
                <Box className='receipt-row receipt-sum' style={{fontWeight: 'normal'}}>
                    <span style={{fontSize: '80%'}}>скидка</span>
                    <span className='receipt-price'>0</span>
                </Box>
                <Box className='receipt-row receipt-sum' style={{fontWeight: 'normal'}}>
                    <span style={{fontSize: '80%'}}>скидка</span>
                    <span className='receipt-price'>0</span>
                </Box>
                <Box className='receipt-row receipt-sum' style={{fontWeight: 'normal'}}>
                    <span style={{fontSize: '80%'}}>скидка</span>
                    <span className='receipt-price'>0</span>
                </Box>
            </Box>
            <Box className='order-receipt-payment-calc-row' sx={{height: '50px', marginBottom: '4px'}}>
                <Box className='receipt-row receipt-sum' style={{borderRadius: '0 0 0 12px'}}>
                </Box>
                <Box className='receipt-row receipt-sum'>
                    <span style={{fontSize: '80%'}}>Вам должны</span>
                    <span className='receipt-price'>0</span>
                </Box>
                <Box className='receipt-row receipt-sum' style={{borderRadius: '0 0 12px 0'}}>
                    <span style={{fontSize: '85%'}}>Вы получили</span>
                    <span className='receipt-price'>0</span>
                </Box>
            </Box>
            <Box className='order-receipt-payment-calc-row'>
                <Button variant='contained' color='secondary'>1</Button>
                <Button variant='contained' color='secondary'>2</Button>
                <Button variant='contained' color='secondary'>3</Button>
            </Box>
            <Box className='order-receipt-payment-calc-row'>
                <Button variant='contained' color='secondary'>4</Button>
                <Button variant='contained' color='secondary'>5</Button>
                <Button variant='contained' color='secondary'>6</Button>
            </Box>
            <Box className='order-receipt-payment-calc-row'>
                <Button variant='contained' color='secondary'>7</Button>
                <Button variant='contained' color='secondary'>8</Button>
                <Button variant='contained' color='secondary'>9</Button>
            </Box>
            <Box className='order-receipt-payment-calc-row' style={{display: 'flex'}}>
                <Button variant='contained' color='secondary' style={{margin: '0 2px 0 0'}}>0</Button>
                <Button variant='contained' color='secondary'
                        style={{flexGrow: 1, margin: '0 0 0 2px'}}>Очистить</Button>
            </Box>
        </Box>
    )
}

export default Calc