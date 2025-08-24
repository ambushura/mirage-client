import {Box} from "@mui/material"
import {useSetMenu} from "./useSetMenu.js"
import {useEffect, useState} from "react"
import Folder from "./Folder.jsx"
import Item from "./Item.jsx"
import {AnimatePresence, motion} from 'framer-motion'
import {useSelector} from "react-redux";

const Menu = () => {

    const filial = useSelector(state => state.data.filial)

    const [uid_folder, set_uid_folder] = useState('Меню')
    const [menu_data, ,] = useSetMenu(uid_folder)
    const [breadcrumbs, set_breadcrumbs] = useState([])

    useEffect(() => {
        if (!menu_data?.breadcrumbs) return
        const breadcrumbs_new = []
        for (let item = menu_data.breadcrumbs; item; item = item.folder) {
            breadcrumbs_new.unshift(
                <motion.div
                    key={item.uid}
                    variants={itemVariants}>
                    <Folder
                        type="menu-breadcrumb"
                        set_uid_folder={set_uid_folder}
                        item={item}/>
                </motion.div>
            )
        }
        set_breadcrumbs(breadcrumbs_new)
    }, [menu_data])

    if (filial === undefined) {
        return <Box className='empty-box' sx={{height: '100%'}}>Выберите филиал...</Box>
    } else {
        return <Box id="horeca-menu">
            {menu_data !== undefined ? <>
                <AnimatePresence>
                    {breadcrumbs.length > 0 && <motion.div
                        className='menu-breadcrumbs'
                        initial="hidden"
                        animate="visible"

                        variants={containerVariants}>{breadcrumbs}</motion.div>}
                </AnimatePresence>
                <AnimatePresence>
                    {menu_data.items.length > 0 && <motion.div
                        className='menu-folders'
                        initial="hidden"
                        animate="visible"

                        variants={containerVariants}>
                        {menu_data.items.map(item => {
                            if (item.its_folder) {
                                return (<motion.div
                                    key={item.uid}
                                    variants={itemVariants}>
                                    <Folder
                                        type="menu-folder"
                                        set_uid_folder={set_uid_folder}
                                        item={item}/>
                                </motion.div>)
                            }
                        })}
                    </motion.div>}
                </AnimatePresence>
                <AnimatePresence>
                    {menu_data.items.length > 0 && <motion.div
                        className='menu-items'
                        initial="hidden"
                        animate="visible"

                        variants={containerVariants}>
                        {menu_data.items.map(item => {
                            if (!item.its_folder) {
                                return (
                                    <motion.div
                                        key={item.uid}
                                        variants={itemVariants}>
                                        <Item item={item}/>
                                    </motion.div>
                                )
                            }
                        })}
                    </motion.div>}
                </AnimatePresence>
            </> : <></>}
        </Box>
    }
}

export default Menu

const containerVariants = {
    hidden: {}, visible: {
        transition: {
            staggerChildren: 0.2, delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: {opacity: 0, x: -10}, visible: {
        opacity: 1, x: 0, transition: {
            duration: 0.1, ease: "easeOut"
        }
    }
}