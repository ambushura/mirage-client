import {Box} from "@mui/material"
import {useEffect, useState} from "react"
import Folder from "./Folder.jsx"
import Item from "./Item.jsx"
import {AnimatePresence, motion} from 'framer-motion'
import {useDispatch, useSelector} from "react-redux"
import {horeca_menu_get} from "../../../service/fetch_service.js"
import Loader from "../../../ui/Loader.jsx"

export default function Menu() {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    const [uid_folder, set_uid_folder] = useState('Меню')
    const [menu, set_menu] = useState(null)
    const [breadcrumbs, set_breadcrumbs] = useState([])
    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(horeca_menu_get(filial, uid_folder))
            set_fetching(fetching_result)
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                set_menu(fetching_result.data)
            }
        }
        if (filial !== undefined && param_date_admin !== undefined) {
            fetch()
        }
    }, [dispatch, filial, param_date_admin, uid_folder])

    useEffect(() => {
        if (!menu?.breadcrumbs) return
        const breadcrumbs_new = []
        for (let item = menu.breadcrumbs; item; item = item.folder) {
            breadcrumbs_new.unshift(<motion.div
                key={item.uid}
                variants={itemVariants}>
                <Folder
                    type="menu-breadcrumb"
                    set_uid_folder={set_uid_folder}
                    item={item}/>
            </motion.div>)
        }
        set_breadcrumbs(breadcrumbs_new)
    }, [menu])

    if (filial === undefined) {
        return <Box className='empty-box'>Выберите филиал...</Box>
    } else if (fetching.loading && fetching.error === null && fetching.data === null) {
        return <Loader/>
    } else if (!fetching.loading && fetching.error !== null && fetching.data === null) {
        return <Box className='empty-box'>{fetching.error}</Box>
    } else if (!fetching.loading && fetching.error === null && fetching.data !== null) {
        return <Box id="horeca-menu">
            {menu !== null ? <>
                <AnimatePresence>
                    {breadcrumbs.length > 0 && <motion.div
                        className='menu-breadcrumbs'
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}>{breadcrumbs}</motion.div>}
                </AnimatePresence>
                <AnimatePresence>
                    {menu.items.length > 0 && <motion.div
                        className='menu-folders'
                        initial="hidden"
                        animate="visible"

                        variants={containerVariants}>
                        {menu.items.map(item => {
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
                    {menu.items.length > 0 && <motion.div
                        className='menu-items'
                        initial="hidden"
                        animate="visible"

                        variants={containerVariants}>
                        {menu.items.map(item => {
                            if (!item.its_folder) {
                                return (<motion.div
                                    key={item.uid}
                                    variants={itemVariants}>
                                    <Item item={item}/>
                                </motion.div>)
                            }
                        })}
                    </motion.div>}
                </AnimatePresence>
            </> : <></>}
        </Box>
    }
}

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