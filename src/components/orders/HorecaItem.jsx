import {Box} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const HorecaItem = (props) => {

    return (
        <li className='order-box-horeca-item'>
            <Box className='order-box-horeca-item-1'>
                <Box className='order-box-horeca-item-1-1'><DirectionsRunIcon/></Box>
                <Box className='order-box-horeca-item-1-2'><LooksOneIcon/></Box>
                <Box className='order-box-horeca-item-1-3'>{props.item.name}</Box>
                <Box className='order-box-horeca-item-1-4'><BorderColorIcon/></Box>
                <Box className='order-box-horeca-item-1-5'><DeleteIcon/></Box>
            </Box>
            <Box className='order-box-horeca-item-2'>
                <Box className='order-box-horeca-item-2-1'><CheckCircleOutlineIcon/></Box>
                <Box className='order-box-horeca-item-2-2'>Маркировка ЧЗ</Box>
                <Box className='order-box-horeca-item-2-3'><QrCodeIcon/></Box>
            </Box>
            <Box className='order-box-horeca-item-3'>
                <Box className='order-box-horeca-item-3-1'><CheckCircleOutlineIcon/></Box>
                <Box className='order-box-horeca-item-3-2'>Акцизная марка</Box>
                <Box className='order-box-horeca-item-3-3'><QrCodeIcon/></Box>
            </Box>
            <Box className='order-box-horeca-item-4'>
                <Box className='order-box-horeca-item-4-1'>Комментарий</Box>
                <Box className='order-box-horeca-item-4-2'><DeleteIcon/></Box>
            </Box>
            <Box className='order-box-horeca-item-5'>
                <Box className='order-box-horeca-item-5-1'>Готов</Box>
                <Box className='order-box-horeca-item-5-2'>Цех</Box>
                <Box className='order-box-horeca-item-5-3'>Наименование цеха</Box>
                <Box className='order-box-horeca-item-5-4'><SoupKitchenIcon/></Box>
            </Box>
            <Box className='order-box-horeca-item-6'>
                <Box className='order-box-horeca-item-6-1'>
                    <Box><span>Модификатор 1</span><span
                        className='order-box-horeca-item-6-1-modif'><DeleteIcon/></span></Box>
                    <Box><span>Модификатор 2</span><span
                        className='order-box-horeca-item-6-1-modif'><DeleteIcon/></span></Box>
                    <Box><span>Модификатор 3</span><span
                        className='order-box-horeca-item-6-1-modif'><DeleteIcon/></span></Box>
                    <Box><span>Модификатор 4</span><span
                        className='order-box-horeca-item-6-1-modif'><DeleteIcon/></span></Box>
                    <Box><span>Модификатор 5</span><span
                        className='order-box-horeca-item-6-1-modif'><DeleteIcon/></span></Box>
                </Box>
                <Box className='order-box-horeca-item-6-2'>
                    <Box><AddCircleIcon/></Box>
                </Box>
            </Box>
        </li>
    )
}

export default HorecaItem