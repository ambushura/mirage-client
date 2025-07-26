import {Handle, Position} from "@xyflow/react"
import {Box} from "@mui/material"
import {openModal} from "../../../../../redux/interfaceReducer.js"
import {useDispatch} from "react-redux"
import {PinpadSVG} from "../svg/PinpadSVG.jsx"

export const PinpadNode = ({data}) => {

    const dispatch = useDispatch()

    return <Box className='equipment-box' onClick={() => {
        dispatch(openModal({type: 'equipment_pinpad', props: {uid_pinpad: data.id, label: data.label}}))
    }}>
        <Handle
            type="target"
            position={Position.Bottom}
            style={{pointerEvents: 'all'}}/>
        <Box>
            <Box>Пинпад</Box>
            <Box><PinpadSVG/></Box>
        </Box>
        <Box><span>ID </span><span style={{fontWeight: 'bold'}}>{data.label}</span></Box>
        <Handle
            type="source"
            position={Position.Top}
            style={{pointerEvents: 'all'}}/>
    </Box>
}