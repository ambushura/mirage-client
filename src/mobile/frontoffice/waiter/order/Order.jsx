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
        <Box className="order-layout">
            {/* TOP — заказ */}
            <Box className="order-top">
                <Typography className="order-title">Новый заказ</Typography>

                <Box className="order-list">
                    {order.map((item, idx) => (
                        <Box key={idx} className="order-item">
                            <span>{item.name}</span>
                            <span>{item.price} RUB</span>
                        </Box>
                    ))}
                </Box>

                <Divider sx={{ opacity: 0.1 }} />

                <Box className="order-total">Итого: {order.reduce((s, i) => s + i.price, 0)} RUB</Box>
            </Box>
        </Box>
    )
}

export default Order

export function SearchBar({ value, onChange, onSelect }) {
    return (
        <Box className="search-bar">
            <TextField
                fullWidth
                size="small"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Поиск блюда..."
                sx={{
                    input: { color: 'white' },
                }}
            />

            {/* сюда потом подключишь свой Autocomplete dropdown */}
        </Box>
    )
}
