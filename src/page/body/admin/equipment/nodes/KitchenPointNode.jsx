import {Box} from "@mui/material"
import {openModal} from "../../../../../redux/interfaceReducer.js"
import {Handle, Position} from "@xyflow/react"
import {useDispatch} from "react-redux"
import {KitchenPointSVG} from "../svg/KitchenPointSVG.jsx"

export function KitchenPointNode({data}) {

    const dispatch = useDispatch()

    return <Box className='equipment-box' onClick={() => {
        dispatch(openModal({type: 'equipment_kitchen_point', props: {uid_kkt: data.uid, label: data.label}}))
    }}>
        <Handle
            type="target"
            position={Position.Bottom}
            style={{pointerEvents: 'all'}}/>
        <Box>
            <Box>Чековый принтер</Box>
            <Box><KitchenPointSVG/></Box>
        </Box>
        <Handle
            type="source"
            position={Position.Top}
            style={{pointerEvents: 'all'}}/>
    </Box>
}