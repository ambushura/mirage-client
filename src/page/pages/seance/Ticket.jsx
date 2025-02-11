import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import cover from "../../../images/cover.jpg"
import DeleteIcon from '@mui/icons-material/Delete'
import SeanceTitle from "../../../components/cinema/SeanceTitle.jsx"

const Ticket = (props) => {

    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)
    const ticket = props.ticket

    if (pre_order.uid !== undefined) {
        return (
            <Box className='checkout-order-ticket'>
                <Box className='checkout-order-ticket-right'>
                    <div className='checkout-order-ticket-circle'></div>
                </Box>
                <Box className='checkout-order-ticket-body'>
                    <img className='checkout-order-ticket-body-cover'
                         src={pre_order.seance.cover_link === '' ? cover : "http://msk-rst-media.cinema.mirage.ru" + pre_order.seance.cover_link}
                         alt={pre_order.seance.name_film}></img>
                    <Box className='checkout-order-ticket-body-2'>
                        <SeanceTitle
                            key={pre_order.seance.uid}
                            seance={pre_order.seance}
                            content_type={true}
                            day={true}
                        />
                        <Box className='checkout-order-ticket-body-2-film-name'>{pre_order.seance.name_film}</Box>
                        <Box className='checkout-order-ticket-body-2-filial'>{filial.name}</Box>
                        <Box className='checkout-order-ticket-body-2-hall'>
                            <Box>{pre_order.seance.name_hall}</Box>
                            <Box><span>Ряд</span>{ticket.row}</Box>
                            <Box><span>Место</span>{ticket.number}</Box>
                        </Box>
                    </Box>
                    <Box className='checkout-order-ticket-body-3'>
                        <Box className='checkout-order-ticket-body-3-price'>{ticket.price} Р</Box>
                        <Box className='checkout-order-ticket-body-3-delete' onClick={
                            () => {

                            }
                        }><DeleteIcon sx={{color: '#8B919B'}}/></Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default Ticket