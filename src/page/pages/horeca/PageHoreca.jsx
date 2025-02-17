import {Box, Button, ButtonGroup} from "@mui/material"
import Menu from "./Menu.jsx"
import Order from "../../../components/orders/Order.jsx"
import {useSetContentHeight} from "../../../hooks/useSetContentHeight.js"
import {useSetCurrentPage} from "../../../hooks/useSetCurrentPage.js"

const PageHoreca = () => {

    // Хуки
    useSetCurrentPage('films')
    const [content_height, show_pre_order] = useSetContentHeight()

    return (
        <>
            <Box id="top-menu">
                <ButtonGroup>
                    <Button variant='contained' color='secondary' onClick={() => {}}>Основное меню</Button>
                    <Button variant='contained' color='secondary' onClick={() => {}}>Маркировка</Button>
                </ButtonGroup>
            </Box>
            <Box sx={{
                display: 'flex',
                height: content_height
            }}>
                <Box id="content-wrap"
                     sx={{height: content_height}}>
                    <div className="gradient-block-bottom"></div>
                    <Box id="content" style={{height: content_height, overflowX: 'hidden'}}>
                        <Menu/>
                    </Box>
                </Box>
                {show_pre_order ? <Order/> : <></>}
            </Box>
        </>
    )
}

export default PageHoreca