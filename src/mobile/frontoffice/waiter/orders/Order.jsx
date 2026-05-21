import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import './orders.css'

export default function Order() {
    const order = {
        number: 1245,
        waiter: 'Иванов И.И.',
        createdAt: '14:22',
        persons: 4,
        total: 12450,
        items: [
            { name: 'Борщ', qty: 2, unit: 'порц' },
            { name: 'Стейк medium', qty: 1, unit: 'шт' },
            { name: 'Coca-Cola', qty: 3, unit: 'шт' },
            { name: 'Картофель фри', qty: 2, unit: 'порц' },
        ],
    }

    return (
        <Paper elevation={0} className="mobile-order-card">
            <Box className="mobile-order-card-header">
                <Box>
                    <Typography className="mobile-order-card-number">#{order.number}</Typography>

                    <Typography className="mobile-order-card-waiter">{order.waiter}</Typography>
                </Box>

                <Typography className="mobile-order-card-time">{order.createdAt}</Typography>
            </Box>

            <Divider className="mobile-order-divider" />

            <Box className="mobile-order-card-items">
                {order.items.map((item, index) => (
                    <Box key={index} className="mobile-order-card-item">
                        <Typography className="mobile-order-card-item-name">
                            {index + 1}. {item.name}
                        </Typography>

                        <Typography className="mobile-order-card-item-qty">
                            {item.qty} {item.unit}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Divider className="mobile-order-divider" />

            <Box className="mobile-order-card-footer">
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <PersonRoundedIcon
                        sx={{
                            fontSize: 18,
                            opacity: 0.7,
                            color: '#bdbdbd',
                        }}
                    />

                    <Typography className="mobile-order-card-persons">{order.persons}</Typography>
                </Stack>

                <Typography className="mobile-order-card-total">
                    {order.total.toLocaleString('ru-RU')}

                    <span> RUB</span>
                </Typography>
            </Box>
        </Paper>
    )
}
