import { Box, Button } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import '../../ui/css/mobile/bottom-bar.css'

export default function BottomBar({ setDrawerOpened }) {
    const [active, setActive] = useState('')
    const activeButtonList = ['']

    const items = [{ id: 'new', label: 'Новый', icon: <AddIcon /> }]

    return (
        <Box className="mobile-bottom-wrapper">
            <Box className="mobile-bottom-bar">
                <Box className="mobile-bottom-scroll-clip">
                    <Box className="mobile-bottom-scroll">
                        {items.map((item) => (
                            <Button
                                key={item.id}
                                onClick={() => {
                                    if (activeButtonList.includes(item.id)) {
                                        setActive(item.id)
                                    }
                                }}
                                className={`mobile-bottom-item ${active === item.id && activeButtonList.includes(item.id) ? 'active' : ''}`}
                            >
                                <Box className="mobile-bottom-icon">{item.icon}</Box>
                                <Box className="mobile-bottom-text">{item.label}</Box>
                            </Button>
                        ))}
                    </Box>
                </Box>
                <Button
                    className={`mobile-bottom-home`}
                    onClick={() => {
                        setDrawerOpened(true)
                    }}
                >
                    <MenuIcon />
                    <Box className="mobile-bottom-text">Главная</Box>
                </Button>
            </Box>
        </Box>
    )
}
