import {Box, Button, ButtonGroup} from "@mui/material"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {useDispatch} from "react-redux"
import {openModal} from "../../../redux/interfaceReducer.js"

const BookingItem = (props) => {

    const dispatch = useDispatch()

    return (
        <Box>
            <ButtonGroup variant='contained' color='secondary' className="order-booking-item">
                <Button className="order-booking-item-description">
                    <span className="order-booking-item-numbers">{props.place_row}</span>
                    <span className="order-booking-item-labels">р</span>
                    <span className="order-booking-item-numbers">{props.place_number}</span>
                    <span className="order-booking-item-labels">м</span>
                    <span className="order-booking-item-numbers">{props.price}</span>
                    <span className="order-booking-item-labels">р</span>
                </Button>
                <Button sx={{borderRadius: '0 12px 12px 0'}} color='secondary' variant='contained' onClick={() => {
                    dispatch(openModal({type: 'comment', props: {}}))
                }}><BorderColorIcon/></Button>
            </ButtonGroup>
        </Box>
    )
}

export default BookingItem