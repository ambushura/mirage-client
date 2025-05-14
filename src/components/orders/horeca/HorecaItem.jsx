import {Box} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CalculateIcon from '@mui/icons-material/Calculate'
import {openModal} from "../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {common_position_add_comment} from "../../../service/fetch_service.js"

const HorecaItem = (props) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    const state = [<></>, <Box key='1'>Готовить</Box>, <Box key='2'>Готовится</Box>, <Box key='3'>Готов</Box>]

    return (
        <li className={`order-box-horeca-item ${props.uid_selected.includes(props.item.uid) ? 'position-selected' : ''}`}>
            <Box
                className='order-box-horeca-item-1'>
                <button className='order-box-horeca-item-1-calc'
                        onClick={() => dispatch(openModal({type: 'quantity', props: {
                            uid_order: props.uid_order,
                                uid_position: props.item.uid,
                                fraction: props.item.fraction,
                                unit_name: props.item.unit_name,
                                unit_code: props.item.unit_code,
                                v: props.item.v,
                                quantity: props.item.quantity}}))}><CalculateIcon/></button>
                <Box className='order-box-horeca-item-1-1' onClick={() => {
                    props.set_uid_selected(prev =>
                        prev.includes(props.item.uid)
                            ? prev.filter(el => el !== props.item.uid)
                            : [...prev, props.item.uid]
                    )
                }}><Box>{props.item.name}</Box></Box>
                <Box className='order-box-horeca-item-1-1-sum'><Box>{props.item.price.sum} р</Box><Box
                    sx={{color: '#8B919B'}}>{props.item.quantity} {props.item.unit_name}</Box></Box>
                <button className='order-box-horeca-item-1-2'
                        onClick={() => dispatch(openModal({type: 'comment_position', props: {order_type: 'horeca', action_type: 'position', uid_order: props.uid_order, uid_position: props.item.uid, comment: props.item.comment}}))}><BorderColorIcon
                    sx={{color: 'white'}}/></button>
                <button className='order-box-horeca-item-1-3'><DeleteIcon sx={{color: 'white'}}/></button>
            </Box>
            {props.item.mark.type !== '' ? <Box className='order-box-horeca-item-2'>
                <button className='order-box-horeca-item-2-1'><CheckCircleOutlineIcon/></button>
                <Box
                    className='order-box-horeca-item-2-2'>{props.item.egais.value === '' ? 'Отсканируйте маркировку' : props.item.egais.value}</Box>
                <button className='order-box-horeca-item-2-3'><QrCode2Icon sx={{color: 'white'}}/></button>
            </Box> : <></>}
            {props.item.egais.type_code !== '' ? <Box className='order-box-horeca-item-3'>
                <button className='order-box-horeca-item-3-1'><CheckCircleOutlineIcon/></button>
                <Box
                    className='order-box-horeca-item-3-2'>{props.item.mark.value === '' ? 'Отсканируйте акцизную марку' : props.item.mark.value}</Box>
                <button className='order-box-horeca-item-3-3'><QrCode2Icon sx={{color: 'white'}}/></button>
            </Box> : <></>}
            {props.item.comment !== null ? <Box className='order-box-horeca-item-4'>
                <Box className='order-box-horeca-item-4-1'>{props.item.comment}</Box>
                <Box className='order-box-horeca-item-4-2' onClick={() => {
                    dispatch(common_position_add_comment(filial, wp, 'horeca', props.uid_order, props.item.uid, ''))
                }}><DeleteIcon sx={{color: 'white'}}/></Box>
            </Box> : <></>}
            {props.item.kitchen.state !== 0 ? <Box className='order-box-horeca-item-5'>
                <button className='order-box-horeca-item-5-1'><DirectionsRunIcon sx={{color: 'white'}}/></button>
                <button className='order-box-horeca-item-5-2'><LooksOneIcon sx={{color: 'white'}}/></button>
                <button className='order-box-horeca-item-5-3'>{state[props.item.kitchen.state]}</button>
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