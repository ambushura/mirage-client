import { Box, Divider, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import './order.css'

const Order = () => {
    const mockMenu = [
        {
            id: 'hot',
            name: 'Горячее',
            items: [
                { id: 1, name: 'Стейк', price: 1200 },
                { id: 2, name: 'Паста', price: 600 },
            ],
        },
        {
            id: 'drinks',
            name: 'Напитки',
            items: [
                { id: 3, name: 'Кола', price: 200 },
                { id: 4, name: 'Чай', price: 150 },
            ],
        },
    ]

    const [order, setOrder] = useState([])
    const [folder, setFolder] = useState(null)
    const [query, setQuery] = useState('')

    const addItem = (item) => {
        setOrder((prev) => [...prev, item])
    }

    const currentFolder = useMemo(() => {
        return mockMenu.find((f) => f.id === folder)
    }, [folder])

    return (
        <Box className="mobile-order-layout">
            <Box className="mobile-order-panel">
                <Typography className="mobile-order-title">Новый заказ</Typography>

                <SearchBar value={query} onChange={setQuery} />

                <Box className="mobile-order-list">
                    {order.map((item, idx) => (
                        <Box key={idx} className="mobile-order-item">
                            <span>{item.name}</span>
                            <span>{item.price} RUB</span>
                        </Box>
                    ))}
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

                <Box className="mobile-order-total">
                    Итого:
                    <span>{order.reduce((s, i) => s + i.price, 0)} RUB</span>
                </Box>
            </Box>
        </Box>
    )
}

export default Order

export function SearchBar({ value, onChange }) {
    return (
        <Box className="mobile-order-search">
            <TextField
                fullWidth
                size="small"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Поиск блюда..."
                sx={{
                    '& .MuiOutlinedInput-root': {
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '16px',
                        color: '#fff',

                        '& fieldset': {
                            borderColor: 'rgba(255,255,255,0.06)',
                        },

                        '&:hover fieldset': {
                            borderColor: 'rgba(255,255,255,0.12)',
                        },

                        '&.Mui-focused fieldset': {
                            borderColor: '#E3000B',
                        },
                    },

                    input: {
                        color: '#fff',
                    },
                }}
            />
        </Box>
    )
}
