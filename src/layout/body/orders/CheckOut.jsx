import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import "./orders.css"
import {Box, Button, LinearProgress} from "@mui/material"
import {NavLink} from "react-router-dom"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
const CheckOut = () => {

    const pre_order = useSelector(state => state.orders.pre_order)

    // Таймер для действий
    const [time_remaining, set_time_remaining] = useState(100)
    useEffect(() => {
        const timer = setInterval(() => {
            set_time_remaining((prevTimeRemaining) => (prevTimeRemaining - 1))
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <Box id='checkout'>
            <Box>
                <Box className='seance-panel'>
                    <NavLink to={`/films/`} onClick={() => {
                    }}><Button
                        variant="contained" color="secondary"><KeyboardArrowLeftIcon/>Назад</Button></NavLink>
                    <Box sx={{width: '100%'}}>
                        <LinearProgress
                            sx={{
                                height: '100%',
                                borderRadius: '12px'
                            }} value={time_remaining} variant="determinate"/>
                    </Box>
                </Box>
                <Box>
                    {pre_order.books.map(ticket => {
                        return (
                            <Box>
                                {ticket.row}
                            </Box>
                        )
                    })}
                </Box>
            </Box>
            <Box>
                <Box>ВАШ ЗАКАЗ</Box>
            </Box>
        </Box>
    )
}
export default CheckOut