import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import {center_menu_icons} from "../ui/ThemeContext.jsx"
import {useNavigate} from "react-router-dom"
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

const CenterHeaderLeft = () => {

    const navigate = useNavigate()
    const {main_menu, current_page} = useSelector(state => state.center)

    return <Box id='center-side-panel'>
        <Paper id='center-side-panel-menu'>
            <MenuList>
                {main_menu.map(item => {
                    return <MenuItem
                        key={item.id}
                        selected={current_page[0] === item.id}
                        onClick={() => {
                            navigate(`center/${item.id}/${item?.submenu[0].id}`)
                        }}>
                        <ListItemIcon>{center_menu_icons[item.icon]}</ListItemIcon>
                        <ListItemText>{item.title}</ListItemText>
                    </MenuItem>
                })}
            </MenuList>
        </Paper>
    </Box>
}

export default CenterHeaderLeft