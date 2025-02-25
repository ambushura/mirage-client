import {Box} from "@mui/material"
import {useSetMenu} from "../../../hooks/useSetMenu.js"
import {useEffect, useState} from "react"
import Folder from "./Folder.jsx"
import Item from "./Item.jsx"

const Menu = () => {

    const [uid_folder, set_uid_folder] = useState('Меню')
    const [menu_data, ,] = useSetMenu(uid_folder)
    const [breadcrumbs, set_breadcrumbs] = useState([])

    useEffect(() => {
        if (!menu_data?.breadcrumbs) return
        const breadcrumbs_new = []
        for (let item = menu_data.breadcrumbs; item; item = item.folder) {
            breadcrumbs_new.unshift(
                <Folder
                    type="menu-breadcrumb"
                    set_uid_folder={set_uid_folder}
                    item={item}
                    key={item.uid}/>
            )
        }
        set_breadcrumbs(breadcrumbs_new)
    }, [menu_data])

    return (
        <Box id="horeca-menu">
            {menu_data !== undefined ?
                <>
                    <Box className='menu-breadcrumbs'>{breadcrumbs}</Box>
                    <Box className='menu-folders'>
                        {menu_data.items.map(item => {
                            if (item.its_folder) {
                                return (
                                    <Folder
                                        type="menu-folder"
                                        set_uid_folder={set_uid_folder}
                                        item={item}
                                        key={item.uid}/>
                                )
                            }
                        })}
                    </Box>
                    <Box className='menu-items'>
                        {menu_data.items.map(item => {
                            if (!item.its_folder) {
                                return (
                                    <Item
                                        item={item}
                                        key={item.uid}/>
                                )
                            }
                        })}
                    </Box>
                </> : <></>
            }
        </Box>
    )
}

export default Menu