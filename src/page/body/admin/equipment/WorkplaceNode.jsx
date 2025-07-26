import {Handle, Position} from "@xyflow/react"
import {Box} from "@mui/material"
import {Workplace} from "./svg/Workplace.jsx"

export const WorkplaceNode = ({data}) => {
    return <Box className='equipment-box'>
        <Handle
            type="target"
            position={Position.Bottom}
            style={{pointerEvents: 'all'}}/>
        <Box>
            <Box>Рабочее место</Box>
            <Box><Workplace/></Box>
        </Box>
        <Box><span>Имя </span><span style={{fontWeight: 'bold'}}>{data.label}</span></Box>
        <Handle
            type="source"
            position={Position.Top}
            style={{pointerEvents: 'all'}}/>
    </Box>
}