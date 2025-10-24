import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import cover from "../../../images/cover.png"
import DeleteIcon from '@mui/icons-material/Delete'
import SeanceTitle from "../../../components/cinema/SeanceTitle.jsx"

const Ticket = (props) => {

    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)
    const ticket = props.ticket

    if (pre_order.uid !== undefined) {
        return <Box className='checkout-order-ticket'>
            <Box className='checkout-order-ticket-right'>
                <div className='checkout-order-ticket-circle'></div>
            </Box>
            <Box className='checkout-order-ticket-body'>
                <img className='checkout-order-ticket-body-cover'
                     src={pre_order.seance_cover_link === '' ? cover : `http://${filial.media_ip}:${filial.media_port}/${pre_order.seance_cover_link}`}
                     alt={pre_order.film_name}></img>
                <Box className='checkout-order-ticket-body-2'>
                    <SeanceTitle
                        key={pre_order.uid_seance}
                        seance={{
                            uid: pre_order.seance_uid,
                            beginning: pre_order.seance_beginning,
                            ending: pre_order.seance_ending,
                            copy_type: pre_order.film_copy_type,
                            rate_age: pre_order.film_rate_age
                        }}
                        content_type={true}
                        day={true}
                        age={true}
                    />
                    <Box className='checkout-order-ticket-body-2-film-name'>{pre_order.film_name}</Box>
                    <Box className='checkout-order-ticket-body-2-filial'>{filial.name}</Box>
                    <Box className='checkout-order-ticket-body-2-hall'>
                        <Box>{pre_order.hall_name}</Box>
                        <Box><span>Ряд</span>{ticket.place_row}</Box>
                        <Box><span>Место</span>{ticket.place_number}</Box>
                    </Box>
                </Box>
                <Box className='checkout-order-ticket-body-3'>
                    <Box className='checkout-order-ticket-body-3-price'>{ticket.price} Р</Box>
                    <Box className='checkout-order-ticket-body-3-delete' onClick={() => {

                    }}><DeleteIcon sx={{color: '#8B919B'}}/></Box>
                </Box>
            </Box>
        </Box>
    }
}

export default Ticket