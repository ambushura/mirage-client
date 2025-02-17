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
import {useSetContentHeight} from "../../hooks/useSetContentHeight.js"

const Order = () => {

    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const [content_height] = useSetContentHeight()

    return (
        <Box id="order" style={{height: content_height}}>
            {pre_order.in_base && pre_order.seance !== undefined ?
                <Box className="order-box">
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        with: 'calc(80px * 3)',
                        height: '60px'
                    }}>
                        <ButtonGroup>
                            <Button style={{minWidth: '80px'}} variant="contained" color="info"
                                    onClick={() => {
                                    }}><ReceiptIcon/></Button>
                            <Button style={{minWidth: '80px'}} variant="contained" color="secondary"
                                    onClick={() => {
                                    }}><SaveIcon/></Button>
                            <Button style={{minWidth: '80px'}} variant="contained" color="primary"
                                    onClick={() => {
                                    }}><DeleteForeverIcon/></Button>
                        </ButtonGroup>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '80%',
                            color: '#8B919B',
                        }}><span>{pre_order.number}</span></Box>
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
                            seance={pre_order.seance}
                            content_type={true}
                            day={true}
                            its_hall_map={true}
                            age={true}/>
                    </Box>
                    <Box className='seance-title-film-name'>
                        {pre_order.seance.film_name}
                    </Box>
                    <Box className='seance-title-hall-name'>
                        Зал {pre_order.seance.hall_full_name}
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
                </Box> : <></>
            }
            {horder.number === undefined ?
                <Box className="order-box">
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        with: 'calc(80px * 3)',
                        height: '60px'
                    }}>
                        <ButtonGroup>
                            <Button style={{minWidth: '80px'}} variant="contained" color="info"
                                    onClick={() => {
                                    }}><ReceiptIcon/></Button>
                            <Button style={{minWidth: '80px'}} variant="contained" color="secondary"
                                    onClick={() => {
                                    }}><SaveIcon/></Button>
                            <Button style={{minWidth: '80px'}} variant="contained" color="primary"
                                    onClick={() => {
                                    }}><DeleteForeverIcon/></Button>
                        </ButtonGroup>
                    </Box> </Box> : <></>
            }
        </Box>
    )
}

export default Order