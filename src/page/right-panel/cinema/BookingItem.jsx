import {Box} from "@mui/material"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {useDispatch} from "react-redux"
import {openModal} from "../../../redux/interfaceReducer.js"

const BookingItem = (props) => {

    const dispatch = useDispatch()

    return (
        <Box className="order-booking-item">
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
                         props.set_uid_selected(prev =>
                             prev.includes(props.uid)
                                 ? prev.filter(el => el !== props.uid)
                                 : [...prev, props.uid]
                         )
                     }}>
                    <span className="order-booking-item-numbers">{props.place_row}</span>
                    <span className="order-booking-item-labels">р</span>
                    <span className="order-booking-item-numbers">{props.place_number}</span>
                    <span className="order-booking-item-labels">м</span>
                    <span className="order-booking-item-numbers"
                          style={{color: props.uid_discount !== null ? '#FF9800' : 'black'}}>{props.sum.toLocaleString('ru-RU')} р</span>
                </div>
                <button className='order-booking-item-button' onClick={() => {
                    dispatch(openModal({type: 'comment_position', props: {order_type: 'cinema', action_type: 'position', uid_order: props.uid_order, uid_position: props.uid, comment: props.comment}}))
                }}><BorderColorIcon/></button>
            </Box>
            {props.uid_discount !== null ?
                <Box className="order-booking-item-discount">
                    <div>{props.name_discount}</div>
                    <div style={{marginLeft: '4px'}}>{props.sum_discount} р</div>
                </Box>
                : null}
            {props.comment !== "" ?
                <Box className="order-booking-item-comment">
                    <div>{props.comment}</div>
                </Box>
                : null}
        </Box>
    )
}

export default BookingItem