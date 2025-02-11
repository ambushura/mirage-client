import {Box} from "@mui/material"
import {useSetMenu} from "../../../hooks/useSetMenu.js"
import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import Folder from "./Folder.jsx"
import Item from "./Item.jsx"
import {FOOTER_HEIGHT, HEADER_HEIGHT, TOP_MENU_HEIGHT} from "../../../redux/interfaceReducer.js"

const PageHoreca = () => {

    const [uid_folder, set_uid_folder] = useState('Меню')
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const app_height = useSelector(state => state.interface.app_height)
    const authenticated = useSelector(state => state.interface.authenticated)
    const [menu_data, ,] = useSetMenu(city, filial, uid_folder)
    const [breadcrumbs, set_breadcrumbs] = useState([])
    const [height, setHeight] = useState('')

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

    useEffect(() => {
        setHeight(`calc(${app_height}px - ${HEADER_HEIGHT[authenticated]}px - ${TOP_MENU_HEIGHT[authenticated]}px - ${FOOTER_HEIGHT[authenticated]}px)`)
    }, [app_height, authenticated])

    return (
        <Box id="horeca-menu" sx={{height: height}}>
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

export default PageHoreca