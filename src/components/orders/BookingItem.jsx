import {Box, Button, ButtonGroup} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'

const BookingItem = (props) => {
    return (
        <Box>
            <Box className="order-booking-item">
                <Box className="order-booking-item-description">
                    <span className="order-booking-item-numbers">{props.row}</span>
                    <span className="order-booking-item-labels">р</span>
                    <span className="order-booking-item-numbers">{props.number}</span>
                    <span className="order-booking-item-labels">м</span>
                </Box>
                <ButtonGroup sx={{maxWidth: '140px'}}>
                    <Button color='secondary' variant='contained' onClick={() => {
                    }}><BorderColorIcon/></Button>
                    <Button color='secondary' variant='contained' onClick={() => {
                    }}><DeleteIcon/></Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}

export default BookingItem