import {Box} from "@mui/material"
import Menu from "./Menu.jsx"

const PageHoreca = () => {

    return <Box id='content-box' sx={{overflowY: 'auto'}}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box id='content-header'></Box>
            <Box id='content' sx={{padding: '10px 0'}}>
                <Menu/>
            </Box>
            <Box id='content-footer'></Box>
        </Box>
    </Box>
}

export default PageHoreca