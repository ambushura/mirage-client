import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import StopIcon from '@mui/icons-material/Stop'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'

const DrawerSide = ({ drawerOpened, setDrawerOpened }) => {
    const DrawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => {
                setDrawerOpened(false)
            }}
        >
            <List>
                {['Все заказы', 'Мои заказы'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{index % 2 === 0 ? <ViewModuleIcon /> : <StopIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Настройки', 'Выход'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{index % 2 === 0 ? <SettingsIcon /> : <LogoutIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <Drawer
            open={drawerOpened}
            onClick={() => {
                setDrawerOpened(false)
            }}
            PaperProps={{
                sx: {
                    width: 280,
                    background: 'rgba(255, 255, 255, 0.55)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    color: '#1a1a1a',
                    borderRadius: '0 20px 20px 0',
                },
            }}
        >
            {DrawerList}
        </Drawer>
    )
}

export default DrawerSide
