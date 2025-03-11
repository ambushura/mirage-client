import {Box} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CalculateIcon from '@mui/icons-material/Calculate'
import {openModal} from "../../../redux/interfaceReducer.js"
import {useDispatch} from "react-redux"

const HorecaItem = (props) => {

    const dispatch = useDispatch()

    const state = [<></>, <Box key='1'>Готовить</Box>, <Box key='2'>Готовится</Box>, <Box key='3'>Готов</Box>]

    return (
        <li className='order-box-horeca-item'>
            <Box className='order-box-horeca-item-1'>
                <Box className='order-box-horeca-item-1-calc'
                     onClick={() => dispatch(openModal({type: 'quantity', props: {}}))}><CalculateIcon/></Box>
                <Box className='order-box-horeca-item-1-1'><Box>{props.item.name}</Box></Box>
                <Box
                    className='order-box-horeca-item-1-1-sum'><Box>{props.item.price.sum} р</Box><Box
                    sx={{color: '#8B919B'}}>{props.item.quantity} {props.item.unit_name}</Box></Box>
                <Box className='order-box-horeca-item-1-2'
                     onClick={() => dispatch(openModal({type: 'comment', props: {}}))}><BorderColorIcon
                    sx={{color: 'white'}}/></Box>
                <Box className='order-box-horeca-item-1-3'><DeleteIcon sx={{color: 'white'}}/></Box>
            </Box>
            {props.item.mark.type !== '' ? <Box className='order-box-horeca-item-2'>
                <Box className='order-box-horeca-item-2-1'><CheckCircleOutlineIcon/></Box>
                <Box
                    className='order-box-horeca-item-2-2'>{props.item.egais.value === '' ? 'Отсканируйте маркировку' : props.item.egais.value}</Box>
                <Box className='order-box-horeca-item-2-3'><QrCodeIcon sx={{color: 'white'}}/></Box>
            </Box> : <></>}
            {props.item.egais.type_code !== '' ? <Box className='order-box-horeca-item-3'>
                <Box className='order-box-horeca-item-3-1'><CheckCircleOutlineIcon/></Box>
                <Box
                    className='order-box-horeca-item-3-2'>{props.item.mark.value === '' ? 'Отсканируйте акцизную марку' : props.item.mark.value}</Box>
                <Box className='order-box-horeca-item-3-3'><QrCodeIcon sx={{color: 'white'}}/></Box>
            </Box> : <></>}
            {props.item.comment !== null ? <Box className='order-box-horeca-item-4'>
                <Box className='order-box-horeca-item-4-1'>{props.item.comment}</Box>
                <Box className='order-box-horeca-item-4-2'><DeleteIcon sx={{color: 'white'}}/></Box>
            </Box> : <></>}
            {props.item.kitchen.state !== 0 ? <Box className='order-box-horeca-item-5'>
                <Box className='order-box-horeca-item-5-1'><DirectionsRunIcon sx={{color: 'white'}}/></Box>
                <Box className='order-box-horeca-item-5-2'><LooksOneIcon sx={{color: 'white'}}/></Box>
                <Box className='order-box-horeca-item-5-3' sx={{color: 'white'}}>{state[props.item.kitchen.state]}</Box>
                <Box className='order-box-horeca-item-5-4'></Box>
                <Box className='order-box-horeca-item-5-5'>{props.item.kitchen.name_delivery_path}</Box>
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