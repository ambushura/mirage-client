import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { center_menu_icons } from '../../../ui/ThemeContext.jsx'
import { useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

const CenterHeaderLeft = () => {
    const navigate = useNavigate()
    const { main_menu, current_page } = useSelector((state) => state.center)

    return (
        <Box id="center-side-panel">
            <Box
                sx={{
                    height: 'var(--center-header-height)',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#c3000A',
                    fontStyle: 'italic',
                }}
            >
                МИРАЖ
            </Box>
            <Paper id="center-side-panel-menu">
                <MenuList>
                    {main_menu.map((item, idx) => {
                        return (
                            <MenuItem
                                key={item.id}
                                selected={current_page[0] === item.id}
                                onClick={() => {
                                    navigate(`backoffice/${item.id}/${item?.submenu[0].id}`)
                                }}
                            >
                                <ListItemIcon sx={{ color: '#c5c5c5' }}>{center_menu_icons[item.icon]}</ListItemIcon>
                                <ListItemText>{`${idx + 1}. ${item.title}`}</ListItemText>
                            </MenuItem>
                        )
                    })}
                </MenuList>
            </Paper>
        </Box>
    )
}

export default CenterHeaderLeft
