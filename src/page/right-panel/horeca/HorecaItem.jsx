import {Box} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CalculateIcon from '@mui/icons-material/Calculate'
import {openModal} from "../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {
    common_position_add_comment, common_position_delete_comment,
    horeca_position_change_state,
    horeca_position_delete
} from "../../../service/fetch_service.js"
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

const HorecaItem = (props) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)
    const state = [<></>, <Box key='1'>Начать готовить</Box>, <Box key='2'>Закончить готовку</Box>,
        <Box key='3'>Отдать гостю</Box>]
    const course = [
        <LooksOneIcon sx={{color: 'white'}} key='0'/>,
        <LooksTwoIcon sx={{color: 'black'}} key='1'/>,
        <Looks3Icon sx={{color: 'black'}} key='2'/>,
        <Looks4Icon sx={{color: 'black'}} key='3'/>
    ]

    return (
        <li className={`order-box-horeca-item ${props.uid_selected.includes(props.item.uid) ? 'position-selected' : ''}`}>
            <Box
                className='order-box-horeca-item-1'>
                <button className='order-box-horeca-item-1-calc'
                        onClick={() => dispatch(openModal({
                            type: 'quantity', props: {
                                uid_order: props.order.uid,
                                uid_position: props.item.uid,
                                fraction: props.item.fraction,
                                unit_name: props.item.unit_name,
                                unit_code: props.item.unit_code,
                                v: props.item.v,
                                quantity: props.item.quantity
                            }
                        }))}><CalculateIcon/></button>
                <Box className='order-box-horeca-item-1-1' onClick={() => {
                    props.set_uid_selected(prev =>
                        prev.includes(props.item.uid)
                            ? prev.filter(el => el !== props.item.uid)
                            : [...prev, props.item.uid]
                    )
                }}><Box>{props.item.name}</Box></Box>
                <Box className='order-box-horeca-item-1-1-sum'>
                    <Box
                        sx={{color: '#8B919B'}}>{props.item.quantity.toFixed(3).toLocaleString('ru-RU')} {props.item.unit_name}</Box>
                    <Box>{Math.round(props.item.price.sum).toLocaleString('ru-RU')} р</Box>
                </Box>
                <button className='order-box-horeca-item-1-2'
                        onClick={() => dispatch(openModal({
                            type: 'comment_position',
                            props: {
                                order_type: 'horeca',
                                action_type: 'position',
                                uid_menu: props.item.uid_menu,
                                uid_order: props.order.uid,
                                uid_position: props.item.uid,
                                comment: props.item.comment,
                                modifications: props.item.kitchen !== null ? props.item.kitchen.modifications : [],
                            }
                        }))}><BorderColorIcon
                    sx={{color: 'white'}}/></button>
                <button className='order-box-horeca-item-1-3'
                        onClick={() => dispatch((horeca_position_delete(filial, wp, props.order.uid, props.item.uid)))}>
                    <DeleteIcon sx={{color: 'white'}}/></button>
            </Box>
            {props.item.price.uid_discount !== null ?
                <Box className="order-horeca-item-discount">
                    <div>{props.item.price.name_discount}</div>
                    <div style={{marginLeft: '4px'}}>{props.item.price.sum_discount} р</div>
                </Box>
                : null}
            {props.item.mark !== null ? <Box className='order-box-horeca-item-2'>
                <button className='order-box-horeca-item-2-3' onClick={() =>
                    dispatch(openModal({
                        type: 'mark',
                        props: {
                            filial: filial,
                            wp: wp,
                            uid_order: props.order.uid,
                            uid_position: props.item.uid,
                            add: false
                        }
                    }))
                }><QrCode2Icon sx={{color: 'white'}}/></button>
                <Box
                    className='order-box-horeca-item-2-2' onClick={() => {
                    if (props.item.mark.value !== null) {
                        dispatch(openModal({
                            type: 'mark_info',
                            props: {item: props.item}
                        }))
                    }
                }}>{props.item.mark.value === null ? 'Отсканируйте маркировку' : props.item.mark.value}</Box>
                <button className='order-box-horeca-item-2-1'>
                    {props.item.mark.value === null ? <QuestionMarkIcon/> :
                        <CheckCircleOutlineIcon
                            sx={{color: props.item.mark_payment_available ? 'green' : 'red'}}/>}
                </button>
            </Box> : <></>}
            {props.item.egais !== null ? <Box className='order-box-horeca-item-3'>
                <button className='order-box-horeca-item-3-3'><QrCode2Icon sx={{color: 'white'}}/></button>
                <Box
                    className='order-box-horeca-item-3-2'>{props.item.egais.value === '' ? 'Отсканируйте акцизную марку' : props.item.egais.value}</Box>
                <button className='order-box-horeca-item-3-1'><CheckCircleOutlineIcon/></button>
            </Box> : <></>}
            {props.item.comment !== null ? <Box className='order-box-horeca-item-4'>
                <Box className='order-box-horeca-item-4-1'>{props.item.comment}</Box>
                <Box className='order-box-horeca-item-4-2'
                     onClick={() => dispatch(common_position_delete_comment(filial, wp, 'horeca', props.order.uid, props.item.uid))}><DeleteIcon
                    sx={{color: 'white'}}/></Box>
            </Box> : <></>}
            {props.item.kitchen !== null && props.item.kitchen.modifications !== null ? <Box className='modifications'>{
                props.item.kitchen.modifications.map(modification => {
                    return <Box className='modification' key={modification.uid}>{modification.name}</Box>
                })
            }</Box> : null}
            {props.item.kitchen !== null ? <Box className='order-box-horeca-item-5'>
                <button className='order-box-horeca-item-5-1' onClick={() => {
                    dispatch(horeca_position_change_state(filial, wp, props.order.uid, props.item.uid, 'away'))
                }} style={{backgroundColor: props.item.kitchen.take_away ? '#45B97C' : '#1C1F23'}}><DirectionsRunIcon
                    sx={{color: props.item.kitchen.take_away ? 'black' : 'white'}}/></button>
                <button className='order-box-horeca-item-5-2'
                        style={{backgroundColor: props.item.kitchen.course > 0 ? '#45B97C' : '#1C1F23'}}
                        onClick={() => dispatch(horeca_position_change_state(filial, wp, props.order.uid, props.item.uid, 'course'))}>{course[props.item.kitchen.course]}</button>
                <button className='order-box-horeca-item-5-3'
                        onClick={() => dispatch(horeca_position_change_state(filial, wp, props.order.uid, props.item.uid, 'cook'))}
                        style={{backgroundColor: '#45B97C', color: 'black', fontSize: '60%', padding: '0 5px'}}>{state[props.item.kitchen.state]}</button>
                <Box className='order-box-horeca-item-5-4'></Box>
                {props.item.kitchen.uid_delivery_path !== null ?
                    <Box className='order-box-horeca-item-5-5'>{props.item.kitchen.name_delivery_path}</Box> : null}
            </Box> : <></>}
        </li>
    )
}

export default HorecaItem