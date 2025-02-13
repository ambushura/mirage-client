import "../../css/admin.css"
import {Box, Button, ButtonGroup} from "@mui/material"
import ReceiptIcon from '@mui/icons-material/Receipt'
import SaveIcon from '@mui/icons-material/Save'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import {useSelector} from "react-redux"
import SeanceTitle from "../cinema/SeanceTitle.jsx"
import BookingItem from "./BookingItem.jsx"

const Order = () => {

    const pre_order = useSelector(state => state.orders.pre_order)
    const seance = useSelector(state => state.schedule.seance)

    return (
        <Box id="order">
            <Box id="order-box">
                {seance !== undefined ?
                    <>
                        <Box>
                            <ButtonGroup>
                                <Button variant="contained" color="primary" onClick={() => {
                                }}><ReceiptIcon/></Button>
                                <Button variant="contained" color="primary" onClick={() => {
                                }}><SaveIcon/></Button>
                                <Button variant="contained" color="primary" onClick={() => {
                                }}><DeleteForeverIcon/></Button>
                            </ButtonGroup>
                            <Box>{pre_order.number}</Box>
                        </Box>
                        <Box>
                            <ButtonGroup>
                                <ButtonGroup sx={{marginRight: '4px'}}>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                    }}>Скидки</Button>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                    }}><DeleteIcon/></Button>
                                </ButtonGroup>
                                <ButtonGroup sx={{marginRight: '4px'}}>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                    }}>Комментарий</Button>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                    }}><DeleteIcon/></Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                    }}><CheckBoxIcon/></Button>
                                    <Button variant="contained" color="secondary" onClick={() => {
                                    }}><CheckBoxOutlineBlankIcon/></Button>
                                </ButtonGroup>
                            </ButtonGroup>
                        </Box>
                        <Box sx={{padding: '5px 0'}}>
                            <SeanceTitle
                                seance={seance}
                                content_type={true}
                                day={true}
                                its_hall_map={true}
                                age={true}/>
                        </Box>
                        <Box className='schedule-full-seance-film-name'>
                            {seance.film_name}
                        </Box>
                        <Box className='order-booking'>{pre_order.booking.map((booking) => {
                            return (
                                <BookingItem
                                    key={booking.uid}
                                    number={booking.number}
                                    row={booking.row}/>
                            )
                        })}
                        </Box>
                    </> : <></>
                }
            </Box>
        </Box>
    )
}

export default Order