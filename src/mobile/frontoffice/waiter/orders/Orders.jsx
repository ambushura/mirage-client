import { Box } from '@mui/material'
import OrderCard from './Order.jsx'
import './orders.css'

export default function Orders() {
    return (
        <Box className="mobile-orders">
            {Array.from({ length: 12 }).map((_, index) => (
                <OrderCard key={index} />
            ))}
        </Box>
    )
}
