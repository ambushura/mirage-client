import { Box, Button, Drawer } from '@mui/material'
import MenuBar from './MenuBar.jsx'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'

const FrontMobile = () => {
    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    return (
        <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1 }}>Страница</Box>
            <Box sx={{ height: '80px', padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button sx={{ mr: '5px' }} variant="contained" color="info">
                    <AddIcon />
                </Button>
                <Button variant="contained" color="info" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </Button>
            </Box>
            <Drawer
                PaperProps={{
                    sx: {
                        borderRadius: 0,
                    },
                }}
                open={open}
                onClose={toggleDrawer(false)}
            >
                {<MenuBar toggleDrawer={toggleDrawer} />}
            </Drawer>
        </Box>
    )
}

export default FrontMobile
