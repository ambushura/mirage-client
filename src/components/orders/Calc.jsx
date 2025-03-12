import {Box, Button} from "@mui/material"

const Calc = () => {
    return (
        <Box className='order-receipt-payment-calc'>
            <Box className='order-receipt-payment-calc-row'>
                <Box className='receipt-row'>
                    <span>Кино</span>
                    <span>0</span>
                </Box>
                <Box className='receipt-row'>
                    <span>Общепит</span>
                    <span>0</span>
                </Box>
                <Box className='receipt-row'>
                    <span>Всего</span>
                    <span>0</span>
                </Box>
            </Box>
            <Box className='order-receipt-payment-calc-row'>
                <Box className='receipt-row'>
                    <span>скидка</span>
                    <span>0</span>
                </Box>
                <Box className='receipt-row'>
                    <span>скидка</span>
                    <span>0</span>
                </Box>
                <Box className='receipt-row'>
                    <span>скидка</span>
                    <span>0</span>
                </Box>
            </Box>
            <Box className='order-receipt-payment-calc-row'>
                <Box className='receipt-row'>
                </Box>
                <Box className='receipt-row'>
                    <span>вам должны</span>
                    <span>0</span>
                </Box>
                <Box className='receipt-row'>
                    <span>принял</span>
                    <span>0</span>
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
                <Button variant='contained' color='secondary'>0</Button>
                <Button variant='contained' color='secondary' style={{flexGrow: 1}}>Очистить</Button>
            </Box>
        </Box>
    )
}

export default Calc