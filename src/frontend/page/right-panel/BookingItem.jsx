import {Box, Button} from "@mui/material"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {useDispatch, useSelector} from "react-redux"
import {openModal} from "../../../redux/interfaceReducer.js"
import {selectUidCinema} from "../../../redux/ordersReducer.js"

const BookingItem = (props) => {

    const dispatch = useDispatch()
    const uid_selected = useSelector(state => state.orders.uid_cinema_selected)

    return <Box className="order-booking-item">
        <Box
            className={`order-booking-item-description ${props.uid_selected.find(el => el === props.uid) ? 'position-selected' : ''}`}>
            <div style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'calc(100% - 50px)'
            }}
                 onClick={() => {
                     dispatch(selectUidCinema(uid_selected.includes(props.uid) ? uid_selected.filter(el => el !== props.uid) : [...uid_selected, props.uid]))
                 }}>
                <span className="order-booking-item-numbers">{props.place_row}</span>
                <span className="order-booking-item-labels">р</span>
                <span className="order-booking-item-numbers">{props.place_number}</span>
                <span className="order-booking-item-labels">м</span>
                <span className="order-booking-item-numbers"
                      style={{color: props.uid_discount !== null ? '#1DB1BA' : 'black'}}>{props.sum.toLocaleString('ru-RU')} р</span>
            </div>
            <Button color='secondary' onClick={() => {
                dispatch(openModal({
                    type: 'comment_position', props: {
                        order_type: 'cinema',
                        action_type: 'position',
                        uid_order: props.uid_order,
                        uid_position: props.uid,
                        comment: props.comment
                    }
                }))
            }}><BorderColorIcon/></Button>
        </Box>
        {props.uid_discount !== null ? <Box className="order-booking-item-discount">
            <div>{props.name_discount}</div>
            <div style={{marginLeft: '4px'}}>{props.sum_discount} р</div>
        </Box> : null}
        {props.comment !== "" ? <Box className="order-booking-item-comment">
            <div>{props.comment}</div>
        </Box> : null}
    </Box>
}

export default BookingItem