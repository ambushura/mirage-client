import { Box, Divider, IconButton, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
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

            {/* BOTTOM — меню */}
            <Box className="order-bottom">
                {/* поиск */}
                <SearchBar value={query} onChange={setQuery} onSelect={addItem} />

                {/* навигация */}
                <Box className="menu-nav">
                    {folder && (
                        <IconButton onClick={() => setFolder(null)}>
                            <ArrowBackIcon />
                        </IconButton>
                    )}

                    <Typography className="menu-title">{folder ? currentFolder?.name : 'Категории'}</Typography>
                </Box>

                {/* контент */}
                <Box className="menu-content">
                    {/* папки */}
                    {!folder && (
                        <Box className="folder-grid">
                            {mockMenu.map((f) => (
                                <Box key={f.id} className="folder-card" onClick={() => setFolder(f.id)}>
                                    {f.name}
                                </Box>
                            ))}
                        </Box>
                    )}

                    {/* элементы папки */}
                    {folder && (
                        <Box className="items-grid">
                            {currentFolder?.items.map((item) => (
                                <Box key={item.id} className="item-card" onClick={() => addItem(item)}>
                                    <div>{item.name}</div>
                                    <div>{item.price} RUB</div>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
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
