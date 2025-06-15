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
    common_position_add_comment,
    horeca_position_change_state,
    horeca_position_delete
} from "../../../service/fetch_service.js"
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import {addNotification} from "../../../redux/notifierReducer.js"

const HorecaItem = (props) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)
    const state = [<></>, <Box key='1'>Готовить</Box>, <Box key='2'>Готовится</Box>, <Box key='3'>Готов</Box>]
    const course = [
        <LooksOneIcon sx={{color: 'white'}} key='0'/>,
        <LooksTwoIcon sx={{color: 'black'}} key='1'/>,
        <Looks3Icon sx={{color: 'black'}} key='2'/>,
        <Looks4Icon sx={{color: 'black'}} key='3'/>
    ]

    const markirovka_status = (item) => {
        const result = true
        if (!item.mark.valid) {
            return false
        } else if (!item.mark.verified) {
            return false
        } else if (!item.mark.found) {
            return false
        } else if (item.mark.realizable) {
            return false
        } else if (item.mark.isBlocked) {
            return false
        } else if (item.mark.sold) {
            return false
        } else if (!item.mark.isowner) {
            return false
        }
        return result
    }

    return (
        <li className={`order-box-horeca-item ${props.uid_selected.includes(props.item.uid) ? 'position-selected' : ''}`}>
            <Box
                className='order-box-horeca-item-1'>
                <button className='order-box-horeca-item-1-calc'
                        onClick={() => dispatch(openModal({
                            type: 'quantity', props: {
                                uid_order: props.uid_order,
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
                <Box
                    className='order-box-horeca-item-1-1-sum'><Box>{Math.round(props.item.price.sum).toLocaleString('ru-RU')} р</Box><Box
                    sx={{color: '#8B919B'}}>{props.item.quantity.toFixed(3).toLocaleString('ru-RU')} {props.item.unit_name}</Box></Box>
                <button className='order-box-horeca-item-1-2'
                        onClick={() => dispatch(openModal({
                            type: 'comment_position',
                            props: {
                                order_type: 'horeca',
                                action_type: 'position',
                                uid_order: props.uid_order,
                                uid_position: props.item.uid,
                                comment: props.item.comment
                            }
                        }))}><BorderColorIcon
                    sx={{color: 'white'}}/></button>
                <button className='order-box-horeca-item-1-3' onClick={() => dispatch((horeca_position_delete(filial, wp, props.uid_order, props.item.uid)))}><DeleteIcon sx={{color: 'white'}}/></button>
            </Box>
            {props.item.mark !== null ? <Box className='order-box-horeca-item-2'>
                <button className='order-box-horeca-item-2-3' onClick={() =>
                    dispatch(openModal({
                        type: 'mark',
                        props: {filial: filial, wp: wp, uid_order: props.uid_order, uid_position: props.item.uid}
                    }))
                }><QrCode2Icon sx={{color: 'white'}}/></button>
                <Box
                    className='order-box-horeca-item-2-2' onClick={() => {
                    if (props.item.mark.value !== '') {
                        dispatch(openModal({
                            type: 'mark_info',
                            props: {item: props.item}
                        }))
                    } else {
                        dispatch(addNotification({
                            message: 'Отсканируйте марку для просмотра информации',
                            severity: 'info',
                            autoHide: true
                        }))
                    }
                }}>{props.item.mark.value === '' ? 'Отсканируйте маркировку' : props.item.mark.value}</Box>
                <button className='order-box-horeca-item-2-1'>
                    {props.item.mark.value === '' ? <QuestionMarkIcon/> :
                        <CheckCircleOutlineIcon sx={{color: markirovka_status(props.item) ? 'green' : 'red'}}/>}
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
                <Box className='order-box-horeca-item-4-2' onClick={() => dispatch(common_position_add_comment(filial, wp, 'horeca', props.uid_order, props.item.uid, ''))}><DeleteIcon sx={{color: 'white'}}/></Box>
            </Box> : <></>}
            {props.item.kitchen !== null ? <Box className='order-box-horeca-item-5'>
                <button className='order-box-horeca-item-5-1' onClick={() => {
                    dispatch(horeca_position_change_state(filial, wp, props.uid_order, props.item.uid, 'away'))
                }} style={{backgroundColor: props.item.kitchen.take_away ? '#45B97C' : '#1C1F23'}}><DirectionsRunIcon
                    sx={{color: props.item.kitchen.take_away ? 'black' : 'white'}}/></button>
                <button className='order-box-horeca-item-5-2'
                        style={{backgroundColor: props.item.kitchen.course > 0 ? '#45B97C' : '#1C1F23'}}
                        onClick={() => dispatch(horeca_position_change_state(filial, wp, props.uid_order, props.item.uid, 'course'))}>{course[props.item.kitchen.course]}</button>
                <button className='order-box-horeca-item-5-3' onClick={() => dispatch(horeca_position_change_state(filial, wp, props.uid_order, props.item.uid, 'cook'))} style={{backgroundColor: '#45B97C', color: 'black'}}>{state[props.item.kitchen.state]}</button>
                <Box className='order-box-horeca-item-5-4'></Box>
                {props.item.kitchen.uid_delivery_path !== null ? <Box className='order-box-horeca-item-5-5'>{props.item.kitchen.name_delivery_path}</Box> : null}
            </Box> : <></>}
        </li>
    )
}

export default HorecaItem