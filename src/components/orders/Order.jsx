import "../../css/admin.css"
import {Box, Button, ButtonGroup} from "@mui/material"
import ReceiptIcon from '@mui/icons-material/Receipt'
import SaveIcon from '@mui/icons-material/Save'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import {useSelector} from "react-redux"

const Order = () => {
    const pre_order = useSelector(state => state.orders.pre_order)
    return (
        <Box id="order">
            <Box id="order-box">
                <Box>
                    <ButtonGroup>
                        <Button variant="contained" color="primary" onClick={() => {
                        }}><ReceiptIcon/></Button>
                        <Button variant="contained" color="primary" onClick={() => {
                        }}><SaveIcon/></Button>
                        <Button variant="contained" color="primary" onClick={() => {
                        }}><DeleteForeverIcon/></Button>
                    </ButtonGroup>
                    <Box>{pre_order.number}</Box>
                </Box>
                <Box>
                    <ButtonGroup>
                        <Button variant="contained" color="secondary" onClick={() => {
                        }}>Скидки</Button>
                        <Button variant="contained" color="secondary" onClick={() => {
                        }}>Комментарий</Button>
                        <Button variant="contained" color="secondary" onClick={() => {
                        }}><CheckBoxIcon/></Button>
                        <Button variant="contained" color="secondary" onClick={() => {
                        }}><CheckBoxOutlineBlankIcon/></Button>
                    </ButtonGroup>
                </Box>
            </Box>
        </Box>
    )
}
export default Order