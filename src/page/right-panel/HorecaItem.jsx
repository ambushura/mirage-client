import {Box, Button} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CalculateIcon from '@mui/icons-material/Calculate'
import {openModal} from "../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {
    common_position_delete_comment, horeca_position_change_state, horeca_position_delete
} from "../../service/fetch_service.js"
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import QrCodeIcon from '@mui/icons-material/QrCode'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'

const HorecaItem = (props) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const state = [<></>, <Box color='primary' key='1'>Начать готовить</Box>,
        <Box color='primary' key='2'>Закончить готовку</Box>, <Box color='primary' key='3'>Отдать гостю</Box>]
    const course = [<LooksOneIcon key='0'/>, <LooksTwoIcon key='1'/>, <Looks3Icon key='2'/>, <Looks4Icon key='3'/>]

    return (
        <li className={`order-box-horeca-item ${props.uid_selected.includes(props.item.uid) ? 'position-selected' : ''}`}>
            <Box
                className='order-box-horeca-item-1'>
                <Button variant='text' color='secondary' onClick={() => dispatch(openModal({
                    type: 'quantity', props: {
                        uid_order: props.order.uid,
                        uid_position: props.item.uid,
                        fraction: props.item.fraction,
                        unit_name: props.item.unit_name,
                        unit_code: props.item.unit_code,
                        v: props.item.v,
                        quantity: props.item.quantity
                    }
                }))}><CalculateIcon/></Button>
                <Box className='order-box-horeca-item-1-1' onClick={() => {
                    props.set_uid_selected(prev => prev.includes(props.item.uid) ? prev.filter(el => el !== props.item.uid) : [...prev, props.item.uid])
                }}><Box>{props.item.name}</Box></Box>
                <Box className='order-box-horeca-item-1-1-sum'>
                    <Box
                        sx={{color: '#8B919B'}}>{props.item.quantity.toFixed(3).toLocaleString('ru-RU')} {props.item.unit_name}</Box>
                    <Box>{Math.round(props.item.price.sum).toLocaleString('ru-RU')} р</Box>
                </Box>

                <Button variant='text' color='secondary'
                        onClick={() => dispatch(openModal({
                            type: 'comment_position', props: {
                                order_type: 'horeca',
                                action_type: 'position',
                                uid_menu: props.item.uid_menu,
                                uid_order: props.order.uid,
                                uid_position: props.item.uid,
                                comment: props.item.comment,
                                modifications: props.item.kitchen !== null ? props.item.kitchen.modifications : [],
                            }
                        }))}>
                    <BorderColorIcon/></Button>
                <Button variant='text' color='secondary'
                        onClick={() => dispatch((horeca_position_delete(filial, props.order.uid, props.item.uid)))}><DeleteIcon/></Button>

            </Box>
            {props.item.price.uid_discount !== null ? <Box className="order-horeca-item-discount">
                <div>{props.item.price.name_discount}</div>
                <div style={{marginLeft: '4px'}}>{props.item.price.sum_discount} р</div>
            </Box> : null}
            {props.item.mark !== null ? <Box className='order-box-horeca-item-2'>
                <Button variant='text' color='secondary'
                        startIcon={<QrCode2Icon/>}
                        onClick={() => dispatch(openModal({
                            type: 'mark', props: {
                                filial: filial, uid_order: props.order.uid, uid_position: props.item.uid, add: false
                            }
                        }))}>КМ</Button>
                <Box
                    className='order-box-horeca-item-2-2' onClick={() => {
                    if (props.item.mark.value !== null) {
                        dispatch(openModal({
                            type: 'mark_info', props: {item: props.item}
                        }))
                    }
                }}>{props.item.mark.value === null ? 'Отсканируйте маркировку' : props.item.mark.value}</Box>
                <Button variant='text' color='secondary'>
                    {props.item.mark.value === null ? <QrCodeScannerIcon/> : <CheckCircleOutlineIcon
                        sx={{color: props.item.mark_payment_available ? 'green' : 'red'}}/>}
                </Button>
            </Box> : <></>}
            {props.item.egais !== null ? <Box className='order-box-horeca-item-3'>
                <Button variant='text' color='secondary' startIcon={<QrCodeIcon/>}>АМ</Button>
                <Box
                    className='order-box-horeca-item-3-2'>{props.item.egais.value === '' ? 'Отсканируйте акцизную марку' : props.item.egais.value}</Box>
                <Button variant='text' color='secondary'><CheckCircleOutlineIcon/></Button>
            </Box> : <></>}
            {props.item.comment !== null ? <Box className='order-box-horeca-item-4'>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1}}><span
                    style={{textAlign: 'center'}}>{props.item.comment}</span></Box>
                <Button color='secondary' variant='text'
                        onClick={() => dispatch(common_position_delete_comment(filial, 'horeca', props.order.uid, props.item.uid))}><DeleteIcon/></Button>
            </Box> : <></>}
            {props.item.kitchen !== null && props.item.kitchen.modifications !== null ?
                <Box className='modifications'>{props.item.kitchen.modifications.map(modification => {
                    return <Box className='modification' key={modification.uid}>{modification.name}</Box>
                })}</Box> : null}
            {props.item.kitchen !== null ? <Box className='order-box-horeca-item-5'>
                <Button
                    variant='text'
                    color={props.item.kitchen.take_away ? 'info' : 'secondary'}
                    onClick={() => dispatch(horeca_position_change_state(filial, props.order.uid, props.item.uid, 'away'))}>
                    <ShoppingBagIcon/></Button>
                <Button variant='text'
                        color={props.item.kitchen.course > 0 ? 'info' : 'secondary'}
                        onClick={() => dispatch(horeca_position_change_state(filial, props.order.uid, props.item.uid, 'course'))}>{course[props.item.kitchen.course]}</Button>
                <Button variant='text'
                        color='info'
                        onClick={() => dispatch(horeca_position_change_state(filial, props.order.uid, props.item.uid, 'cook'))}>{state[props.item.kitchen.state]}</Button>
                {props.item.kitchen.uid_delivery_path !== null ?
                    <Button variant='text' color='info'>{props.item.kitchen.name_delivery_path}</Button> : null}
            </Box> : null}
        </li>)
}

export default HorecaItem