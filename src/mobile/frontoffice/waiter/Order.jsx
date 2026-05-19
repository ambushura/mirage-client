import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'

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
        <Paper
            elevation={0}
            sx={{
                background: '#1B1B1B',
                color: '#fff',
                borderRadius: 3,
                padding: 1.5,
                width: '100%',
                maxWidth: 170,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255,255,255,0.06)',
                margin: '0 5px 5px 0',
            }}
        >
            {/* HEADER */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 1,
                }}
            >
                <Box>
                    <Typography fontSize={14} fontWeight={700}>
                        №{order.number}
                    </Typography>

                    <Typography fontSize={12} color="rgba(255,255,255,0.6)">
                        {order.waiter}
                    </Typography>
                </Box>

                <Typography fontSize={12} color="rgba(255,255,255,0.5)">
                    {order.createdAt}
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* BODY */}
            <Box
                sx={{
                    mt: 1,
                    mb: 1,
                    maxHeight: 140,
                    overflowY: 'auto',
                    paddingRight: 0.5,

                    '&::-webkit-scrollbar': {
                        width: 4,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: 4,
                    },
                }}
            >
                {order.items.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 0.6,
                        }}
                    >
                        <Typography fontSize={13} sx={{ opacity: 0.95 }}>
                            {index + 1}. {item.name}
                        </Typography>

                        <Typography fontSize={13} color="rgba(255,255,255,0.6)">
                            {item.qty} {item.unit}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* FOOTER */}
            <Box
                sx={{
                    mt: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <PersonRoundedIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                    <Typography fontSize={13}>{order.persons}</Typography>
                </Stack>

                <Typography fontSize={14} fontWeight={700}>
                    {order.total.toLocaleString('ru-RU')} <span style={{ color: '#7c7c7c' }}>RUB</span>
                </Typography>
            </Box>
        </Paper>
    )
}
