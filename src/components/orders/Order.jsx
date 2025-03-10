import "../../css/admin.css"
import {Box, Button, ButtonGroup} from "@mui/material"
import ReceiptIcon from '@mui/icons-material/Receipt'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CachedIcon from '@mui/icons-material/Cached'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import {useSelector} from "react-redux"
import SeanceTitle from "../cinema/SeanceTitle.jsx"
import BookingItem from "./cinema/BookingItem.jsx"
import {useSetContentHeight} from "../../hooks/interface/useSetContentHeight.js"
import HorecaItem from "./horeca/HorecaItem.jsx"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

const Order = () => {

    const navigate = useNavigate()
    const cities = useSelector(state => state.data.cities)
    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)
    const [pre_order_show, set_pre_order_show] = useState(false)
    const [horder_show, set_horder_show] = useState(false)
    const [content_height] = useSetContentHeight()

    useEffect(() => {
        if (pre_order.in_base && pre_order.seance !== undefined && filial !== undefined) {
            set_pre_order_show(true)
        } else {
            set_pre_order_show(false)
        }
        if (horder.in_base && horder.items.length > 0 && filial !== undefined) {
            set_horder_show(true)
        } else {
            set_horder_show(false)
        }
    }, [horder, pre_order, filial])

    const seance_link = () => {
        let link = '/'
        if (pre_order !== undefined) {
            const city = cities.find(el => el.uid === pre_order.uid_city)
            if (city !== undefined) {
                const filial = city.filials.find(el => el.uid === pre_order.uid_filial)
                if (filial !== undefined) {
                    link = `/seance/${city.code}/${filial.eais}/${pre_order.uid_seance}/`
                }
            }
        }
        return link
    }

    return (
        <Box id="order" style={{height: content_height}}>
            {pre_order_show ?
                <Box className="order-box" style={{height: horder_show ? '50%' : '100%'}}>
                    <Box className="order-box-panel-cinema-1">
                        <ButtonGroup>
                            <Button style={{minWidth: '80px'}} variant="contained" color="info"
                                    onClick={() => {
                                    }}><ReceiptIcon/></Button>
                            <Button style={{minWidth: '80px'}} variant="contained" color="secondary"
                                    onClick={() => {
                                    }}><CachedIcon/></Button>
                            <Button style={{minWidth: '80px'}} variant="contained" color="primary"
                                    onClick={() => {
                                    }}><DeleteForeverIcon/></Button>
                            <Button style={{minWidth: '80px'}} variant="contained" color="secondary"
                                    onClick={() => {
                                    }}><CloseIcon/></Button>
                        </ButtonGroup>
                        <Box className="order-box-panel-1-sum-number">
                            <span
                                className='order-box-panel-1-number'>{`${pre_order.number === 'Временные брони' ? pre_order.number : '№' + pre_order.number}`}</span>
                            <span className='order-box-panel-1-sum'>{pre_order.sum} р</span>
                        </Box>
                    </Box>
                    <Box className="order-box-panel-cinema-2">
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
                        </ButtonGroup>
                    </Box>
                    <Box className="order-box-panel-cinema-3" onClick={() => {
                        navigate(seance_link())
                    }}>
                        <SeanceTitle
                            seance={pre_order.seance}
                            content_type={true}
                            day={true}
                            its_hall_map={true}
                            age={true}/>
                        <Box className='seance-title-film-name'>
                            {pre_order.seance.film_name}
                        </Box>
                        <Box className='seance-title-hall-name'>
                            Зал {pre_order.seance.hall_full_name}
                        </Box>
                    </Box>
                    <Box className="order-box-panel-cinema-4">
                        <Box className='order-booking'>{pre_order.booking.map((booking) => {
                            return (
                                <BookingItem
                                    key={booking.uid}
                                    number={booking.number}
                                    row={booking.row}/>
                            )
                        })}
                        </Box>
                    </Box>
                </Box> : <></>
            }
            {horder_show ?
                <Box className="order-box" style={{height: pre_order_show ? '50%' : '100%'}}>
                    <Box className="order-box-panel-1">
                        <ButtonGroup>
                            <Button style={{minWidth: '80px'}} variant="contained" color="info"
                                    onClick={() => {
                                    }}><ReceiptIcon/></Button>
                            <Button style={{minWidth: '80px'}} variant="contained" color="secondary"
                                    onClick={() => {
                                    }}><CachedIcon/></Button>
                            <Button style={{minWidth: '80px'}} variant="contained" color="primary"
                                    onClick={() => {
                                    }}><DeleteForeverIcon/></Button>
                            <Button style={{minWidth: '80px'}} variant="contained" color="secondary"
                                    onClick={() => {
                                    }}><CloseIcon/></Button>
                        </ButtonGroup>
                        <Box className="order-box-panel-1-sum-number">
                            <span className='order-box-panel-1-number'>№{horder.number}</span>
                            <span className='order-box-panel-1-sum'>{horder.sum} р</span>
                        </Box>
                    </Box>
                    <Box className="order-box-panel-2">
                        <ButtonGroup sx={{marginBottom: '4px'}}>
                            <ButtonGroup sx={{marginRight: '4px'}}>
                                <Button variant="contained" color="secondary" onClick={() => {
                                }}>Пречек</Button>
                                <Button variant="contained" color="secondary" onClick={() => {
                                }}>Разделить</Button>
                            </ButtonGroup>
                            <ButtonGroup sx={{marginRight: '4px'}}>
                                <Button variant="contained" color="secondary" onClick={() => {
                                }}>Комментарий</Button>
                                <Button variant="contained" color="secondary" onClick={() => {
                                }}><DeleteIcon/></Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button variant="contained" color="secondary" onClick={() => {
                                }}>Стол</Button>
                                <Button variant="contained" color="secondary" onClick={() => {
                                }}><DeleteIcon/></Button>
                            </ButtonGroup>
                        </ButtonGroup>
                    </Box>
                    <Box className="order-box-panel-3">
                        {horder.items.filter(el => el.kitchen.state === 1).length > 0 ?
                            <>
                                <Box className="order-box-panel-3-title-for-kitchen">Отправить на кухню</Box>
                                <ul className="order-box-panel-3-list-for-kitchen">
                                    {horder.items.filter(el => el.kitchen.state === 1).map((item) => {
                                        return (
                                            <HorecaItem key={item.uid} item={item}/>
                                        )
                                    })}
                                </ul>
                            </> : <></>
                        }
                        {horder.items.filter(el => el.kitchen.state === 2).length > 0 ?
                            <>
                                <Box className="order-box-panel-3-title-kitchen">На кухне</Box>
                                <ul className="order-box-panel-3-list-kitchen">
                                    {horder.items.filter(el => el.kitchen.state === 2).map((item) => {
                                        return (
                                            <HorecaItem key={item.uid} item={item}/>
                                        )
                                    })}
                                </ul>
                            </> : <></>
                        }
                        {horder.items.filter(el => el.kitchen.state === 3).length > 0 ?
                            <>
                                <Box className="order-box-panel-3-title-kitchen-ready">Приготовлено</Box>
                                <ul className="order-box-panel-3-list-kitchen-ready">
                                    {horder.items.filter(el => el.kitchen.state === 3).map((item) => {
                                        return (
                                            <HorecaItem key={item.uid} item={item}/>
                                        )
                                    })}
                                </ul>
                            </> : <></>
                        }
                        {horder.items.filter(el => el.kitchen.state === 0).length > 0 ?
                            <>
                                <Box className="order-box-panel-3-title-others">Готово к выдаче</Box>
                                <ul className="order-box-panel-3-list-others">
                                    {horder.items.filter(el => el.kitchen.state === 0).map((item) => {
                                        return (
                                            <HorecaItem key={item.uid} item={item}/>
                                        )
                                    })}
                                </ul>
                            </> : <></>
                        }
                    </Box>
                </Box> : <></>
            }
        </Box>
    )
}

export default Order