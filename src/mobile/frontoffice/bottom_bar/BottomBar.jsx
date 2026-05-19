import { Box, Button } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import './bottom-bar.css'

export default function BottomBar({ setDrawerOpened, current_page }) {
    const [active, setActive] = useState([])
    const activeButtonList = ['waiting', 'done', 'canceled']

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
                                    if (!activeButtonList.includes(item.id)) return
                                    setActive((prev) => {
                                        if (prev.includes(item.id)) {
                                            return prev.filter((id) => id !== item.id)
                                        }
                                        return [...prev, item.id]
                                    })
                                }}
                                className={`mobile-bottom-item ${active.includes(item.id) ? 'active' : ''}`}
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
                    <Box className="mobile-bottom-text"></Box>
                </Button>
            </Box>
        </Box>
    )
}
