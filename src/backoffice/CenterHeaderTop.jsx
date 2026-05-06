import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {center_menu_icons} from "../ui/ThemeContext.jsx"
import {logout} from "../redux/authReducer.js"
import {useGetCenterData} from "../ui/hooks/useGetCenterData.js"
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuList from '@mui/material/MenuList'
import Logout from '@mui/icons-material/Logout'

const CenterHeaderTop = () => {

    useGetCenterData()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {main_menu, current_page} = useSelector(state => state.center)
    const param_date = useSelector(state => state.interface.params.param_date)
    const cities = useSelector(state => state.data.cities)

    return <Box id='center-header'>
        <MenuList id='center-header-menu'>
            {main_menu.find(el => el.id === current_page[0])?.submenu.map(item => <MenuItem
                key={item.id}
                selected={current_page[1] === item.id}
                onClick={() => navigate(`center/${current_page[0]}/${item.id}`)}
            >
                <ListItemIcon sx={{minWidth: 32, color: '#c5c5c5'}}>
                    {center_menu_icons[item.icon]}
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
            </MenuItem>)}
            <MenuItem sx={{marginLeft: 'auto'}}
                      onClick={() => {
                          navigate(cities.length ? `/films/${cities[2].code}/all/${param_date}/` : "/")
                          dispatch(logout())
                      }}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                Выход
            </MenuItem>
        </MenuList>
    </Box>
}

export default CenterHeaderTop