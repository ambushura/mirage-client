import {Box} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const HorecaItem = (props) => {

    const kitchen_state = (item) => {
        switch (item.kitchen.state) {
            case 1:
                return <Box>На кухню</Box>
            case 2:
                return 'Готовится'
            case 3:
                return 'Готов'
        }
    }

    return (
        <li className='order-box-horeca-item'>
            <Box className='order-box-horeca-item-1'>
                {props.item.kitchen.state !== 0 ? <>
                        <Box className='order-box-horeca-item-1-1'><DirectionsRunIcon/></Box>
                        <Box className='order-box-horeca-item-1-2'><LooksOneIcon/></Box>
                    </>
                    : <></>}
                <Box className='order-box-horeca-item-1-3'>{props.item.name}</Box>
                <Box className='order-box-horeca-item-1-4'><BorderColorIcon/></Box>
                <Box className='order-box-horeca-item-1-5'><DeleteIcon/></Box>
            </Box>
            {props.item.egais.type_code !== '' ? <Box className='order-box-horeca-item-2'>
                <Box className='order-box-horeca-item-2-1'><CheckCircleOutlineIcon/></Box>
                <Box
                    className='order-box-horeca-item-2-2'>{props.item.egais.value === '' ? 'Отсканируйте маркировку' : props.item.egais.value}</Box>
                <Box className='order-box-horeca-item-2-3'><QrCodeIcon/></Box>
            </Box> : <></>}
            {props.item.egais.type !== '' ? <Box className='order-box-horeca-item-3'>
                <Box className='order-box-horeca-item-3-1'><CheckCircleOutlineIcon/></Box>
                <Box
                    className='order-box-horeca-item-3-2'>{props.item.mark.value === '' ? 'Отсканируйте акцизную марку' : props.item.mark.value}</Box>
                <Box className='order-box-horeca-item-3-3'><QrCodeIcon/></Box>
            </Box> : <></>}
            {props.item.comment !== '' ? <Box className='order-box-horeca-item-4'>
                <Box className='order-box-horeca-item-4-1'>Комментарий</Box>
                <Box className='order-box-horeca-item-4-2'><DeleteIcon/></Box>
            </Box> : <></>}
            {props.item.kitchen.state !== 0 ? <Box className='order-box-horeca-item-5'>
                <Box className='order-box-horeca-item-5-1'>{kitchen_state(props.item)}</Box>
                <Box className='order-box-horeca-item-5-2'>Цех</Box>
                <Box className='order-box-horeca-item-5-3'>{props.item.kitchen.name_delivery_path}</Box>
            </Box> : <></>}
            {props.item.kitchen.modificators.length > 0 ? <Box className='order-box-horeca-item-6'>
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
                : <></>}
        </li>
    )
}

export default HorecaItem