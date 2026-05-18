import { Box } from '@mui/material'
import '../../../ui/css/mobile/common.css'
import BottomBar from '../BottomBar.jsx'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentInterface } from '../../../redux/mobile/frontoffice/frontMobileSlice.js'
import DrawerSide from '../DrawerSide.jsx'

const Waiter = () => {
    const dispatch = useDispatch()

    const [drawerOpened, setDrawerOpened] = useState(false)

    useEffect(() => {
        dispatch(setCurrentInterface('waiter'))
    }, [dispatch])

    return (
        <Box className="mobile">
            <BottomBar setDrawerOpened={setDrawerOpened} />
            <DrawerSide drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} />
        </Box>
    )
}

export default Waiter
